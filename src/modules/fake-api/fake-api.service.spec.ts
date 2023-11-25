import { Test, TestingModule } from '@nestjs/testing';
import { FakeApiService } from './fake-api.service';

describe('FakeApiService', () => {
  let service: FakeApiService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [FakeApiService],
    }).compile();

    service = module.get<FakeApiService>(FakeApiService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
