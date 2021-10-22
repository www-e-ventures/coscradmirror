import { Test, TestingModule } from '@nestjs/testing';
import { VocabularyListService } from './vocabulary-list.service';

describe('VocabularyListService', () => {
  let service: VocabularyListService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [VocabularyListService],
    }).compile();

    service = module.get<VocabularyListService>(VocabularyListService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
