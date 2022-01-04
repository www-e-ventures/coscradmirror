import { PartialDTO } from 'apps/api/src/types/partial-dto';
import { EntityType } from '../types/entityType';
import { isNullOrUndefined } from '../utilities/validation/is-null-or-undefined';
import { EntityId } from './types/entity-id';
import { EntityCompositeIdentifier } from './types/entityCompositeIdentifier';

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

export abstract class Entity {
  readonly id: EntityId;

  abstract readonly type: EntityType;

  readonly published: boolean;

  constructor(dto: unknown) {
    // TODO Validate DTO
    if (!this.#validateDTO(dto))
      throw new Error(`Invalid dto for an entity: ${JSON.stringify(dto)}`);

    this.id = dto.id;

    this.published = typeof dto.published === 'boolean' ? dto.published : false;
  }

  getCompositeIdentifier = (): EntityCompositeIdentifier => ({
    type: this.type,
    id: this.id,
  });

  /**
   * TODO consider moving this to a `Serializable` mixin. There may be cases
   * where we want this behaviour on a non domain-model class without the
   * inheritance baggage.
   *  */
  toDTO<TEntity extends Entity>(this: TEntity): PartialDTO<TEntity> {
    return JSON.parse(JSON.stringify(this));
  }

  /**
   * TODO develop a general pattern \ directory structure for validation \ validators.
   * One idea: Return a symbol Valid | Errors[] from a validator instead of a
   * boolean flag.
   *
   * We may break the validators out into separate files. Then we will validate
   * a DTO before passing it to the constructor in our `instance factory` methods
   * in the mapping layer for the repositories.
   *  */
  #validateDTO = (dto: unknown): dto is PartialDTO<Entity> => {
    const { id } = dto as PartialDTO<Entity>;

    // A new entity will have id auto assigned by db
    if (!isNullOrUndefined(id) && !isValidEntityId(id)) return false;

    return true;
  };
}
