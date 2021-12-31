import { Tag } from 'apps/api/src/domain/models/tag/tag.entity';
import { EntityId } from 'apps/api/src/domain/models/types/entity-id';

export class TagViewModel {
  readonly id: EntityId;

  readonly text: string;

  constructor({ id, text }: Tag) {
    this.id = id;

    this.text = text;
  }
}
