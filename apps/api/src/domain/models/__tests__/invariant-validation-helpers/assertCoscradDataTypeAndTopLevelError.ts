import { InternalError } from '../../../../lib/errors/InternalError';
import { Ctor } from '../../../../lib/types/Ctor';
import assertCoscradDataTypeError from './assertCoscradDataTypeError';

export default (result: unknown, propertyKey: string, TopLevelErrorCtor: Ctor<InternalError>) => {
    expect(result).toBeInstanceOf(TopLevelErrorCtor);

    assertCoscradDataTypeError(result as InternalError, propertyKey);
};
