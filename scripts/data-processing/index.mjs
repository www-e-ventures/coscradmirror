import cleanTerms from './cleanTerms.mjs';
import cleanVocabularyListEntries from './cleanVocabularyListEntries.mjs';
import cleanVocabularyLists from './cleanVocabularyLists.mjs';

const cleanedTerms = cleanTerms('./data/BA_2021_terms.json');

// console.log(cleanedTerms);

const cleanedVocabularyLists = cleanVocabularyLists('./data/BA_2021_vocabulary-lists.json');

// console.log(cleanedVocabularyLists);

const cleanedVocabularyListEntries = cleanVocabularyListEntries(
    './data/BA_2021_vocabulary-list-entries.json'
);

console.log(cleanedVocabularyListEntries.validEntries);

console.log(cleanedVocabularyListEntries.entriesMissingVocabularyListIdToRecover);
