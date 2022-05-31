import { InternalError } from '../../../lib/errors/InternalError';
import { ISpatialFeature } from '../../models/spatial-feature/ISpatialFeature';
import { ResourceType } from '../../types/ResourceType';
import { isNullOrUndefined } from '../../utilities/validation/is-null-or-undefined';
import InvalidEntityDTOError from '../errors/InvalidEntityDTOError';
import NullOrUndefinedResourceDTOError from '../errors/NullOrUndefinedResourceDTOError';
import { DomainModelValidator } from '../types/DomainModelValidator';
import { isValid, Valid } from '../Valid';
import geometricFeatureValidator from './geometricFeatureValidator';

const spatialFeatureValidator: DomainModelValidator = (dto: unknown): Valid | InternalError => {
    if (isNullOrUndefined(dto))
        return new NullOrUndefinedResourceDTOError(ResourceType.spatialFeature);

    const allErrors: InternalError[] = [];

    const { geometry, id } = dto as ISpatialFeature;

    const geometryValidationResult = geometricFeatureValidator(geometry);

    if (!isValid(geometryValidationResult)) allErrors.push(geometryValidationResult);

    if (allErrors.length > 0)
        return new InvalidEntityDTOError(ResourceType.spatialFeature, id, allErrors);

    return Valid;
};

export default spatialFeatureValidator;
