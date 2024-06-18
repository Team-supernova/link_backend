import { hash, genSalt, compare} from "bcrypt";
import { v4 as uuidv4 } from "uuid";

export const generateHash = async (password) => {
  const salt = await genSalt(10);
  return await hash(password, salt);
}

export const compareHash = async (password, hash) => {
  return await compare(password, hash);
}

export const generateID = () => {
  return uuidv4();
}