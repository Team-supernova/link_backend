import { Router } from "express";
import authRouter from "./auth.js";
import bookingRouter from "./booking.js";
import paymentRouter from "./payment.js";
import profileRouter from "./profile.js";
import chatRouter from "./chat.js";

const router = Router();

router.use('/auth', authRouter);
router.use('/booking', bookingRouter);
router.use('/chat', chatRouter);
router.use('/payment', paymentRouter);
router.use('/profile', profileRouter);

export default router;
