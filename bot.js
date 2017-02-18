const config = require('./config.json');
const fs = require('fs');
const moment = require('moment');
const convert = require('convert-seconds');
const Discord = require('discord.js');
const client = new Discord.Client();
const BattlefieldStats = require('battlefield-stats');
const bf = new BattlefieldStats(config.bf_api_key);

client.on('ready', () => {
  console.log('I am ready and logged in as ' + config.name);
  client.user.setUsername(config.name);
  let guild = client.guilds.find("name", "Virtual Reality Killers");
  let welcome = guild.channels.find("name", "welcome");

});

client.on('message', message => {
  let prefix = config.prefix;
  var args = message.content.split(/[ ]+/);
  if(!message.content.startsWith(prefix) || message.author.bot) return;
  if(message.content.startsWith(prefix + 'stats')){
    if(args.length == 3){
      if(args[2] == config.name){
        message.channel.sendMessage('I don\'t play games I\'m a bot! :smile:');
      }
      else{
        var params = {
          platform: bf.Platforms.PC,
          displayName: args[2],
          game: args[1] == 'bf1' ? 'tunguska' : args[1]
        }
        bf.Stats.basicStats(params, (error, response) => {
          if(!error && response){
            var result = response.result;
            console.log(response)
            message.channel.sendMessage(response.profile.trackerUrl);
            message.channel.sendMessage('With ' + convert(result.timePlayed).hours + ' hours played ' + response.profile.displayName + '\'s stats for ' + args[1] + ' are:\n');
            message.channel.sendMessage('Wins: ' + result.wins + '\tLosses: ' + result.losses + '\tSkill: ' + result.skill);
            message.channel.sendMessage('Kills: ' + result.kills + '\tDeaths: ' + result.deaths + '\tKD: ' + (result.kills / (result.deaths != 0 ? result.deaths : 1) ).toFixed(2) + '%');
            message.channel.sendMessage('KPM: ' + result.kpm + '\tSPM: ' + result.spm);
          }
        })
      }
    }
    else{
      message.channel.sendMessage(fs.readFileSync('./errors/stats.md','utf8'));
    }
    console.log(args)
  }

});

client.login(config.token);
