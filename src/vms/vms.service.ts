import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Server } from 'src/db/models/server';

@Injectable()
export class VmsService {
  constructor(
    @InjectModel(Server) private readonly server: typeof Server,
  ) {}

  findAllVms(): Promise<Server[]> {
    return this.server.findAll();
  }
}
