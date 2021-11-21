import isStringWithNonzeroLength from 'apps/api/src/lib/utilities/isStringWithNonzeroLength';
import { EntityId } from '../../types/entity-id';
import { determineAllMissingRequiredProperties } from '../../utilities/validation/determine-all-missing-required-properties';
import { CreateVocabularyListDto } from '../dto/create-vocabulary-list.dto';
import { VocabularyListVariable } from '../types/vocabulary-list-variable';
import { VocabularyListEntry } from '../vocabulary-list-entry';

export class VocabularyList {
  readonly name?: string;

  readonly nameEnglish?: string;

  readonly id: EntityId;

  readonly entries: VocabularyListEntry[];

  readonly variables: VocabularyListVariable[];

  #validate(dto: unknown): dto is CreateVocabularyListDto {
    const missingProperties =
      determineAllMissingRequiredProperties<CreateVocabularyListDto>(
        // TODO remove cast
        dto as CreateVocabularyListDto,
        ['id', 'entries', 'variables']
      );

    if (missingProperties.length) {
      const message = missingProperties
        .reduce(
          (accumulatedErrorMessage: string, nextMissingKey) =>
            accumulatedErrorMessage.concat(nextMissingKey + ','),
          'Missing the following required properties: '
        )
        // remove trailing comma
        .slice(0, -1);

      throw new Error(message);
    }

    const { name, nameEnglish, entries } = dto as CreateVocabularyListDto;

    if (
      !isStringWithNonzeroLength(name) &&
      !isStringWithNonzeroLength(nameEnglish)
    )
      throw new Error(
        'A vocabulary list must have a name in at least one language'
      );

    if (!Array.isArray(entries))
      throw new Error(
        `Invalid format for vocabulary list entries: ${typeof entries}`
      );

    if (entries.length === 0)
      throw new Error('A vocabulary list must have at least one entry');

    // TODO validate types
    return true;
  }
}
