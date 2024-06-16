import { Router } from "express";
import UserController from "../controllers/UserController.js";

const authRouter = Router();

authRouter.use("/login", UserController.login);
export default authRouter;