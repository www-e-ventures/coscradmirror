import { BookViewModel } from '../book.view-model';
import { PhotographViewModel } from '../photograph.view-model';
import { SpatialFeatureViewModel } from '../spatial-data/spatial-feature.view-model';
import { TermViewModel } from '../term.view-model';
import { TranscribedAudioViewModel } from '../transcribed-audio/transcribed-audio.view-model';
import { VocabularyListViewModel } from '../vocabulary-list.view-model';

export type ResourceTypeToViewModel = {
    term: TermViewModel;
    vocabularyList: VocabularyListViewModel;
    transcribedAudio: TranscribedAudioViewModel;
    book: BookViewModel;
    photograph: PhotographViewModel;
    spatialFeature: SpatialFeatureViewModel;
};
