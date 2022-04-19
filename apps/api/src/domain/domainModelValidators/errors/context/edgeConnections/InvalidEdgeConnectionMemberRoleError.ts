import {
    EdgeConnectionMemberRole,
    EdgeConnectionType,
} from 'apps/api/src/domain/models/context/edge-connection.entity';
import { InternalError } from 'apps/api/src/lib/errors/InternalError';

export default class InvalidEdgeConnectionMemberRoleError extends InternalError {
    constructor(
        edgeConnectionType: EdgeConnectionType,
        edgeConnectionMemberRole: EdgeConnectionMemberRole
    ) {
        super(
            `Invalid edge connection member role: ${edgeConnectionMemberRole}, for connection of type: ${edgeConnectionType}`
        );
    }
}
