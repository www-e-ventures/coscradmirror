import { Point } from '../../../../../models/spatial-feature/point.entity';
import { GeometricFeatureType } from '../../../../../models/spatial-feature/types/GeometricFeatureType';
import { resourceTypes } from '../../../../../types/resourceTypes';
import InvalidEntityDTOError from '../../../../errors/InvalidEntityDTOError';
import { DomainModelValidatorInvalidTestCase } from '../../../types/DomainModelValidatorTestCase';
import { getValidSpatialFeatureInstanceForTest } from '../utils/getValidSpatialFeatureInstanceForTest';

const validPointDTO = getValidSpatialFeatureInstanceForTest(GeometricFeatureType.point);

export const buildPointInvalidTestCases = (): DomainModelValidatorInvalidTestCase<Point>[] => [
    {
        description: 'one of the coordinates is a string',
        invalidDTO: {
            ...validPointDTO,
            geometry: {
                type: GeometricFeatureType.point,
                coordinates: [12, 'foo' as unknown as number],
            },
        },
        expectedError: new InvalidEntityDTOError(resourceTypes.spatialFeature, validPointDTO.id),
    },
];
