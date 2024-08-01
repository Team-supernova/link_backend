// connect to mysql
import pg from "pg";
import { config } from "dotenv";

config();

const { Client } = pg;

const connection_config = {
  user: process.env.PGUSER,
  password: process.env.PGPASSWORD,
  host: process.env.NODE_ENV === "production" ? process.env.PROD_PGHOST : process.env.DEV_PGHOST,
  port: process.env.PGPORT,
  database: process.env.PGDATABASE,
  connectionString: process.env.NODE_ENV === "production" ? process.env.PROD_PGURL : process.env.DRV_PGURL,
  ssl: {
    rejectUnauthorized: false
  },
}

const connection = new Client(connection_config);
await connection.connect();

connection.on('error', (err) => {
  console.error('something bad has happened!', err.stack)
})

try {
  await connection.query(`
    CREATE TABLE IF NOT EXISTS chats (
      id VARCHAR(255) NOT NULL PRIMARY KEY,
      message TEXT NOT NULL,
      imageURI VARCHAR(255),
      sender VARCHAR(255) NOT NULL,
      receiver VARCHAR(255) NOT NULL,
      room VARCHAR(255) NOT NULL,
      timestamp TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP
    )
  `);
  console.log("Successfully created chats table");

  await connection.query(`
    CREATE TABLE IF NOT EXISTS previews (
      room_hash VARCHAR(255) NOT NULL PRIMARY KEY,
      user1 VARCHAR(255) NOT NULL,
      user2 VARCHAR(255) NOT NULL,
      room VARCHAR(255) NOT NULL
    )
  `);
  console.log("Successfully created previews table");
} catch (err) {
  console.error("Could not create tables");
  console.error("Error: " + err.stack);
}

export default connection;