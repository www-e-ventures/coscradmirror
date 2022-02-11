import { PartialDTO } from 'apps/api/src/types/partial-dto';
import { SpatialFeature, spatialFeatureTypes } from './spatial-feature.entity';

type PointCoordinates = [latitude: number, longitude: number];

// TODO elucidate validation rules
export class PointFeature extends SpatialFeature {
  readonly latitude: number;

  readonly longitude: number;

  constructor(dto: PartialDTO<PointFeature>) {
    super({
      ...dto,
      spatialFeatureType: spatialFeatureTypes.point,
    });
  }

  getCoordinates = (): PointCoordinates => [this.latitude, this.longitude];
}
