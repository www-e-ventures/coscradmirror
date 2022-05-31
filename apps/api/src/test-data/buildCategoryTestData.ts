import { Category } from '../domain/models/categories/entities/category.entity';
import { noteType } from '../domain/models/categories/types/ResourceTypeOrNoteType';
import { ResourceType } from '../domain/types/ResourceType';

export default (): Category[] =>
    [
        {
            id: '0',
            label: 'tree of knowledge',
            members: [],
            childrenIDs: ['1', '12'],
        },
        {
            id: '1',
            label: 'animals',
            members: [
                {
                    type: ResourceType.vocabularyList,
                    id: '1',
                },
            ],
            childrenIDs: ['2', '3'],
        },
        {
            id: '2',
            label: 'mammals',
            members: [
                {
                    type: ResourceType.term,
                    id: '1',
                },
                {
                    type: ResourceType.book,
                    id: '23',
                },
            ],
            childrenIDs: ['4', '5', '11'],
        },
        {
            id: '3',
            label: 'birds',
            members: [],
            childrenIDs: [],
        },
        {
            id: '4',
            label: 'canines',
            members: [
                {
                    type: ResourceType.term,
                    id: '2',
                },
            ],
            childrenIDs: ['8', '10'],
        },
        {
            id: '5',
            label: 'felines',
            members: [],
            childrenIDs: ['6', '7'],
        },
        {
            id: '6',
            label: 'big cats',
            members: [],
            childrenIDs: [],
        },
        {
            id: '7',
            label: 'domestic cats',
            members: [
                {
                    type: ResourceType.vocabularyList,
                    id: '2',
                },
                {
                    type: ResourceType.photograph,
                    id: '0',
                },
            ],
            childrenIDs: [],
        },
        {
            id: '8',
            label: 'wolves',
            members: [
                {
                    type: ResourceType.spatialFeature,
                    id: '101',
                },
            ],
            childrenIDs: [],
        },
        {
            id: '9',
            label: 'songs',
            members: [
                {
                    type: ResourceType.term,
                    id: '3',
                },
                {
                    type: ResourceType.spatialFeature,
                    id: '102',
                },
                {
                    type: ResourceType.bibliographicReference,
                    id: '1',
                },
            ],
            childrenIDs: [],
        },
        {
            id: '10',
            label: 'domestic dogs',
            members: [
                {
                    type: ResourceType.photograph,
                    id: '1',
                },
            ],
            childrenIDs: [],
        },
        {
            id: '11',
            label: 'rodents',
            members: [
                {
                    type: ResourceType.book,
                    id: '24',
                },
            ],
            childrenIDs: [],
        },
        {
            id: '12',
            label: 'film',
            members: [],
            childrenIDs: ['13', '14'],
        },
        {
            id: '13',
            label: 'props',
            members: [],
            childrenIDs: ['16', '17', '18'],
        },
        {
            id: '14',
            label: 'wardrobe',
            members: [],
            childrenIDs: [],
        },
        {
            id: '15',
            label: 'tools',
            members: [
                {
                    type: ResourceType.transcribedAudio,
                    id: '110',
                },
            ],
            childrenIDs: [],
        },
        {
            id: '16',
            label: 'adornments',
            members: [],
            childrenIDs: ['15'],
        },
        {
            id: '17',
            label: 'clothing',
            members: [
                {
                    type: noteType,
                    id: '1',
                } as const,
            ],
            childrenIDs: [],
        },
        {
            id: '18',
            // Duplicate label ok, but not duplicate ID
            label: 'tools',
            members: [],
            childrenIDs: [],
        },
    ].map((dto) => new Category(dto));
