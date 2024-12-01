const sql = require('../config/db.js');
const dateService = require('./dateService.js');
const { formatDate } = require('../utils.js');

async function hasUserVoted(userId, dateId) {
    const [existingVote] = await sql`
      SELECT id
      FROM votes
      WHERE user_id = ${userId} AND date_id = ${dateId}
    `;
    return !!existingVote;
}

async function handleVotes(userId, eventId, votes) {
    for (const vote of votes) {
        const formattedDate = formatDate(vote);
        const [date] = await sql`
            SELECT id
            FROM dates
            WHERE event_id = ${eventId} AND date = ${formattedDate}
        `;
      if (!date) {
        console.log(`Date ${vote} not found for event ${eventId}`);
        continue;
      }
  
      const dateId = date.id;
      const alreadyVoted = await hasUserVoted(userId, dateId);
      if (alreadyVoted) {
        console.log(`User has already voted on date ${dateId}`);
        continue;
      }
  
      const [newVote] = await sql`
        INSERT INTO votes
          (user_id, date_id)
        VALUES
          (${userId}, ${dateId})
        RETURNING id, user_id, date_id
      `;
      console.log('newVote', newVote);
    }
}

async function getVotesByDate(id, date) {
    const votes = await sql`
      SELECT u.name
      FROM votes v
      LEFT JOIN users u ON v.user_id = u.id
      LEFT JOIN dates d ON d.id = v.date_id 
      WHERE d.event_id = ${id} AND d.date = ${date}
    `;
    return votes ? votes.map(vote => vote.name) : [];
}
  
async function getVotesForEvent(eventId) {
    const dates = await dateService.getEventDates(eventId);
    const votesByDate = [];
  
    //filter out dates with no votes
    for (const date of dates) {
      const people = await getVotesByDate(eventId, date);
      if (people.length > 0) {
        votesByDate.push({ date, people });
      }
    }
  
    return votesByDate;
}

module.exports = {
    hasUserVoted,
    handleVotes,
    getVotesByDate,
    getVotesForEvent
};