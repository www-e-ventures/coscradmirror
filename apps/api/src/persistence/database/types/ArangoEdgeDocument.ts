import {
    EdgeConnectionMemberRole,
    EdgeConnectionType,
} from '../../../domain/models/context/edge-connection.entity';
import { IEdgeConnectionContext } from '../../../domain/models/context/interfaces/IEdgeConnectionContext';
import { DTO } from '../../../types/DTO';
import { HasArangoDocumentDirectionAttributes } from '../types/HasArangoDocumentDirectionAttributes';

type ArangoEdgeMemberContext = {
    role: EdgeConnectionMemberRole;

    context: DTO<IEdgeConnectionContext>;
};

type ArangoEdgeDocumentWithoutSystemAttributes = {
    type: EdgeConnectionType;

    note: string;

    members: ArangoEdgeMemberContext[];
};

export type ArangoEdgeDocument =
    HasArangoDocumentDirectionAttributes<ArangoEdgeDocumentWithoutSystemAttributes> & {
        _key: string;
    };
