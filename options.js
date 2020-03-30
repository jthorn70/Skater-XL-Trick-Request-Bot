//Created by Jboondock

const options = {
  options: {
    debug: true
  },
  connection: {
    reconnect: true
  },
  identity: {
    username: "boondock_bot", //Username of Bot 
    password: "oauth:di4gfbtn7gn8ol5yl3vltxqwxrmvnq" //OATH key from twitch
  },
  channels: ['Enter Channel Name here'] //Channels the bot runs on, can be multiple
};


module.exports = options;