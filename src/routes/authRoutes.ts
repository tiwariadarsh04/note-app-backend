import express from 'express';
import { sendOtp, verifyOtpHandler } from '../controllers/authController';

const router = express.Router();

router.post('/send-otp', sendOtp);
router.post('/verify-otp', verifyOtpHandler);

export default router;
