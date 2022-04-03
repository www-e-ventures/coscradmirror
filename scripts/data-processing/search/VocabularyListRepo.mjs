import { NotFound } from './NotFound.mjs';

export default class VocabularyListRepo {
    #allVocabularyLists;

    constructor(allVocabularyLists) {
        this.#allVocabularyLists = allVocabularyLists;
    }

    findByNameEnglish(nameToMatch) {
        const results = this.#allVocabularyLists.filter(
            ({ nameEnglish }) => nameEnglish === nameToMatch
        );

        if (results.length === 0) return NotFound;

        // This will be an array
        if (results.length > 1) return results;

        // Return a single element if we have a unique result
        return results[0];
    }
}
