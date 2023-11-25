import { Controller, Get } from '@nestjs/common';
import { VmsService } from './vms.service';
import { Server } from 'src/db/models/server';

@Controller('vms')
export class VmsController {
  constructor(private readonly vmsService: VmsService) {}

  @Get()
  getAllPosts(): Promise<Server[]> {
    return this.vmsService.findAllVms();
  }
}
