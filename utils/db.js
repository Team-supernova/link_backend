import connection from "../connector";

export const getUserByEmail = async (email) => {
  connection.query("SELECT * FROM users WHERE email = ?", [email], (err, results) => {
    if (err) {
      throw err;
    }
    return results[0];
  });
}

export const createUser = async (email, password) => {
  connection.query("INSERT INTO users (email, password) VALUES (?, ?)", [email, password], (err) => {
    if (err) {
      return res.status(500).send("Internal server error");
    }
    return res.status(201).send("User created");
  });
}