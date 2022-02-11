import { ValueType } from 'apps/api/src/lib/types/valueType';
import { PartialDTO } from 'apps/api/src/types/partial-dto';
import { entityTypes } from '../../../types/entityType';
import { Entity } from '../../entity';

// See https://www.arangodb.com/learn/documents/geojson-tutorial/
export const spatialFeatureTypes = {
  point: 'point',
  line: 'line',
  multiline: 'multiline',
  polygon: 'polygon',
  multipolygon: 'multipolygon',
} as const;

export type SpatialFeatureType = ValueType<typeof spatialFeatureTypes>;

export abstract class SpatialFeature extends Entity {
  readonly spatialFeatureType: SpatialFeatureType;

  readonly type = entityTypes.spatialFeature;

  constructor(dto: PartialDTO<SpatialFeature>) {
    super(dto);

    this.spatialFeatureType = dto.spatialFeatureType;
  }
}
