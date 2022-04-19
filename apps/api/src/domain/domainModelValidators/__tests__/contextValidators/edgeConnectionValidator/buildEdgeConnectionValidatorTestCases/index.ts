import {
    EdgeConnectionMemberRole,
    EdgeConnectionType,
} from 'apps/api/src/domain/models/context/edge-connection.entity';
import { PageRangeContext } from 'apps/api/src/domain/models/context/page-range-context/page-range.context.entity';
import { TimeRangeContext } from 'apps/api/src/domain/models/context/time-range-context/time-range-context.entity';
import { EdgeConnectionContextType } from 'apps/api/src/domain/models/context/types/EdgeConnectionContextType';
import { resourceTypes } from 'apps/api/src/domain/types/resourceTypes';
import { InternalError } from 'apps/api/src/lib/errors/InternalError';
import NoteMissingFromEdgeConnectionError from '../../../../../domainModelValidators/errors/context/edgeConnections/NoteMissingFromEdgeConnectionError';
import NullOrUndefinedEdgeConnectionDTOError from '../../../../../domainModelValidators/errors/context/edgeConnections/NullOrUndefindEdgeConnectionDTOError';
import ContextTypeIsNotAllowedForGivenResourceTypeError from '../../../../errors/context/edgeConnections/ContextTypeIsNotAllowedForGivenResourceTypeError';
import InvalidEdgeConnectionDTOError from '../../../../errors/context/edgeConnections/InvalidEdgeConnectionDTOError';
import InvalidEdgeConnectionMemberRoleError from '../../../../errors/context/edgeConnections/InvalidEdgeConnectionMemberRoleError';
import InvalidNumberOfMembersInEdgeConnectionError from '../../../../errors/context/edgeConnections/InvalidNumberOfMembersInEdgeConnectionError';
import { EdgeConnectionValidatorTestCase } from '../types/EdgeConnectionValidatorTestCase';

const buildTopLevelError = (innerErrors: InternalError[]): InternalError =>
    new InvalidEdgeConnectionDTOError(innerErrors);

