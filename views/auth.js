import { Router } from "express";
import UserController from "../controllers/UserController.js";

const authRouter = Router();

authRouter.use("/login", UserController.login);
authRouter.use("/register", UserController.register);
authRouter.use("/logout", UserController.logout);
export default authRouter;
