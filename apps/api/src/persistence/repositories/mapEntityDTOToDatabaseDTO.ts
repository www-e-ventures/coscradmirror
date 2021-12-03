import { Entity } from '../../domain/models/entity';
import { isEntityId } from '../../domain/types/entity-id';
import { PartialDTO } from '../../types/partial-dto';

export type DatabaseDTO<
  TEntityDTO extends PartialDTO<Entity> = PartialDTO<Entity>
> = Omit<TEntityDTO, 'id'> & {
  _key: string;
};

export default <TEntity extends Entity>(
  entityDTO: PartialDTO<TEntity>
): DatabaseDTO<PartialDTO<TEntity>> =>
  Object.entries(entityDTO).reduce(
    (
      accumulatedMappedObject: DatabaseDTO<PartialDTO<TEntity>>,
      [key, value]
    ) => {
      if (key === 'id') {
        // Note invalid ids will be omitted from the output
        if (isEntityId(value))
          accumulatedMappedObject['_key'] = value as string;
      } else {
        accumulatedMappedObject[key] = value;
      }

      return accumulatedMappedObject as unknown as DatabaseDTO<
        PartialDTO<TEntity>
      >;
    },
    {} as DatabaseDTO<PartialDTO<TEntity>>
  );
