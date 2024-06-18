import { Router } from "express";
import BookingController from "../controllers/BookingController.js";
import { verifyUser } from "../utils/index.js";

const bookingRouter = Router();

bookingRouter.get("/", verifyUser, BookingController);
bookingRouter.post("/", verifyUser, BookingController);
export default bookingRouter;