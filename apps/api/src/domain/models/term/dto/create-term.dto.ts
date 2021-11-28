export class CreateTermDto {
  id: string;
  term: string;
  termEnglish?: string;
  contributor: string;
  audioURL?: string;
  audioFormat?: string;
}
