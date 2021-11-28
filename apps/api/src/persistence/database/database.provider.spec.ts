import { ConfigService } from '@nestjs/config';
import { Test } from '@nestjs/testing';
import { DatabaseProvider } from './database.provider';

describe('AppController', () => {
  let databaseProvider: DatabaseProvider;
  let configService: ConfigService;

  let db;

  beforeAll(async () => {
    const moduleRef = await Test.createTestingModule({
      providers: [ConfigService],
    }).compile();

    configService = moduleRef.get<ConfigService>(ConfigService);
    if (!configService) throw new Error('Config service not injected.');
    databaseProvider = new DatabaseProvider(configService);

    db = databaseProvider.getConnection();
  });

  describe('getConnection', () => {
    let result;

    beforeAll(async () => {
      result = await db.route('_api').get('version');
      console.log(result.body.version);

      //   await db
      //     .query(
      //       aql`
      //               FOR t in TestCollection
      //                 RETURN {
      //                   type: t.type,
      //                   value: t.value
      //                 }
      //             `
      //     )
      //     .then((cursor) =>
      //       cursor.reduce(
      //         (accumulatedResults, nextValue) =>
      //           accumulatedResults.concat([nextValue]),
      //         []
      //       )
      //     );
      // });

      // const expectedResult = [
      //   { type: 'circle', value: 2 },
      //   { type: 'square', value: 3 },
      //   { type: 'rectangle', value: 5 },
      // ];
    });

    it('querying the db version should return a result', () => {
      expect(result).toBeTruthy();
    });
  });
});
