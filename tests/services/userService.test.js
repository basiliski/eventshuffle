const userService = require('../../src/services/userService');
const sql = require('../../src/config/db.js');

jest.mock('../../src/config/db.js', () => jest.fn());

describe('userService', () => {
    afterEach(() => {
        jest.clearAllMocks();
    });

    describe('getUserIdByName', () => {
        it('should return user id for a given name', async () => {
            const mockUser = { id: 1 };
            sql.mockResolvedValueOnce([mockUser]);

            const userId = await userService.getUserIdByName('John');
            expect(userId).toBe(1);
        });

        it('should return null if no user is found', async () => {
            sql.mockResolvedValueOnce([]);

            const userId = await userService.getUserIdByName('John');
            expect(userId).toBeNull();
        });
    });

    describe('createUser', () => {
        it('should create a user and return the new user id', async () => {
            const mockNewUser = { id: 1 };
            sql.mockResolvedValueOnce([mockNewUser]);

            const userId = await userService.createUser('John');
            expect(userId).toBe(1);
        });
    });

    describe('getOrCreateUserId', () => {
        it('should return existing user id if user already exists', async () => {
            const mockUser = { id: 1 };
            sql.mockResolvedValueOnce([mockUser]); // getUserIdByName
            sql.mockResolvedValueOnce([mockUser]); // createUser (should not be called)

            const userId = await userService.getOrCreateUserId('John');
            expect(userId).toBe(1);
        });

        it('should create a new user and return the new user id if user does not exist', async () => {
            sql.mockResolvedValueOnce([]); // getUserIdByName
            const mockNewUser = { id: 1 };
            sql.mockResolvedValueOnce([mockNewUser]); // createUser

            const userId = await userService.getOrCreateUserId('John');
            expect(userId).toBe(1);
        });
    });
});