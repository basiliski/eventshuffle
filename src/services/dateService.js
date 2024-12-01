const sql = require('../config/db.js');


async function getEventDates(id) {
    const dates = await sql`
      SELECT TO_CHAR(date, 'YYYY-MM-DD') AS date
      FROM dates
      WHERE event_id = ${id}
    `;
    return dates.map(date => date.date);
}

async function addDateToEvent(eventId, date) {
    const [existingDate] = await sql`
      SELECT date FROM dates WHERE event_id = ${eventId} AND date = ${date}
    `;
    if (!existingDate) {
      await sql`
        INSERT INTO dates (event_id, date) VALUES (${eventId}, ${date})
      `;
      console.log(`Date ${date} added to event ${eventId}`);
    } else {
      console.log(`Date ${date} already exists for event ${eventId}`);
    }
  }
  
module.exports = {
    getEventDates,
    addDateToEvent
};