import { Router } from "express";
import {vendorProfileController} from "../controllers/ProfileController.js";

const profileRouter = Router();

profileRouter.use("/login", vendorProfileController.vendorProfile);
export default profileRouter;