import { Controller, Get, Patch } from '@nestjs/common';
import { VmsService } from './vms.service';
import { Server } from 'src/db/models/server';

@Controller('vms')
export class VmsController {
  constructor(private readonly vmsService: VmsService) {}

  @Get()
  getAllVms(): Promise<Server[]> {
    return this.vmsService.getAllVms();
  }

  @Patch(':id')
  setVirtualMachine(isActive, vmId, serverId) {
    return this.vmsService.changeVmPower(isActive, vmId, serverId);
  }
}
