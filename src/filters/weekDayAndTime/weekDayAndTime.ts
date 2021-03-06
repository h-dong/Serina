import { DateTime } from 'luxon';
import { ParsedMatchSchema } from 'serina.schema';
import WEEKDAY from 'filters/weekDay/weekDay.constants';
import matchPattern from 'utils/matchPattern';
import convertTimeStringToObj from 'utils/convertTimeStringToObj';
import contains from 'utils/contains';
import WEEKDAY_AND_TIME from './weekDayAndTime.constants';
import TIME from 'filters/time/time.constants';
import convertWeekdayStringToNumber from 'utils/convertWeekdayStringToNumber';
import parseMatches from 'utils/parseMatches';

function getValidMatch(text: string, pattern: string): string {
    const matched = matchPattern(text, pattern);
    if (!matched || matched.length === 0) return null;
    const [value] = matched;
    return value;
}

export default class WeekDayAndTime {
    static parseText(text: string): ParsedMatchSchema[] {
        const pattern = WEEKDAY_AND_TIME.ANY;
        const matches = matchPattern(text, pattern);

        if (!matches) return null;

        // for each match, get the parsed cases
        return matches.map(match => {
            const dateTimeObj = this.convertWeekdayAndTimeToDateObj(match);
            return parseMatches(text, match, dateTimeObj);
        });
    }

    static convertWeekdayAndTimeToDateObj(matchingText) {
        const timeString = getValidMatch(matchingText, TIME.ANY);
        const { hour, minute } = convertTimeStringToObj(timeString);
        const [weekdayString] = matchPattern(matchingText, WEEKDAY.ANY);
        const pastWeekday: boolean = contains(matchingText, WEEKDAY.PAST_WORDS);
        const weekday = convertWeekdayStringToNumber(weekdayString, pastWeekday);

        const newDateTime = DateTime.utc().set({ weekday, hour, minute });

        if (!newDateTime.isValid) return null;

        return newDateTime.startOf('minute').toJSDate();
    }
}
