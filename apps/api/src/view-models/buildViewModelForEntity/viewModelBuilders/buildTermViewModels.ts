import { Term } from 'apps/api/src/domain/models/term/entities/term.entity';
import { entityTypes } from 'apps/api/src/domain/types/entityType';
import { PartialDTO } from 'apps/api/src/types/partial-dto';
import { ViewModelBuilderDependencies } from '../buildViewModelForEntity';
import { TermViewModel } from '../viewModels';

// Should we make this a class?
export default async ({
  repositoryProvider,
}: ViewModelBuilderDependencies): Promise<TermViewModel[]> => {
  const termRepository = repositoryProvider.forEntity<Term>(
    entityTypes.term,
    (termDTO: PartialDTO<Term>) => new Term(termDTO)
  );

  // TODO remove try \ catch once we add validation layer
  try {
    return termRepository
      .fetchMany()
      .then((terms) => terms.map((term) => new TermViewModel(term)));
  } catch (error) {
    return error;
  }
};
