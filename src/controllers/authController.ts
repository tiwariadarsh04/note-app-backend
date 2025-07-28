import { Request, Response } from 'express';
import { transporter } from '../config/mail';
import { saveOtp, verifyOtp } from '../utils/otpStore';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
import { verifyGoogleToken } from '../utils/verifyGoogleToken'; // 👈 Add this

dotenv.config();

const SECRET = process.env.JWT_SECRET || 'supersecret';

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


export const googleLogin = async (req: Request, res: Response) => {
  const { token } = req.body;

  try {
    const user = await verifyGoogleToken(token);

    if (!user.email || !user.name) {
      return res.status(400).json({ message: 'Invalid Google token' });
    }

    const jwtToken = jwt.sign({ email: user.email }, SECRET, { expiresIn: '2h' });

    res.json({
      message: 'Google login successful',
      token: jwtToken,
    });
  } catch (err) {
    console.error('Google Login Error:', err);
    res.status(500).json({ message: 'Google login failed' });
  }
};
