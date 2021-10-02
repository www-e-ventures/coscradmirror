import { ConfigService } from '@nestjs/config';
import { Test } from '@nestjs/testing';
import { aql } from 'arangojs';
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
    console.log({ configService });

    db = databaseProvider.getConnection();
  });

  describe('getConnection', () => {
    let queryResult;

    beforeAll(async () => {
      queryResult = await db
        .query(
          aql`
                  FOR t in TestCollection
                    RETURN {
                      type: t.type,
                      value: t.value
                    }
                `
        )
        .then((cursor) =>
          cursor.reduce(
            (accumulatedResults, nextValue) =>
              accumulatedResults.concat([nextValue]),
            []
          )
        );
    });

    const expectedResult = [
      { type: 'test', value: 5 },
      { type: 'test', value: 2 },
      { type: 'test', value: 15 },
    ];

    it('should return a truthy value', () => {
      expect(queryResult).toEqual(expectedResult);
    });

    // describe('the returned database instance', () => {
    //   const expectedResult = '';

    //   it('should return the expected query result on test collection', () => {
    //     db.query(
    //       aql`
    //           FOR t in testcollection
    //             RETURN t
    //         `
    //     ).then((queryResult) => expect(queryResult).toEqual(expectedResult));
    //   });
    // });
  });
});
