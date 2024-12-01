const postgres = require('postgres');
const dotenv = require('dotenv');

dotenv.config();

const sql = postgres({
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
  database: process.env.POSTGRES_DB,
  username: process.env.POSTGRES_USER,
  password: process.env.POSTGRES_PASSWORD
});

sql`
  SELECT 1
`.then(() => {
  console.log('Connected to the database successfully');
}).catch(err => {
  console.error('Error connecting to the database:', err);
});

module.exports = sql;