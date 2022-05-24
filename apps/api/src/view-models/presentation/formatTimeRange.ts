import { TimeRangeWithoutData } from '../../domain/models/context/time-range-context/entities/time-range-context.entity';
import formatTime from './formatTime';

export default ({ inPoint, outPoint }: TimeRangeWithoutData) =>
    `[${formatTime(inPoint)}, ${formatTime(outPoint)}]`;
