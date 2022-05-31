import { CategorizableType, isCategorizableType } from '../../../types/CategorizableType';
import { EntityId, isResourceId } from '../../../types/ResourceId';
import { isNullOrUndefined } from '../../../utilities/validation/is-null-or-undefined';

// TODO build this and ResourceCompositeIdentifier from a common, more generic type
export type CategorizableCompositeIdentifier = {
    type: CategorizableType;

    id: EntityId;
};

export const isResourceOrNoteCompositeIdentifier = (
    input: unknown
): input is CategorizableCompositeIdentifier => {
    if (isNullOrUndefined(input)) return false;

    const { id, type } = input as CategorizableCompositeIdentifier;

    return isResourceId(id) && isCategorizableType(type);
};
