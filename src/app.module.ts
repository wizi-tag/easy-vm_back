import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { VmsModule } from './modules/vms/vms.module';
import { Server } from './db/models/server';
import { VirtualMachine } from './db/models/vm';
import { User } from './db/models/user';
import { AuthModule } from './modules/auth/auth.module';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    SequelizeModule.forRoot({
      dialect: 'postgres',
      host: 'localhost',
      port: 9432,
      username: 'db-user',
      password: 'db-pass',
      database: 'db-name',
      models: [Server, VirtualMachine, User],
    }),
    VmsModule,
    AuthModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
