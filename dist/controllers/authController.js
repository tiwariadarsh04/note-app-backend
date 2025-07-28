"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.googleLogin = exports.verifyOtpHandler = exports.sendOtp = void 0;
const mail_1 = require("../config/mail");
const otpStore_1 = require("../utils/otpStore");
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const dotenv_1 = __importDefault(require("dotenv"));
const verifyGoogleToken_1 = require("../utils/verifyGoogleToken"); // 👈 Add this
dotenv_1.default.config();
const SECRET = process.env.JWT_SECRET || 'supersecret';
const sendOtp = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { email, name } = req.body;
    if (!email || !name) {
        return res.status(400).json({ message: 'Name and email are required' });
    }
    const otp = Math.floor(100000 + Math.random() * 900000).toString();
    (0, otpStore_1.saveOtp)(email, otp);
    try {
        yield mail_1.transporter.sendMail({
            from: `"Note App" <${process.env.EMAIL_USER}>`,
            to: email,
            subject: 'Your OTP Code',
            text: `Hello ${name}, your OTP is: ${otp}`,
        });
        res.json({ message: 'OTP sent successfully' });
    }
    catch (error) {
        console.error('Email send error:', error);
        res.status(500).json({ message: 'Failed to send OTP email' });
    }
});
exports.sendOtp = sendOtp;
const verifyOtpHandler = (req, res) => {
    const { email, otp } = req.body;
    if (!email || !otp) {
        return res.status(400).json({ message: 'Email and OTP are required' });
    }
    if (!(0, otpStore_1.verifyOtp)(email, otp)) {
        return res.status(401).json({ message: 'Invalid or expired OTP' });
    }
    const token = jsonwebtoken_1.default.sign({ email }, SECRET, { expiresIn: '2h' });
    res.json({
        message: 'OTP verified successfully',
        token,
    });
};
exports.verifyOtpHandler = verifyOtpHandler;
const googleLogin = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { token } = req.body;
    try {
        const user = yield (0, verifyGoogleToken_1.verifyGoogleToken)(token);
        if (!user.email || !user.name) {
            return res.status(400).json({ message: 'Invalid Google token' });
        }
        const jwtToken = jsonwebtoken_1.default.sign({ email: user.email }, SECRET, { expiresIn: '2h' });
        res.json({
            message: 'Google login successful',
            token: jwtToken,
        });
    }
    catch (err) {
        console.error('Google Login Error:', err);
        res.status(500).json({ message: 'Google login failed' });
    }
});
exports.googleLogin = googleLogin;
