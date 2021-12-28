import { EntityType, entityTypes } from '../../domain/types/entityType';
import { RepositoryProvider } from '../../persistence/repositories/repository.provider';
import buildTermViewModels from './viewModelBuilders/buildTermViewModels';
import buildVocabularyListViewModels from './viewModelBuilders/buildVocabularyListViewModels';

export type ViewModelBuilderDependencies = {
  repositoryProvider: RepositoryProvider;
};

export default (
  entityType: EntityType,
  dependencies: ViewModelBuilderDependencies
) => {
  switch (entityType) {
    case entityTypes.term:
      console.log('building term view models');
      return buildTermViewModels(dependencies);

    case entityTypes.vocabularyList:
      return buildVocabularyListViewModels(dependencies);

    default:
      const exhaustiveCheck: never = entityType;

      return new Error(
        `Cannot build view model for unsupported entity type: ${exhaustiveCheck}`
      );
  }
};
