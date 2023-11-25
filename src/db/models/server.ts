import {
  Table,
  Column,
  Model,
  CreatedAt,
  UpdatedAt,
  HasMany,
} from 'sequelize-typescript';
import { VirtualMachine } from './vm';

@Table
export class Server extends Model {
  @Column
  name: string;

  @Column
  host: string;

  @Column
  port: number;

  @CreatedAt
  createdAt: Date;

  @UpdatedAt
  updatedAt: Date;

  @HasMany(() => VirtualMachine, 'hostId')
  virtualMachines: VirtualMachine[];
}
