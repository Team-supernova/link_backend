import { Router } from "express";
import ProfileController from "../controllers/ProfileController.js";
import { verifyUser } from "../utils/index.js";

const profileRouter = Router();

profileRouter.use("/", verifyUser, ProfileController);
export default profileRouter;