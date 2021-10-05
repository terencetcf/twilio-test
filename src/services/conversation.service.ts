import { twilioService } from '@services';
import {
  ConversationInstance,
  ConversationListInstanceCreateOptions,
} from 'twilio/lib/rest/conversations/v1/conversation';
import {
  ParticipantInstance,
  ParticipantListInstanceCreateOptions,
} from 'twilio/lib/rest/conversations/v1/conversation/participant';

const createConversation = async (
  opts: ConversationListInstanceCreateOptions
): Promise<ConversationInstance> => {
  const client = twilioService.getClient();
  const conversation = await client.conversations.conversations.create(opts);

  return conversation;
};

const getConversations = async (): Promise<ConversationInstance[]> => {
  const client = twilioService.getClient();
  const conversations = await client.conversations.conversations.list();
  return conversations;
};

const getConversation = async (
  conversationSid: string
): Promise<ConversationInstance> => {
  const client = twilioService.getClient();
  const conversation = await client.conversations
    .conversations(conversationSid)
    .fetch();
  return conversation;
};

const removeConversation = async (
  conversationSid: string
): Promise<boolean> => {
  const client = twilioService.getClient();
  const result = await client.conversations
    .conversations(conversationSid)
    .remove();

  return result;
};

const addParticipant = async (
  conversationSid: string,
  opts: ParticipantListInstanceCreateOptions
): Promise<ParticipantInstance> => {
  const client = twilioService.getClient();
  const participant = await client.conversations
    .conversations(conversationSid)
    .participants.create(opts);

  return participant;
};

export const conversationService = {
  createConversation,
  getConversations,
  getConversation,
  removeConversation,
  addParticipant,
};
