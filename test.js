const Discord = require("discord.js")
const client = new Discord.Client({ intents: new Discord.Intents(32767) });

client.on('ready', () => {
    console.log(`Logged in as ${client.user.tag}!`);
});

client.on('messageCreate', async msg => {
    if (!msg.guild || msg.author.bot) return;

    if (msg.channel.id == "id room") {
        const reactons_helper = require("./src")
        const emojis = reactons_helper.GetEmojis(msg.content)

        emojis.forEach(async emoji => {
            msg.reply(`${emoji.image}`)
        })
    }
});

client.login('token');