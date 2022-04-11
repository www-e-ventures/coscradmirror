import { InternalError } from '../../lib/errors/InternalError';
import { resourceTypes } from '../types/resourceTypes';
import { isNullOrUndefined } from '../utilities/validation/is-null-or-undefined';
import NullOrUndefinedDTOError from './errors/NullOrUndefinedDTOError';
import { DomainModelValidator } from './types/DomainModelValidator';
import { Valid } from './Valid';

const transcribedAudioValidator: DomainModelValidator = (dto: unknown): Valid | InternalError => {
    // Return early, as we will get null pointers if we proceed
    if (isNullOrUndefined(dto)) return new NullOrUndefinedDTOError(resourceTypes.transcribedAudio);

    // TODO Add additional logic

    return Valid;
};

export default transcribedAudioValidator;
