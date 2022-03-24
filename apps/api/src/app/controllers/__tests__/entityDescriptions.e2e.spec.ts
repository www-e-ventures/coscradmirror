import { INestApplication } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { Test } from '@nestjs/testing';
import { PersistenceModule } from 'apps/api/src/persistence/persistence.module';
import { buildAllEntityDescriptions } from 'apps/api/src/view-models/entityDescriptions/buildAllEntityDescriptions';
import * as request from 'supertest';
import buildConfigFilePath from '../../config/buildConfigFilePath';
import { Environment } from '../../config/constants/Environment';
import removeAllCustomEnvironmentVariables from '../../config/__tests__/utilities/removeAllCustomEnvironmentVariables';
import { EntityViewModelController } from '../entityViewModel.controller';
describe('GET /entities/descriptions', () => {
    let app: INestApplication;

    beforeAll(async () => {
        removeAllCustomEnvironmentVariables();

        const moduleRef = await Test.createTestingModule({
            imports: [
                ConfigModule.forRoot({
                    isGlobal: true,
                    envFilePath: buildConfigFilePath(Environment.test),
                    cache: false,
                }),
                PersistenceModule.forRootAsync(),
            ],
            controllers: [EntityViewModelController],
        }).compile();

        app = moduleRef.createNestApplication();
        await app.init();
    });

    it('should get the entity descriptions', () => {
        return request(app.getHttpServer())
            .get('/entities/descriptions')
            .expect(200)
            .expect(buildAllEntityDescriptions());
    });

    afterAll(async () => {
        await app.close();
    });
});
