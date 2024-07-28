import { Router } from "express";
import ChatController from "../controllers/ChatController.js";

const chatRouter = Router();

chatRouter.post("/getRoom", ChatController.getRoom);
chatRouter.post("/previews", ChatController.getPreviews);
chatRouter.get("/check", ChatController.check);
export default chatRouter;
