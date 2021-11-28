import { CreateTermDto } from '../models/term/dto/create-term.dto';
import { CreateVocabularyListDto } from '../vocabulary-list/dto/create-vocabulary-list.dto';

/**
 * TODO [refactor] Remove this in favor of
 * ```js
 * PartialDTO<Entity>
 * ```
 */
export type AllCreateEntityDtosUnion = CreateTermDto | CreateVocabularyListDto;
