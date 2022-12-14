import { IsNonNegativeFiniteNumber } from '@coscrad/validation';
import { CoscradDataType } from '../types/CoscradDataType';
import appendMetadata from '../utilities/appendMetadata';
import mixinDefaultTypeDecoratorOptions from './common/mixinDefaultTypeDecoratorOptions';
import { TypeDecoratorOptions } from './types/TypeDecoratorOptions';
import WithValidation from './validation/WithValidation';

export function NonNegativeFiniteNumber(
    userOptions: Partial<TypeDecoratorOptions> = {}
): PropertyDecorator {
    return (target: Object, propertyKey: string | symbol) => {
        const options = mixinDefaultTypeDecoratorOptions(userOptions);

        WithValidation(IsNonNegativeFiniteNumber(), options)(target, propertyKey);

        appendMetadata(target, propertyKey, CoscradDataType.NonNegativeFiniteNumber, options);
    };
}
