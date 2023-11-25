import { Module } from '@nestjs/common';
import { VmsController } from './vms.controller';
import { VmsService } from './vms.service';
import { SequelizeModule } from '@nestjs/sequelize';
import { Server } from '../../db/models/server';
import { SshApiModule } from '../ssh-api/ssh-api.module';
import { VirtualMachine } from 'src/db/models/vm';

@Module({
  imports: [SequelizeModule.forFeature([Server, VirtualMachine]), SshApiModule],
  controllers: [VmsController],
  providers: [VmsService],
})
export class VmsModule {}
