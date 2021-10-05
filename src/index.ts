import { conversationService, messageService } from '@services';

const conversationSid = '';
const chatServiceSid = '';

(async () => {
  // CREATE CONVERSATION
  const createConversationResponse =
    await conversationService.createConversation({
      friendlyName: 'The Twilio Demo',
    });
  console.log('🚀 - createConversationResponse', createConversationResponse);

  // GET CONVERSATIONS
  const getConversationsResponse = await conversationService.getConversations();
  console.log('🚀 - getConversations', getConversationsResponse);

  // GET CONVERSATION BY SID
  const getConversationResponse = await conversationService.getConversation(
    createConversationResponse.sid
  );
  console.log('🚀 - getConversationResponse', getConversationResponse);

  // ADD PARTICIPANT NUMBER
  const addParticipantResponse = await conversationService.addParticipant(
    conversationSid,
    {
      messagingBinding: {
        address: '+44',
        proxyAddress: `+44`,
      },
    }
  );
  console.log('🚀 - addParticipantResponse', addParticipantResponse);

  // ADD PARTICIPANT IDENTITY
  const addParticipantIdentityResponse =
    await conversationService.addParticipant(createConversationResponse.sid, {
      identity: 'testMas3',
    });
  console.log(
    '🚀 - addParticipantIdentityResponse',
    addParticipantIdentityResponse
  );

  // CREATE MESSAGE
  const createMessageResponse = await messageService.createMessage(
    conversationSid,
    {
      author: 'testMas3',
      body: `I am sending a ${'really '.repeat(
        200
      )} long message that contains link like https://www.google.com/ and https://google.co.uk/ at ${new Date().toLocaleString()}`,
    }
  );
  console.log('🚀 - createMessageResponse', createMessageResponse);

  // GET MESSAGES
  const getMessagesResponse = await messageService.getMessages(conversationSid);
  console.log('🚀 - getMessagesResponse', getMessagesResponse);

  // CREATE MEDIA MESSAGES
  const createMediaResponse = await messageService.createMediaMessage(
    chatServiceSid,
    conversationSid,
    `google.png`,
    {
      author: 'testMas3',
      body: `a picture upload on ${new Date().toLocaleString()}`,
    }
  );
  console.log('🚀 - createMediaResponse', createMediaResponse);
})();
