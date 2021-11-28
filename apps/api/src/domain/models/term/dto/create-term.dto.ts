// TODO [refactor] remove in favor of `PartialDTO<Term>`
export class CreateTermDto {
  id: string;
  term: string;
  termEnglish?: string;
  contributor: string;
  audioURL?: string;
  audioFormat?: string;
}
