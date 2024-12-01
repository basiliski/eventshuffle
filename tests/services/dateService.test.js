const dateService = require('../../src/services/dateService');
const sql = require('../../src/config/db.js');

jest.mock('../../src/config/db.js', () => jest.fn());

describe('dateService', () => {
    afterEach(() => {
        jest.clearAllMocks();
    });

    describe('getEventDates', () => {
        it('should return dates for a given event id', async () => {
            const mockDates = [{ date: '2023-10-01' }, { date: '2023-10-02' }];
            sql.mockResolvedValueOnce(mockDates);

            const dates = await dateService.getEventDates(1);
            expect(dates).toEqual(['2023-10-01', '2023-10-02']);
        });

        it('should return an empty array when no dates are found', async () => {
            sql.mockResolvedValueOnce([]);

            const dates = await dateService.getEventDates(1);
            expect(dates).toEqual([]);
        });
    });

    describe('addDateToEvent', () => {
        it('should add a date to an event when the date does not exist', async () => {

        });

        it('should not add a date to an event when the date already exists', async () => {

        });

        it('should add multiple dates to an event', async () => {

        });

        it('should not add an invalid date to an event', async () => {

        });

        it('should handle adding a date to a non-existent event', async () => {

        });
    });
});