import { InternalError } from '../../../../../lib/errors/InternalError';
import { EdgeConnectionContextType } from '../../../../models/context/types/EdgeConnectionContextType';
import { AggregateCompositeIdentifier } from '../../../../types/AggregateCompositeIdentifier';

export default class DisallowedContextTypeForResourceError extends InternalError {
    constructor(
        contextType: EdgeConnectionContextType,
        resourceCompositeIdentifier: AggregateCompositeIdentifier
    ) {
        super(
            `Disallowed context type: ${contextType} for resource type: ${resourceCompositeIdentifier}`
        );
    }
}
