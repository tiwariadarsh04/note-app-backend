const otpMap = new Map<string, string>();

export const saveOtp = (email: string, otp: string) => {
  otpMap.set(email, otp);
  setTimeout(() => otpMap.delete(email), 5 * 60 * 1000); // 5 mins
};

export const verifyOtp = (email: string, otp: string) => {
  return otpMap.get(email) === otp;
};
