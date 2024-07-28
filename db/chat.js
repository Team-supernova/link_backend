import connection from "./db.js";

/**
 * Get the chats in a chat room
 * @param {string} room chat room
 * @returns {Promise<Array>} array of chat results
 */
export const getChats = (room) => {
  return new Promise((resolve, reject) => {
    connection.query("SELECT * FROM chats WHERE room = ?", [room], (err, results) => {
      if (err) {
        reject(err);
      } else {
        resolve(results);
      }
    });
  });
};

/**
 * Store a chat message
 * @param {string} id chat ID
 * @param {string} sender sender's name
 * @param {string} receiver receiver's name
 * @param {string} message chat message
 * @param {string} imageURI image URI (optional)
 * @param {string} room chat room
 * @returns {Promise<Object>} stored chat object
 */
export const storeChat = async (id, sender, receiver, message, imageURI, room) => {
  await new Promise((resolve, reject) => {
    connection.query(
      "INSERT INTO chats (id, sender, receiver, message, imageURI, room) VALUES (?, ?, ?, ?, ?, ?)",
      [id, sender, receiver, message, imageURI, room],
      (err) => {
        if (err) {
          return reject(err);
        }
        resolve();
      }
    );
  });
  const chat = new Promise((resolve, reject) => {
    connection.query("SELECT * FROM chats WHERE id = ?", [id], (err, results) => {
      if (err) {
        reject(err);
      } else {
        resolve(results[0]);
      }
    });
  })
  return chat;
};

/**
 * Delete a chat message
 * @param {string} id chat ID
 * @returns {Promise} resolves when the chat is deleted
 */
export const deleteChat = (id) => {
  return new Promise((resolve, reject) => {
    connection.query("DELETE FROM chats WHERE id = ?", [id], (err, results) => {
      if (err) {
        reject(err);
      } else {
        resolve(results);
      }
    });
  });
};

/**
 * Edit a chat message
 * @param {string} id chat ID
 * @param {string} message new chat message
 * @returns {Promise} resolves when the chat is edited
 */
export const editChat = (id, message) => {
  return new Promise((resolve, reject) => {
    connection.query("UPDATE chats SET message = ? WHERE id = ?", [message, id], (err, results) => {
      if (err) {
        reject(err);
      } else {
        resolve(results);
      }
    });
  });
};
