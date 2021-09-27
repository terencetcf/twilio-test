import dotenv from "dotenv";

dotenv.config();

const getEnvConfigs = (): Configs => ({
  twilio: {
    account_sid: `${process.env.TWILIO_ACCOUNT_SID}`,
    auth_token: `${process.env.TWILIO_AUTH_TOKEN}`,
  },
});

export const configUtil = {
  getEnvConfigs,
};
