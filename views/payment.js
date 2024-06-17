import { Router } from "express";
import PaymentController from "../controllers/PaymentController.js";

const paymentRouter = Router();

paymentRouter.use("/", PaymentController);
export default paymentRouter;