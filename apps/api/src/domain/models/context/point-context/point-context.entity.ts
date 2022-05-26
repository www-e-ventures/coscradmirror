import { DTO } from '../../../../types/DTO';
import BaseDomainModel from '../../BaseDomainModel';
import { Position2D } from '../../spatial-feature/types/Coordinates/Position2D';
import { IEdgeConnectionContext } from '../interfaces/IEdgeConnectionContext';
import { EdgeConnectionContextType } from '../types/EdgeConnectionContextType';

export class PointContext extends BaseDomainModel implements IEdgeConnectionContext {
    readonly type = EdgeConnectionContextType.point2D;

    readonly point: Position2D;

    constructor({ point }: DTO<PointContext>) {
        super();

        /**
         * TODO [https://www.pivotaltracker.com/story/show/182005586]
         *
         * Remove cast.
         */
        this.point = [...(point as Position2D)];
    }
}
