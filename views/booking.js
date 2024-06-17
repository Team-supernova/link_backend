import { Router } from "express";
import BookingController from "../controllers/BookingController.js";

const bookingRouter = Router();

bookingRouter.use("/login", BookingController);
export default bookingRouter;