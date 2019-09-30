import { DateTime, Settings } from 'luxon';
import { TestCaseSchema } from '../../../serina.schema';
import DateAndTime from './dateAndTime';

// Mock Date Time to Thu Jun 20 2019 08:34:52 GMT+0100
const mockDate = 1561019692628;
Settings.now = () => mockDate;
const currentYear = DateTime.utc().year;
const currentMonth = DateTime.utc().month;
const currentDay = DateTime.utc().day;

afterAll(() => {
    // Restore Date Time Mock
    Settings.now = () => Date.now();
});

const mockDates = (day, month, year, hour, minute) => DateTime.utc()
    .set({ day, month, year, hour, minute })
    .startOf('minute')
    .toJSDate();

describe('DateAndTime', () => {

    const fullDateTestCases: TestCaseSchema[] = [{
        case: 'buy milk 20',
        result: null,
    }, {
        case: 'go to work on 02/17/2009 4pm',
        result: [
            { dateTime: mockDates(17, 2, 2009, 16, 0), text: 'go to work', matched: 'on 02/17/2009 4pm' },
        ],
    }, {
        case: 'go to work on 17/02/2009 at 8:30am',
        result: [
            { dateTime: mockDates(17, 2, 2009, 8, 30), text: 'go to work', matched: 'on 17/02/2009 at 8:30am' },
        ],
    }, {
        case: 'attend daily stand up on 2009/02/17 09:45',
        result: [
            { dateTime: mockDates(17, 2, 2009, 9, 45), text: 'attend daily stand up', matched: 'on 2009/02/17 09:45' },
        ],
    }, {
        case: 'go to work 2/17/2009 9am',
        result: [
            { dateTime: mockDates(17, 2, 2009, 9, 0), text: 'go to work', matched: '2/17/2009 9am' },
        ],
    }, {
        case: 'go to work on 17/2/2009 by 12pm',
        result: [
            { dateTime: mockDates(17, 2, 2009, 12, 0), text: 'go to work', matched: 'on 17/2/2009 by 12pm' },
        ],
    }, {
        case: 'go to work on 2009/2/17 12am',
        result: [
            { dateTime: mockDates(17, 2, 2009, 0, 0), text: 'go to work', matched: 'on 2009/2/17 12am' },
        ],
    }, {
        case: 'go to work on 2/17/2009 0:00',
        result: [
            { dateTime: mockDates(17, 2, 2009, 0, 0), text: 'go to work', matched: 'on 2/17/2009 0:00' },
        ],
    }, {
        case: 'go to work on 2-17-2009 at 11:00',
        result: [
            { dateTime: mockDates(17, 2, 2009, 11, 0), text: 'go to work', matched: 'on 2-17-2009 at 11:00' },
        ],
    }, {
        case: 'go to work on February 17, 2009 at 4PM',
        result: [
            { dateTime: mockDates(17, 2, 2009, 16, 0), text: 'go to work', matched: 'on February 17, 2009 at 4PM' },
        ],
    }, {
        case: 'go to work on 17 February, 2009 at 2 pm',
        result: [
            { dateTime: mockDates(17, 2, 2009, 14, 0), text: 'go to work', matched: 'on 17 February, 2009 at 2 pm' },
        ],
    }, {
        case: 'go to work on Feb 17, 2009 at 4 p.M.',
        result: [
            { dateTime: mockDates(17, 2, 2009, 16, 0), text: 'go to work', matched: 'on Feb 17, 2009 at 4 p.M.' },
        ],
    }, {
        case: 'go to work on 17 Feb, 2009 by 4 p.m.',
        result: [
            { dateTime: mockDates(17, 2, 2009, 16, 0), text: 'go to work', matched: 'on 17 Feb, 2009 by 4 p.m.' },
        ],
    }, {
        case: 'go to work on Feb 17, 2014 by 4p.m.',
        result: [
            { dateTime: mockDates(17, 2, 2014, 16, 0), text: 'go to work', matched: 'on Feb 17, 2014 by 4p.m.' },
        ],
    }, {
        case: 'go to work on 17 Feb, 2014 at 8:30am',
        result: [
            { dateTime: mockDates(17, 2, 2014, 8, 30), text: 'go to work', matched: 'on 17 Feb, 2014 at 8:30am' },
        ],
    }, {
        case: 'go to work on 21st Feb 2019 at 8:30am',
        result: [
            { dateTime: mockDates(21, 2, 2019, 8, 30), text: 'go to work', matched: 'on 21st Feb 2019 at 8:30am' },
        ],
    }, {
        case: 'go to work on Feb 21st 2019 at 8:30am',
        result: [
            { dateTime: mockDates(21, 2, 2019, 8, 30), text: 'go to work', matched: 'on Feb 21st 2019 at 8:30am' },
        ],
    }, {
        case: 'go to work on 22nd Feb 2019 at 8:30am',
        result: [
            { dateTime: mockDates(22, 2, 2019, 8, 30), text: 'go to work', matched: 'on 22nd Feb 2019 at 8:30am' },
        ],
    }, {
        case: 'go to work on Feb 22nd 2019 at 8:30am',
        result: [
            { dateTime: mockDates(22, 2, 2019, 8, 30), text: 'go to work', matched: 'on Feb 22nd 2019 at 8:30am' },
        ],
    }, {
        case: 'go to work on 22nd Feb 2019 at 8:30am',
        result: [
            { dateTime: mockDates(22, 2, 2019, 8, 30), text: 'go to work', matched: 'on 22nd Feb 2019 at 8:30am' },
        ],
    }, {
        case: 'go to work on Feb 22nd 2019 at 8:30am',
        result: [
            { dateTime: mockDates(22, 2, 2019, 8, 30), text: 'go to work', matched: 'on Feb 22nd 2019 at 8:30am' },
        ],
    }, {
        case: 'go to work on 17th February 2019 at 8:30am',
        result: [
            { dateTime: mockDates(17, 2, 2019, 8, 30), text: 'go to work', matched: 'on 17th February 2019 at 8:30am' },
        ],
    }, {
        case: 'go to work by February 17th 2019 at 8:30am',
        result: [
            { dateTime: mockDates(17, 2, 2019, 8, 30), text: 'go to work', matched: 'by February 17th 2019 at 8:30am' },
        ],
    }];

    const fullDateTimeFirstCases: TestCaseSchema[] = [{
        case: 'buy milk 20',
        result: null,
    }, {
        case: 'go to work 4pm on 02/17/2009',
        result: [
            { dateTime: mockDates(17, 2, 2009, 16, 0), text: 'go to work', matched: '4pm on 02/17/2009' },
        ],
    }, {
        case: 'go to work at 8:30am on 17/02/2009',
        result: [
            { dateTime: mockDates(17, 2, 2009, 8, 30), text: 'go to work', matched: 'at 8:30am on 17/02/2009' },
        ],
    }, {
        case: 'attend daily stand up 09:45 on 2009/02/17',
        result: [
            { dateTime: mockDates(17, 2, 2009, 9, 45), text: 'attend daily stand up', matched: '09:45 on 2009/02/17' },
        ],
    }, {
        case: 'go to work 9am 2/17/2009',
        result: [
            { dateTime: mockDates(17, 2, 2009, 9, 0), text: 'go to work', matched: '9am 2/17/2009' },
        ],
    }, {
        case: 'go to work by 12pm on 17/2/2009',
        result: [
            { dateTime: mockDates(17, 2, 2009, 12, 0), text: 'go to work', matched: 'by 12pm on 17/2/2009' },
        ],
    }, {
        case: 'go to work 12am on 2009/2/17',
        result: [
            { dateTime: mockDates(17, 2, 2009, 0, 0), text: 'go to work', matched: '12am on 2009/2/17' },
        ],
    }, {
        case: 'go to work 0:00 on 2/17/2009',
        result: [
            { dateTime: mockDates(17, 2, 2009, 0, 0), text: 'go to work', matched: '0:00 on 2/17/2009' },
        ],
    }, {
        case: 'go to work at 11:00 on 2-17-2009',
        result: [
            { dateTime: mockDates(17, 2, 2009, 11, 0), text: 'go to work', matched: 'at 11:00 on 2-17-2009' },
        ],
    }, {
        case: 'go to work at 4PM on February 17, 2009',
        result: [
            { dateTime: mockDates(17, 2, 2009, 16, 0), text: 'go to work', matched: 'at 4PM on February 17, 2009' },
        ],
    }, {
        case: 'go to work at 2 pm on 17 February, 2009',
        result: [
            { dateTime: mockDates(17, 2, 2009, 14, 0), text: 'go to work', matched: 'at 2 pm on 17 February, 2009' },
        ],
    }, {
        case: 'go to work at 4 p.M. on Feb 17, 2009',
        result: [
            { dateTime: mockDates(17, 2, 2009, 16, 0), text: 'go to work', matched: 'at 4 p.M. on Feb 17, 2009' },
        ],
    }, {
        case: 'go to work by 4 p.m. on 17 Feb, 2009',
        result: [
            { dateTime: mockDates(17, 2, 2009, 16, 0), text: 'go to work', matched: 'by 4 p.m. on 17 Feb, 2009' },
        ],
    }, {
        case: 'go to work by 4p.m. on Feb 17, 2014',
        result: [
            { dateTime: mockDates(17, 2, 2014, 16, 0), text: 'go to work', matched: 'by 4p.m. on Feb 17, 2014' },
        ],
    }, {
        case: 'go to work at 8:30am on 17 Feb, 2014',
        result: [
            { dateTime: mockDates(17, 2, 2014, 8, 30), text: 'go to work', matched: 'at 8:30am on 17 Feb, 2014' },
        ],
    }, {
        case: 'go to work at 8:30am on 21st Feb 2019',
        result: [
            { dateTime: mockDates(21, 2, 2019, 8, 30), text: 'go to work', matched: 'at 8:30am on 21st Feb 2019' },
        ],
    }, {
        case: 'go to work at 8:30am on Feb 21st 2019',
        result: [
            { dateTime: mockDates(21, 2, 2019, 8, 30), text: 'go to work', matched: 'at 8:30am on Feb 21st 2019' },
        ],
    }, {
        case: 'go to work at 8:30am on 22nd Feb 2019',
        result: [
            { dateTime: mockDates(22, 2, 2019, 8, 30), text: 'go to work', matched: 'at 8:30am on 22nd Feb 2019' },
        ],
    }, {
        case: 'go to work at 8:30am on Feb 22nd 2019',
        result: [
            { dateTime: mockDates(22, 2, 2019, 8, 30), text: 'go to work', matched: 'at 8:30am on Feb 22nd 2019' },
        ],
    }, {
        case: 'go to work at 8:30am on 22nd Feb 2019',
        result: [
            { dateTime: mockDates(22, 2, 2019, 8, 30), text: 'go to work', matched: 'at 8:30am on 22nd Feb 2019' },
        ],
    }, {
        case: 'go to work at 8:30am on Feb 22nd 2019',
        result: [
            { dateTime: mockDates(22, 2, 2019, 8, 30), text: 'go to work', matched: 'at 8:30am on Feb 22nd 2019' },
        ],
    }, {
        case: 'go to work at 8:30am on 17th February 2019',
        result: [
            { dateTime: mockDates(17, 2, 2019, 8, 30), text: 'go to work', matched: 'at 8:30am on 17th February 2019' },
        ],
    }, {
        case: 'go to work at 8:30am by February 17th 2019',
        result: [
            { dateTime: mockDates(17, 2, 2019, 8, 30), text: 'go to work', matched: 'at 8:30am by February 17th 2019' },
        ],
    }];

    const partialDateTestCases: TestCaseSchema[] = [{
        case: 'go to work on 30th 8:30am',
        result: [
            { dateTime: mockDates(30, currentMonth, currentYear, 8, 30), text: 'go to work', matched: 'on 30th 8:30am' },
        ],
    }, {
        case: 'go to work on 02/2009 at 8:30 am',
        result: [
            { dateTime: mockDates(1, 2, 2009, 8, 30), text: 'go to work', matched: 'on 02/2009 at 8:30 am' },
        ],
    }, {
        case: 'attend daily stand up on Feb 2009 at 09:45',
        result: [
            { dateTime: mockDates(1, 2, 2009, 9, 45), text: 'attend daily stand up', matched: 'on Feb 2009 at 09:45' },
        ],
    }, {
        case: 'go to work on February 2009 at 9am',
        result: [
            { dateTime: mockDates(1, 2, 2009, 9, 0), text: 'go to work', matched: 'on February 2009 at 9am' },
        ],
    }, {
        case: 'go to work on 2/2009 by 7pm',
        result: [
            { dateTime: mockDates(1, 2, 2009, 19, 0), text: 'go to work', matched: 'on 2/2009 by 7pm' },
        ],
    }, {
        case: 'go to work on 2009 Feb at 12pm',
        result: [
            { dateTime: mockDates(1, 2, 2009, 12, 0), text: 'go to work', matched: 'on 2009 Feb at 12pm' },
        ],
    }, {
        case: 'go to work on 2009 February at 12am',
        result: [
            { dateTime: mockDates(1, 2, 2009, 0, 0), text: 'go to work', matched: 'on 2009 February at 12am' },
        ],
    }, {
        case: 'go to work on 2009/2 at 0:00',
        result: [
            { dateTime: mockDates(1, 2, 2009, 0, 0), text: 'go to work', matched: 'on 2009/2 at 0:00' },
        ],
    }, {
        case: 'go to work on 02/20 at 11:00',
        result: [
            { dateTime: mockDates(20, 2, currentYear + 1, 11, 0), text: 'go to work', matched: 'on 02/20 at 11:00' },
        ],
    }, {
        case: 'go to work on 02/10 at 4PM',
        result: [
            { dateTime: mockDates(2, 10, currentYear, 16, 0 ), text: 'go to work', matched: 'on 02/10 at 4PM' },
        ],
    },  {
        case: 'go to work on 02-20 at 2 pm',
        result: [
            { dateTime: mockDates(20, 2, currentYear + 1, 14, 0), text: 'go to work', matched: 'on 02-20 at 2 pm' },
        ],
    }, {
        case: 'go to work on 02-10 at 4 p.M.',
        result: [
            { dateTime: mockDates(2, 10, currentYear, 16, 0), text: 'go to work', matched: 'on 02-10 at 4 p.M.' },
        ],
    }, {
        case: 'go to work on Feb 20 by 4p.m.',
        result: [
            { dateTime: mockDates(20, 2, currentYear + 1, 16, 0), text: 'go to work', matched: 'on Feb 20 by 4p.m.' },
        ],
    }, {
        case: 'go to work on Feb 20th at 8:30am',
        result: [
            { dateTime: mockDates(20, 2, currentYear + 1, 8, 30), text: 'go to work', matched: 'on Feb 20th at 8:30am' },
        ],
    }, {
        case: 'go to work on February 20 at 8:30am',
        result: [
            { dateTime: mockDates(20, 2, currentYear + 1, 8, 30), text: 'go to work', matched: 'on February 20 at 8:30am' },
        ],
    }, {
        case: 'go to work on February 20th at 8:30am',
        result: [
            { dateTime: mockDates(20, 2, currentYear + 1, 8, 30), text: 'go to work', matched: 'on February 20th at 8:30am' },
        ],
    }, {
        case: 'go to work on Feb 21st at 8:30am',
        result: [
            { dateTime: mockDates(21, 2, currentYear + 1, 8, 30), text: 'go to work', matched: 'on Feb 21st at 8:30am' },
        ],
    }, {
        case: 'go to work on Feb 22nd at 8:30am',
        result: [
            { dateTime: mockDates(22, 2, currentYear + 1, 8, 30), text: 'go to work', matched: 'on Feb 22nd at 8:30am' },
        ],
    }, {
        case: 'go to work on Feb 23rd at 8:30am',
        result: [
            { dateTime: mockDates(23, 2, currentYear + 1, 8, 30), text: 'go to work', matched: 'on Feb 23rd at 8:30am' },
        ],
    }, {
        case: 'go to work on 20/02 at 8:30am',
        result: [
            { dateTime: mockDates(20, 2, currentYear + 1, 8, 30), text: 'go to work', matched: 'on 20/02 at 8:30am' },
        ],
    }, {
        case: 'go to work on 20 Feb at 8:30am',
        result: [
            { dateTime: mockDates(20, 2, currentYear + 1, 8, 30), text: 'go to work', matched: 'on 20 Feb at 8:30am' },
        ],
    }, {
        case: 'go to work on 20th Feb at 8:30am',
        result: [
            { dateTime: mockDates(20, 2, currentYear + 1, 8, 30), text: 'go to work', matched: 'on 20th Feb at 8:30am' },
        ],
    }, {
        case: 'go to work on 20 February at 8:30am',
        result: [
            { dateTime: mockDates(20, 2, currentYear + 1, 8, 30), text: 'go to work', matched: 'on 20 February at 8:30am' },
        ],
    }, {
        case: 'go to work on 20th February at 8:30am',
        result: [
            { dateTime: mockDates(20, 2, currentYear + 1, 8, 30), text: 'go to work', matched: 'on 20th February at 8:30am' },
        ],
    }, {
        case: 'go to work on 21st Feb at 8:30am',
        result: [
            { dateTime: mockDates(21, 2, currentYear + 1, 8, 30), text: 'go to work', matched: 'on 21st Feb at 8:30am' },
        ],
    }, {
        case: 'go to work on 22nd Feb at 8:30am',
        result: [
            { dateTime: mockDates(22, 2, currentYear + 1, 8, 30), text: 'go to work', matched: 'on 22nd Feb at 8:30am' },
        ],
    }, {
        case: 'go to work on 23rd Feb at 8:30am',
        result: [
            { dateTime: mockDates(23, 2, currentYear + 1, 8, 30), text: 'go to work', matched: 'on 23rd Feb at 8:30am' },
        ],
    }, {
        case: 'go to work on 3rd at 8:30am',
        result: [
            { dateTime: mockDates(3, currentMonth + 1, currentYear, 8, 30), text: 'go to work', matched: 'on 3rd at 8:30am' },
        ],
    }, {
        case: 'go to work on the 30th at 8:30am',
        result: [
            { dateTime: mockDates(30, currentMonth, currentYear, 8, 30), text: 'go to work', matched: 'on the 30th at 8:30am' },
        ],
    },  {
        case: 'go to work on 30th at 8:30am',
        result: [
            { dateTime: mockDates(30, currentMonth, currentYear, 8, 30), text: 'go to work', matched: 'on 30th at 8:30am' },
        ],
    }, {
        case: 'buy milk 20',
        result: null,
    }];

    const partialDateTimeFirstCases: TestCaseSchema[] = [{
        case: 'go to work at 8:30 am on 02/2009',
        result: [
            { dateTime: mockDates(1, 2, 2009, 8, 30), text: 'go to work', matched: 'at 8:30 am on 02/2009' },
        ],
    }, {
        case: 'attend daily stand up 09:45 on Feb 2009',
        result: [
            { dateTime: mockDates(1, 2, 2009, 9, 45), text: 'attend daily stand up', matched: '09:45 on Feb 2009' },
        ],
    }, {
        case: 'go to work 9am on February 2009',
        result: [
            { dateTime: mockDates(1, 2, 2009, 9, 0), text: 'go to work', matched: '9am on February 2009' },
        ],
    }, {
        case: 'go to work by 7pm on 2/2009',
        result: [
            { dateTime: mockDates(1, 2, 2009, 19, 0), text: 'go to work', matched: 'by 7pm on 2/2009' },
        ],
    }, {
        case: 'go to work 12pm on 2009 Feb',
        result: [
            { dateTime: mockDates(1, 2, 2009, 12, 0), text: 'go to work', matched: '12pm on 2009 Feb' },
        ],
    }, {
        case: 'go to work 12am on 2009 February',
        result: [
            { dateTime: mockDates(1, 2, 2009, 0, 0), text: 'go to work', matched: '12am on 2009 February' },
        ],
    }, {
        case: 'go to work 0:00 on 2009/2',
        result: [
            { dateTime: mockDates(1, 2, 2009, 0, 0), text: 'go to work', matched: '0:00 on 2009/2' },
        ],
    }, {
        case: 'go to work at 11:00 on 02/20',
        result: [
            { dateTime: mockDates(20, 2, currentYear + 1, 11, 0), text: 'go to work', matched: 'at 11:00 on 02/20' },
        ],
    }, {
        case: 'go to work at 4PM on 02/10',
        result: [
            { dateTime: mockDates(2, 10, currentYear, 16, 0 ), text: 'go to work', matched: 'at 4PM on 02/10' },
        ],
    },  {
        case: 'go to work at 2 pm on 02-20',
        result: [
            { dateTime: mockDates(20, 2, currentYear + 1, 14, 0), text: 'go to work', matched: 'at 2 pm on 02-20' },
        ],
    }, {
        case: 'go to work at 4 p.M. on 02-10',
        result: [
            { dateTime: mockDates(2, 10, currentYear, 16, 0), text: 'go to work', matched: 'at 4 p.M. on 02-10' },
        ],
    }, {
        case: 'go to work by 4p.m. on Feb 20',
        result: [
            { dateTime: mockDates(20, 2, currentYear + 1, 16, 0), text: 'go to work', matched: 'by 4p.m. on Feb 20' },
        ],
    }, {
        case: 'go to work at 8:30am on Feb 20th',
        result: [
            { dateTime: mockDates(20, 2, currentYear + 1, 8, 30), text: 'go to work', matched: 'at 8:30am on Feb 20th' },
        ],
    }, {
        case: 'go to work at 8:30am on February 20',
        result: [
            { dateTime: mockDates(20, 2, currentYear + 1, 8, 30), text: 'go to work', matched: 'at 8:30am on February 20' },
        ],
    }, {
        case: 'go to work at 8:30am on February 20th',
        result: [
            { dateTime: mockDates(20, 2, currentYear + 1, 8, 30), text: 'go to work', matched: 'at 8:30am on February 20th' },
        ],
    }, {
        case: 'go to work at 8:30am on Feb 21st',
        result: [
            { dateTime: mockDates(21, 2, currentYear + 1, 8, 30), text: 'go to work', matched: 'at 8:30am on Feb 21st' },
        ],
    }, {
        case: 'go to work at 8:30am on Feb 22nd',
        result: [
            { dateTime: mockDates(22, 2, currentYear + 1, 8, 30), text: 'go to work', matched: 'at 8:30am on Feb 22nd' },
        ],
    }, {
        case: 'go to work at 8:30am on Feb 23rd',
        result: [
            { dateTime: mockDates(23, 2, currentYear + 1, 8, 30), text: 'go to work', matched: 'at 8:30am on Feb 23rd' },
        ],
    }, {
        case: 'go to work at 8:30am on 20/02',
        result: [
            { dateTime: mockDates(20, 2, currentYear + 1, 8, 30), text: 'go to work', matched: 'at 8:30am on 20/02' },
        ],
    }, {
        case: 'go to work at 8:30am on 20 Feb',
        result: [
            { dateTime: mockDates(20, 2, currentYear + 1, 8, 30), text: 'go to work', matched: 'at 8:30am on 20 Feb' },
        ],
    }, {
        case: 'go to work at 8:30am on 20th Feb',
        result: [
            { dateTime: mockDates(20, 2, currentYear + 1, 8, 30), text: 'go to work', matched: 'at 8:30am on 20th Feb' },
        ],
    }, {
        case: 'go to work at 8:30am on 20 February',
        result: [
            { dateTime: mockDates(20, 2, currentYear + 1, 8, 30), text: 'go to work', matched: 'at 8:30am on 20 February' },
        ],
    }, {
        case: 'go to work at 8:30am on 20th February',
        result: [
            { dateTime: mockDates(20, 2, currentYear + 1, 8, 30), text: 'go to work', matched: 'at 8:30am on 20th February' },
        ],
    }, {
        case: 'go to work at 8:30am on 21st Feb',
        result: [
            { dateTime: mockDates(21, 2, currentYear + 1, 8, 30), text: 'go to work', matched: 'at 8:30am on 21st Feb' },
        ],
    }, {
        case: 'go to work at 8:30am on 22nd Feb',
        result: [
            { dateTime: mockDates(22, 2, currentYear + 1, 8, 30), text: 'go to work', matched: 'at 8:30am on 22nd Feb' },
        ],
    }, {
        case: 'go to work at 8:30am on 23rd Feb',
        result: [
            { dateTime: mockDates(23, 2, currentYear + 1, 8, 30), text: 'go to work', matched: 'at 8:30am on 23rd Feb' },
        ],
    }, {
        case: 'go to work at 8:30am on 3rd',
        result: [
            { dateTime: mockDates(3, currentMonth + 1, currentYear, 8, 30), text: 'go to work', matched: 'at 8:30am on 3rd' },
        ],
    }, {
        case: 'go to work at 8:30am on 30th June',
        result: [
            { dateTime: mockDates(30, 6, currentYear, 8, 30), text: 'go to work', matched: 'at 8:30am on 30th June' },
        ],
    }, {
        case: 'go to work at 8:30am on the 30th',
        result: [
            { dateTime: mockDates(30, currentMonth, currentYear, 8, 30), text: 'go to work', matched: 'at 8:30am on the 30th' },
        ],
    },  {
        case: 'go to work at 8:30am on 30th',
        result: [
            { dateTime: mockDates(30, currentMonth, currentYear, 8, 30), text: 'go to work', matched: 'at 8:30am on 30th' },
        ],
    }];

    test('should parse the correct dates when dates are full', () => {
        fullDateTestCases.forEach(item => {
            const parsedText = DateAndTime.parseText(item.case);
            expect(parsedText).toEqual(item.result);
        });
    });

    test('should parse the correct dates when dates are full and time is before date', () => {
        fullDateTimeFirstCases.forEach(item => {
            const parsedText = DateAndTime.parseText(item.case);
            expect(parsedText).toEqual(item.result);
        });
    });

    test('should parse the correct dates when dates are partial', () => {
        partialDateTestCases.forEach(item => {
            const parsedText = DateAndTime.parseText(item.case);
            expect(parsedText).toEqual(item.result);
        });
    });

    test('should parse the correct dates when dates are partial and time is before date', () => {
        partialDateTimeFirstCases.forEach(item => {
            const parsedText = DateAndTime.parseText(item.case);
            expect(parsedText).toEqual(item.result);
        });
    });

    describe('should parse relative date and time (date first)', () => {

        test.each`
        filter                            | dateTime
        ${'today 5pm'}                    | ${mockDates(currentDay, currentMonth, currentYear, 17, 0)}
        ${'tomorrow at 8:30am'}           | ${mockDates(currentDay + 1, currentMonth, currentYear, 8, 30)}
        ${'in 5 days at 09:45'}           | ${mockDates(currentDay + 5, currentMonth, currentYear, 9, 45)}
        ${'in 31 days at 9am'}            | ${mockDates(currentDay + 31, currentMonth, currentYear, 9, 0)}
        ${'in a day by 7pm'}              | ${mockDates(currentDay + 1, currentMonth, currentYear, 19, 0)}
        ${'in a week 12pm'}               | ${mockDates(currentDay + 7, currentMonth, currentYear, 12, 0)}
        ${'in 5 weeks 12am'}              | ${mockDates(currentDay + 35, currentMonth, currentYear, 0, 0)}
        ${'in a wk 0:00'}                 | ${mockDates(currentDay + 7, currentMonth, currentYear, 0, 0)}
        ${'in 5 wks at 4PM'}              | ${mockDates(currentDay + 35, currentMonth, currentYear, 16, 0)}
        ${'in a month at 2 pm'}           | ${mockDates(currentDay, currentMonth + 1, currentYear, 14, 0)}
        ${'in 5 months at 4 p.M.'}        | ${mockDates(currentDay, currentMonth + 5, currentYear, 16, 0)}
        ${'in 12 months by 4p.m.'}        | ${mockDates(currentDay, currentMonth, currentYear + 1, 16, 0)}
        ${'in a year at quarter past 4'}  | ${mockDates(currentDay, currentMonth, currentYear + 1, 4, 15)}
        ${'in 5 years at quarter to 4'}   | ${mockDates(currentDay, currentMonth, currentYear + 5, 3, 45)}
        ${'in a yr at quarter to 4pm'}    | ${mockDates(currentDay, currentMonth, currentYear + 1, 15, 45)}
        ${'in 5 yrs at half past 4'}      | ${mockDates(currentDay, currentMonth, currentYear + 5, 4, 30)}
        ${'5 years later at 20 min to 4'} | ${mockDates(currentDay, currentMonth, currentYear + 5, 3, 40)}
        ${'5 years from now at 20 past 4'}| ${mockDates(currentDay, currentMonth, currentYear + 5, 4, 20)}
        `('should be able to parse $filter', ({ filter, dateTime }) => {
            const text = 'go to work';
            const results = DateAndTime.parseText(` ${text} ${filter}`);
            const output = [
                { dateTime, matched: filter, text },
            ];
            expect(results).toEqual(output);
        });
    });

    describe('should parse relative date and time (time first)', () => {

        test.each`
        filter                            | dateTime
        ${'5pm today'}                    | ${mockDates(currentDay, currentMonth, currentYear, 17, 0)}
        ${'at 8:30am tomorrow'}           | ${mockDates(currentDay + 1, currentMonth, currentYear, 8, 30)}
        ${'at 09:45 in 5 days'}           | ${mockDates(currentDay + 5, currentMonth, currentYear, 9, 45)}
        ${'at 9am in 31 days'}            | ${mockDates(currentDay + 31, currentMonth, currentYear, 9, 0)}
        ${'by 7pm in a day'}              | ${mockDates(currentDay + 1, currentMonth, currentYear, 19, 0)}
        ${'12pm in a week'}               | ${mockDates(currentDay + 7, currentMonth, currentYear, 12, 0)}
        ${'12am in 5 weeks'}              | ${mockDates(currentDay + 35, currentMonth, currentYear, 0, 0)}
        ${'0:00 in a wk'}                 | ${mockDates(currentDay + 7, currentMonth, currentYear, 0, 0)}
        ${'at 4PM in 5 wks'}              | ${mockDates(currentDay + 35, currentMonth, currentYear, 16, 0)}
        ${'at 2 pm in a month'}           | ${mockDates(currentDay, currentMonth + 1, currentYear, 14, 0)}
        ${'at 4 p.M. in 5 months'}        | ${mockDates(currentDay, currentMonth + 5, currentYear, 16, 0)}
        ${'by 4p.m. in 12 months'}        | ${mockDates(currentDay, currentMonth, currentYear + 1, 16, 0)}
        ${'at quarter past 4 in a year'}  | ${mockDates(currentDay, currentMonth, currentYear + 1, 4, 15)}
        ${'at quarter to 4 in 5 years'}   | ${mockDates(currentDay, currentMonth, currentYear + 5, 3, 45)}
        ${'at quarter to 4pm in a yr'}    | ${mockDates(currentDay, currentMonth, currentYear + 1, 15, 45)}
        ${'at half past 4 in 5 yrs'}      | ${mockDates(currentDay, currentMonth, currentYear + 5, 4, 30)}
        ${'at 20 min to 4 5 years later'} | ${mockDates(currentDay, currentMonth, currentYear + 5, 3, 40)}
        ${'at 20 past 4 5 years from now'}| ${mockDates(currentDay, currentMonth, currentYear + 5, 4, 20)}
        `('should be able to parse $filter', ({ filter, dateTime }) => {
            const text = 'go to work';
            const results = DateAndTime.parseText(` ${text} ${filter}`);
            const output = [
                { dateTime, matched: filter, text },
            ];
            expect(results).toEqual(output);
        });
    });

    describe('should not parse relative date and time without units', () => {

        test.each`
        filter                 | dateTime
        ${'in 5 at 4 pm'}      | ${null}
        ${'in 5 mins at 4'}    | ${null}
        ${'in 5 at 4'}         | ${null}
        `('should not parse $filter', ({ filter, dateTime }) => {
            const text = 'go to work';
            const results = DateAndTime.parseText(` ${text} ${filter}`);
            expect(results).toEqual(dateTime);
        });
    });
});