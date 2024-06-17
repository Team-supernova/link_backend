import { Router } from "express";
import PaymentController from "../controllers/PaymentController.js";
import { verifyUser } from "../utils/index.js";

const paymentRouter = Router();

paymentRouter.use("/", verifyUser, PaymentController);
export default paymentRouter;