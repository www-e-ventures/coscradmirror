import * as fs from 'fs';
import replaceNanWithNull from './utilities/replaceNanWithNull.mjs';

const fixAudioPropName = (text) => 
    text.replace(/audioFilename/g,'audioURL');

export default (filepath) =>{
    const text = fs.readFileSync(filepath,'utf8');

    // audioFilename => audioURL
    const cleanedText = replaceNanWithNull(fixAudioPropName(text)) ;
    
    const dirtyTermDTOs = JSON.parse(cleanedText);

    // with id = null removed
    const cleanTermDTOs = dirtyTermDTOs.filter(({id}) => id !== null);

    return cleanTermDTOs;
}


