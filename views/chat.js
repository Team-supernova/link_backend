import { Router } from "express";
import ChatController from "../controllers/ChatController.js";

const chatRouter = Router();

chatRouter.use("/login", ChatController.login);
export default chatRouter;