import { Test, TestingModule } from '@nestjs/testing';
import { VocabularyListService } from '../../domain/services/vocabulary-list.service';
import { RepositoryProvider } from '../../persistence/repositories/repository.provider';
import { buildMockRepositoryProvider } from './term.service.spec';

describe('VocabularyListService', () => {
  let service: VocabularyListService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        VocabularyListService,
        {
          provide: RepositoryProvider,
          useFactory: buildMockRepositoryProvider,
        },
      ],
    }).compile();

    service = module.get<VocabularyListService>(VocabularyListService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
