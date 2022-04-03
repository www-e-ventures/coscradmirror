import * as fs from 'fs';
import replaceNanWithNull from './utilities/replaceNanWithNull.mjs';

/**
 * - X Replace NaN with `null`
 * - X Filter out entries with `termId` = null
 * - X Remove entries with `vocabularyListName` = NaN
 * - Rename `to lay 3 rows of X` to `to lay 3 rows of 4`
 */

const parseVariableValues = (serializedInput) => {
    const validPropertyTypes = ['string', 'boolean'];

    const variableValues = JSON.parse(serializedInput);

    if (variableValues === null || variableValues === undefined)
        return errors.concat(new Error(`variableValues undefined`));

    const propertyTypeErrors = Object.entries(variableValues).reduce(
        (accumulatedErrors, [key, value]) => {
            const propertyType = typeof value;

            if (!validPropertyTypes.includes(propertyType))
                return accumulatedErrors.concat(
                    new Error(`Property ${key} has invalid type: ${propertyType}`)
                );

            return accumulatedErrors;
        },
        []
    );

    return propertyTypeErrors.length > 0 ? errors : variableValues;
};

export default (filepath) => {
    const text = fs.readFileSync(filepath, 'utf8');

    const cleanedText = replaceNanWithNull(text);

    const dirtyEntries = JSON.parse(cleanedText);

    const correctedDirtyEntries = dirtyEntries.map((dto) => ({
        ...dto,
        vocabularyListName:
            typeof dto.vocabularyListName === 'string' &&
            dto.vocabularyListName.includes('to lay 3 rows')
                ? 'to lay 3 rows of 4'
                : dto.vocabularyListName,
    }));

    const cleanedEntries = correctedDirtyEntries.filter(({ termId }) => termId !== null);

    const entriesMissingVocabularyListIdToRecover = cleanedEntries.filter(
        ({ vocabularyListName }) => vocabularyListName === null
    );

    const cleanedEntriesWithValidVocabularyListId = cleanedEntries.filter(
        ({ vocabularyListName }) => vocabularyListName !== null
    );

    const cleanedEntriesWithInvalidVariableValues = cleanedEntriesWithValidVocabularyListId
        .map(({ variableValues }) => parseVariableValues(variableValues))
        .filter(Array.isArray);

    if (cleanedEntriesWithInvalidVariableValues.length > 0) {
        console.log({
            cleanedEntriesWithInvalidVariableValuesLength:
                cleanedEntriesWithInvalidVariableValues.length,
        });
        // cleanedEntriesWithInvalidVariableValues.forEach((entry) => {
        //     console.log({
        //         entry,
        //     });
        // });
        throw new Error(
            `${cleanedEntriesWithInvalidVariableValues.length} entries have invalid variable values`
        );
    }

    const entriesMissingVocabularyListIdToRecoverWithInvalidVariableValues =
        entriesMissingVocabularyListIdToRecover
            .map(({ variableValues }) => parseVariableValues(variableValues))
            .filter(Array.isArray);

    if (entriesMissingVocabularyListIdToRecoverWithInvalidVariableValues.length > 0) {
        throw new Error(`Some entries to recover have invalid variable values`);
    }

    const validEntries = cleanedEntriesWithValidVocabularyListId.map((entry) => ({
        ...entry,
        variableValues: parseVariableValues(entry.variableValues),
    }));

    const entriesToRecover = entriesMissingVocabularyListIdToRecover.map((entry) => ({
        ...entry,
        variableValues: parseVariableValues(entry.variableValues),
    }));

    return {
        validEntries,
        entriesToRecover,
    };
};
