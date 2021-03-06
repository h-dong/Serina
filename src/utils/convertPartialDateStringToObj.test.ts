import convertPartialDateStringToObj from './convertPartialDateStringToObj';
import { DateTime, Settings } from 'luxon';

describe('convertDateStringToObj', () => {
    // Mock Date Time to Sat Jun 29 2019 15:48:12 GMT+0100
    Settings.now = () => 1561819692628;

    const currentYear = DateTime.utc().year;

    afterAll(() => {
        // Restore Mock
        Settings.now = () => Date.now();
    });

    test.each`
        input              | output
        ${'02/2009'}       | ${{ day: 1, month: 2, year: 2009 }}
        ${'Feb 2009'}      | ${{ day: 1, month: 2, year: 2009 }}
        ${'February 2009'} | ${{ day: 1, month: 2, year: 2009 }}
        ${'2/2009'}        | ${{ day: 1, month: 2, year: 2009 }}
        ${'2009 Feb'}      | ${{ day: 1, month: 2, year: 2009 }}
        ${'2009 February'} | ${{ day: 1, month: 2, year: 2009 }}
        ${'2009/2'}        | ${{ day: 1, month: 2, year: 2009 }}
        ${'02/20'}         | ${{ day: 20, month: 2, year: currentYear + 1 }}
        ${'02/10'}         | ${{ day: 2, month: 10, year: currentYear }}
        ${'Feb 20'}        | ${{ day: 20, month: 2, year: currentYear + 1 }}
        ${'Feb 20th'}      | ${{ day: 20, month: 2, year: currentYear + 1 }}
        ${'February 20'}   | ${{ day: 20, month: 2, year: currentYear + 1 }}
        ${'February 20th'} | ${{ day: 20, month: 2, year: currentYear + 1 }}
        ${'Feb 21st'}      | ${{ day: 21, month: 2, year: currentYear + 1 }}
        ${'20/02'}         | ${{ day: 20, month: 2, year: currentYear + 1 }}
        ${'20 Feb'}        | ${{ day: 20, month: 2, year: currentYear + 1 }}
        ${'20th Feb'}      | ${{ day: 20, month: 2, year: currentYear + 1 }}
        ${'20 February'}   | ${{ day: 20, month: 2, year: currentYear + 1 }}
        ${'20th February'} | ${{ day: 20, month: 2, year: currentYear + 1 }}
        ${'22nd Feb'}      | ${{ day: 22, month: 2, year: currentYear + 1 }}
        ${'23rd Feb'}      | ${{ day: 23, month: 2, year: currentYear + 1 }}
        ${'29 Jun'}        | ${{ day: 29, month: 6, year: currentYear }}
        ${'28 Jun'}        | ${{ day: 28, month: 6, year: currentYear + 1 }}
    `('should convert $input', ({ input, output }) => {
        const parsedText = convertPartialDateStringToObj(input);
        expect(parsedText).toEqual(output);
    });
});
