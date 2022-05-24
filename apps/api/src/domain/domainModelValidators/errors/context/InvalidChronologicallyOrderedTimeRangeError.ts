import { InternalError } from '../../../../lib/errors/InternalError';
import TimeRange from '../../../models/context/time-range-context/entities/TimeRange';

export default class InvalidChronologicallyOrderedTimeRangeError extends InternalError {
    constructor({ inPoint, outPoint }: Pick<TimeRange, 'inPoint' | 'outPoint'>) {
        const msg = [
            `Invalid chronological order in time range:`,
            `in: ${inPoint}`,
            `out: ${outPoint}`,
        ].join('');

        super(msg);
    }
}
