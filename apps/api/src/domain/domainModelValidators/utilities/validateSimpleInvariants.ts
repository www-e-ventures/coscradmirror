import { buildSimpleValidator } from '@coscrad/validation';
import { InternalError } from '../../../lib/errors/InternalError';
import { DomainModelCtor } from '../../../lib/types/DomainModelCtor';

export default (ModelCtor: DomainModelCtor, dto: unknown): InternalError[] => {
    const simpleValidator = buildSimpleValidator(ModelCtor);

    const validationErrors = simpleValidator(dto);

    return validationErrors.map((error) => new InternalError(error.toString()));
};
