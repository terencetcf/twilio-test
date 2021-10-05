import { conversationService } from '@services';
import * as readline from 'readline';

type CommandAction = {
  [name: string]: () => Promise<void>;
};

const conversationSid = '';
const commands = `Commands:
1 - Get Conversation
2 - Get Conversations
exit - Exit

-> `;

const actionsMap: CommandAction = {
  ['1']: async () => {
    const getConversationResponse = await conversationService.getConversation(
      conversationSid
    );
    console.log('🚀 - getConversationResponse', getConversationResponse);
  },
  ['2']: async () => {
    const getConversationsResponse =
      await conversationService.getConversations();
    console.log('🚀 - getConversations', getConversationsResponse);
  },
};

(async () => {
  let rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
  });

  const promptInput = async function () {
    rl.question(commands, async (answer) => {
      if (answer == 'exit') {
        rl.close();
        return;
      }

      const action = actionsMap[answer];
      if (action) {
        await action();
      }

      await promptInput();
    });
  };

  await promptInput();
})();
