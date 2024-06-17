import { Router } from "express";
import ProfileController from "../controllers/ProfileController.js";

const profileRouter = Router();

profileRouter.use("/", ProfileController);
export default profileRouter;