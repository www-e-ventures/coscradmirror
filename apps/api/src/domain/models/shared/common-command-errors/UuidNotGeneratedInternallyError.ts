import { InternalError } from '../../../../lib/errors/InternalError';

export default class UuidNotGeneratedInternallyError extends InternalError {
    constructor(invalidId: string) {
        super(`The ID: ${invalidId} has not been generated by our ID generation system`);
    }
}
