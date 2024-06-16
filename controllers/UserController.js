import { createUser, getUserByEmail } from '../utils/db';


export default class UserController {
  async login(req, res) {
    const { email, password } = req.body;
    const user = getUserByEmail(email);
    if (!user) {
      return res.status(404).send("Incorrect email");
    }
    if (compareHash(password, user.password)) {
      return res.status(200).send("Login successful");
    } else {
      return res.status(401).send("Incorrect password");
    }
  }
  async logout(req, res) {
    return res.status(200).send("Logout successful");
  }
  async register(req, res) {
    const { email, password } = req.body;
    const user = getUserByEmail(email);
    if (user) {
      return res.status(409).send("User already exists");
    }
    const hashedPassword = generateHash(password);
    createUser(email, hashedPassword);
  }
}