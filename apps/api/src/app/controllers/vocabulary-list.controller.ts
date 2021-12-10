import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { Term } from '../../domain/models/term/entities/term.entity';
import { TermService } from '../../domain/services/term.service';
import { VocabularyListService } from '../../domain/services/vocabulary-list.service';
import { isNotFound, notFound } from '../../lib/types/not-found';
import { PartialDTO } from '../../types/partial-dto';
import { VocabularyListViewModel } from '../../view-models/vocabulary-list-view-model';

@Controller('vocabulary-lists')
export class VocabularyListController {
  constructor(
    private readonly vocabularyListService: VocabularyListService,
    private readonly termService: TermService
  ) {}

  @Post()
  create(@Body() createTermDto: PartialDTO<Term>) {
    return this.vocabularyListService.create(createTermDto);
  }

  @Post('many')
  createMany(@Body() createTermDtos: PartialDTO<Term>[]) {
    return this.vocabularyListService.createMany(createTermDtos);
  }

  @Get()
  findAll() {
    return Promise.all([
      this.vocabularyListService.findAll(),
      this.termService.findAll(),
    ]).then(([allVocabularyLists, allTerms]) =>
      allVocabularyLists.map(
        (vocabularyList) =>
          new VocabularyListViewModel(vocabularyList, allTerms)
      )
    );
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return Promise.all([
      this.vocabularyListService.findOne(id),
      this.termService.findAll(),
    ]).then(([vocabularyList, allTerms]) => {
      if (isNotFound(vocabularyList)) return notFound;

      return new VocabularyListViewModel(vocabularyList, allTerms);
    });
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateTermDto: PartialDTO<Term>) {
    return this.vocabularyListService.update(id, updateTermDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.vocabularyListService.remove(id);
  }
}
