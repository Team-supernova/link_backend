import mongoose, { Schema } from "mongoose";
import { v4 as uuidv4 } from "uuid";

const chatSchema = new Schema({
  sender: {
    type: String,
    required: true,
  },
  receiver: {
    type: String,
    required: true,
  },
  message: {
    type: String,
    required: true,
  },
  imageURI: {
    type: String,
  },
  timestamp: {
    type: Date,
    default: Date.now,
  },
  room: {
    type: string,
  },
});
const previewSchema = new Schema({
  user1: {
    type: String,
    required: true,
  },
  user2: {
    type: String,
    required: true,
  },
  room: {
    type: String,
    default: uuidv4(),
  },
  room_id: {
    type: String,
    default: uuidv4(),
  },
  updatedAt: {
    type: Date,
    default: Date.now,
  },
});

const userSchema = new Schema({
  address: {
    type: String,
    required: true,
  },
  chats: [chatSchema],
  preview: [previewSchema],
});

const User = mongoose.models.User || mongoose.model("User", userSchema);
export default User;
