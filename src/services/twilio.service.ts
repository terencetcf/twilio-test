import { configUtil } from "@utils";
import twilio from "twilio";

const configs = configUtil.getEnvConfigs();
let client: twilio.Twilio;

const getClient = (): twilio.Twilio => {
  if (!client) {
    client = twilio(configs.twilio.account_sid, configs.twilio.auth_token);
  }

  return client;
};

export const twilioService = { getClient };
