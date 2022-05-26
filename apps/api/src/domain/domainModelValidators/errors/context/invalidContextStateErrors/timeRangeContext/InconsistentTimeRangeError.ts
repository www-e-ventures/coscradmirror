import { InternalError } from '../../../../../../lib/errors/InternalError';
import { DTO } from '../../../../../../types/DTO';
import formatTimeRange from '../../../../../../view-models/presentation/formatTimeRange';
import TimeRange from '../../../../../models/context/time-range-context/entities/TimeRange';
import { TimeBoundable } from '../../../../../models/interfaces/TimeBoundable';
import { Resource } from '../../../../../models/resource.entity';

export default class InconsistentTimeRangeError extends InternalError {
    constructor(timeRange: TimeRange, resource: TimeBoundable & Resource) {
        const [inPoint, outPoint] = resource.getTimeBounds();

        const resourceTimeBounds: DTO<TimeRange> = {
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
