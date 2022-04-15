import cloneToPlainObject from 'apps/api/src/lib/utilities/cloneToPlainObject';
import { ResourceType, resourceTypes } from '../../types/resourceTypes';
import { EdgeConnectionContextType } from '../context/types/EdgeConnectionContextType';

const resourceTypeToAllowedContextTypes = {
    [resourceTypes.book]: [EdgeConnectionContextType.general, EdgeConnectionContextType.pageRange],
    [resourceTypes.photograph]: [
        EdgeConnectionContextType.general,
        EdgeConnectionContextType.point2D,
        EdgeConnectionContextType.freeMultiline,
    ],
    [resourceTypes.spatialFeature]: [
        EdgeConnectionContextType.general,
        EdgeConnectionContextType.point2D,
        EdgeConnectionContextType.freeMultiline,
    ],
    // TODO [https://www.pivotaltracker.com/story/show/181861405] remove tag
    [resourceTypes.tag]: [EdgeConnectionContextType.general],
    [resourceTypes.term]: [EdgeConnectionContextType.general, EdgeConnectionContextType.textField],
    [resourceTypes.transcribedAudio]: [EdgeConnectionContextType.timeRange],
    [resourceTypes.vocabularyList]: [
        EdgeConnectionContextType.general,
        EdgeConnectionContextType.textField,
    ],
};

export const getAllowedContextsForModel = (
    resourceType: ResourceType
): EdgeConnectionContextType[] => {
    const allowedContexts = resourceTypeToAllowedContextTypes[resourceType];

    return cloneToPlainObject(allowedContexts);
};

export default (contextType: EdgeConnectionContextType, resourceType: ResourceType): boolean =>
    resourceTypeToAllowedContextTypes[resourceType].includes(contextType);
