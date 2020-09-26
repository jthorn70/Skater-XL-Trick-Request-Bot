//Created by Jboondock
require('dotenv').config();
const tmi = require("tmi.js"); //Twitch chat 
const options = require("./options"); //Your options file
const say = require('say') //TTS
const fs = require('fs'); //file system
const path = require('path'); //file path
const readline = require('readline'); //read files


const writeStream = fs.createWriteStream('Tricks.txt');  // creates txt file
const pathName = writeStream.path;  // pathname


const client = new tmi.client(options); //Connect to twitch server

// Register our event handlers (defined below)
client.on('message', onMessageHandler);
client.on('connected', onConnectedHandler);
say.getInstalledVoices((err, voices) => console.log(voices , voices.length))



client.connect(); //connect to twitch



let trickArray = []; // trickList array



// addNewLine function
function addNewlines(str) {
    var result = '';
    while (str.length > 0) {
      result += str.substring(0, 10) + '\n';
      str = str.substring(10);
    }
    return result;
  }


//------------------ BAN LIST FUNCTIONS--------------------//
  
let banList=[]; // ban list for trick bot

// load bans from text file
function loadBans(){
  banList=fs.readFileSync("./bans.txt","utf-8").split(",");
  // console.log(banList)
}

// add name to ban list
function addBan(name){
  banList.push(name);
}

//remove name from ban list
function removeBan(name){
  for(var i=0;i<banList.length;i++){
    console.log("WORKS ",name, i)
    if(name.trim()===banList[i]){
      banList=banList.filter(e => e !== name)
      // delete banList[i];
    }
}
}




  // Called every time a message comes in
