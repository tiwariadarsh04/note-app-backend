import { OAuth2Client } from 'google-auth-library';

const client = new OAuth2Client();

export const verifyGoogleToken = async (idToken: string) => {
  const ticket = await client.verifyIdToken({
    idToken,
    audience: process.env.GOOGLE_CLIENT_ID,
  });

  const payload = ticket.getPayload();
  return {
    email: payload?.email,
    name: payload?.name,
  };
};
