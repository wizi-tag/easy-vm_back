import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { VmsModule } from './vms/vms.module';
import { Server } from './db/models/server';

@Module({
  imports: [SequelizeModule.forRoot({
    dialect: 'postgres',
    host: 'localhost',
    port: 9432,
    username: 'db-user',
    password: 'db-pass',
    database: 'db-name',
    models: [Server],
  }), VmsModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}