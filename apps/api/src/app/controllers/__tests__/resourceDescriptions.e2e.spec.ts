import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { ArangoConnectionProvider } from '../../../persistence/database/arango-connection.provider';
import generateRandomTestDatabaseName from '../../../persistence/repositories/__tests__/generateRandomTestDatabaseName';
import { buildAllResourceDescriptions } from '../../../view-models/resourceDescriptions/buildAllResourceDescriptions';
import createTestModule from './createTestModule';
describe('GET /entities/descriptions', () => {
    const testDatabaseName = generateRandomTestDatabaseName();

    let app: INestApplication;

    let arangoConnectionProvider: ArangoConnectionProvider;

    beforeAll(async () => {
        const moduleRef = await createTestModule(testDatabaseName);

        arangoConnectionProvider =
            moduleRef.get<ArangoConnectionProvider>(ArangoConnectionProvider);

        app = moduleRef.createNestApplication();

        await app.init();
    });

    it('should get the entity descriptions', () => {
        return request(app.getHttpServer())
            .get('/resources')
            .expect(200)
            .expect(buildAllResourceDescriptions());
    });

    afterAll(async () => {
        await app.close();

        await arangoConnectionProvider.dropDatabaseIfExists();
    });
});
