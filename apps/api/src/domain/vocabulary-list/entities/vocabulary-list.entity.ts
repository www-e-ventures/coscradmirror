import isStringWithNonzeroLength from 'apps/api/src/lib/utilities/isStringWithNonzeroLength';
import { PartialDTO } from 'apps/api/src/types/partial-dto';
import { Entity } from '../../models/entity';
import { determineAllMissingRequiredProperties } from '../../utilities/validation/determine-all-missing-required-properties';
import { VocabularyListVariable } from '../types/vocabulary-list-variable';
import { VocabularyListEntry } from '../vocabulary-list-entry';

export class VocabularyList extends Entity {
  readonly name?: string;

  readonly nameEnglish?: string;

  readonly entries: VocabularyListEntry[];

  readonly variables: VocabularyListVariable[];

  #validate(dto: unknown): dto is PartialDTO<VocabularyList> {
    const missingProperties = determineAllMissingRequiredProperties<
      PartialDTO<VocabularyList>
    >(
      // TODO remove cast
      dto as PartialDTO<VocabularyList>,
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

      // TODO return these errors
      throw new Error(message);
    }

    const { name, nameEnglish, entries } = dto as PartialDTO<VocabularyList>;

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
