//Created by Jboondock
require('dotenv').config();
const tmi = require("tmi.js"); //Twitch chat 
const options = require("./options"); //Your options file
const say = require('say') //TTS


//Connect to twitch server
const client = new tmi.client(options);

// Register our event handlers (defined below)
client.on('message', onMessageHandler);
client.on('connected', onConnectedHandler);

//connect to twitch
client.connect();

// Called every time a message comes in
function onMessageHandler (target, tags, msg, self) {
    if (self) { return; } // Ignore messages from the bot
  
    // Remove whitespace from chat message
    const commandName = msg.trim();
    const trickName=commandName.substring(7)
  
    // If the command is known, let's execute it
    if (commandName === '!botinfo') {
      client.say(target, `Created with love by JBoondock`);
      console.log(`* Executed ${commandName} command`);
    } else {
      console.log(`* Unknown command ${commandName}`);
    }

    //Trick Request with TTS
    if (commandName.startsWith("!trick")) {
        client.say(target,`@${tags.username} requested ${trickName} @jbooogie`)
        say.speak(trickName)
    }
  }
  

  
  // Called every time the bot connects to Twitch chat
  function onConnectedHandler (addr, port) {
    console.log(`* Connected to ${addr}:${port}`);
  }