import { PartialDTO } from '../../types/partial-dto';
import { Term } from '../models/term/entities/term.entity';
import { VocabularyList } from '../models/vocabulary-list/entities/vocabulary-list.entity';

/**
 * TODO [refactor] Remove this in favor of
 * ```js
 * PartialDTO<Entity>
 * ```
 */

export type AllEntites = Term | VocabularyList;
export type AllCreateEntityDtosUnion = PartialDTO<AllEntites>;
