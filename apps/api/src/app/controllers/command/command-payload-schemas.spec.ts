import { getCoscradDataSchema } from '@coscrad/data-types';
import { CreateSong } from '../../../domain/models/song/commands/create-song.command';

/**
 *
 * This is a placeholder. Currently we need to manually register each new
 * command here, but eventually we will have a service that will do this. We should
 * call that service as part of the setup for this test when that time comes.
 * That will make this test completely dynamic.
 */
const getAllCommandSchemas = () =>
    [['CREATE_SONG', CreateSong]].map(([commandType, Ctor]) => [
        commandType,
        getCoscradDataSchema(Ctor),
    ]);

describe('command payload schemas', () => {
    getAllCommandSchemas().forEach(([commandType, schema]) => {
        describe(`The schema for command ${commandType}`, () => {
            it('should have the expected value', () => {
                expect(schema).toMatchSnapshot();
            });
        });
    });
});