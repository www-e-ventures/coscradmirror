import { Term } from 'apps/api/src/domain/models/term/entities/term.entity';
import { VocabularyList } from 'apps/api/src/domain/models/vocabulary-list/entities/vocabulary-list.entity';
import { entityTypes } from 'apps/api/src/domain/types/entityType';
import { isInternalError } from 'apps/api/src/lib/errors/InternalError';
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

  const allTerms = await termRepository.fetchMany().then((allTerms) =>
    // We filter out invalid DTOs in case they occur
    allTerms.filter((term): term is Term => !isInternalError(term))
  );

  const allVocabularyListViewModels = await vocabularyListRepository
    .fetchMany()
    .then((vocabularyLists) =>
      vocabularyLists
        .filter((list): list is VocabularyList => !isInternalError(list))
        .map((list) => new VocabularyListViewModel(list, allTerms))
    );

  return allVocabularyListViewModels;
};
