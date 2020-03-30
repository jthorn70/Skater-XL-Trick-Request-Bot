//Created by Jboondock :)

const options = {
  options: {
    debug: true
  },
  connection: {
    reconnect: true
  },
  identity: {
    username: "BOT USERNAME", //Username of Bot account
    password: "OAUTH TOKEN" //OATH key from twitch
  },
  channels: ['CHANNEL NAME(s)'] //Channels the bot runs on, can be multiple
};


module.exports = options;
