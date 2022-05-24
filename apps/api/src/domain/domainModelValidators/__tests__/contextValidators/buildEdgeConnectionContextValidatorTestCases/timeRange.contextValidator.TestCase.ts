import { InternalError } from '../../../../../lib/errors/InternalError';
import { DTO } from '../../../../../types/DTO';
import { TimeRangeContext } from '../../../../models/context/time-range-context/entities/time-range-context.entity';
import TimeRange from '../../../../models/context/time-range-context/entities/TimeRange';
import { EdgeConnectionContextType } from '../../../../models/context/types/EdgeConnectionContextType';
import { timeRangeContextValidator } from '../../../contextValidators/timeRangeContext.validator';
import EmptyTimeRangeContextError from '../../../errors/context/EmptyTimeRangeContextError';
import InvalidChronologicallyOrderedTimeRangeError from '../../../errors/context/InvalidChronologicallyOrderedTimeRangeError';
import InvalidEdgeConnectionContextError from '../../../errors/context/InvalidEdgeConnectionContextError';
import NullOrUndefinedEdgeConnectionContextDTOError from '../../../errors/context/NullOrUndefinedEdgeConnectionContextDTOError';
import { ContextModelValidatorTestCase } from '../types/ContextModelValidatorTestCase';
import createInvalidContextErrorFactory from './utilities/createInvalidContextErrorFactory';

const validDTO: DTO<TimeRangeContext> = {
    type: EdgeConnectionContextType.timeRange,
    timeRange: {
        inPoint: 22000,
        outPoint: 57880,
    },
};

const topLevelErrorFactory = createInvalidContextErrorFactory(EdgeConnectionContextType.timeRange);

const reversedTimeStamp: DTO<TimeRange> = {
    inPoint: validDTO.timeRange.outPoint,
    outPoint: validDTO.timeRange.inPoint,
};

export const buildTimeRangeTestCase = (): ContextModelValidatorTestCase<TimeRangeContext> => ({
    contextType: EdgeConnectionContextType.timeRange,
    validator: timeRangeContextValidator,
    validCases: [
        {
            dto: validDTO,
        },
    ],
    invalidCases: [
        {
            description: 'the context is empty',
            invalidDTO: null,
            expectedError: new NullOrUndefinedEdgeConnectionContextDTOError(
                EdgeConnectionContextType.timeRange
                // TODO remove cast
            ) as InternalError,
        },
        {
            description: 'the context type is invalid',
            invalidDTO: {
                ...validDTO,
                type: 'foobert' as EdgeConnectionContextType.timeRange,
            },
            expectedError: new InvalidEdgeConnectionContextError(
                EdgeConnectionContextType.timeRange
            ),
        },
        {
            description: 'the time range is empty',
            invalidDTO: {
                ...validDTO,
                timeRange: null as TimeRange,
            },
            expectedError: topLevelErrorFactory([new EmptyTimeRangeContextError()]),
        },
        {
            description: 'the in point is negative',
            invalidDTO: {
                ...validDTO,
                timeRange: {
                    inPoint: -100,
                    outPoint: 200,
                },
            },
            expectedError: topLevelErrorFactory([]),
        },
        {
            description: 'the inPoint and outPoint are in the wrong chronological order',
            invalidDTO: {
                ...validDTO,
                timeRange: reversedTimeStamp,
            },
            expectedError: topLevelErrorFactory([
                new InvalidChronologicallyOrderedTimeRangeError(reversedTimeStamp),
            ]),
        },
    ],
});
