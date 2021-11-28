import { Test, TestingModule } from '@nestjs/testing';
import { TermService } from '../../domain/services/term.service';
import { buildMockDatabaseProvicer } from '../../domain/services/term.service.spec';
import { DatabaseProvider } from '../../persistence/database/database.provider';
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
          provide: DatabaseProvider,
          useFactory: buildMockDatabaseProvicer,
        },
      ],
    }).compile();

    controller = module.get<TermController>(TermController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
