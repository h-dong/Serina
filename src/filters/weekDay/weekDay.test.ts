import { DateTime, Settings } from 'luxon';
import WeekDay from './weekDay';
import { ParsedMatchSchema } from 'serina.schema';

describe('Day Of The Week', () => {
    const mockWeekday = weekday =>
        DateTime.utc()
            .set({ weekday })
            .endOf('day')
            .toJSDate();

    beforeAll(() => {
        // Mock Date Time to Saturday, 19 January 2019 18:06:18 GMT+00:00
        Settings.now = () => new Date(2019, 0, 19).valueOf();
    });

    afterAll(() => {
        // Restore Mock
        Settings.now = () => Date.now();
    });

    describe('parseText()', () => {
        test('should find a single match', () => {
            const text = 'hand in paper on mon';
            const result: ParsedMatchSchema[] = [
                {
                    dateTime: mockWeekday(8),
                    text: 'hand in paper',
                    matched: 'on mon',
                },
            ];

            expect(WeekDay.parseText(text)).toEqual(result);
        });

        test('should find multiple matches', () => {
            const text = "hand in tuesday's paper on mon";
            const result: ParsedMatchSchema[] = [
                {
                    dateTime: mockWeekday(9),
                    text: "hand in 's paper on mon",
                    matched: 'tuesday',
                },
                {
                    dateTime: mockWeekday(8),
                    text: "hand in tuesday's paper",
                    matched: 'on mon',
                },
            ];
            expect(WeekDay.parseText(text)).toEqual(result);
        });

        test('should return correct case for matched string', () => {
            const text = 'Hand in paper on mon';
            const result: ParsedMatchSchema[] = [
                {
                    dateTime: mockWeekday(8),
                    text: 'Hand in paper',
                    matched: 'on mon',
                },
            ];

            expect(WeekDay.parseText(text)).toEqual(result);
        });

        test('should not match filler word in string', () => {
            const text = 'Gym session Sun';
            const result: ParsedMatchSchema[] = [
                {
                    dateTime: mockWeekday(7),
                    text: 'Gym session',
                    matched: 'Sun',
                },
            ];

            expect(WeekDay.parseText(text)).toEqual(result);
        });
    });

    describe('Parse Text Contains Weekday', () => {
        let result: ParsedMatchSchema[];
        const relativeFutureArray = ['buy milk', 'buy milk for', 'buy milk next', 'buy milk this'];
        const relativePastArray = ['buy milk last', 'buy milk prev', 'buy milk previous'];

        beforeEach(() => {
            result = [
                {
                    dateTime: null,
                    text: 'buy milk',
                    matched: '',
                },
            ];
        });

        describe.each`
            title          | next  | last | weekdayArray
            ${'Monday'}    | ${8}  | ${1} | ${['mon', 'monday']}
            ${'Tuesday'}   | ${9}  | ${2} | ${['tue', 'tues', 'tuesday']}
            ${'Wednesday'} | ${10} | ${3} | ${['wed', 'wedn', 'wednesday']}
            ${'Thursday'}  | ${11} | ${4} | ${['thu', 'thur', 'thursday']}
            ${'Friday'}    | ${12} | ${5} | ${['fri', 'friday']}
            ${'Saturday'}  | ${13} | ${6} | ${['sat', 'saturday']}
            ${'Sunday'}    | ${7}  | ${0} | ${['sun', 'sunday']}
        `('$title', ({ title, next, last, weekdayArray }) => {
            test(`should parse date correctly for next ${title}`, () => {
                result[0].dateTime = mockWeekday(next);

                relativeFutureArray.forEach(elem => {
                    weekdayArray.forEach(weekday => {
                        const combination = `${elem} ${weekday}`;
                        result[0].matched = combination.replace('buy milk ', '');
                        expect(WeekDay.parseText(combination)).toEqual(result);
                    });
                });
            });

            test(`should return correct date for last ${title}`, () => {
                result[0].dateTime = mockWeekday(last);

                relativePastArray.forEach(elem => {
                    weekdayArray.forEach(weekday => {
                        const combination = `${elem} ${weekday}`;
                        result[0].matched = combination.replace('buy milk ', '');
                        expect(WeekDay.parseText(combination)).toEqual(result);
                    });
                });
            });
        });
    });
});
