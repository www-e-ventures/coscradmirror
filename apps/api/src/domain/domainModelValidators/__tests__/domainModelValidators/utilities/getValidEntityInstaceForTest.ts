import buildTestData from '../../../../../test-data/buildTestData';
import { ResourceType, ResourceTypeToInstance } from '../../../../types/ResourceType';

export default <TResourceType extends ResourceType>(
    ResourceType: TResourceType
): ResourceTypeToInstance[TResourceType] =>
    buildTestData().resources[ResourceType][0] as ResourceTypeToInstance[TResourceType];
