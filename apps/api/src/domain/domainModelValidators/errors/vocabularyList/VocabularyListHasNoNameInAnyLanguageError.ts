import { InternalError } from 'apps/api/src/lib/errors/InternalError';

export default class VocabularyListHasNoNameInAnyLanguageError extends InternalError {
  constructor(vocabularyListId?: string) {
    const message = [
      `Vocabulary list`,
      vocabularyListId ? `with ID ${vocabularyListId}` : ``,
      `has no name in either language`,
    ].join(' ');

    super(message);
  }
}
