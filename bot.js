const Discord = require('discord.js');
const client = new Discord.Client();
const config = require('./config.json');

client.on('ready', () => {
  console.log('I am ready and logged in as ' + config.botName);
  client.user.setUsername('Virkle');
  let guild = client.guilds.find("name", "Virtual Reality Killers");
  let welcome = client.channels.find("name", "welcome");
});

client.on('message', message => {
  let prefix = "!";
  if (message.content.startsWith(prefix)){
    console.log('That\'s a command!');
  }
  else{
    return;
  }
});

client.on("guildMemberAdd", (member) => {
  console.log(`New User "${member.user.username}" has joined "${member.guild.name}"` );
  member.guild.defaultChannel.sendMessage(`"${member.user.username}" has joined this server`);
});

client.login(config.botSercret);
