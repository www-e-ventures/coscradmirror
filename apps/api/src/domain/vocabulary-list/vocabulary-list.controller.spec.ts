import { Test, TestingModule } from '@nestjs/testing';
import { VocabularyListController } from './vocabulary-list.controller';
import { VocabularyListService } from './vocabulary-list.service';

describe('VocabularyListController', () => {
  let controller: VocabularyListController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [VocabularyListController],
      providers: [VocabularyListService],
    }).compile();

    controller = module.get<VocabularyListController>(VocabularyListController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
