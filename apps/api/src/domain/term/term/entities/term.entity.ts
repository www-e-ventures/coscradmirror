import { determineAllMissingRequiredProperties } from '../../../utilities/validation/determine-all-missing-required-properties';
import { isNullOrUndefined } from '../../../utilities/validation/is-null-or-undefined';
import { CreateTermDto } from '../dto/create-term.dto';

export class Term {
  //  readonly #dto: CreateTermDto;

  readonly id: string;

  readonly term: string;

  readonly termEnglish?: string;

  readonly contributor: string;

  readonly audioURL?: string;

  readonly audioFormat?: string;

  constructor(dto: unknown) {
    if (!this.#validate(dto))
      throw new Error(`invalid Create Term Dto: ${dto}`);

    this.id = dto.id;

    this.term = dto.term;

    this.termEnglish = dto.termEnglish;

    this.contributor = dto.contributor;

    this.audioURL = dto.audioURL;

    this.audioFormat = dto.audioFormat;
  }

  /**
   * TODO [design]: we need a system for accumulating \ returning errors.
   * For now we will throw.
   *
   * TODO [refactor]: Should we move this logic to the `CreateTermDto` class?
   */
  #validate(dto: unknown): dto is CreateTermDto {
    if (isNullOrUndefined(dto)) {
      const message = 'A Create Term DTO is required to build a Term';

      throw new Error(message);
    }

    const { id, term, termEnglish, contributor, audioFormat, audioURL } =
      dto as CreateTermDto;

    const missingProperties =
      determineAllMissingRequiredProperties<CreateTermDto>(
        // TODO remove cast
        dto as CreateTermDto,
        ['id', 'term', 'contributor']
      );

    if (missingProperties.length) {
      const message = missingProperties.reduce(
        (accumulatedErrorMessage: string, nextMissingKey) =>
          accumulatedErrorMessage.concat(nextMissingKey + ','),
        'Missing the following required properties: '
      );

      throw new Error(message);
    }

    // TODO validate property types!

    // If we've made it this far, this is a valid dto
    return true;
  }
}
