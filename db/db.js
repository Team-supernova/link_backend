// connect to mysql
import { createConnection } from "mysql2";
import { config } from "dotenv";

config();

const dev_connect = {
  host: "localhost",
  user: "root",
  password: "root",
  port: "3306",
  database: process.env.DB_NAME,
}

const prod_connect = {
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  port: process.env.DB_PORT,
  database: process.env.DB_NAME,
}

const connection_config = process.env.NODE_ENV === "production" ? prod_connect : dev_connect;

const connection = createConnection(connection_config)
connection.connect((err) => {
  if (err) {
    console.error("error connecting: " + err.stack)
    return
  }
  console.log("connected as id " + connection.threadId)
})
export default connection;