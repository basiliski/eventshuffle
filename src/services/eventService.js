const sql = require('../config/db.js');
const userService = require('./userService.js');
const voteService = require('./voteService.js');
const dateService = require('./dateService.js');


async function getAllEvents() {
  const events = await sql`
    SELECT *
    FROM events
  `;
  return events;
}

async function eventExists(name) {
  const [event] = await sql`
    SELECT id, name FROM events WHERE name = ${name}
  `;
  return event;
}


async function createEvent(eventData) {
  const { name, dates } = eventData;
  const existingEvent = await eventExists(name);

  if (existingEvent) {
    console.log(`Event ${name} already exists`);
    return existingEvent.id;
  }

  const [event] = await sql`
    INSERT INTO events (name) VALUES (${name}) RETURNING id, name
  `;
  console.log('event', event);

  for (const date of dates) {
    await dateService.addDateToEvent(event.id, date);
  }

  return event.id;
}

async function getEventDetails(id) {
  const [event] = await sql`
    SELECT id, name
    FROM events
    WHERE id = ${id}
  `;
  return event;
}

async function getEventById(id) {
  const event = await getEventDetails(id);
  const dates = await dateService.getEventDates(id);
  const votes = await voteService.getVotesForEvent(id);

  return {
    id: event.id,
    name: event.name,
    dates,
    votes
  };
}

async function addVoteToEvent(eventId, voteData) {
  console.log('voteData', voteData);
  const { name, votes } = voteData;

  const userId = await userService.getOrCreateUserId(name);
  console.log('userId', userId);
  await voteService.handleVotes(userId, eventId, votes);

  return getEventById(eventId);
}

async function getParticipants(eventId) {
  const participants = await sql`
    SELECT DISTINCT u.id, u.name
    FROM votes v
    JOIN users u ON v.user_id = u.id
    JOIN dates d ON v.date_id = d.id
    WHERE d.event_id = ${eventId}
  `;
  return participants;
}

async function getSuitableDates(eventId) {
  const dates = await dateService.getEventDates(eventId);

  const participants = await getParticipants(eventId);
  const participantCount = participants.length;

  let suitableDates = [];

  for (const date of dates) {
    const people = await voteService.getVotesByDate(eventId, date);
    if (people.length === participantCount) {
      suitableDates.push({ date: date, people });
    }
  }

  return suitableDates;
}

async function getEventVotes(id) {
  const event = await getEventDetails(id);
  const suitableDates = await getSuitableDates(id);

  return {
    id: event.id,
    name: event.name,
    suitableDates
  };
}

module.exports = {
  getAllEvents,
  createEvent,
  getEventById,
  addVoteToEvent,
  getEventVotes
};