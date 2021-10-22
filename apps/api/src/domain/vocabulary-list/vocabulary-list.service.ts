import { Injectable } from '@nestjs/common';
import { CreateVocabularyListDto } from './dto/create-vocabulary-list.dto';
import { UpdateVocabularyListDto } from './dto/update-vocabulary-list.dto';

@Injectable()
export class VocabularyListService {
  create(createVocabularyListDto: CreateVocabularyListDto) {
    return 'This action adds a new vocabularyList';
  }

  findAll() {
    return `This action returns all vocabularyList`;
  }

  findOne(id: number) {
    return `This action returns a #${id} vocabularyList`;
  }

  update(id: number, updateVocabularyListDto: UpdateVocabularyListDto) {
    return `This action updates a #${id} vocabularyList`;
  }

  remove(id: number) {
    return `This action removes a #${id} vocabularyList`;
  }
}
