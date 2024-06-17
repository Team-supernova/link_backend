import { hash, genSalt, compare} from "bcryptjs";
import uuid from "uuid";

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
  if (!id) return res.
}