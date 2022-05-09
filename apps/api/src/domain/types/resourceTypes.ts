import { ValueType } from '../../lib/types/valueType';
import { BibliographicReference } from '../models/bibliographic-reference/bibliographic-reference.entity';
import { Book } from '../models/book/entities/book.entity';
import { EdgeConnection } from '../models/context/edge-connection.entity';
import { Photograph } from '../models/photograph/entities/photograph.entity';
import { ISpatialFeature } from '../models/spatial-feature/ISpatialFeature';
import { Tag } from '../models/tag/tag.entity';
import { Term } from '../models/term/entities/term.entity';
import { TranscribedAudio } from '../models/transcribed-audio/entities/transcribed-audio.entity';
import { VocabularyList } from '../models/vocabulary-list/entities/vocabulary-list.entity';

export const resourceTypes = {
    term: 'term',
    vocabularyList: 'vocabularyList',
    transcribedAudio: 'transcribedAudio',
    book: 'book',
    photograph: 'photograph',
    spatialFeature: 'spatialFeature',
    bibliographicReference: 'bibliographicReference',
} as const;

export type ResourceType = ValueType<typeof resourceTypes>;

export const isResourceType = (input: unknown): input is ResourceType =>
    Object.values(resourceTypes).includes(input as ResourceType);

// We should use this for type inference a few places.
export type ResourceTypeToInstance = {
    term: Term;
    vocabularyList: VocabularyList;
    transcribedAudio: TranscribedAudio;
    book: Book;
    photograph: Photograph;
    spatialFeature: ISpatialFeature;
    bibliographicReference: BibliographicReference;
};

/**
 * This represents the state of all domain models, excluding their `Connections`
 */
export type InMemorySnapshotOfResources = {
    [K in ResourceType]?: ResourceTypeToInstance[K][];
};

export type InMemorySnapshot = {
    resources: InMemorySnapshotOfResources;
    connections: EdgeConnection[];
    tags: Tag[];
};
