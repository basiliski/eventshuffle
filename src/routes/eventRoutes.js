const express = require('express');
const eventController = require('../controllers/eventController');

const router = express.Router();

router.get('/list', eventController.listEvents);
router.post('/', eventController.createEvent);
router.get('/:id', eventController.showEvent);
router.post('/:id/vote', eventController.voteEvent);
router.get('/:id/results', eventController.showVotingResults);

module.exports = router;