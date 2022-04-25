import { Resource } from 'apps/api/src/domain/models/resource.entity';
import { InternalError } from 'apps/api/src/lib/errors/InternalError';
import formatCharacterRange from 'apps/api/src/view-models/presentation/formatCharacterRange';
import formatResourceCompositeIdentifier from 'apps/api/src/view-models/presentation/formatResourceCompositeIdentifier';

// TODO we should really alias [number,number] already!
export default class InconsistentCharRangeError extends InternalError {
    constructor(charRange: [number, number], targetModel: Resource, targetField: string) {
        const targetValue = targetModel[targetField];

        const msg = [
            `The character range ${formatCharacterRange(charRange)}`,
            `is inconsistent with the value of the target property ${targetField}`,
            `on ${formatResourceCompositeIdentifier(targetModel.getCompositeIdentifier())}`,
            '\n',
            `The target value ${targetValue} has a maximal range of`,
            formatCharacterRange([0, targetValue.length]),
        ].join(' ');

        super(msg);
    }
}
