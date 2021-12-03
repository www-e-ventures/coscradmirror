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
import { VocabularyListService } from '../../domain/services/vocabulary-list.service';
import { PartialDTO } from '../../types/partial-dto';

@Controller('vocabulary-lists')
export class VocabularyListController {
  constructor(private readonly vocabularyListService: VocabularyListService) {}

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
    return this.vocabularyListService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.vocabularyListService.findOne(id);
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
