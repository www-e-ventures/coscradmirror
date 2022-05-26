import { InternalError } from '../../../../../../lib/errors/InternalError';
import formatTimeRange from '../../../../../../view-models/presentation/formatTimeRange';
import { TimeRangeWithoutData } from '../../../../../models/context/time-range-context/entities/time-range-context.entity';
import { TimeBoundable } from '../../../../../models/interfaces/TimeBoundable';
import { Resource } from '../../../../../models/resource.entity';

export default class InconsistentTimeRangeError extends InternalError {
    constructor(timeRange: TimeRangeWithoutData, resource: TimeBoundable & Resource) {
        const [inPoint, outPoint] = resource.getTimeBounds();

        const resourceTimeBounds: TimeRangeWithoutData = {
            inPoint,
            outPoint,
        };

        const msg = [
            `Time range: ${formatTimeRange(timeRange)}`,
            `is outside the bounds of`,
            `resource: ${resource.getCompositeIdentifier}.`,
            '\n',
            `Time range should fall within the bounds: ${formatTimeRange(resourceTimeBounds)}`,
        ].join(' ');

        super(msg);
    }
}
