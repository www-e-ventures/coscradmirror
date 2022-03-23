import { Term } from '../../../domain/models/term/entities/term.entity';
import { VocabularyList } from '../../../domain/models/vocabulary-list/entities/vocabulary-list.entity';
import { VocabularyListVariable } from '../../../domain/models/vocabulary-list/types/vocabulary-list-variable';
import { VocabularyListVariableValue } from '../../../domain/models/vocabulary-list/types/vocabulary-list-variable-value';
import { EntityId } from '../../../domain/types/entity-id';
import { NotFound } from '../../../lib/types/not-found';
import { TermViewModel } from './TermViewModel';

type VariableValues = Record<string, VocabularyListVariableValue>;

type VocabularyListEntryViewModel = {
    term: TermViewModel;

    variableValues: VariableValues;
};

export class VocabularyListViewModel {
    readonly name?: string;

    readonly nameEnglish?: string;

    readonly id: EntityId;

    readonly entries: VocabularyListEntryViewModel[];

    readonly variables: VocabularyListVariable[];

    readonly isPublished: boolean;

    readonly #baseAudioURL: string;

    constructor(vocabularyList: VocabularyList, allTerms: Term[], baseAudioURL: string) {
        const { entries, id, name, nameEnglish, variables, published } = vocabularyList;

        this.#baseAudioURL = baseAudioURL;

        this.id = id;

        this.name = name;

        this.nameEnglish = nameEnglish;

        this.isPublished = published;

        this.variables = variables;

        const newEntries = (entries || [])
            .map(({ termId, variableValues }) => {
                const termSearchResult = allTerms.find((term) => term.id === termId);

                return {
                    term: termSearchResult
                        ? new TermViewModel(termSearchResult, this.#baseAudioURL)
                        : NotFound,
                    variableValues,
                };
            })
            .filter(({ term }) => term !== NotFound);

        this.entries = newEntries as VocabularyListEntryViewModel[];
    }
}
