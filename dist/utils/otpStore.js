"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.verifyOtp = exports.saveOtp = void 0;
const otpMap = new Map();
const saveOtp = (email, otp) => {
    otpMap.set(email, otp);
    setTimeout(() => otpMap.delete(email), 5 * 60 * 1000); // 5 mins
};
exports.saveOtp = saveOtp;
const verifyOtp = (email, otp) => {
    return otpMap.get(email) === otp;
};
exports.verifyOtp = verifyOtp;
