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
say.getInstalledVoices((err, voices) => console.log(voices , voices.length))

//connect to twitch
client.connect();

// Called every time a message comes in
function onMessageHandler (target, tags, msg, self) {
    if (self) { return; } // Ignore messages from the bot
  
    // Remove whitespace from chat message
    const commandName = msg.trim();
    //get trickname
    const trickName=commandName.substring(7)
    //array of insults
    const insults = ["Some asshole named ","A big stinky man called ","The legend known as ", "hey boogie, ", "yo bro, ", "ayyyyy, ", "jboogie? are you there? ", 
  "Once upon a time, "]
    //array of suffix
    const suffix = ["what a garbage trick.", "that's probably gonna suck.", "even i could do that one.", "can't these people come up with anything better?" ]
    //generate random insult
    const randInsult= insults[Math.floor(Math.random()*insults.length)]
    //generate random suffix
    const randSuffix= suffix[Math.floor(Math.random()*suffix.length)]
    
    
  
    // If the command is known, let's execute it
    if (commandName === '!botinfo') {
      client.say(target, `Created with love by JBoondock`);
      console.log(`* Executed ${commandName} command`);
    } else {

    }

    //Trick Request with TTS
    if (commandName.startsWith("!trick")) {
        client.say(target,`@${tags.username} requested ${trickName} @jbooogie`)
        say.speak(`${randInsult} ${tags.username}` + "requested"+  `${trickName}.  ${randSuffix}`,"Microsoft Sean Desktop")
    }
  }


  

  
  // Called every time the bot connects to Twitch chat
  function onConnectedHandler (addr, port) {
    console.log(`* Connected to ${addr}:${port}`);
  }

