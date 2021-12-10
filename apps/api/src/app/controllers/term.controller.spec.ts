import { Test, TestingModule } from '@nestjs/testing';
import { TermService } from '../../domain/services/term.service';
import { buildMockRepositoryProvider } from '../../domain/services/term.service.spec';
import { RepositoryProvider } from '../../persistence/repositories/repository.provider';
import { TermController } from './term.controller';

/**
 * TODO We probably want a proper integration \ smoke 'contract' test with a
 * test case for each of our endpoints to verify things are working at a high-level.
 * E.g. verify that a valid request sends a 400.
 */
describe('TermController', () => {
  let controller: TermController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [TermController],
      providers: [
        TermService,
        {
          provide: RepositoryProvider,
          useFactory: buildMockRepositoryProvider,
        },
      ],
    }).compile();

    controller = module.get<TermController>(TermController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
