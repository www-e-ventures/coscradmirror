import { NonEmptyString } from '@coscrad/data-types';
import { isNonEmptyObject } from '@coscrad/validation';
import cloneToPlainObject from '../../../lib/utilities/cloneToPlainObject';
import { DTO } from '../../../types/DTO';
import { AggregateId } from '../../types/AggregateId';
import BaseDomainModel from '../BaseDomainModel';
import { VocabularyListVariableValue } from './types/vocabulary-list-variable-value';

export class VocabularyListEntry extends BaseDomainModel {
    // TODO Make this a UUID
    @NonEmptyString()
    termId: AggregateId;

    // TODO Add type validation rules
    variableValues: Record<string, VocabularyListVariableValue>;

    constructor(dto: DTO<VocabularyListEntry>) {
        super();

        if (!dto) return;

        const { termId, variableValues } = dto;

        this.termId = termId;

        this.variableValues = isNonEmptyObject(variableValues)
            ? cloneToPlainObject(variableValues)
            : null;
    }
}
