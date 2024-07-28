import bcrypt from "bcryptjs";
import {v4 as uuidv4} from "uuid";
import { getUserByID } from "../db/user.js";

export const generateHash = async (password) => {
  const salt = await bcrypt.genSalt(10);
  return await bcrypt.hash(password, salt);
}

export const generateRoomHash = (user1, user2) => {
  return (user1 + "_" + user2);
}

export const compareHash = async (password, hash) => {
  const compare = bcrypt.compare; 
  return await compare(password, hash);
}

export const generateID = () => {
  return uuidv4();
}

export const verifyUser = (req, res, next) => {
  const id = req.headers['Authorization'];
  if (!id) return res.status(402).json({error: "No token"})
  const user = getUserByID(id);
  if (user) {
    req.locals.id = user;
    next();
  } else {
    res.status(402).json({error: "Invalid token"})
  }
}

/**
 * Sort all messages by date
 * @param {Array} messages list of messages
 */
export function sortMessagesByDate(messages) {
  if (Array.isArray(messages)) return messages.sort(
    (a, b) => parseInt(a.timestamp) - parseInt(b.timestamp)
  );
  return [];
}