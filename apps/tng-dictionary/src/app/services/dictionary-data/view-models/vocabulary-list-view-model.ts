import { invalid, isInvalid, isValid, MaybeInvalid } from './invalid';
import { isNullOrUndefined } from './utilities/is-null-or-undefined';
import { validateId } from './utilities/validate-id';
import { validateStringWithLength } from './utilities/validate-string-with-length';
import { validateAudioData } from './utilities/validateAudioData';
import { validateRawContributor } from './utilities/validateContributor';
import {
  IViewModel,
  MapValidatedRawDataToDTO,
  RawDataValidator,
} from './view-model.interface';

export type RawVocabularyListDataWithoutEntries = {
  name: string;
  name_english: string;
  id: string;
  variables: variables;
  comments: string;
  vocabularyListEntries: VocabularyListEntry[];
};

export type TermDTO = {
  id: string;
  term: string;
  termEnglish?: string;
  contributor: string;
  audioURL?: string;
  audioFormat?: string;
};

const validateRawVocabularyListData = (
  input: unknown
): MaybeInvalid<RawVocabularyListDataWithoutEntries> => {
  const test = input as RawVocabularyListDataWithoutEntries;

  // Validate required properties
  const id = validateId(test.id);
  if (isInvalid(id)) return invalid;

  const term = validateStringWithLength(test.term);
  if (isInvalid(term)) return invalid;

  const contributor = validateRawContributor(test.contributor);
  if (isInvalid(contributor)) return invalid;

  // Validate optional properties
  const term_english = validateStringWithLength(test.term_english);
  const audio = validateAudioData(test.audio);

  return {
    id,
    term,
    contributor,
    term_english: isValid(term_english) ? term_english : undefined,
    audio: isValid(audio) ? audio : undefined,
  };
};

const mapValidatedRawVocabularyListDataToDTO = (
  validatedRawData: RawVocabularyListDataWithoutEntries
): TermDTO => {
  const {
    id,
    term,
    term_english,
    audio,
    contributor: { first_name, last_name },
  } = validatedRawData;

  const audioURL = audio?.url;
  const audioFormat = audio?.format;

  return {
    id,
    term,
    termEnglish: term_english,
    audioURL,
    contributor: `${first_name} ${last_name}`,
    audioFormat,
  };
};

export default class TermViewModel
  implements IViewModel<RawVocabularyListDataWithoutEntries, TermDTO>
{
  // Add Term View Model properties here

  id: string;

  term: string;

  termEnglish?: string;

  contributor: string;

  audioURL?: string;

  audioFormat?: string;

  constructor(rawData: unknown) {
    const dto = this.mapRawDataToDTO(
      rawData,
      validateRawVocabularyListData,
      mapValidatedRawVocabularyListDataToDTO
    );

    // Check if dto isInvalid(...) -> throw

    // set Term View Model properties from dto

    if (isInvalid(dto))
      throw new Error(`Invalid Vocabulary List Summary DTO: ${rawData}`);

    //    Object.assign(this, dto);
    this.id = dto.id;

    this.term = dto.term;

    this.termEnglish = dto.termEnglish || undefined;

    this.contributor = dto.contributor;

    this.audioURL = dto.audioURL || undefined;

    this.audioFormat = dto.audioFormat || undefined;
  }

  mapRawDataToDTO(
    rawData: unknown,
    validateRawData: RawDataValidator<RawVocabularyListDataWithoutEntries>,
    mapValidRawDataToDTO: MapValidatedRawDataToDTO<
      RawVocabularyListDataWithoutEntries,
      TermDTO
    >
  ): MaybeInvalid<TermDTO> {
    if (isNullOrUndefined(rawData)) return invalid;

    const maybeInvalidRawData = validateRawData(rawData);

    if (isInvalid(maybeInvalidRawData)) return invalid;

    return mapValidRawDataToDTO(maybeInvalidRawData);
  }
}

// private parseVocabularyListForVariables(vocabularyList){
//   let apiVariables = vocabularyList.variables;
//   if(!apiVariables) throw new Error(`Variables undefined on vocabulary list.`);
//   let parsedVariables = {
//     "checkboxes": [],
//     "dropboxes": []
//   };
//   for(let variable of apiVariables){
//     if(!variable.type) throw new Error(`Encountered variable of unknown type.`);
//     console.log(`Processing variable ${variable.name}`);
//     console.log(`and items of length ${variable.validValues.length}`)
//     if(variable.type === 'dropbox'){
//       let dropbox = this.parseDropbox(variable);
//       if(!dropbox) throw new Error(`Failed to parse dropbox.`);
//       console.log(`Pushing dropbox ${dropbox.prompt} to parsedVariables`);
//       parsedVariables.dropboxes.push(dropbox);
//     }
//     if(variable.type === 'checkbox') parsedVariables.checkboxes.push(this.parseCheckbox(variable));
//   }
//   return parsedVariables;
// }

// private parseCheckbox(variable){
//   if(!variable.items) throw new Error(`Unable to parse checkbox: items undefined.`);
//   let newItems = [];
//   for(let item of variable.items){
//     newItems.push(this.parseCheckbox(item));
//   }
//   let output: DropdownData<boolean> = {
//     "prompt": variable.name,
//     "items": newItems
//   }
//   return output;
// }

// private parseDropbox(variable){
//   if(!variable.validValues) throw new Error(`Unable to parse dropbox: items undefined.`);
//   let output: DropdownData<string> = {
//     "prompt": variable.name,
//     "items": variable.validValues
//   }
//   console.log(`Parsed dropbox of length ${output.items.length}`);
//   for(let v of output.items){
//     console.log(v.value);
//   }
//   return output;
// }

// private parseCheckboxItem(item){
//   return item.map(i=>{
//     return {
//       "value": Boolean(i.value),
//       "display": i.display
//     }
//   })
// }
