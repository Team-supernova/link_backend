import { Router } from "express";
import authRouter from "./auth";
import bookingRouter from "./booking";
import chatRouter from "./chat";
import paymentRouter from "./payment";
import profileRouter from "./profile";
const router = Router();


router.use('/auth', authRouter);
router.use('/booking', bookingRouter);
router.use('/chat', chatRouter);
router.use('/payment', paymentRouter);
router.use('/profile', profileRouter);

export default router;