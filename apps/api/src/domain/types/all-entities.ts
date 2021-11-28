import { CreateTermDto } from '../models/term/dto/create-term.dto';
import { CreateVocabularyListDto } from '../vocabulary-list/dto/create-vocabulary-list.dto';

export type AllCreateEntityDtosUnion = CreateTermDto | CreateVocabularyListDto;
