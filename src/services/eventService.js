const db = require('../config/db');

const getAllEvents = async () => {
  const result = await db.query('SELECT * FROM events');
  return result.rows;
};

const createEvent = async (eventData) => {
  const { name, dates } = eventData;
  const result = await db.query(
    'INSERT INTO events (name, dates) VALUES ($1, $2) RETURNING *',
    [name, dates]
  );
  return result.rows[0];
};

const getEventById = async (id) => {
  const result = await db.query('SELECT * FROM events WHERE id = $1', [id]);
  return result.rows[0];
};

const addVoteToEvent = async (id, voteData) => {
  const result = await db.query(
    'UPDATE events SET votes = array_append(votes, $1) WHERE id = $2 RETURNING *',
    [voteData, id]
  );
  return result.rows[0];
};

const getEventVotes = async (id) => {
  const result = await db.query('SELECT votes FROM events WHERE id = $1', [id]);
  return result.rows[0].votes;
};

module.exports = {
  getAllEvents,
  createEvent,
  getEventById,
  addVoteToEvent,
  getEventVotes
};