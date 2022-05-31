import { noteType } from '../domain/models/categories/types/ResourceTypeOrNoteType';
import { Tag } from '../domain/models/tag/tag.entity';
import { ResourceType } from '../domain/types/ResourceType';
import { DTO } from '../types/DTO';

const allTagsDTOs: DTO<Tag>[] = [
    {
        id: '1',
        label: 'plants',
        members: [
            {
                type: ResourceType.term,
                id: '1',
            },
            {
                type: ResourceType.book,
                id: '23',
            },
            {
                type: ResourceType.book,
                id: '24',
            },
            {
                type: ResourceType.vocabularyList,
                id: '1',
            },
            {
                type: ResourceType.spatialFeature,
                id: '100',
            },
            {
                type: noteType,
                id: '2005',
            },
            {
                type: noteType,
                id: '9',
            },
            {
                type: noteType,
                id: '11',
            },
        ],
    },
    {
        id: '2',
        label: 'animals',
        members: [
            {
                type: ResourceType.term,
                id: '2',
            },
            {
                type: ResourceType.term,
                id: '3',
            },
            {
                type: ResourceType.spatialFeature,
                id: '102',
            },
            {
                type: noteType,
                id: '2004',
            },
            {
                type: noteType,
                id: '7',
            },
            {
                type: ResourceType.bibliographicReference,
                id: '1',
            },
        ],
    },
    {
        id: '3',
        label: 'placenames',
        members: [
            {
                type: ResourceType.photograph,
                id: '0',
            },
            {
                type: ResourceType.transcribedAudio,
                id: '110',
            },
            {
                type: noteType,
                id: '2003',
            },
            {
                type: noteType,
                id: '5',
            },
        ],
    },
    {
        id: '4',
        label: 'songs',
        members: [
            {
                type: ResourceType.photograph,
                id: '1',
            },
            {
                type: noteType,
                id: '2002',
            },
            {
                type: noteType,
                id: '3',
            },
        ],
    },
    {
        id: '5',
        label: 'legends',
        members: [
            {
                type: ResourceType.vocabularyList,
                id: '2',
            },
            {
                type: ResourceType.spatialFeature,
                id: '101',
            },
            {
                type: noteType,
                id: '2001',
            },
            {
                type: noteType,
                id: '1',
            },
        ],
    },
];

/**
 * **note** When adding new test data \ modifying existing test data, be sure to
 * run `validateTestData.spec.ts` to ensure your test data satisfies all domain
 * invariants.
 */
export default (): Tag[] => allTagsDTOs.map((dto) => new Tag(dto));
