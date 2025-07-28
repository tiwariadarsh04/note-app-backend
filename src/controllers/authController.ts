import { Request, Response } from 'express';
import { transporter } from '../config/mail';
import { saveOtp, verifyOtp } from '../utils/otpStore';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config();

const SECRET = process.env.JWT_SECRET || 'supersecret';

// 1️⃣ Send OTP to email
export const sendOtp = async (req: Request, res: Response) => {
  const { email, name } = req.body;

  if (!email || !name) {
    return res.status(400).json({ message: 'Name and email are required' });
  }

  const otp = Math.floor(100000 + Math.random() * 900000).toString();
  saveOtp(email, otp);

  try {
    await transporter.sendMail({
      from: `"Note App" <${process.env.EMAIL_USER}>`,
      to: email,
      subject: 'Your OTP Code',
      text: `Hello ${name}, your OTP is: ${otp}`,
    });

    res.json({ message: 'OTP sent successfully' });
  } catch (error) {
    console.error('Email send error:', error);
    res.status(500).json({ message: 'Failed to send OTP email' });
  }
};

// 2️⃣ Verify OTP and issue JWT token
export const verifyOtpHandler = (req: Request, res: Response) => {
  const { email, otp } = req.body;

  if (!email || !otp) {
    return res.status(400).json({ message: 'Email and OTP are required' });
  }

  if (!verifyOtp(email, otp)) {
    return res.status(401).json({ message: 'Invalid or expired OTP' });
  }

  const token = jwt.sign({ email }, SECRET, { expiresIn: '2h' });

  res.json({
    message: 'OTP verified successfully',
    token,
  });
};
