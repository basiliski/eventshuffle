const eventService = require('../../src/services/eventService');
const sql = require('../../src/config/db.js');
const userService = require('../../src/services/userService');
const voteService = require('../../src/services/voteService');
const dateService = require('../../src/services/dateService');


jest.mock('../../src/config/db.js', () => jest.fn());

jest.mock('../../src/services/userService');
jest.mock('../../src/services/voteService');
jest.mock('../../src/services/dateService');

describe('eventService', () => {
    afterEach(() => {
        jest.clearAllMocks();
    });

    describe('getAllEvents', () => {
        it('should return all events', async () => {
            const mockEvents = [{ id: 1, name: 'Event 1' }, { id: 2, name: 'Event 2' }];
            sql.mockResolvedValueOnce(mockEvents);

            const events = await eventService.getAllEvents();
            expect(events).toEqual(mockEvents);
        });
    });

    describe('eventExists', () => {
        it('should return the event if it exists', async () => {
            const mockEvent = { id: 1, name: 'Event 1' };
            sql.mockResolvedValueOnce([mockEvent]);

            const event = await eventService.eventExists('Event 1');
            expect(event).toEqual(mockEvent);
        });

        it('should return null if the event does not exist', async () => {
            sql.mockResolvedValueOnce([]);

            const event = await eventService.eventExists('Event 1');
            expect(event).toBeUndefined();
        });
    });

    describe('createEvent', () => {
        it('should return the existing event id if the event already exists', async () => {
            const mockEvent = { id: 1, name: 'Event 1' };
            sql.mockResolvedValueOnce([mockEvent]);

            const eventId = await eventService.createEvent({ name: 'Event 1', dates: [] });
            expect(eventId).toBe(1);
        });

        it('should create a new event and return the new event id', async () => {
            sql.mockResolvedValueOnce([]); // eventExists
            const mockEvent = { id: 1, name: 'Event 1' };
            sql.mockResolvedValueOnce([mockEvent]); // createEvent

            dateService.addDateToEvent.mockResolvedValueOnce();

            const eventId = await eventService.createEvent({ name: 'Event 1', dates: ['2023-10-01'] });
            expect(eventId).toBe(1);
            expect(dateService.addDateToEvent).toHaveBeenCalledWith(1, '2023-10-01');
        });
    });

    describe('getEventById', () => {
        it('should return event details by id', async () => {
            const mockEvent = { id: 1, name: 'Event 1' };
            const mockDates = ['2023-10-01'];
            const mockVotes = [{ date: '2023-10-01', people: ['John', 'Jane'] }];

            sql.mockResolvedValueOnce([mockEvent]); // getEventDetails
            dateService.getEventDates.mockResolvedValueOnce(mockDates);
            voteService.getVotesForEvent.mockResolvedValueOnce(mockVotes);

            const event = await eventService.getEventById(1);
            expect(event).toEqual({
                id: 1,
                name: 'Event 1',
                dates: mockDates,
                votes: mockVotes
            });
        });
    });

    describe('addVoteToEvent', () => {
        it('should add a vote to an event', async () => {
            const mockUserId = 1;
            const mockEvent = { id: 1, name: 'Event 1', dates: ['2023-10-01'], votes: [] };

            userService.getOrCreateUserId.mockResolvedValueOnce(mockUserId);
            voteService.handleVotes.mockResolvedValueOnce();
            eventService.getEventById = jest.fn().mockResolvedValueOnce(mockEvent);

            const event = await eventService.addVoteToEvent(1, { name: 'John', votes: ['2023-10-01'] });
            expect(event).toEqual(mockEvent);
            expect(userService.getOrCreateUserId).toHaveBeenCalledWith('John');
            expect(voteService.handleVotes).toHaveBeenCalledWith(mockUserId, 1, ['2023-10-01']);
        });
    });

    describe('getParticipants', () => {
        it('should return participants for an event', async () => {
            const mockParticipants = [{ id: 1, name: 'John' }, { id: 2, name: 'Jane' }];
            sql.mockResolvedValueOnce(mockParticipants);

            const participants = await eventService.getParticipants(1);
            expect(participants).toEqual(mockParticipants);
        });
    });

    describe('getSuitableDates', () => {
        it('should return suitable dates for an event', async () => {
            const mockDates = ['2023-10-01'];
            const mockParticipants = [{ id: 1, name: 'John' }, { id: 2, name: 'Jane' }];
            const mockVotes = ['John', 'Jane'];

            dateService.getEventDates.mockResolvedValueOnce(mockDates);
            eventService.getParticipants = jest.fn().mockResolvedValueOnce(mockParticipants);
            voteService.getVotesByDate.mockResolvedValueOnce(mockVotes);

            const suitableDates = await eventService.getSuitableDates(1);
            expect(suitableDates).toEqual([{ date: '2023-10-01', people: mockVotes }]);
        });
    });

    describe('getEventVotes', () => {
        it('should return event votes', async () => {
            const mockEvent = { id: 1, name: 'Event 1' };
            const mockSuitableDates = [{ date: '2023-10-01', people: ['John', 'Jane'] }];

            sql.mockResolvedValueOnce([mockEvent]); // getEventDetails
            eventService.getSuitableDates = jest.fn().mockResolvedValueOnce(mockSuitableDates);

            const eventVotes = await eventService.getEventVotes(1);
            expect(eventVotes).toEqual({
                id: 1,
                name: 'Event 1',
                suitableDates: mockSuitableDates
            });
        });
    });
});