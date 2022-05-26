import { IsEnum, ValidateNested } from '@coscrad/validation';
import { DTO } from '../../../../../types/DTO';
import BaseDomainModel from '../../../BaseDomainModel';
import { IEdgeConnectionContext } from '../../interfaces/IEdgeConnectionContext';
import { EdgeConnectionContextType } from '../../types/EdgeConnectionContextType';
import TimeRange from './TimeRange';

export class TimeRangeContext extends BaseDomainModel implements IEdgeConnectionContext {
    @IsEnum(EdgeConnectionContextType)
    readonly type = EdgeConnectionContextType.timeRange;

    @ValidateNested()
    timeRange: TimeRange;

    constructor(dto: DTO<TimeRangeContext>) {
        super();

        if (!dto) return;

        const { timeRange: timeRangeDTO } = dto;

        this.timeRange = new TimeRange(timeRangeDTO);
    }
}
