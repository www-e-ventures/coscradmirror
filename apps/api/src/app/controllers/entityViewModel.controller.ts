import { Controller, Get, Query, Res } from '@nestjs/common';
import { isError } from 'util';
import { Entity } from '../../domain/models/entity';
import { EntityId } from '../../domain/models/types/entity-id';
import { isEntityId } from '../../domain/types/entity-id';
import { isEntityType } from '../../domain/types/entityType';
import { Maybe } from '../../lib/types/maybe';
import { isNotFound, NotFound } from '../../lib/types/not-found';
import { RepositoryProvider } from '../../persistence/repositories/repository.provider';
import buildViewModelForEntity from '../../view-models/buildViewModelForEntity/buildViewModelForEntity';
import { buildAllEntityDescriptions } from '../../view-models/entityDescriptions/buildAllEntityDescriptions';
import httpStatusCodes from '../constants/httpStatusCodes';

type HasEntityId = {
  id: EntityId;
};

const NotProvided = Symbol('Client did not provide this param');

const wasNotProvided = (input: unknown): input is typeof NotProvided =>
  input === NotProvided;

const findEntityById = <TEntity extends HasEntityId = Entity>(
  idToFind: EntityId,
  allEntities: TEntity[]
): Maybe<TEntity> => {
  const searchResult =
    allEntities.find(({ id }) => id === idToFind) || NotFound;

  return searchResult;
};

@Controller('entities')
export class EntityViewModelController {
  constructor(private readonly repositoryProvider: RepositoryProvider) {}

  @Get()
  async fetchMany(
    @Res() res,
    @Query('type') type: string,
    @Query('id') id: unknown = NotProvided
  ) {
    // TODO [refactor] move this in to a param validation layer
    if (!isEntityType(type)) {
      // TODO add error message
      return res.sendStatus(400);
    }

    // TODO avoid double-negative
    if (!wasNotProvided(id) && !isEntityId(id)) {
      // TODO add error message
      return res.sendStatus(400);
    }

    const allEntities = await buildViewModelForEntity(type, {
      repositoryProvider: this.repositoryProvider,
    });

    if (isError(allEntities))
      return res.status(httpStatusCodes.internalError).send({
        error: JSON.stringify(allEntities),
      });

    const result = !wasNotProvided(id)
      ? // TODO remove cast
        findEntityById(id, allEntities as unknown as Entity[])
      : allEntities;

    if (isNotFound(result)) return res.sendStatus(httpStatusCodes.notFound);

    res.status(httpStatusCodes.ok).send(result);
  }

  @Get('descriptions')
  getAllEntityDescriptions() {
    return buildAllEntityDescriptions();
  }
}
