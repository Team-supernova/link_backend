import { createUser, getUserByEmail } from '../db/user';

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
  phone: {
    type: String,
    required: true
  },
  role: {
    type: "customer" | "vendor",
    required: true
  },
  address: {
    type: String,
    required: true
  },
  city: {
    type: String,
    required: true
  },
  state: {
    type: String,
    required: true
  },
  zip: {
    type: String,
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
      return res.status(404).json({error: "Incorrect email"});
    }
    if (compareHash(password, user.password)) {
      return res.status(200).json({message: "Login successful"});
    } else {
      return res.status(401).json({error: "Incorrect password"});
    }
  }
  static async logout(req, res) {
    return res.status(200).send("Logout successful");
  }
  static async register(req, res) {
    const { name, email, password, avatar, address, city, state, zip } = req.body;
    const user = getUserByEmail(email);
    if (user) {
      return res.status(409).json({error: "User already exists"});
    }
    const hashedPassword = generateHash(password);
    createUser(name, email, hashedPassword, avatar, address, city, state, zip);
  }
}
