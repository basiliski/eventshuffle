const eventService = require('../services/eventService');

const listEvents = async (req, res) => {
  try {
    const events = await eventService.getAllEvents();
    res.json(events);
  } catch (err) {
    console.error(err);
    res.status(500).send('Internal Server Error');
  }
};

const createEvent = async (req, res) => {
  try {
    const newEventId = await eventService.createEvent(req.body);
    res.status(201).json({ id: newEventId });
  } catch (err) {
    console.error(err);
    res.status(500).send('Internal Server Error');
  }
};

const showEvent = async (req, res) => {
  try {
    const event = await eventService.getEventById(req.params.id);
    if (!event) return res.status(404).send('Event not found');
    res.json(event);
  } catch (err) {
    console.error(err);
    res.status(500).send('Internal Server Error');
  }
};

const voteEvent = async (req, res) => {
  try {
    const updatedEvent = await eventService.addVoteToEvent(req.params.id, req.body);
    if (!updatedEvent) return res.status(404).send('Event not found');
    res.status(201).json(updatedEvent);
  } catch (err) {
    console.error(err);
    res.status(500).send('Internal Server Error');
  }
};

const showVotingResults = async (req, res) => {
  try {
    const votes = await eventService.getEventVotes(req.params.id);
    if (!votes) return res.status(404).send('Event not found');
    res.json(votes);
  } catch (err) {
    console.error(err);
    res.status(500).send('Internal Server Error');
  }
};

module.exports = {
  listEvents,
  createEvent,
  showEvent,
  voteEvent,
  showVotingResults
};