import { PartialDTO } from 'apps/api/src/types/partial-dto';
import { EntityId } from './types/entity-id';

// TODO Extract to a separate location
const isValidStringWithLength = (input: unknown): input is string =>
  typeof input === 'string' && input.length > 0;

/**
 *
 * TODO move this near the corresponding type. Note that this extra layer is
 * meant to safe guard us in case we want stricter validation on an `entity id`.
 * Should we change the rule, we can update this in once place, instead of replacing
 * `isValidStringWithLength` everywhere.
 */
const isValidEntityId = (input: unknown): input is EntityId =>
  isValidStringWithLength(input);

export class Entity {
  readonly id: string;

  readonly published: boolean;

  constructor(dto: unknown) {
    // TODO Validate DTO
    if (!this.#validateDTO(dto))
      throw new Error(`Invalid dto for an entity: ${JSON.stringify(dto)}`);

    this.id = dto.id;

    this.published = typeof dto.published === 'boolean' ? dto.published : false;
  }

  /**
   * TODO develop a general pattern \ directory structure for validation \ validators.
   * One idea: Return a symbol Valid | Errors[] from a validator instead of a
   * boolean flag.
   *  */
  #validateDTO = (dto: unknown): dto is PartialDTO<Entity> => {
    const { id } = dto as PartialDTO<Entity>;

    if (!isValidEntityId(id)) return false;

    return true;
  };
}
