const sql = require('../config/db.js');

async function getUserIdByName(name) {
  const [user] = await sql`
    SELECT id
    FROM users
    WHERE name = ${name}
  `;
  return user ? user.id : null;
}

async function createUser(name) {
  const [newUser] = await sql`
    INSERT INTO users (name)
    VALUES (${name})
    RETURNING id
  `;
  return newUser.id;
}

async function getOrCreateUserId(name) {
  let userId = await getUserIdByName(name);
  if (!userId) {
    userId = await createUser(name);
  }
  return userId;
}

module.exports = {
  getUserIdByName,
  createUser,
  getOrCreateUserId
};