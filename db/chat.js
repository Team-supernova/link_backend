import connection from "./db.js";

/**
 * Get the chats in a chat room
 * @param {string} room chat room
 * @returns {Promise<Array>} array of chat results
 */
export const getChats = async (room) => {
  try {
    const query = {
      name: "get-chats",
      text: "SELECT * FROM chats WHERE room = $1",
      values: [room],
    };
    const result = await connection.query(query);
    return result.rows;
  } catch (error) {
    throw error;
  }
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
  try {
    const query = {
      name: "store-chat",
      text: "INSERT INTO chats (id, sender, receiver, message, imageURI, room) VALUES ($1, $2, $3, $4, $5, $6) RETURNING *",
      values: [id, sender, receiver, message, imageURI, room],
    };
    const result = await connection.query(query);
    return result.rows[0];
  } catch (error) {
    throw error;
  }
};

/**
 * Delete a chat message
 * @param {string} id chat ID
 * @returns {Promise} resolves when the chat is deleted
 */
export const deleteChat = async (id) => {
  try {
    const query = {
      name: "delete-chat",
      text: "DELETE FROM chats WHERE id = $1",
      values: [id],
    };
    await connection.query(query);
  } catch (error) {
    throw error;
  }
};

/**
 * Edit a chat message
 * @param {string} id chat ID
 * @param {string} message new chat message
 * @returns {Promise} resolves when the chat is edited
 */
export const editChat = async (id, message) => {
  try {
    const query = {
      name: "edit-chat",
      text: "UPDATE chats SET message = $1 WHERE id = $2",
      values: [message, id],
    };
    await connection.query(query);
  } catch (error) {
    throw error;
  }
};
