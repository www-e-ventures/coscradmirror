import { isMemberContextTheIdentityContext } from '.';
import { InternalError } from '../../../../lib/errors/InternalError';
import {
    EdgeConnection,
    EdgeConnectionMember,
    EdgeConnectionMemberRole,
} from '../../../models/context/edge-connection.entity';
import { ResourceType } from '../../../types/ResourceType';
import IdentityConnectionDoesNotHaveTwoMembersError from '../../errors/context/IdentityConnectionDoesNotHaveTwoMembersError';
import IdentityConnectionToMemberNotABibliographicReferenceError from '../../errors/context/IdentityConnectionToMemberNotABibliographicReferenceError';
import IncompatibleIdentityConnectionMembersError from '../../errors/context/IncompatibleIdentityConnectionMembersError';
import LonelyIdentityContextInEdgeconnectionError from '../../errors/context/LonelyIdentityContextInEdgeConnectionError';

/***
 * This assumes that you have 2 members from a dual Edge Connection and you want
 * to find either the to or the from member.
 */
export const findMemberWithRole = (
    member1: EdgeConnectionMember,
    member2: EdgeConnectionMember,
    role: Exclude<EdgeConnectionMemberRole, typeof EdgeConnectionMemberRole.self>
): EdgeConnectionMember => {
    if (member1.role === role) {
        if (member2.role === role) {
            throw new InternalError(`Encountered two from members`);
        }
        // TODO clone
        return member1;
    }

    if (member2.role === role) return member2;

    throw new InternalError(`Found no member with the role 'from'`);
};

/**
 * Here we can only confirm that the `to` and `from` members have the correct
 * resource type to participate together in an `IdentityConnection`. However,
 * we cannot verify that the `to` member's bibliographic reference (sub-)type
 * can accept a resource with the `from` member's resource type as a target
 * digital representation.
 */
const areIdentityMembersContextTypesConsistentWithRoles = (
    member1: EdgeConnectionMember,
    member2: EdgeConnectionMember
) => {
    const [toMember, fromMember] =
        member1.role === EdgeConnectionMemberRole.to ? [member1, member2] : [member2, member1];

    if (
        toMember.role !== EdgeConnectionMemberRole.to ||
        fromMember.role !== EdgeConnectionMemberRole.from
    ) {
        throw new InternalError(
            `Failed to parse to and from roles for edge connection members (1): ${member1}, (2): ${member2}`
        );
    }

    if (fromMember.compositeIdentifier.type !== ResourceType.bibliographicReference) {
        return false;
    }

    // TODO Use a lookup table for this logic
    return toMember.compositeIdentifier.type === ResourceType.book;
};

export const validateIdentityEdgeConnection = ({ members }: EdgeConnection): InternalError[] => {
    const allErrors: InternalError[] = [];

    if (members.length !== 2) {
        return [new IdentityConnectionDoesNotHaveTwoMembersError()];
    }

    // If one member uses the Identity Context, both members must
    if (!members.every(isMemberContextTheIdentityContext)) {
        allErrors.push(new LonelyIdentityContextInEdgeconnectionError());
    }

    const fromMember = findMemberWithRole(members[0], members[1], EdgeConnectionMemberRole.from);

    if (fromMember.compositeIdentifier.type !== ResourceType.bibliographicReference) {
        allErrors.push(new IdentityConnectionToMemberNotABibliographicReferenceError());
    }

    if (!areIdentityMembersContextTypesConsistentWithRoles(members[0], members[1])) {
        allErrors.push(
            new IncompatibleIdentityConnectionMembersError({
                fromType: findMemberWithRole(members[0], members[1], EdgeConnectionMemberRole.from)
                    .compositeIdentifier.type,
                toType: findMemberWithRole(members[0], members[1], EdgeConnectionMemberRole.to)
                    .compositeIdentifier.type,
            })
        );
    }

    return allErrors;
};
