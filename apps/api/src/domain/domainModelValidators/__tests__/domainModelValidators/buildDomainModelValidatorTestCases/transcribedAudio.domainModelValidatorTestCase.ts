import { TranscribedAudio } from '../../../../models/transcribed-audio/entities/transcribed-audio.entity';
import { ResourceType } from '../../../../types/ResourceType';
import NullOrUndefinedAggregateDTOError from '../../../errors/NullOrUndefinedResourceDTOError';
import { DomainModelValidatorTestCase } from '../../types/DomainModelValidatorTestCase';
import getValidAggregateInstanceForTest from '../utilities/getValidAggregateInstanceForTest';

const resourceType = ResourceType.transcribedAudio;

const validDTO = getValidAggregateInstanceForTest(resourceType).toDTO();

export const buildTranscribedAudioTestCase =
    (): DomainModelValidatorTestCase<TranscribedAudio> => ({
        resourceType: resourceType,
        validCases: [
            {
                dto: validDTO,
            },
        ],
        invalidCases: [
            {
                description: 'the dto is null',
                invalidDTO: null,
                expectedError: new NullOrUndefinedAggregateDTOError(ResourceType.transcribedAudio),
            },
        ],
    });
