const express = require('express');
const eventController = require('../controllers/eventController');
const eventValidator = require('../validators/eventValidator');

const router = express.Router();

router.get('/list', eventController.listEvents);
router.post('/', eventValidator.validateCreateEvent, eventController.createEvent);
router.get('/:id', eventValidator.validateShowEvent, eventController.showEvent);
router.post('/:id/vote', eventValidator.validateVoteEvent, eventController.voteEvent);
router.get('/:id/results', eventValidator.validateShowVotingResults, eventController.showVotingResults);

module.exports = router;