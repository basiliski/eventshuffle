const { body, param, validationResult } = require('express-validator');

const validateCreateEvent = [
  body('name').notEmpty().withMessage('Event name is required'),
  body('dates').isArray().withMessage('Dates must be an array'),
  body('dates.*').isISO8601().withMessage('Each date must be a valid ISO 8601 date'),
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    next();
  }
];

const validateShowEvent = [
  param('id').isInt().withMessage('Invalid event ID'),
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    next();
  }
];

const validateVoteEvent = [
  param('id').isInt().withMessage('Invalid event ID'),
  body('name').notEmpty().withMessage('Name is required'),
  body('votes').isArray().withMessage('Votes must be an array'),
  body('votes.*').isISO8601().withMessage('Each vote must be a valid ISO 8601 date'),
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    next();
  }
];

const validateShowVotingResults = [
  param('id').isInt().withMessage('Invalid event ID'),
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    next();
  }
];

module.exports = {
  validateCreateEvent,
  validateShowEvent,
  validateVoteEvent,
  validateShowVotingResults
};