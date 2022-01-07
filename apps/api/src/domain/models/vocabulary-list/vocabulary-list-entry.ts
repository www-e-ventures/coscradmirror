import { EntityId } from '../../types/entity-id';

export class VocabularyListEntry {
  termId: EntityId;

  // TODO de-serialize this in the database!
  variableValues: string; //Record<string, VocabularyListVariableValue>;
}
