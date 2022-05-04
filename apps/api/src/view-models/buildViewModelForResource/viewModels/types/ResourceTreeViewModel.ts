import { Book } from '../../../../domain/models/book/entities/book.entity';
import { ResourceType, resourceTypes } from '../../../../domain/types/resourceTypes';
import { BaseViewModel } from '../base.view-model';
import { BookViewModel } from '../book.view-model';
import { TagViewModel } from '../tag.view-model';
import { ResourceTypeToViewModel } from './ResourceTypeToViewModel';

export type ResourceTreeViewModel<TResourceType extends ResourceType> = {
    resourceType: TResourceType;

    nodes: ResourceTree<ResourceTypeToViewModel[TResourceType]>[];
};

type ResourceTree<TViewModel extends BaseViewModel> = {
    tag: TagViewModel;

    resources: TViewModel[];

    children: ResourceTree<TViewModel>[];
};

const foo: ResourceTreeViewModel<typeof resourceTypes.book> = {
    resourceType: resourceTypes.book,
    nodes: [
        {
            tag: {
                label: 'mammals',
                id: '1',
            },
            resources: [new BookViewModel({} as Book)],
            children: [
                {
                    tag: {
                        label: 'cats',
                        id: '3',
                    },
                    resources: [new BookViewModel({} as Book)],
                    children: [
                        {
                            tag: {
                                label: 'big cats',
                                id: '35',
                            },
                            resources: [
                                new BookViewModel({} as Book),
                                new BookViewModel({} as Book),
                            ],
                            children: [],
                        },
                        {
                            tag: {
                                label: 'domesticated cats',
                                id: '1',
                            },
                            resources: [
                                new BookViewModel({} as Book),
                                new BookViewModel({} as Book),
                                new BookViewModel({} as Book),
                            ],
                            children: [],
                        },
                    ],
                },
                {
                    tag: {
                        label: 'dogs',
                        id: '7',
                    },
                    resources: [
                        new BookViewModel({} as Book),
                        new BookViewModel({} as Book),
                        new BookViewModel({} as Book),
                        new BookViewModel({} as Book),
                        new BookViewModel({} as Book),
                    ],
                    children: [],
                },
                {
                    tag: {
                        label: 'rodents',
                        id: '12',
                    },
                    resources: [new BookViewModel({} as Book), new BookViewModel({} as Book)],
                    children: [],
                },
            ],
        },
    ],
};

foo;
