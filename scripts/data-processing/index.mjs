import cleanTerms from './cleanTerms.mjs';
import cleanVocabularyListEntries from './cleanVocabularyListEntries.mjs';
import cleanVocabularyLists from './cleanVocabularyLists.mjs';
import { wasNotFound } from './search/NotFound.mjs';
import VocabularyListRepo from './search/VocabularyListRepo.mjs';

/**
 * - *********** At top level ***********
 * - replace ' with ` in all data sets
 * - replace `vocabularyListName` with `vocabularyListId` by searching \ joining on vocabulary lists
 * X join entries into vocabulary lists
 * - identify all terms that are not in a list
 * - Determine what list entires with `vocabularyListName` = NaN belong in
 */

const cleanedTerms = cleanTerms('./data/BA_2021_terms.json');

// console.log(cleanedTerms);

const cleanedVocabularyLists = cleanVocabularyLists('./data/BA_2021_vocabulary-lists.json');

// console.log(cleanedVocabularyLists);

const { validEntries, entriesToRecover: entriesMissingVocabularyListIdToRecover } =
    cleanVocabularyListEntries('./data/BA_2021_vocabulary-list-entries.json');

const vocabularyListRepo = new VocabularyListRepo(cleanedVocabularyLists);

const vocabularyListEntriesWithVocabularyListIds = validEntries.map(
    ({ termId, variableValues, vocabularyListName }) => {
        const vocabularyListSearchResult = vocabularyListRepo.findByNameEnglish(vocabularyListName);

        if (wasNotFound(vocabularyListSearchResult)) {
            throw new Error(`There is no vocabulary list named: ${vocabularyListName}`);
        }

        if (Array.isArray(vocabularyListSearchResult)) {
            throw new Error(`There are multiple vocabulary lists named: ${vocabularyListName}`);
        }

        return {
            termId,
            variableValues,
            vocabularyListId: vocabularyListSearchResult.id,
        };
    }
);

// Post these vocabulary lists!

// const termsInSomeList = new Set(
//     vocabularyListEntriesWithVocabularyListIds.map(({ termId }) => termId)
// );

// const termsInNoList = cleanedTerms.filter(({ id }) => !termsInSomeList.has(id));

// Terms not in list are 1-to-1 with entries missing a vocabulary lst
// We should manually review these and put them into paradigms
// console.log({
//     termsInNoList: termsInNoList.length,
//     entriesWithNoCorrespondingVocabList: entriesMissingVocabularyListIdToRecover.length,
// });
// fs.writeFileSync('data/output/BA_2021_terms_NOT_IN_A_LIST.json', JSON.stringify(termsInNoList));

/** AUDIO */
/**
 * - count all clips
 * - Standardize naming
 * - BA_ if not already there
 * - _12u34
 * - -2, -3, etc. remove
 * - make omit list (unpublished)
 * - ID number (e.g. avatar list, to carry paradigm)
 * - Sequence number first, e.g. 15_my_term (e.g. greetings), weather 03-my_weather_term
 *
 * - We need to map an audio clip name to a VL entry
 *     - Identify clips that are named using an ID vs. transcription first
 *     - If ID, simply look up the term ID in all terms
 *     - remove leading prefixes (e.g. BA_, 12-, 15_, BA_15_, BA_16-)
 *     - extract trailing linguistic analysis suffix if present (_12u31)
 *         - use this to populate `variableValues` for the audio clip
 *     - extract the transcription
 *         - convert filename spelling to standard orthography
 *         - search for `term` text in allTerms
 *         - may want to have approximate search for nasals and caps?
 *         - put the audio filename in
 *             - matched audio
 *             - unmatched audio
 *     - find and upload text term data for unmatched audio
 *     - make list of terms that have no audio, and remove `audioFilename` property for these
 *
 * - export to flat folder `BA_Audio_clips_consolidated_2022`
 * - convert wav to mp3 at end
 */
