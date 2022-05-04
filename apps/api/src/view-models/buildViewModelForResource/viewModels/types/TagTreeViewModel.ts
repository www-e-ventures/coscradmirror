import { TagViewModel } from '../tag.view-model';

export type TagTreeViewModel = {
    label: string;

    nodes: TagTree[];
};

type TagTree = {
    tag: TagViewModel;

    children: TagTree[];
};

const foo: TagTreeViewModel = {
    label: 'tag tree',
    nodes: [
        {
            tag: {
                label: 'mammals',
                id: '1',
            },
            children: [
                {
                    tag: {
                        label: 'cats',
                        id: '3',
                    },
                    children: [
                        {
                            tag: {
                                label: 'big cats',
                                id: '35',
                            },
                            children: [],
                        },
                        {
                            tag: {
                                label: 'domesticated cats',
                                id: '1',
                            },
                            children: [],
                        },
                    ],
                },
                {
                    tag: {
                        label: 'dogs',
                        id: '7',
                    },
                    children: [],
                },
                {
                    tag: {
                        label: 'rodents',
                        id: '12',
                    },
                    children: [],
                },
            ],
        },
    ],
};

foo;
