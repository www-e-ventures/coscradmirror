import { Term } from 'apps/api/src/domain/models/term/entities/term.entity';
import { entityTypes } from 'apps/api/src/domain/types/entityType';
import { VocabularyList } from 'apps/api/src/domain/vocabulary-list/entities/vocabulary-list.entity';
import { PartialDTO } from 'apps/api/src/types/partial-dto';
import { ViewModelBuilderDependencies } from '../buildViewModelForEntity';
import { VocabularyListViewModel } from '../viewModels';

// Should we make this a class?
export default async ({
  repositoryProvider,
}: ViewModelBuilderDependencies): Promise<VocabularyListViewModel[]> => {
  const vocabularyListRepository = repositoryProvider.forEntity<VocabularyList>(
    entityTypes.vocabularyList,
    (termDTO: PartialDTO<VocabularyList>) => new VocabularyList(termDTO)
  );

  // We need to join the terms by id
  const termRepository = repositoryProvider.forEntity<Term>(
    entityTypes.term,
    (termDTO: PartialDTO<Term>) => new Term(termDTO)
  );

  // TODO remove try \ catch once we add validation layer
  try {
    const allTerms = await termRepository.fetchMany();

    return vocabularyListRepository
      .fetchMany()
      .then((vocabularyLists) =>
        vocabularyLists.map(
          (list) => new VocabularyListViewModel(list, allTerms)
        )
      );
  } catch (error) {
    return error;
  }
};
