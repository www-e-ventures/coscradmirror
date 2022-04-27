import { EdgeConnection } from '../../../domain/models/context/edge-connection.entity';
import { DTO } from '../../../types/DTO';
import buildOneSelfEdgeConnectionForEachResourceType from './buildOneSelfEdgeConnectionForEachResourceType';

export default (): Omit<DTO<EdgeConnection>, 'id'>[] => [
    ...buildOneSelfEdgeConnectionForEachResourceType(),
];
