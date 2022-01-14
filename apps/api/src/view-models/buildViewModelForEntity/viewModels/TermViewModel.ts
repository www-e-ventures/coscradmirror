import { Term } from 'apps/api/src/domain/models/term/entities/term.entity';

const baseURL = `https://be.tsilhqotinlanguage.ca:3003/download?id=`;

const buildAudioURL = (filename: string, extension = 'mp3'): string =>
  `${baseURL}${filename}.${extension}`;

// TODO Add proper contributors repository \ collection
const contributors = {
  1: 'Bella Alphonse',
  2: 'William Myers',
};

const getContributorNameFromId = (id: string): string => contributors[id] || '';

export type ViewModelId = string;

export class TermViewModel {
  readonly id: ViewModelId;

  readonly contributor: string;

  readonly term: string;

  readonly termEnglish?: string;

  readonly audioURL?: string;

  readonly sourceProject?: string;

  readonly isPublished: boolean = false;

  constructor(term: Term) {
    const {
      id,
      contributorId,
      term: text,
      termEnglish: textEnglish,
      audioFilename,
      published: isPublished,
      sourceProject,
    } = term;

    this.id = id;

    this.contributor = getContributorNameFromId(contributorId);

    this.term = text;

    this.termEnglish = textEnglish;

    if (audioFilename) this.audioURL = buildAudioURL(audioFilename);

    if (typeof isPublished === 'boolean') this.isPublished = isPublished;

    if (sourceProject) this.sourceProject = sourceProject;
  }
}
