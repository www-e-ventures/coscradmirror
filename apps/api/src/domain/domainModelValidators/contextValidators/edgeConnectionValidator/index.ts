import { InternalError } from 'apps/api/src/lib/errors/InternalError';
import { PartialDTO } from 'apps/api/src/types/partial-dto';
import {
    EdgeConnection,
    isEdgeConnectionType,
} from '../../../models/context/edge-connection.entity';
import { isResourceId } from '../../../types/ResourceId';
import { isNullOrUndefined } from '../../../utilities/validation/is-null-or-undefined';
import InvalidEdgeConnectionDTOError from '../../errors/context/edgeConnections/InvalidEdgeConnectionDTOError';
import InvalidEdgeConnectionIDError from '../../errors/context/edgeConnections/InvalidEdgeConnectionIDError';
import InvalidEdgeConnectionTypeError from '../../errors/context/edgeConnections/InvalidEdgeConnectionTypeError';
import NoteMissingFromEdgeConnectionError from '../../errors/context/edgeConnections/NoteMissingFromEdgeConnectionError';
import NullOrUndefinedEdgeConnectionDTOError from '../../errors/context/edgeConnections/NullOrUndefindEdgeConnectionDTOError';
import { Valid } from '../../Valid';

const buildTopLevelError = (innerErrors: InternalError[]): InternalError =>
    new InvalidEdgeConnectionDTOError(innerErrors);

/**
 * TODO: Should we call this validateEdgeConnection?
 */
export default (input: unknown): Valid | InternalError => {
    if (isNullOrUndefined(input)) return new NullOrUndefinedEdgeConnectionDTOError();

    const { note, type: edgeConnectionType, id } = input as PartialDTO<EdgeConnection>;

    const allErrors = [];

    if (isNullOrUndefined(note)) allErrors.push(new NoteMissingFromEdgeConnectionError());

    if (!isEdgeConnectionType(edgeConnectionType))
        allErrors.push(new InvalidEdgeConnectionTypeError(edgeConnectionType));

    // TODO Rename this to `isEntityId`
    if (!isResourceId(id)) allErrors.push(new InvalidEdgeConnectionIDError(id));

    // Validate edge connection type against member roles \ number of members

    // Validate that each member has a context type that is consistent with the resource type in the composite id

    // Validate that the context model satisfies its own invariants -> defer to context model invariant validation layer

    return allErrors.length > 0 ? buildTopLevelError(allErrors) : Valid;
};