function onMessageHandler (target, tags, msg, self) {
  loadBans();


    if (self) { return; } // Ignore messages from the bot


    // --------Custom vars for commands---------//


    const commandName = msg.trim();    // Remove whitespace from chat message
    let trickName=commandName.substring(7);    //get trickname
    let banName=commandName.substring(8);    // get name to ban from bot
    const trickFormatted=addNewlines(trickName)    // request with \n
    const insults = ["Some asshole named ","A big stinky man called ","The legend known as ", "yo bro, ", "ayyyyy, ", "Hello? are you there? ", "Once upon a time, "];    //array of insults
    const suffix = ["what a garbage trick.", "that's probably gonna suck.", "even i could do that one.", "can't these people come up with anything better?" ];    //array of suffix
    const nbSongs = ["photograph","how you remind me","if everyone cared","rockstar"];    //Nickelback array
    const randNBsong = nbSongs[Math.floor(Math.random()*nbSongs.length)];    //random nickelback song
    const randInsult = insults[Math.floor(Math.random()*insults.length)];    //generate random insult
    const randSuffix = suffix[Math.floor(Math.random()*suffix.length)];    //generate random suffix
    const thickness = Math.floor(Math.random()*12);    //generates tha thickness
    const longth = Math.floor(Math.random()*12);    //generates da length
    let randCurve = Math.floor(Math.random()*45);    // random curve
    const vibes = ["a shitty vibe cmonBruh","an insanely chill vibe peepoHappy","whoah.... his vibe levels are off the charts monkaW","Guy Fieri Vibes DxCat","no vibes monkaW","mongo pushing vibes DansGame","DawgVinci Vibes Kreygasm","Dennis Quaid type vibes DxCat","one singular vibe monkaS"];    // vibes array
    let randVibe = vibes[Math.floor(Math.random()*vibes.length)];    // rand vibe
    let vibeTarget = commandName.substring(11);    // target of vibe
    const Voice = ["Microsoft David Desktop", "Microsoft Sabina Desktop", "Microsoft Hedda Desktop"]    // voices for tts
    const randvoice = Voice[Math.floor(Math.random()*Voice.length)]    // random voice for tts



    //--------------COMMANDS-------------//
      
    // Bot Information
    if (commandName === '!botinfo') {
      client.say(target, `Created with love by JBoondock`);
      console.log(`* Executed ${commandName} command`);
    }


    // Trick Request command with TTS and writes requests to a txt file
    if (commandName.startsWith("!trick") && !banList.includes(tags.username.trim())) {

      

      let currentPerson = String(tags.username)
      let currentTrick = String(trickName)
      let trickList=[]
      var SwearWords = fs.readFileSync('SwearWords.txt', 'utf8').split('\n');

      for(var i=0;i<banList.length;i++){
        if(tags.username.includes(banList[i].trim())){
          client.say(target,`@${tags.username}, you are banned from using trick requests`)
        }
      }

      for(var i = 0; i<SwearWords.length;i++){
        // console.log(SwearWords[i])
        if (trickName.trim().includes(SwearWords[i].trim())){
          trickName = "Im a bad boy and cant use the bot"
          trickArray.push(trickName)

        }else if (trickName.trim().includes(SwearWords[i].trim())){
            trickArray.push(trickName)
        }
      }
        // trickArray.push(trickName)
      

        client.say(target,`@${tags.username} requested ${trickName} @jbooogie`)

        say.speak(`${randInsult} ${tags.username}` + "requested"+  `${trickName}.  ${randSuffix}`,randvoice)
        trickList.push(`${randInsult} ${tags.username} requested ${trickName}. ${randSuffix}`)

        // write each value of the array on the file breaking line
        trickList.forEach(value => fs.writeFile("Tricks.txt",`Current Trick by ${currentPerson}: ${currentTrick}\n `,function(err) {
          if (err) throw err;
          console.log("saved!")
        }));
        console.log(trickList)
        // the finish event is emitted when all data has been flushed from the stream
        writeStream.on('finish',() => {
          console.log(`wrote all the array data to file ${pathName}`)
        });
        // handle the errors on write process
        writeStream.on('error',(err)=> {
          console.error(`There is an error writing the file ${pathName} => ${err}`)
        });
        // close stream
        writeStream.end();

    }


    // load bans in case list is empty                            //Change These names for name validation
    if (commandName.startsWith( "!loadbans") && (tags.username == "Jboondock" || "Jbooogie" || "N0talecks" || "medium_burnt" )) {
      loadBans();
    }


    // add name to ban list                                    //Change These names for name validation
    if (commandName.startsWith("!addban") && (tags.username == "Jboondock" || "Jbooogie" || "N0talecks" || "medium_burnt" )) {
      let banToAdd= String(banName)
      addBan(banToAdd);
      client.say(target,`@${banToAdd}, you have been banned from using trick requests`)
      console.log(banList)

      // write each value of the array on the file breaking line
      banList.forEach(value => fs.writeFile("bans.txt",`${banList}\n `,function(err) {
        if (err) throw err;
        console.log("saved!")
      }));

    }
    // remove name from ban list                               //Change These names for name validation
    if (commandName.startsWith("!remban") && (tags.username == "Jboondock" || "Jbooogie" || "N0talecks"|| "medium_burnt" )) {
      let banToRem= String(banName)
      removeBan(banToRem);
      client.say(target,`@${banToRem}, you have been  un-banned from using trick requests`)
      console.log(banList)

      // write each value of the array on the file breaking line
      banList.forEach(value => fs.writeFile("bans.txt",`${banList} `,function(err) {
        if (err) throw err;
        console.log("saved!")
      }));

    }
    // display banned users in chat                              //Change These names for name validation
    if (commandName.startsWith("!banlist") && (tags.username == "Jboondock" || "Jbooogie" || "N0talecks"|| "medium_burnt" )) {
      if(banList.length<=0){
        client.say(target,`The ban list is empty.`)
      }else{
          client.say(target,`${banList} ,  are banned from using trick requests`)
      }
    }


    // Vibecheck command
    if (commandName.startsWith("!vibecheck")) {
      if (vibeTarget==""){
        vibeTarget=tags.username
      }
      client.say(target,`/me @${vibeTarget} has ${randVibe}`)
    }

    // Make the bot attack!                                     //Change These names for name validation
  if (commandName.startsWith("BOT ATTACK") && (tags.username == "Jboondock" || "Jbooogie")) {
    client.say(target, "/me MrDestructoid  FIRING DEATH RAY MrDestructoid")
    let timerId = setTimeout(() => client.say(target, "/me MrDestructoid hehe ur all ded MrDestructoid")
      , 3000);

  }


    // Size command
    if (commandName.startsWith("!size")) {
      if (longth && thickness == 0) {
        client.say(target,`@${tags.username} is cockless OMEGALUL`)
      }
      if (longth < 5){
        if (longth==thickness) {
          client.say(target,`/me @${tags.username} is about ${thickness} inches thicc, and ${longth} inches long, with a ${randCurve} degree curve. SQUARE COCK GANG peepoHappy`)
        }
        else {
          client.say(target,`/me @${tags.username} is about ${thickness} inches thicc, and ${longth} inches long, with a ${randCurve} degree curve. Yikes PepeHands`)
        }

      }
      else {
        if (longth==thickness) {
          client.say(target,`/me @${tags.username} is about ${thickness} inches thicc, and ${longth} inches long, with a ${randCurve} degree curve. SQUARE COCK GANG peepoHappy`)
        }
        else{
          client.say(target,`/me @${tags.username} is about ${thickness} inches thicc, and ${longth} inches long, with a ${randCurve} degree curve. Uchi3D`)
        }
      }
    }


    console.log("Target: " ,target)
  }


  // Called every time the bot connects to Twitch chat
  function onConnectedHandler (addr, port) {
    console.log(`* Connected to ${addr}:${port}`);
  }

