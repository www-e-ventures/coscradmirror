import { CreateTermDto } from '../term/term/dto/create-term.dto';
import { CreateVocabularyListDto } from '../vocabulary-list/dto/create-vocabulary-list.dto';

export type AllCreateEntityDtosUnion = CreateTermDto | CreateVocabularyListDto;
