import { Test, TestingModule } from '@nestjs/testing';
import { DatabaseProvider } from 'apps/api/src/database/database.provider';
import { TermController } from './term.controller';
import { TermService } from './term.service';
import { buildMockDatabaseProvicer } from './term.service.spec';

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
