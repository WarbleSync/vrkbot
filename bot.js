const Discord = require('discord.js');
const client = new Discord.Client();
const config = require('./config.json');

client.on('ready', () => {
  console.log('I am ready and logged in as ' + config.name);
  client.user.setUsername(config.name);
  let guild = client.guilds.find("name", "Virtual Reality Killers");
  let welcome = guild.channels.find("name", "welcome");
  let welcomeMsg = guild.channels.find("name", "welcome").messages;
  console.log(welcomeMsg)
  // welcome.bulkDelete(welcomeMsg);
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

client.login(config.token);
