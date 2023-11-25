import { Module } from '@nestjs/common';
import { VmsController } from './vms.controller';
import { VmsService } from './vms.service';
import { SequelizeModule } from '@nestjs/sequelize';
import { Server } from '../../db/models/server';

@Module({
  imports: [SequelizeModule.forFeature([Server])],
  controllers: [VmsController],
  providers: [VmsService],
})
export class VmsModule {}
