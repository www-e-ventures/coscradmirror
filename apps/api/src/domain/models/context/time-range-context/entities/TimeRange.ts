import { IsPositive } from 'class-validator';
import { DTO } from '../../../../../types/DTO';
import BaseDomainModel from '../../../BaseDomainModel';

/**
 * TODO Consolidate this with `MediaTimeRange`
 */
export default class TimeRange extends BaseDomainModel {
    // TODO Use `@IsNonNegativeFiniteNumber`
    @IsPositive()
    readonly inPoint: number;

    // TODO Use `@IsNonNegativeFiniteNumber`

    @IsPositive()
    readonly outPoint: number;

    constructor(dto: DTO<TimeRange>) {
        super();

        if (!dto) return;

        this.inPoint = dto.inPoint;

        this.outPoint = dto.outPoint;
    }
}
