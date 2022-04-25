import { InternalError } from '../../lib/errors/InternalError';
import { resourceTypes } from '../types/resourceTypes';
import { isNullOrUndefined } from '../utilities/validation/is-null-or-undefined';
import NullOrUndefinedResourceDTOError from './errors/NullOrUndefinedResourceDTOError';
import { DomainModelValidator } from './types/DomainModelValidator';
import { Valid } from './Valid';

const transcribedAudioValidator: DomainModelValidator = (dto: unknown): Valid | InternalError => {
    // Return early, as we will get null pointers if we proceed
    if (isNullOrUndefined(dto))
        return new NullOrUndefinedResourceDTOError(resourceTypes.transcribedAudio);

    // TODO Add additional logic

    return Valid;
};

export default transcribedAudioValidator;