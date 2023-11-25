import {
  Table,
  Column,
  Model,
  CreatedAt,
  UpdatedAt,
  BelongsTo,
  ForeignKey,
} from 'sequelize-typescript';
import { Server } from './server';

@Table({ tableName: 'virtual-machines' })
export class VirtualMachine extends Model {
  @Column
  name: string;

  @Column
  type: string;

  @Column
  isActive: boolean;

  @ForeignKey(() => Server)
  hostId: number;

  @CreatedAt
  createdAt: Date;

  @UpdatedAt
  updatedAt: Date;

  @BelongsTo(() => Server)
  server: Server;
}
