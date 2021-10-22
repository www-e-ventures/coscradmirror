import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { VocabularyListService } from './vocabulary-list.service';
import { CreateVocabularyListDto } from './dto/create-vocabulary-list.dto';
import { UpdateVocabularyListDto } from './dto/update-vocabulary-list.dto';

@Controller('vocabulary-list')
export class VocabularyListController {
  constructor(private readonly vocabularyListService: VocabularyListService) {}

  @Post()
  create(@Body() createVocabularyListDto: CreateVocabularyListDto) {
    return this.vocabularyListService.create(createVocabularyListDto);
  }

  @Get()
  findAll() {
    return this.vocabularyListService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.vocabularyListService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateVocabularyListDto: UpdateVocabularyListDto) {
    return this.vocabularyListService.update(+id, updateVocabularyListDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.vocabularyListService.remove(+id);
  }
}
