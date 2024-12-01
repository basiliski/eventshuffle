const { formatDate } = require('../../src/utils');

test('formats date correctly for single digit month and day', () => {
    const date = new Date(2023, 0, 5); // January 5, 2023
    expect(formatDate(date)).toBe('2023-01-05');
});

test('formats date correctly for double digit month and day', () => {
    const date = new Date(2023, 10, 15); // November 15, 2023
    expect(formatDate(date)).toBe('2023-11-15');
});

test('formats date correctly for end of year', () => {
    const date = new Date(2023, 11, 31); // December 31, 2023
    expect(formatDate(date)).toBe('2023-12-31');
});

test('formats date correctly for leap year', () => {
    const date = new Date(2024, 1, 29); // February 29, 2024
    expect(formatDate(date)).toBe('2024-02-29');
});

test('formats date correctly for different time zones', () => {
    const date = new Date('2023-07-20T00:00:00Z'); // July 20, 2023 UTC
    expect(formatDate(date)).toBe('2023-07-20');
});