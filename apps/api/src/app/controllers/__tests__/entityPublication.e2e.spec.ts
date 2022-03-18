import { INestApplication } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { Test } from '@nestjs/testing';
import getInstanceFactoryForEntity from 'apps/api/src/domain/factories/getInstanceFactoryForEntity';
import { Entity } from 'apps/api/src/domain/models/entity';
import { EntityType, entityTypes } from 'apps/api/src/domain/types/entityType';
import {
  InternalError,
  isInternalError,
} from 'apps/api/src/lib/errors/InternalError';
import { ArangoConnectionProvider } from 'apps/api/src/persistence/database/arango-connection.provider';
import TestRepositoryProvider from 'apps/api/src/persistence/repositories/TestRepositoryProvider';
import buildTestData from 'apps/api/src/test-data/buildTestData';
import * as request from 'supertest';
import { DatabaseProvider } from '../../../persistence/database/database.provider';
import { RepositoryProvider } from '../../../persistence/repositories/repository.provider';
import buildConfigFilePath from '../../config/buildConfigFilePath';
import { Environment } from '../../config/constants/Environment';
import removeAllCustomEntironmentVariables from '../../config/__tests__/utilities/removeAllCustomEnvironmentVariables';
import httpStatusCodes from '../../constants/httpStatusCodes';
import { EntityViewModelController } from '../entityViewModel.controller';

const originalEnv = process.env;

