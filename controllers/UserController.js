import { createUser, getUserByEmail } from '../utils/db';

const userSchema = {
  id: {
    type: String,
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  avatar: {
    type: String,
    required: true
  },
  role: {
    type: "customer" | "vendor",
    required: true
  },
  createdAt: {
    type: Date,
    required: true,
  }
}

export default class UserController {
  static async login(req, res) {
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
  static async logout(req, res) {
    return res.status(200).send("Logout successful");
  }
  static async register(req, res) {
    const { name, email, password, avatar } = req.body;
    const user = getUserByEmail(email);
    if (user) {
      return res.status(409).send("User already exists");
    }
    const hashedPassword = generateHash(password);
    createUser(email, hashedPassword, name, avatar);
  }
}