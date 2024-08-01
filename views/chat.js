import { Router } from "express";
import ChatController from "../controllers/ChatController.js";

const chatRouter = Router();

chatRouter.post("/getRoom", ChatController.getRoom);
chatRouter.post("/previews", ChatController.getPreviews);
chatRouter.post("/create", ChatController.makeChat);
chatRouter.get("/check", ChatController.check);
chatRouter.get("/check-prev", ChatController.getAllPreviews);

export default chatRouter;
