import express from 'express';
import { sendOtp, verifyOtpHandler, googleLogin } from '../controllers/authController';

const router = express.Router();

router.post('/send-otp', sendOtp);
router.post('/verify-otp', verifyOtpHandler);
router.post('/google-login', googleLogin);

export default router;
