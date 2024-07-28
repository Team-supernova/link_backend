import connection from "./db.js";
import { generateRoomHash } from "../utils/index.js";

/**
 * get room from the previews table
 * @param {string} room_id The identifier hash of the room
 */
export const getRoom = async (room_id) => {
    return new Promise((resolve, reject) => {
        connection.query('SELECT room FROM previews WHERE room_hash = ?', [room_id], (err, results) => {
            if (err) {
                return reject(err);
            }
            resolve(results[0]);
        });
    });
}

export const combineUserAndGetRoom = async (user1, user2) => {
    const hash1 = generateRoomHash(user1, user2);
    const hash2 = generateRoomHash(user2, user1);
    
    return new Promise((resolve, reject) => {
        // Combine both queries into a single query using OR condition
        connection.query(
            'SELECT * FROM previews WHERE room_hash = ? OR room_hash = ?',
            [hash1, hash2],
            (err, results) => {
                if (err) {
                    console.error("Error querying database:", err);
                    return reject(err);
                }
                if (results.length > 0) {
                    return resolve(results[0].room);
                } else return resolve(null);
        });
    });
}

/**
 * check whether user is user1 or user2 and return all true
 * @param {string} sender user with the preview
 */
export const getUserPreviews = async (sender) => {
    return new Promise((resolve, reject) => {
        connection.query("SELECT * FROM previews WHERE user1 = ? OR user2 = ?", [sender, sender], (err, results) => {
        if (err) {
            console.error("Error querying database:", err);
            reject(err);
        }
        return resolve(results);
    });
    })
    
}

/**
 * creates a preview for the users
 * @param {string} user1 first user
 * @param {string} user2 second user
 * @param {string} room string of the room
 */
export const createPreview = async (user1, user2, room) => {
    if (!user1 || !user2 || !room) {
        throw new Error("Invalid input: user1, user2, and room must be defined");
    }
    // const res = combineUserAndGetRoom(user1, user2);
    // if (res) return;

    const room_id = generateRoomHash(user1, user2);
    return new Promise((resolve, reject) => {
        connection.query(
            "INSERT INTO previews (user1, user2, room, room_hash) VALUES (?, ?, ?, ?)",
            [user1, user2, room, room_id],
            (err) => {
                if (err) {
                    console.error("Error inserting into database:", err);
                    return reject(err);
                }
                resolve();
            }
        );
    });
};