import filterOutUnpublishedEntities, {
  HasPublicationStatus,
} from './filterOutUnpublishedEntities';

type TestCase = {
  description: string;
  input: HasPublicationStatus[];
  expectedOutput: HasPublicationStatus[];
};

const allPublishedDummyItems = [
  {
    isPublished: true,
    label: 'bar',
    counts: [1, 2, 3],
  },
  {
    isPublished: true,
    label: 'baz',
    counts: [1, 2, 3],
  },
];

const testCases: TestCase[] = [
  {
    description: 'some entities are unpublished',
    input: [
      ...allPublishedDummyItems,
      {
        isPublished: false,
        label: 'foo',
        counts: [1, 2, 3],
      },
    ],
    expectedOutput: [
      {
        isPublished: true,
        label: 'bar',
        counts: [1, 2, 3],
      },
      {
        isPublished: true,
        label: 'baz',
        counts: [1, 2, 3],
      },
    ],
  },
  {
    description: 'all input items are unpublished',
    input: [
      {
        isPublished: false,
        label: 'bar',
        counts: [1, 2, 3],
      },
      {
        isPublished: false,
        label: 'baz',
        counts: [1, 2, 3],
      },
      {
        isPublished: false,
        label: 'foo',
        counts: [1, 2, 3],
      },
    ],
    expectedOutput: [],
  },
  {
    description: 'all input items are published',
    input: allPublishedDummyItems,
    expectedOutput: allPublishedDummyItems,
  },
];

describe('filterOutUnpublishedEntities', () => {
  testCases.forEach(({ description, input, expectedOutput }) => {
    describe(description, () => {
      it('should return the expected result', () => {
        const actualOutput = filterOutUnpublishedEntities(input);

        expect(actualOutput).toEqual(expectedOutput);
      });
    });
  });
});