export default (): EdgeConnectionValidatorTestCase[] => [
    {
        validCases: [
            {
                dto: {
                    type: EdgeConnectionType.dual,
                    members: [{}, {}],
                    id: '123',
                    tagIDs: ['55'],
                    note: 'These are both about bears',
                },
            },
        ],
        invalidCases: [
            {
                description: 'the DTO is null',
                invalidDTO: null,
                expectedError: new NullOrUndefinedEdgeConnectionDTOError(),
            },
            /**
             * TODO
             *
             * We need to update this test data once we can seed edge
             * connections in our test data builder. At that point, we can
             * pass the actual members' context through to the lower level
             * context model validation layer.
             *
             * Right now, I am ignoring validation of the `members` and their context
             * so that I can solidify the high level design.
             */
            {
                description: 'the DTO is missing a note',
                invalidDTO: {
                    type: EdgeConnectionType.dual,
                    id: '123',
                    tagIDs: ['55'],
                    members: [{}, {}], // TODO Add some valid members here
                    note: null,
                },
                expectedError: buildTopLevelError([new NoteMissingFromEdgeConnectionError()]),
            },
            {
                description: 'the DTO is for a Self connection, but has 2 members',
                invalidDTO: {
                    type: EdgeConnectionType.self,
                    id: '123',
                    tagIDs: ['55'],
                    members: [
                        {
                            role: EdgeConnectionMemberRole.self,
                        },
                        {
                            role: EdgeConnectionMemberRole.self,
                        },
                    ], // TODO Add some valid members here
                    note: 'This is the note',
                },
                expectedError: buildTopLevelError([
                    new InvalidNumberOfMembersInEdgeConnectionError(EdgeConnectionType.self, 2),
                ]),
            },
            {
                description: 'the DTO is for a Self connection, but has 0 members',
                invalidDTO: {
                    type: EdgeConnectionType.self,
                    id: '123',
                    tagIDs: ['55'],
                    members: [], // TODO Add some valid members here
                    note: 'This is the note',
                },
                expectedError: buildTopLevelError([
                    new InvalidNumberOfMembersInEdgeConnectionError(EdgeConnectionType.self, 0),
                ]),
            },
            {
                description: 'the DTO is for a Dual connection, but has 1 members',
                invalidDTO: {
                    type: EdgeConnectionType.dual,
                    id: '123',
                    tagIDs: ['55'],
                    members: [{}], // TODO Add some valid members here
                    note: 'This is the note',
                },
                expectedError: buildTopLevelError([
                    new InvalidNumberOfMembersInEdgeConnectionError(EdgeConnectionType.dual, 1),
                ]),
            },
            {
                description: 'the DTO is for a Dual connection, but has 0 members',
                invalidDTO: {
                    type: EdgeConnectionType.dual,
                    id: '123',
                    tagIDs: ['55'],
                    members: [], // TODO Add some valid members here
                    note: 'This is the note',
                },
                expectedError: buildTopLevelError([
                    new InvalidNumberOfMembersInEdgeConnectionError(EdgeConnectionType.dual, 0),
                ]),
            },
            {
                description:
                    'the DTO is for a Self connection but one of the members has the role "to"',
                invalidDTO: {
                    type: EdgeConnectionType.self,
                    id: '123',
                    tagIDs: ['55'],
                    members: [
                        {
                            role: EdgeConnectionMemberRole.to,
                        },
                    ],
                    note: 'This is the note',
                },
                expectedError: buildTopLevelError([
                    new InvalidEdgeConnectionMemberRoleError(
                        EdgeConnectionType.self,
                        EdgeConnectionMemberRole.to
                    ),
                ]),
            },
            {
                description:
                    'the DTO is for a Dual connection but one of the members has the role "self"',
                invalidDTO: {
                    type: EdgeConnectionType.dual,
                    id: '123',
                    tagIDs: ['55'],
                    members: [
                        {
                            role: EdgeConnectionMemberRole.self,
                        },
                        {
                            role: EdgeConnectionMemberRole.to,
                        },
                    ],
                    note: 'This is the note',
                },
                expectedError: buildTopLevelError([
                    new InvalidEdgeConnectionMemberRoleError(
                        EdgeConnectionType.dual,
                        EdgeConnectionMemberRole.self
                    ),
                ]),
            },
            {
                description: 'the DTO is not consistent with the resource type in the composite id',
                invalidDTO: {
                    type: EdgeConnectionType.dual,
                    id: '123',
                    tagIDs: ['44'],
                    members: [
                        {
                            role: EdgeConnectionMemberRole.to,
                            context: new TimeRangeContext({
                                timeRange: [3487, 3499],
                            }),
                            compositeIdentifier: {
                                type: resourceTypes.book,
                                id: '345',
                            },
                        },
                        {
                            role: EdgeConnectionMemberRole.from,
                            context: new PageRangeContext({}),
                            compositeIdentifier: {
                                type: resourceTypes.book,
                                id: '678',
                            },
                        },
                    ],
                    note: 'This is the note',
                },
                expectedError: buildTopLevelError([
                    new ContextTypeIsNotAllowedForGivenResourceTypeError(
                        EdgeConnectionContextType.timeRange,
                        resourceTypes.book
                    ),
                ]),
            },
            /**
             * TODO Add invalid cases for members
             * - members[0].compositeIdentifier.type does not allow context of type
             *    members[0].context.type
             *
             * - deferred context model validation invalid cases
             *     - How far do we want to go here? We already have the lower level
             *      test. This is essentially an integration test. We only need to
             *      build confidence that this higher level validator correctly
             *      "relays the message" from the lower layer
             */
            // TODO validate types on DTO
        ],
    },
];
