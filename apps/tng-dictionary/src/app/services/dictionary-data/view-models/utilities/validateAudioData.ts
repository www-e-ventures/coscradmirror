import { AudioData } from '../../types/audioData';
import { invalid, isInvalid, isValid, MaybeInvalid } from '../invalid';
import { isNullOrUndefined } from './is-null-or-undefined';
import { validateAudioFormat } from './validateAudioFormat';
import { validateUrl } from './validateURL';

export const validateAudioData = (input: unknown): MaybeInvalid<AudioData> => {
  if (isNullOrUndefined(input)) return invalid;

  const test = input as AudioData;

  const url = validateUrl(test.url);

  if (isInvalid(url)) return invalid;

  const format = validateAudioFormat(test.format);

  return isValid(format)
    ? {
        url,
        format,
      }
    : { url };
};
