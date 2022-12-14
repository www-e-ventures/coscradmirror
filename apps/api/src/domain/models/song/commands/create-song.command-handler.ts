import { CommandHandler } from '@coscrad/commands';
import { Inject } from '@nestjs/common';
import { InternalError, isInternalError } from '../../../../lib/errors/InternalError';
import { ValidationResult } from '../../../../lib/errors/types/ValidationResult';
import { isNotAvailable } from '../../../../lib/types/not-available';
import { isNotFound } from '../../../../lib/types/not-found';
import { isOK } from '../../../../lib/types/ok';
import { RepositoryProvider } from '../../../../persistence/repositories/repository.provider';
import { DTO } from '../../../../types/DTO';
import { ResultOrError } from '../../../../types/ResultOrError';
import { Valid } from '../../../domainModelValidators/Valid';
import getInstanceFactoryForResource from '../../../factories/getInstanceFactoryForResource';
import { IIdManager } from '../../../interfaces/id-manager.interface';
import { IRepositoryForAggregate } from '../../../repositories/interfaces/repository-for-aggregate.interface';
import { AggregateId } from '../../../types/AggregateId';
import { InMemorySnapshot, ResourceType } from '../../../types/ResourceType';
import buildInMemorySnapshot from '../../../utilities/buildInMemorySnapshot';
import { BaseCommandHandler } from '../../shared/command-handlers/base-command-handler';
import { BaseEvent } from '../../shared/events/base-event.entity';
import { Song } from '../song.entity';
import { CreateSong } from './create-song.command';
import { SongCreated } from './song-created.event';

/**
 * TODO[https://www.pivotaltracker.com/story/show/182597512]
 * This should leverage the `BaseCreateCommandHandler`
 */
@CommandHandler(CreateSong)
export class CreateSongCommandHandler extends BaseCommandHandler<Song> {
    protected repositoryForCommandsTargetAggregate: IRepositoryForAggregate<Song>;

    constructor(
        protected readonly repositoryProvider: RepositoryProvider,
        @Inject('ID_MANAGER') protected readonly idManager: IIdManager
    ) {
        super(repositoryProvider, idManager);

        this.repositoryForCommandsTargetAggregate = this.repositoryProvider.forResource<Song>(
            ResourceType.song
        );
    }

    async createOrFetchWriteContext(command: CreateSong): Promise<ResultOrError<Song>> {
        const songDTO: DTO<Song> = {
            ...command,
            published: false,
            startMilliseconds: 0,
            type: ResourceType.song,
            eventHistory: [],
            lengthMilliseconds: 0,
        };

        // Attempt state mutation - Result or Error (Invariant violation in our case- could also be invalid state transition in other cases)
        return getInstanceFactoryForResource<Song>(ResourceType.song)(songDTO);
    }

    actOnInstance(song: Song): ResultOrError<Song> {
        return song;
    }

    async fetchRequiredExternalState(): Promise<InMemorySnapshot> {
        const searchResult = await this.repositoryProvider
            .forResource<Song>(ResourceType.song)
            .fetchMany();

        const allSongs = searchResult.filter((song): song is Song => {
            if (isInternalError(song)) {
                throw song;
            }

            return true;
        });

        return buildInMemorySnapshot({
            resources: { song: allSongs },
        });
    }

    validateExternalState(state: InMemorySnapshot, song: Song): ValidationResult {
        return song.validateExternalState(state);
    }

    /**
     * Where should we do this? It seems natural to do this as part of the
     * `create` call to the repository.
     */
    async validateAdditionalConstraints(command: CreateSong): Promise<ValidationResult> {
        const { id: newId } = command;

        // Validate that new ID was generated by our system and is available
        const idStatus = await this.idManager.status(newId);

        if (isNotFound(idStatus))
            return new InternalError(
                `The id: ${newId} has not been generated by our ID generation system.`
            );

        if (isNotAvailable(idStatus))
            return new InternalError(
                `The id: ${newId} is already in use by another resource in our system.`
            );

        if (!isOK(idStatus)) {
            // This is out of an abundance of caution. We shouldn't hit this.
            throw new InternalError(`Unrecognized status for id: ${String(idStatus)}`);
        }

        return Valid;
    }

    protected buildEvent(command: CreateSong, eventId: string, systemUserId: string): BaseEvent {
        return new SongCreated(command, eventId, systemUserId);
    }

    async persist(instance: Song, command: CreateSong, systemUserId: AggregateId): Promise<void> {
        // generate a unique ID for the event
        const eventId = await this.idManager.generate();

        await this.idManager.use(eventId);

        /**
         * This doesn't feel like the right place to do this. Consider tying
         * this in with the `create` method on the repositories.
         */
        await this.idManager.use(command.id);

        const instanceToPersistWithUpdatedEventHistory = instance.addEventToHistory(
            this.buildEvent(command, eventId, systemUserId)
        );

        // Persist the valid instance
        await this.repositoryProvider
            .forResource<Song>(ResourceType.song)
            .create(instanceToPersistWithUpdatedEventHistory);
    }
}
