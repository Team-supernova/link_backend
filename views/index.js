import { Router } from "express";
import authRouter from "./auth";
import chatRouter from "./chat";
import bookingRouter from "./booking";
import profileRouter from "./profile";

const router = Router();


router.use('/auth', authRouter);
router.use('/chat', chatRouter);
router.use('/profile', profileRouter);
router.use('/booking', bookingRouter);

export default router;