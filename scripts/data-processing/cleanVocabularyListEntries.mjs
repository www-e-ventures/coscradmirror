import * as fs from 'fs';
import replaceNanWithNull from './utilities/replaceNanWithNull.mjs';

/**
 * - X Replace NaN with `null`
 * - X Filter out entries with `termId` = null
 * - X Remove entries with `vocabularyListName` = NaN
 * - Determine what list entires with `vocabularyListName` = NaN belong in
 * - *********** At top level ***********
 * - validate all variable values
 * - replace ' with ` in all data sets
 * - replace `vocabularyListName` with `vocabularyListId` by searching \ joining on vocabulary lists
 * - create `add entry for vocabulary list` command and batch upload!
 */

const parseVariableValues = (serializedInput) => {
    const validPropertyTypes = ['string', 'boolean'];

    const errors = [];

    let variableValues;

    try {
        variableValues = JSON.parse(serializedInput);
    } catch (error) {
        errors.push(error);
    }

    // Exit early if the serialized string input was invalid JSON
    if (errors.length) return errors;

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

    errors.push(propertyTypeErrors);

    return errors.length > 0 ? errors : variableValues;
};

export default (filepath) => {
    const text = fs.readFileSync(filepath, 'utf8');

    const cleanedText = replaceNanWithNull(text);

    const dirtyEntries = JSON.parse(cleanedText);

    const cleanedEntries = dirtyEntries.filter(({ termId }) => termId !== null);

    const entriesMissingVocabularyListIdToRecover = cleanedEntries.filter(
        ({ vocabularyListName }) => vocabularyListName === null
    );

    const cleanedEntriesWithValidVocabularyListId = cleanedEntries.filter(
        ({ vocabularyListName }) => vocabularyListName !== null
    );

    const cleanedEntriesWithInvalidVariableValues = cleanedEntriesWithValidVocabularyListId
        .map(({ variableValues }) => parseVariableValues(variableValues))
        .filter((errorOrResult) => errorOrResult instanceof Error)
        .filter(({ length }) => length > 0);

    if (cleanedEntriesWithInvalidVariableValues.length > 0) {
        throw new Error(`Some entries have invalid variable values`);
    }

    const entriesMissingVocabularyListIdToRecoverWithInvalidVariableValues =
        entriesMissingVocabularyListIdToRecover
            .map(({ variableValues }) => parseVariableValues(variableValues))
            .filter((errorOrResult) => errorOrResult instanceof Error)
            .filter(({ length }) => length > 0);

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
