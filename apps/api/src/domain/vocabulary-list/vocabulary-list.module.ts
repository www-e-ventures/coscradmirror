import { Module } from '@nestjs/common';
import { VocabularyListService } from './vocabulary-list.service';
import { VocabularyListController } from './vocabulary-list.controller';

@Module({
  controllers: [VocabularyListController],
  providers: [VocabularyListService]
})
export class VocabularyListModule {}
