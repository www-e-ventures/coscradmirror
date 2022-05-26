import { validateSync } from 'class-validator';
import { SimpleValidationFunction } from './interfaces/SimpleValidationFunction';

interface Ctor<T> {
    new (...args): T;
}

/* eslint-disable @typescript-eslint/ban-types */
export default (ModelCtor: Ctor<Object>): SimpleValidationFunction =>
    (input: unknown) => {
        const instanceToValidate = new ModelCtor(input);

        // plainToInstance(ModelCtor, input, {
        //     enableImplicitConversion: false,
        // });

        return validateSync(instanceToValidate, {
            skipMissingProperties: false,
        });
    };
