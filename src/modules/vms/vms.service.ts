import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Server } from 'src/db/models/server';
import { VirtualMachine } from 'src/db/models/vm';
import { SshApiService } from '../ssh-api/ssh-api.service';
import { password, username } from './constants';

/* @TODO setPower: (value: boolean, hostId: number, vmId) => Servers
* this method will take array of Servers


*/

@Injectable()
export class VmsService {
  constructor(
    @InjectModel(Server) private readonly server: typeof Server,
    @InjectModel(VirtualMachine) private readonly vm: typeof VirtualMachine,
    private readonly sshApiService: SshApiService,
  ) {}

  async getAllVms(): Promise<Server[]> {
    try {
      const servers = await this.server.findAll();
      const hostId = servers[0].id;

      const responses = await Promise.all(
        servers.map(async ({ port, host }) => {
          const response = await this.sshApiService.sendToOne({
            port,
            host,
            username: 'ssh',
            password: 'admin',
            cmd: 'virsh list --all;exit',
          });
          console.log(response);
          return response.stdout.split('\n').map((row) =>
            row
              .split(' ')
              .map((cell) => cell.trim())
              .filter((cell) => typeof cell === 'string' && cell.length > 0),
          );
        }),
      );
      const [header, divider, ...vms] = responses[0];
      console.log([header, divider, ...vms]);

      const result = await Promise.all(
        vms.map(([id, name, status]) =>
          this.vm.upsert({
            name,
            hostId,
          }),
        ),
      );
      console.log(result);
      return this.server.findAll({ include: { model: VirtualMachine } });
    } catch (error) {
      throw error;
    }
  }
  async changeVmPower(isActive: boolean, vmId: number, hostId: number) {
    const instance = await this.server.findByPk(1);
    const vm = await this.vm.findByPk(1);
    const { port, host } = instance;
    const { name } = vm;
    await this.sshApiService.sendToOne({
      port,
      host,
      password,
      username,
      cmd: `virsh shutdown alpine;virsh destroy alpine`,
    });
  }
}
