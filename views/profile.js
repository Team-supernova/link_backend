import { Router } from "express";
import {vendorProfileController} from "../controllers/ProfileController.js";
import { verifyUser } from "../utils/index.js";

const profileRouter = Router();

profileRouter.get("/vendor", verifyUser, vendorProfileController.getvendorProfile);
export default profileRouter;