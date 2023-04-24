import { Client, GatewayIntentBits } from 'discord.js';
import dotenv from 'dotenv';

dotenv.config();
const { TOKEN } = process.env;

const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.GuildMembers,
    GatewayIntentBits.MessageContent
  ]
});


client.on('ready', () => {
  console.log(`Logged in as ${client.user.tag}!`);
});


client.on('messageCreate', async (message) => {
   if (message.content.includes('مين عمك؟') || message.content.includes('مين عمك') || message.content.includes('مين عمكم؟') || message.content.includes('مين عمكم')) {
    await message.reply('ابو يزن عم الكل ولا أنتا وياه 😎');
    return;
  }
  const response = {
    error: false,
    status: 201,
    data: {
      message: message.content,
      from: message.author.username,
      developedBy: 'dev.karamz'
    }
  };

  if (message.author.bot) return; // Ignore messages sent by bots
  // skip any channel that is not json and any message starts with json: and any message starts with ```
  if (message.channel.name !== 'json'){
    if (message.content.startsWith('json:')) {
      try {
        await message.delete();
        await message.channel.send({
          content: '```json\n' + JSON.stringify({...response, data: {...response.data, message: message.content.substring(6)}}, null, 2) + '\n```',
        });
      } catch (error) {
        console.error(`Error editing message: ${error}`);
      }
    }
    return;
  }

  try {
    await message.delete();
    await message.channel.send({
      content: '```json\n' + JSON.stringify(response, null, 2) + '\n```',
    });
  } catch (error) {
    console.error(`Error editing message: ${error}`);
  }
});

client.login(TOKEN);