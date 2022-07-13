import { Injectable } from '@nestjs/common';
import edgeConnectionFactory from '../../domain/factories/edgeConnectionFactory';
import getInstanceFactoryForEntity from '../../domain/factories/getInstanceFactoryForResource';
import buildInstanceFactory from '../../domain/factories/utilities/buildInstanceFactory';
import { EdgeConnection } from '../../domain/models/context/edge-connection.entity';
import { Resource } from '../../domain/models/resource.entity';
import { Tag } from '../../domain/models/tag/tag.entity';
import { CoscradUserGroup } from '../../domain/models/user-management/group/entities/coscrad-user-group.entity';
import { CoscradUser } from '../../domain/models/user-management/user/entities/user/coscrad-user.entity';
import { ICategoryRepository } from '../../domain/repositories/interfaces/category-repository.interface';
import { IRepositoryForAggregate } from '../../domain/repositories/interfaces/repository-for-aggregate.interface';
import { IRepositoryProvider } from '../../domain/repositories/interfaces/repository-provider.interface';
import { AggregateId } from '../../domain/types/AggregateId';
import { ResourceType } from '../../domain/types/ResourceType';
import { IIdRepository } from '../../lib/id-generation/interfaces/id-repository.interface';
import { ArangoCollectionId } from '../database/collection-references/ArangoCollectionId';
import { getArangoCollectionIDFromResourceType } from '../database/collection-references/getArangoCollectionIDFromResourceType';
import { DatabaseProvider } from '../database/database.provider';
import mapArangoEdgeDocumentToEdgeConnectionDTO from '../database/utilities/mapArangoEdgeDocumentToEdgeConnectionDTO';
import mapDatabaseDTOToEntityDTO from '../database/utilities/mapDatabaseDocumentToAggregateDTO';
import mapEdgeConnectionDTOToArangoEdgeDocument from '../database/utilities/mapEdgeConnectionDTOToArangoEdgeDocument';
import mapEntityDTOToDatabaseDTO from '../database/utilities/mapEntityDTOToDatabaseDTO';
import { ArangoIdRepository } from './arango-id-repository';
import { ArangoRepositoryForAggregate } from './arango-repository-for-aggregate';
import ArangoCategoryRepository from './ArangoCategoryRepository';

@Injectable()
export class RepositoryProvider implements IRepositoryProvider {
    constructor(protected databaseProvider: DatabaseProvider) {}

    getEdgeConnectionRepository() {
        return new ArangoRepositoryForAggregate<EdgeConnection>(
            this.databaseProvider,
            ArangoCollectionId.edgeConnectionCollectionID,
            edgeConnectionFactory,
            mapArangoEdgeDocumentToEdgeConnectionDTO,
            mapEdgeConnectionDTOToArangoEdgeDocument
        );
    }

    getTagRepository() {
        return new ArangoRepositoryForAggregate<Tag>(
            this.databaseProvider,
            ArangoCollectionId.tags,
            buildInstanceFactory(Tag),
            mapDatabaseDTOToEntityDTO,
            mapEntityDTOToDatabaseDTO
        );
    }

    getCategoryRepository(): ICategoryRepository {
        return new ArangoCategoryRepository(this.databaseProvider);
    }

    getIdRepository(): IIdRepository<AggregateId> {
        return new ArangoIdRepository(this.databaseProvider);
    }

    getUserRepository(): IRepositoryForAggregate<CoscradUser> {
        return new ArangoRepositoryForAggregate<CoscradUser>(
            this.databaseProvider,
            ArangoCollectionId.users,
            buildInstanceFactory(CoscradUser),
            mapDatabaseDTOToEntityDTO,
            mapEntityDTOToDatabaseDTO
        );
    }

    getUserGroupRepository(): IRepositoryForAggregate<CoscradUserGroup> {
        return new ArangoRepositoryForAggregate<CoscradUserGroup>(
            this.databaseProvider,
            ArangoCollectionId.groups,
            buildInstanceFactory(CoscradUserGroup),
            mapDatabaseDTOToEntityDTO,
            mapEntityDTOToDatabaseDTO
        );
    }

    forResource<TResource extends Resource>(resourceType: ResourceType) {
        return new ArangoRepositoryForAggregate<TResource>(
            this.databaseProvider,
            getArangoCollectionIDFromResourceType(resourceType),
            getInstanceFactoryForEntity(resourceType),
            mapDatabaseDTOToEntityDTO,
            mapEntityDTOToDatabaseDTO
        );
    }
}
