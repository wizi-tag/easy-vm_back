import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Server } from 'src/db/models/server';
import { VirtualMachine } from 'src/db/models/vm';

@Injectable()
export class VmsService {
  constructor(@InjectModel(Server) private readonly server: typeof Server) {}

  async findAllVms(): Promise<Server[]> {
    try {
      const servers = await this.server.findAll({ include: VirtualMachine });
      // servers.forEach(({ host, port }) => {
      //   console.log({ host, port });
      //   const ssh = new NodeSSH();

      //   ssh
      //     .connect({
      //       host,
      //       port,
      //       username,
      //       password,
      //     })
      //     .then(() => {
      //       ssh.execCommand('pwd').then(function (result) {
      //         console.log('STDOUT: ' + result.stdout);
      //         console.log('STDERR: ' + result.stderr);
      //         ssh.dispose();
      //       });
      //     });
      // });
      // const { host, port } = servers[0];
      // const ssh = new NodeSSH();

      // ssh
      //   .connect({
      //     host,
      //     port,
      //     username,
      //     password,
      //   })
      //   .then(() => {
      //     ssh.execCommand('pwd').then(function (result) {
      //       console.log('STDOUT: ' + result.stdout);
      //       console.log('STDERR: ' + result.stderr);
      //       ssh.dispose();
      //     });
      //   });
      return servers;
    } catch (error) {
      throw error;
    }
  }
}
