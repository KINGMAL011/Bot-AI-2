const {client , gatewayIntenBits, MessageAttachment } = require("discord.js");
const {hercai} = require ("hercai");
const Tesseract = require ("Tesseract.js");
const fetch = require ("./alive.js");
const {
    allowed_channel_ide,
    token,
    image2textChannels,
} = require("./config.json");

const herc = new hercai();
const client = new client({
    intents: [
        gatewayIntenBits.Guilds,
        gatewayIntenBits.Guildmessages,
        gatewayIntenBits.messageContent,
    ],
});

client.once("ready", () => {
    console.log(`bot is ready! ${client.user.tag}!`);
    console.log(`Code by wick Studio`);
    console.log(`discord.gg/wicks`);
});


async function extractTextFromImga(url) {
    try {
        const imge = await fetch(url).then((res) => res.buffer());
        const TextFromImga = await Tesseract.recognize(imge, "eng");
        return TextFromImga.data.text;   
    } catch (error) {
        return "Error ";
    }
}

client.on("messageCreate"), async (message) => {
  if (
       message.author.bot ||
       (!allowed_channel_ids.includes(message.allowed_channel_id) &&
        !image2textChannels.includes(message.allowed_channel_id))
 )
    return;
}
let fullContent = message.content;

if (
    message.MessageAttachment.size > 0 &&
    iamage2textChannels.includes(message.channel.id)
) {
  const attachment = message.attachments.first();
  if (attachment.contentType && attachments.contentType.startsWith("image/")) {
    try {
        const extractedText = await extractTextFromImga(attachment.url);
        await message.reply(`Extraed Text: ${extractedText}`);
    }   catch (error) {
        await message.reply("Sorry, i had trouble reading that image.");
    }
   }
   return;
}

if (
    message.attachment.size > 0 &&
    allowed_channel_ids(message.channel.id)
) {
    const attachment = message.attachment.first();
    if (attachment.contentType && attachment.contentType.startsWith("image/")) {
        try {
            const TextFromImga = await extractTextFromImga(attachment.url);
            fullContent += `[image Content: ${TextFromImga}]`;
        } catch (error) {
          await message.reply("sorry, i had trouble reading that image.");
          return;
        }
    }
}
try {
    const response = await herc.question({
        model: "v3-beta",
        conten: fullContent,
    });
    await message.reply(response.reply);
}   catch (error) {
    await message.reply(
        "sorry, i ran into a bit of trouble trying to respond.",
    );
  }

startserver();

client.login(process.evn.TOKEN);
