import { Entity } from '../../domain/models/entity';
import { PartialDTO } from '../../types/partial-dto';

export type DomainModelCtor<TEntity extends Entity> = new (
  dto: PartialDTO<TEntity>
) => TEntity;
