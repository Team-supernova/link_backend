import { Router } from "express";
import UserController from "../controllers/UserController.js";

const authRouter = Router();

authRouter.post("/login", UserController.login);
authRouter.post("/logout", UserController.logout);
authRouter.post("/register", UserController.register);
export default authRouter;