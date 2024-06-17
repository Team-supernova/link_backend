import connection from ".";
import { generateID } from "../utils";

export const getUserByEmail = async (email) => {
  connection.query("SELECT * FROM users WHERE email = ?", [email], (err, results) => {
    if (err) {
      throw err;
    }
    return results[0];
  });
}

export const createUser = async (name, email, password, avatar, role) => {
  const id = generateID();
  const createdAt = new Date().toLocaleString();
  connection.query("INSERT INTO users (id, name, email, password, avatar, role, createdAt) VALUES (?, ?, ?, ?, ?, ?, ?)", [id, name, email, password, avatar, role, createdAt], (err) => {
    if (err) {
      return res.status(500).send("Internal server error");
    }
    return res.status(201).send("User created");
  });
}

export const getUserByID = async (id) => {
  connection.query("SELECT * FROM users WHERE id = ?", [id], (err, results) => {
    if (err) {
      throw err;
    }
    return results[0];
  });
}