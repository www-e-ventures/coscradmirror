import * as fs from 'fs';
import replaceNanWithNull from './utilities/replaceNanWithNull.mjs';

const isValidVocabularyList = (vl) => vl?.name || vl?.nameEnglish;

const removeAllPeriods = (text) => text.replace(/./g, '');

const standardNameForToLayRows = 'to lay 3 rows of 4';

const numberOfEntriesInAParadigm = 84;

export default (filepath) => {
    const text = fs.readFileSync(filepath, 'utf8');

    const cleanedText = replaceNanWithNull(text);

    const dirtyDTOs = JSON.parse(cleanedText);

    // Fix the error with `to lay rows` vocabulary list name
    const cleanedDTOsWithDuplicates = dirtyDTOs.map((dto) => ({
        ...dto,
        nameEnglish:
            typeof dto.nameEnglish === 'string' && dto.nameEnglish.includes('to lay 3 rows')
                ? standardNameForToLayRows
                : dto.nameEnglish,
        name: typeof dto.name === 'string' ? removeAllPeriods(dto.name) : dto.name,
    }));

    const cleanedDTOsWithNoDuplicates = cleanedDTOsWithDuplicates.reduce(
        ({ result, visitedNames }, dto) => {
            const { nameEnglish } = dto;

            if (visitedNames.includes(nameEnglish))
                return {
                    result,
                    visitedNames,
                };

            return {
                result: [...result, dto],
                visitedNames: [...visitedNames, nameEnglish],
            };
            // new name
        },
        {
            result: [],
            visitedNames: [],
        }
    ).result;

    /**
     * All of the duplicate lists stem from a single paradigm whose entries each
     * seeded the creation of a list with a slightly different name
     */
    if (
        cleanedDTOsWithDuplicates.length - cleanedDTOsWithNoDuplicates.length !==
        numberOfEntriesInAParadigm - 1
    ) {
        throw new Error('Removed the wrong number of duplicate lists!');
    }

    // remove invalid DTOs (no name or nameEnglish)
    const validDTOs = cleanedDTOsWithNoDuplicates.filter(isValidVocabularyList);

    return validDTOs;
};
