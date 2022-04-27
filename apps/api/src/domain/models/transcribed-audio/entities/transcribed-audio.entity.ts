import { InternalError } from '../../../../lib/errors/InternalError';
import isNumberWithinRange from '../../../../lib/validation/geometry/isNumberWithinRange';
import { DTO } from '../../../../types/DTO';
import InconsistentTimeRangeError from '../../../domainModelValidators/errors/context/invalidContextStateErrors/timeRangeContext/InconsistentTimeRangeError';
import { Valid } from '../../../domainModelValidators/Valid';
import { resourceTypes } from '../../../types/resourceTypes';
import { TimeRangeContext } from '../../context/time-range-context/time-range-context.entity';
import { Resource } from '../../resource.entity';
import { Transcript } from './Transcript';

export class TranscribedAudio extends Resource {
    readonly type = resourceTypes.transcribedAudio;

    readonly audioFilename: string;

    // we need to deal with units here
    readonly lengthMilliseconds: number;

    readonly startMilliseconds: number;

    readonly transcript: Transcript;

    constructor(dto: DTO<TranscribedAudio>) {
        super({ ...dto, type: resourceTypes.transcribedAudio });

        const {
            audioFilename,
            lengthMilliseconds,
            startMilliseconds,
            transcript: transcriptDto,
        } = dto;

        this.audioFilename = audioFilename;

        this.lengthMilliseconds = lengthMilliseconds;

        this.startMilliseconds = startMilliseconds;

        this.transcript = new Transcript(transcriptDto);
    }

    validateTimeRangeContext({ timeRange }: TimeRangeContext): Valid | InternalError {
        const { inPoint, outPoint } = timeRange;

        const isNumberOutOfRange = (n: number): boolean =>
            !isNumberWithinRange(n, this.getTimeBounds());

        /**
         * Note that the `startMilliseconds` doesn't have to be 0, so we need to
         * confirm here that `inPoint` isn't too low.
         */
        if ([inPoint, outPoint].some(isNumberOutOfRange))
            return new InconsistentTimeRangeError(timeRange, this);

        return Valid;
    }

    getTimeBounds(): [number, number] {
        return [this.startMilliseconds, this.getEndMilliseconds()];
    }

    getEndMilliseconds(): number {
        return this.startMilliseconds + this.lengthMilliseconds;
    }
}
