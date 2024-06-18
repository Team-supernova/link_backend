import { hash, genSalt, compare} from "bcryptjs";
import uuid from "uuid";
import { getUserByID } from "../db/user";

export const generateHash = async (password) => {
  const salt = await genSalt(10);
  return await hash(password, salt);
}

export const compareHash = async (password, hash) => {
  return await compare(password, hash);
}

export const generateID = () => {
  return uuid.v4();
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