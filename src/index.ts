import { conversationService } from "@services";

const sid = "";

(async () => {
  // const conversation = await conversationService.createConversation({
  //   friendlyName: "My Second Conversation",
  // });

  const conversation = await conversationService.getConversations();

  // const conversation = await conversationService.getConversation(sid);

  // const conversation = await conversationService.addParticipant(
  //   sid,
  //   { identity: "testApple" }
  // );

  // const conversation = await conversationService.addParticipant(
  //   sid,
  //   {
  //     messagingBinding: {
  //       address: "+1",
  //       proxyAddress: `+2`,
  //     },
  //   }
  // );

  console.log("🚀 - conversation", conversation);
})();
