import { Module } from '@nestjs/common';
import { SshApiService } from './ssh-api.service';

@Module({
  providers: [SshApiService],
  exports: [SshApiService],
})
export class SshApiModule {}
