import { buildMessage, ValidateBy, ValidationOptions } from 'class-validator';
import buildSimpleValidationFunction from '../../buildSimpleValidationFunction';

export function IsValidClassInstance(Ctor, validationOptions?: ValidationOptions) {
    return ValidateBy({
        name: `Is${Ctor.name}`,
        validator: {
            validate: (value, _): boolean => {
                const result = buildSimpleValidationFunction(Ctor)(value);

                // TODO Set inner errors
                return result.length === 0;
            },
            defaultMessage: buildMessage(
                (eachPrefix) => eachPrefix + '$property must be a valid instance of ${Ctor.name}',
                validationOptions
            ),
        },
    });
}
