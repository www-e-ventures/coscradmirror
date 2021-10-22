import { PartialType } from '@nestjs/mapped-types';
import { CreateVocabularyListDto } from './create-vocabulary-list.dto';

export class UpdateVocabularyListDto extends PartialType(CreateVocabularyListDto) {}
