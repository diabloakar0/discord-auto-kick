const { Client, GatewayIntentBits, PermissionFlagsBits } = require('discord.js');
const client = new Client({
    intents: [
        GatewayIntentBits.Guilds,
        GatewayIntentBits.GuildMessages,
        GatewayIntentBits.MessageContent,
        GatewayIntentBits.GuildMembers
    ]
});

const token = 'YOUR_BOT_TOKEN_HERE';
let kickEnabled = false;

client.on('ready', () => {
    console.log(` diabloakar - Logged in as ${client.user.tag}!`);
});

client.on('guildMemberAdd', member => {
    console.log(`New member joined: ${member.user.tag}`);
    if (kickEnabled && member.guild) {
        member.kick('The bot kicks everyone who enters the server.')
            .then(() => console.log(`Kicked ${member.user.tag} from ${member.guild.name}.`))
            .catch(err => console.error(`Failed to kick ${member.user.tag}:`, err));
    } else {
        console.log('Kick feature is turned off or the member could not be kicked.');
    }
});

client.on('messageCreate', message => {
    if (message.author.bot) return;

    const hasPermission = message.member.permissions.has(PermissionFlagsBits.Administrator);
    if (!hasPermission) {
        console.log(`User ${message.author.tag} tried to use a command without permission.`);
        return;
    }

    if (message.content === '!kickon') {
        kickEnabled = true;
        message.channel.send('Kick feature activated.');
        console.log('Kick feature activated.');
    } else if (message.content === '!kickoff') {
        kickEnabled = false;
        message.channel.send('Kick feature disabled.');
        console.log('Kick feature disabled.');
    }
});

client.login(token);