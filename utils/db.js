import connection from "../connector";

export const getUserByEmail = async (email) => {
  connection.query("SELECT * FROM users WHERE email = ?", [email], (err, results) => {
    if (err) {
      throw err;
    }
    return results[0];
  });
}

export const createUser = async (email, password, name, avatar ) => {
  const createdAt = new Date().toLocaleDateString("en-US" );
  connection.query("INSERT INTO users (name, email, password, avatar, createdAt) VALUES (?, ?)", [name, email, password, avatar, createdAt], (err) => {
    if (err) {
      return res.status(500).send("Internal server error, could not create user");
    }
    return res.status(201).send("User created");
  });
}