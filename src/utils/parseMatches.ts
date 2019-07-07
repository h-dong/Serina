import { ParsedMatchSchema } from 'serina.schema';
import { trimWhiteSpaces } from './Helper';

function parseMatches(text: string, matchedDate: string, dateTimeObj: Date): ParsedMatchSchema {
    const regex = new RegExp(matchedDate, 'ig');
    const textRemain = text.replace(regex, '');

    // get the original capitalisation
    const matched = text.match(regex)[0];

    return {
        text: trimWhiteSpaces(textRemain),
        dateTime: dateTimeObj,
        matched: trimWhiteSpaces(matched),
    };
}

export default parseMatches;