describe('GET /entities (fetch view models)- publication status filtering', () => {
  let app: INestApplication;

  let databaseProvider: DatabaseProvider;

  let testRepositoryProvider: TestRepositoryProvider;

  let configService: ConfigService;

  const testData = buildTestData();

  beforeAll(async () => {
    jest.resetModules();

    /**
     * HACK We have experienced annoying side-effect issues with the way the
     * built-in ConfigService reads our `.env` files. We have a separate
     * `${environment}.env` file for each unique environment. However,
     * `process.env` apparently takes priority over these locally defined files.
     * Forcing the local values to take precedence in the test environment has
     * been an exercise in frustration.
     *
     * https://github.com/nestjs/config/issues/168
     *
     * https://github.com/nestjs/config/issues/168
     */
    removeAllCustomEntironmentVariables();

    const moduleRef = await Test.createTestingModule({
      imports: [
        ConfigModule.forRoot({
          isGlobal: true,
          envFilePath: buildConfigFilePath(Environment.test),
          cache: false,
        }),
      ],
      controllers: [EntityViewModelController],
      providers: [
        DatabaseProvider,
        RepositoryProvider,
        ArangoConnectionProvider,
      ],
    }).compile();

    databaseProvider = moduleRef.get<DatabaseProvider>(DatabaseProvider);

    testRepositoryProvider = new TestRepositoryProvider(databaseProvider);

    configService = moduleRef.get<ConfigService>(ConfigService);

    app = moduleRef.createNestApplication();
    await app.init();
  });

  // These entities are always published
  const entityTypesToExclude: EntityType[] = [entityTypes.tag];

  Object.values(entityTypes)
    .filter((entityType) => !entityTypesToExclude.includes(entityType))
    .forEach((entityType) => {
      const instanceFactoryForEntity = getInstanceFactoryForEntity(entityType);
      describe(`When quering for entity of type ${entityType}`, () => {
        beforeEach(async () => {
          await testRepositoryProvider.testSetup();
        });
        describe('when an id is not provided', () => {
          describe(`when some of the entities are unpublished`, () => {
            /**
             * Note that there is no requirement that the test data have
             * `published = true`
             */
            const publishedEntitiesToAdd = testData[entityType]
              .map((instance: Entity) => ({
                ...instance.toDTO(),
                published: true,
              }))
              .map((dto) => instanceFactoryForEntity(dto))
              .filter((newInstance): newInstance is Entity => {
                if (isInternalError(newInstance)) {
                  throw new InternalError(
                    newInstance.innerErrors.reduce(
                      (accumulatedMessage: string, { message }) =>
                        accumulatedMessage + ` ${message}`,
                      ''
                    )
                  );
                }

                return !isInternalError(newInstance);
              });

            const unpublishedEntitiesToAdd = testData[entityType]
              .map((instance, index) => ({
                ...instance.toDTO(),
                id: `UNPUBLISHED-00${index + 1}`,
                published: false,
              }))
              .map((dto) => instanceFactoryForEntity(dto))
              // This shouldn't be needed, but typeCheck provides a logical guarantee
              .filter((newInstance): newInstance is Entity => {
                if (isInternalError(newInstance)) {
                  throw new InternalError(
                    newInstance.innerErrors.reduce(
                      (accumulatedMessage: string, { message }) =>
                        accumulatedMessage + ` ${message}`,
                      ''
                    )
                  );
                }

                return !isInternalError(newInstance);
              })
              // We want a different number of published \ unpublished terms
              .slice(0, -1);

            beforeEach(async () => {
              await testRepositoryProvider.addEntitiesOfSingleType(entityType, [
                ...unpublishedEntitiesToAdd,
                ...publishedEntitiesToAdd,
              ]);
            });

            it('should return the expected number of results', async () => {
              const res = await request(app.getHttpServer())
                .get('/entities')
                .query({
                  type: entityType,
                });

              expect(res.body.length).toBe(publishedEntitiesToAdd.length);

              // Assert that the logic is actually valid
              expect(publishedEntitiesToAdd.length).not.toEqual(
                unpublishedEntitiesToAdd.length
              );

              // TODO we could compare published view model IDs to published domain model IDs
            });
          });
        });

        describe(`?type=${entityType} when an id is provided`, () => {
          describe('when an entity with the id is unpublished', () => {
            const unpublishedId = 'unpublished-01';

            beforeEach(async () => {
              await testRepositoryProvider.addEntitiesOfManyTypes(testData);

              const unpublishedInstance = getInstanceFactoryForEntity(
                entityType
              )({
                ...testData[entityType][0].toDTO(),
                published: false,
                id: unpublishedId,
              });

              /**
               * In case we broke the invariants.
               *
               * TODO [https://www.pivotaltracker.com/story/show/181577567]
               * Add a `clone` method on `Entity` to avoid this complication.
               */
              if (isInternalError(unpublishedInstance)) {
                throw unpublishedInstance;
              }

              await testRepositoryProvider.addEntitiesOfSingleType(entityType, [
                unpublishedInstance,
              ]);
            });
            it('should return not found', async () => {
              const publishedAndUnpublishedInstancesFromRepo =
                await testRepositoryProvider
                  .forEntity(entityType)
                  .fetchMany()
                  .then((result) =>
                    result.filter(
                      (singleInstance): singleInstance is Entity =>
                        !isInternalError(singleInstance)
                    )
                  );

              /**
               * Given 404 is not a very specific symptom, let's be sure the
               * unpubished entity was in the db to start with
               */
              const isUnpublishedEntityIdInDB =
                publishedAndUnpublishedInstancesFromRepo.some(
                  ({ id }) => id === unpublishedId
                );

              expect(isUnpublishedEntityIdInDB).toBe(true);

              return request(app.getHttpServer())
                .get(`/entities`)
                .query({
                  type: entityType,
                  id: unpublishedId,
                })
                .expect(httpStatusCodes.notFound);
            });

            afterEach(async () => {
              await testRepositoryProvider.testTeardown();
            });
          });

          describe('when an entity with the id is published', () => {
            const publishedId = 'published-01';

            beforeEach(async () => {
              await testRepositoryProvider.addEntitiesOfManyTypes(testData);

              const publishedInstance = getInstanceFactoryForEntity(entityType)(
                {
                  ...testData[entityType][0].toDTO(),
                  published: true,
                  id: publishedId,
                }
              );

              /**
               * In case we broke the invariants.
               *
               * TODO [https://www.pivotaltracker.com/story/show/181577567]
               * Add a `clone` method on `Entity` to avoid this complication.
               */
              if (isInternalError(publishedInstance)) {
                throw publishedInstance;
              }

              await testRepositoryProvider.addEntitiesOfSingleType(entityType, [
                publishedInstance,
              ]);
            });
            it('should find a view model for the entity', async () => {
              const res = await request(app.getHttpServer())
                .get('/entities')
                .query({
                  type: entityType,
                  id: publishedId,
                });

              expect(res.status).toBe(httpStatusCodes.ok);

              const viewModel = res.body;

              expect((viewModel as any).id).toBe(publishedId);
            });

            afterEach(async () => {
              await testRepositoryProvider.testTeardown();
            });
          });
        });
      });
    });

  afterAll(async () => {
    await app.close();

    process.env = originalEnv;
  });
});