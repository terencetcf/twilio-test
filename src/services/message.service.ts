import { twilioService } from '@services';
import { configUtil } from '@utils';
import axios, { AxiosResponse } from 'axios';
import fs from 'fs';
import FormData from 'form-data';
import {
  MessageInstance,
  MessageListInstanceCreateOptions,
  MessageListInstanceOptions,
} from 'twilio/lib/rest/conversations/v1/conversation/message';

const createMessage = async (
  conversationSid: string,
  opts: MessageListInstanceCreateOptions
): Promise<MessageInstance> => {
  const client = twilioService.getClient();
  const message = await client.conversations
    .conversations(conversationSid)
    .messages.create(opts);

  return message;
};

const createMediaMessage = async (
  chatServiceId: string,
  conversationSid: string,
  filePath: string,
  opts?: MessageListInstanceCreateOptions
): Promise<MessageInstance> => {
  const mediaResponse = await createMedia(chatServiceId, filePath);

  const client = twilioService.getClient();
  const message = await client.conversations
    .conversations(conversationSid)
    .messages.create({
      ...opts,
      mediaSid: mediaResponse.sid,
    });

  return message;
};

const getMessages = async (
  conversationSid: string,
  opts?: MessageListInstanceOptions
): Promise<MessageInstance[]> => {
  const client = twilioService.getClient();
  const message = await client.conversations
    .conversations(conversationSid)
    .messages.list(opts);

  return message;
};

type CreateMediaResponse = {
  sid: string;
  service_sid: string;
  date_created: string;
  date_upload_updated: string;
  date_updated: string;
  links: {
    content: string;
  };
  size: number;
  content_type: string;
  filename: null;
  author: string;
  category: string;
  message_sid: null;
  channel_sid: null;
  url: string;
  is_multipart_upstream: false;
};

const createMedia = async (
  chatServiceId: string,
  filePath: string
): Promise<CreateMediaResponse> => {
  const configs = configUtil.getEnvConfigs();
  const form = new FormData();
  form.append('file', fs.readFileSync(filePath));
  try {
    const response = await axios.post<any, AxiosResponse<CreateMediaResponse>>(
      `https://mcs.us1.twilio.com/v1/Services/${chatServiceId}/Media`,
      form,
      {
        auth: {
          username: configs.twilio.account_sid,
          password: configs.twilio.auth_token,
        },
        headers: {
          ...form.getHeaders(),
        },
      }
    );

    return response.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const messageService = {
  createMessage,
  getMessages,
  createMediaMessage,
};
