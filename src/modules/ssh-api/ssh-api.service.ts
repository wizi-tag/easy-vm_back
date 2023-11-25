import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { NodeSSH } from 'node-ssh';
import { ISSHOptions } from './types';

@Injectable()
export class SshApiService {
  async sendToOne(sshOptions: ISSHOptions) {
    try {
      const ssh = new NodeSSH();

      const { host, port, username, password, cmd } = sshOptions;

      const connection = await ssh.connect({
        host,
        port,
        username,
        password,
      });

      const commandResponse = await connection.execCommand(cmd);

      return commandResponse;
    } catch (error) {
      throw error;
    }
  }

  async sendToMany(sshOptions: ISSHOptions[]) {
    try {
      const commandResponses = await Promise.all(
        sshOptions.map(async (sshOption) => {
          const ssh = new NodeSSH();

          const { host, port, username, password, cmd } = sshOption;

          console.log({ host, port, username, password, cmd });

          const connection = await ssh.connect({
            host,
            port,
            username,
            password,
          });

          const commandResponse = await connection.execCommand(cmd);

          if (commandResponse.stderr) {
            throw new HttpException(
              commandResponse.stderr,
              HttpStatus.INTERNAL_SERVER_ERROR,
            );
          }
        }),
      );

      return commandResponses;
    } catch (error) {
      throw error;
    }
  }
}
