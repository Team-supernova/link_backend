import { Router } from "express";
import BookingController from "../controllers/BookingController.js";
import { verifyUser } from "../utils/index.js";

const bookingRouter = Router();

bookingRouter.use("/login", verifyUser, BookingController);
export default bookingRouter;