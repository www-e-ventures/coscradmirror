import { IsValidClassInstance } from '../../../../../../../../libs/validation/src';
import cloneToPlainObject from '../../../../../lib/utilities/cloneToPlainObject';
import { DTO } from '../../../../../types/DTO';
import { EdgeConnectionContext } from '../../context.entity';
import { EdgeConnectionContextType } from '../../types/EdgeConnectionContextType';
import TimeRange from './TimeRange';

export class TimeRangeContext extends EdgeConnectionContext {
    readonly type = EdgeConnectionContextType.timeRange;

    @IsValidClassInstance(TimeRange)
    timeRange: TimeRange;

    constructor(dto: DTO<TimeRangeContext>) {
        super();

        if (!dto) return;

        const { timeRange } = dto;

        // avoid side-effects
        this.timeRange = cloneToPlainObject(timeRange);
    }
}
