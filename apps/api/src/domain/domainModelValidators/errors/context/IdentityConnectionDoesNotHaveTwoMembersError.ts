import { InternalError } from '../../../../lib/errors/InternalError';

export default class IdentityConnectionDoesNotHaveTwoMembersError extends InternalError {
    constructor() {
        super(`An Identity Connection must have two members`);
    }
}
