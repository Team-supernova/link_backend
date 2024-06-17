import { Router } from "express";
import ChatController from "../controllers/ChatController.js";
import { verifyUser } from "../utils/index.js";

const chatRouter = Router();

chatRouter.use("/", verifyUser, ChatController);
export default chatRouter;