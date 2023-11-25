import { Module } from '@nestjs/common';
import { FakeApiService } from './fake-api.service';

@Module({
  providers: [FakeApiService]
})
export class FakeApiModule {}
