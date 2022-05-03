import { isDeepStrictEqual } from 'util';
import {
    EdgeConnection,
    EdgeConnectionMember,
    EdgeConnectionMemberRole,
    EdgeConnectionType,
} from '../../../domain/models/context/edge-connection.entity';
import { ResourceCompositeIdentifier } from '../../../domain/models/types/entityCompositeIdentifier';
import { isResourceId } from '../../../domain/types/ResourceId';
import { isNullOrUndefined } from '../../../domain/utilities/validation/is-null-or-undefined';
import { InternalError } from '../../../lib/errors/InternalError';
import { DTO } from '../../../types/DTO';
import formatResourceCompositeIdentifier from '../../../view-models/presentation/formatResourceCompositeIdentifier';
import { getResourceTypeFromArangoCollectionID } from '../getArangoCollectionIDFromResourceType';
import { isArangoResourceCollectionID } from '../types/ArangoCollectionId';
import { ArangoDocumentHandle } from '../types/ArangoDocumentHandle';
import { ArangoEdgeDocument } from '../types/ArangoEdgeDocument';
import { HasArangoDocumentDirectionAttributes } from '../types/HasArangoDocumentDirectionAttributes';

const arangoDocumentHandleDelimiter = '/';

const parseResourceCompositeID = (docHandle: ArangoDocumentHandle): ResourceCompositeIdentifier => {
    const splitOnSlash = docHandle.split(arangoDocumentHandleDelimiter);

    if (splitOnSlash.length !== 2) {
        throw new InternalError(`An Arango document handle must have the format {collection}/{id}`);
    }

    const [collectionName, id] = splitOnSlash;

    if (!isArangoResourceCollectionID(collectionName)) {
        throw new InternalError(
            `Edge document handle refers to an invalid collection name: : ${collectionName}`
        );
    }

    if (!isResourceId(id)) {
        throw new InternalError(`Edge document handle refers to an invalid document id: ${id}`);
    }

    return {
        type: getResourceTypeFromArangoCollectionID(collectionName),
        id,
    };
};

// Is this useful?
const _determineRoleFromCompositeID = (
    { _to, _from }: HasArangoDocumentDirectionAttributes,
    compositeIdentifier: ResourceCompositeIdentifier
): EdgeConnectionMemberRole => {
    const isTo = isDeepStrictEqual(parseResourceCompositeID(_to), compositeIdentifier);

    const isFrom = isDeepStrictEqual(parseResourceCompositeID(_from), compositeIdentifier);

    if (!isTo && !isFrom) {
        const msg = [
            `Resource: ${formatResourceCompositeIdentifier(compositeIdentifier)}`,
            `is not referred to`,
            `in _to: ${_to} or _from: ${_from}`,
        ].join(' ');

        throw new InternalError(msg);
    }

    if (isTo && isFrom) return EdgeConnectionMemberRole.self;

    return isTo ? EdgeConnectionMemberRole.to : EdgeConnectionMemberRole.from;
};

const determineEdgeConnectionTypeFromDocument = ({
    _to,
    _from,
}: HasArangoDocumentDirectionAttributes): EdgeConnectionType =>
    isDeepStrictEqual(_to, _from) ? EdgeConnectionType.self : EdgeConnectionType.dual;

const getCompositeIdentifierForMemberWithRole = (
    role: EdgeConnectionMemberRole,
    { _to, _from }: HasArangoDocumentDirectionAttributes
): ResourceCompositeIdentifier =>
    role === EdgeConnectionMemberRole.from
        ? parseResourceCompositeID(_from)
        : parseResourceCompositeID(_to);

export default (document: ArangoEdgeDocument): DTO<EdgeConnection> => {
    const { members, note, tagIDs, _key: id, _to, _from } = document;

    if ([_to, _from, id].some(isNullOrUndefined)) {
        throw new InternalError(`invalid edge document: ${JSON.stringify(document)}`);
    }

    const membersForEdgeConnectionDTO: DTO<EdgeConnectionMember>[] = members.map((member) => ({
        ...member,
        compositeIdentifier: getCompositeIdentifierForMemberWithRole(member.role, document),
    }));

    return {
        type: determineEdgeConnectionTypeFromDocument(document),
        id,
        note,
        tagIDs,
        members: membersForEdgeConnectionDTO,
    };
};