import { PartialDTO } from 'apps/api/src/types/partial-dto';
import { EntityId } from '../../../types/entity-id';
import { EntityType, entityTypes } from '../../../types/entityType';
import { determineAllMissingRequiredProperties } from '../../../utilities/validation/determine-all-missing-required-properties';
import { isNullOrUndefined } from '../../../utilities/validation/is-null-or-undefined';
import { Entity } from '../../entity';

export class Term extends Entity {
  readonly type: EntityType = entityTypes.term;

  readonly term: string;

  readonly termEnglish?: string;

  readonly contributorId: EntityId;

  // TODO Create separate media item model
  readonly audioFilename?: string;

  constructor(dto: unknown) {
    super(dto);

    if (!this.#validate(dto))
      throw new Error(`invalid Create Term Dto: ${dto}`);

    /**
     * TODO [design]: We should abstract this pattern of having text in multiple
     * languages. Options:
     * 1. interface `hasBilingualText`
     * ```js
     * {
     * text: string;
     * textInTranslationLanguage: string;
     * }
     * ```
     * 2. Have a separate layer that fetches translations. This approach would
     * allow us to express the direction of the relationship. Did we start with
     * an English gloss and ilicit the form in the indigenous language? Did we
     * start with the indignous term and elicit a translation or gloss?
     *
     * Related models that will use this concept:
     * Any entity that has (the potential for) a bilingual name
     * Texts, including transcripts for audio \ video
     */
    this.term = dto.term;

    this.termEnglish = dto.termEnglish;

    this.contributorId = dto.contributorId;

    this.audioFilename = dto.audioFilename;
  }

  /**
   * TODO [design]: we need a system for accumulating \ returning errors.
   * For now we will throw.
   */
  #validate(dto: unknown): dto is PartialDTO<Term> {
    if (isNullOrUndefined(dto)) {
      const message = 'A Create Term DTO is required to build a Term';

      throw new Error(message);
    }

    const missingProperties = determineAllMissingRequiredProperties<
      PartialDTO<Term>
    >(
      // TODO remove cast
      dto as PartialDTO<Term>,
      ['id', 'term', 'contributorId']
    );

    if (missingProperties.length) {
      const message = missingProperties.reduce(
        (accumulatedErrorMessage: string, nextMissingKey) =>
          accumulatedErrorMessage.concat(nextMissingKey + ','),
        'Missing the following required properties: '
      );

      throw new Error(message);
    }

    // TODO validate property types! !

    // If we've made it this far, this is a valid dto
    return true;
  }
}
