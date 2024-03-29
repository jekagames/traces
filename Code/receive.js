var newStory;
var receivedCue;
var passedCue;
var storyLine;
var soundFile;
var soundInstance;
var socketNFC = io();
var display;
var chunk;

//DATABASE TO READ STORY AND AUDIO FILE DIRECTIONS FROM
//Managing text and audio through a spreadsheet (json dictionary)
//Make the spreadsheet then parse it into a json dictionary using Mr Data Converter or other service -- 
//https://shancarter.github.io/mr-data-converter/)
var database = {
  "1635431931": { "TITLE":"story001", "TEXT":"[It's just a jump to the left! Time Re-Adjustment Complete!]\r[Stand By.]\r[Running System Diagnostics ... ]\r[ ... Scanning Environment ... ]\r[ ... Calculating Pressure Differentials ... ]\r[ ... Analyzing Ambient Air for Breathability ... ]\r[What Excellent News! You can safely exist in this physical environment.]\r[ ... Downloading Known Cultural Archives ... ]\r[ ... Adjusting Expected Vector Paths ... ]\r[ ... Analysis is Ongoing ... ]\r[ ... Cannot fully determine risk from cultural exposure.]\r[Sorry About That! Be cautious when interacting with locals.]\r[Please wait for information about your current assigned task.]\r\r[Hey. This place isn't like our home. I know that you know that, but I want to remind you. I need you to remember it. The people here will look at you funny. They won't understand some of the words that you use. Hell, you even need to be careful about when and where you take a leak. You're not exactly going to blend in here. This civilization hasn't committed to the liberation of all of its people yet. It's an ugly time for us. But we need to collect this data. We need to find the traces left behind by those of us who traveled here before. Our comrades, our siblings, our friends. You can see their traces permeating the space, tying echoes of their very beings to the artefacts that they left behind, to the spaces and things that meant something to them here. Track down the artefacts and spaces, and we can analyze the traces. That's what you're here to do. This culture is breaking down -- falling prey to its species' worst impulses. History is about to repeat itself when scant decades have passed since this world said never again. As painful as it is, you aren't here to interfere. Remember: all of this has already happened. Collecting those traces, making sure that they survive to our time, that's your responsibility to those who will suffer here. Maybe we can avoid repeating their past ourselves. Maybe we can't. But let's ensure that the traces and memories of the people here are a boon to our present. Those born to this time who suffer are also our siblings, I figure, though our times may be out of sync, and though we may be from a distant star. Let's start by taking a look around and having a little walk. I'll be with you most of the time... As much as I can be while not physically next to you. The traces... look for objects that seem out of place. They might be hard to spot at first, but you'll adjust soon. I'm detecting a trace nearby. Do you see it? Walk over and scan the surface until you hear from me again. Be casual. Act like you're not an intergalactic time traveler. And don't let anyone see you scanning the traces.]\r", "AUDIOFILE":"log001", "AUDIOSPEED":1190},
  "4051744763": { "TITLE":"story002", "TEXT":"[These are the field notes of Dr. Moira Chess for November 21st, 2018 Common Earth Era. It has been a rough month for local and international politics. The people I am studying feel this particularly keenly.]", "AUDIOFILE":"log002", "AUDIOSPEED":1100},
  "17938683": { "TITLE":"story003", "TEXT":"['There is a crack in everything. That's how the light gets in.' A poet from this era wrote that some decades ago. He was writing about the future, I think. I only hope that the light is enough to sustain them.]", "AUDIOFILE":"log003", "AUDIOSPEED":1050},
  "2446767611": { "TITLE":"story004", "TEXT":"[I worry that I might be getting too close to this situation. I know that I have to participate sincerely for this ethnography to work, but it is so difficult to see all that is happening and not betray that I don't belong to this time or place.]", "AUDIOFILE":"log004", "AUDIOSPEED":1100},
  "285915387": { "TITLE":"story005", "TEXT":"[As if basic decency weren't enough, even their science backs up their -- our -- existence in this era. But their politicians are doing all that they can to dehumanize them. To erase them.]", "AUDIOFILE":"log005", "AUDIOSPEED":1025},
  "1552818752": { "TITLE":"story006", "TEXT":"[I'm worried about my new friends, but I know that they are resilient. Our kind have always existed. We will continue to exist. Though they may try to erase us. Though they may persecute us. I don't think that I can go home. I think that I have to stand with them.]", "AUDIOFILE":"log006", "AUDIOSPEED":1125},
  "1280123456": { "TITLE":"story007", "TEXT":"[I was freshly arrived in this era and I had to pee. There was a single-stall bathroom nearby, but it was locked, and I couldn't wait much longer. So I cast about and chose between the other washrooms. It was the kind with all stalls and no urinals.]", "AUDIOFILE":"log007", "AUDIOSPEED":1060},
  "1281106240": { "TITLE":"story008", "TEXT":"[I was gripped right above my elbows from behind and nearly peed right then and there. I spun around, and there was a five foot tall woman smiling at me, a customer service smile. Surprised, I grabbed her wrists on reflex -- but gently. I tried to make my six foot tall frame smaller, less intimidating. 'This is the woman's washroom,' she said. 'I know,' I said, and -- still taking pains to be ever so gentle -- pushed her hands away from my body.]", "AUDIOFILE":"log008", "AUDIOSPEED":1235},
  "1016209984": { "TITLE":"story009", "TEXT":"[I just wanted to empty my bladder. I have regrets about how I responded to what happened. I had been grabbed from behind, and yet I was the one trying not to intimidate the person who had done the grabbing. Seems like a bad joke.]", "AUDIOFILE":"log009", "AUDIOSPEED":1120},
  "471736384": { "TITLE":"story010", "TEXT":"[I was afraid of scaring the woman that grabbed me, see, because I thought they would look at me and think that I was a bad person -- a dangerous person. I have heard that our kind of nonconformity, our peculiarities... our queerness, can be dangerous in these times.]", "AUDIOFILE":"log010", "AUDIOSPEED":1090},
  "3424133184": { "TITLE":"story011", "TEXT":"[In the end, as she apologized -- over-apologized, I kept having to reassure her that it was okay -- it wasn't.\rI had to assure her it was all fine -- \rhad to care for her feelings above my own so that I could finally get into a stall and pee.]", "AUDIOFILE":"log011", "AUDIOSPEED":1230},
  "2353143104": { "TITLE":"story012", "TEXT":"[Coming to this era to make art about its people, it made me realize just how much I matter. Just how much my visibility matters. In my time, it's a matter of course. But here... the world would rather we shut up and be quiet. The system marches on more easily that way. Selling people solutions for their unhappiness. Addressing the symptoms, not the causes. That's how it works here.]", "AUDIOFILE":"log012", "AUDIOSPEED":1190},
  "3962707520": { "TITLE":"story013", "TEXT":"[I get to watch them...I do think this is what the kids call it in this era... I get to watch them glow up. Once they realize that there is language for who they are and what they feel, once they realize that there are others like them, they glow up. They become more and more themselves. It is such an amazing transformation.]", "AUDIOFILE":"log013", "AUDIOSPEED":1180},
  "3170572352": { "TITLE":"story014", "TEXT":"[I guess I had some notion that I was queerly dressed for this era, given the...uh...admiring stares that followed me wherever I went. There are two genders, really: those who are excited by the unusual and the unknown, and those who can't stand to see anything that deviates from their own specific comfort zone. Sorry for being facetious.]", "AUDIOFILE":"log014", "AUDIOSPEED":1225},
  "3976078400": { "TITLE":"story015", "TEXT":"[When I meet them and others like us, I recognize myself in them. There is a certain immediate solidarity when that happens, a baseline level of immediate...kinship, maybe, that forms between two people. It's not enough on its own to be the basis of real friendship, but it is certainly helping me survive this era.]", "AUDIOFILE":"log015", "AUDIOSPEED":1225},
  "2891651136": { "TITLE":"story016", "TEXT":"[When I make my art, I get to watch them glow up in front of the camera. To be made into art when you're already a work of art... to be recognized for the work of art that you are...I think that has a lasting effect on people. It is validating.]", "AUDIOFILE":"log016", "AUDIOSPEED":1225},
  "2354455104": { "TITLE":"story017", "TEXT":"[When I found out that he came from another place and another time -- from the future, no less -- well, I flipped. I didn't understand the joke. I didn't understand why he would go to such elaborate lengths to play a prank on me. At the same time, I wanted to trust him. I knew that if this was true, he was taking an incalculable risk in telling me.]", "AUDIOFILE":"log017", "AUDIOSPEED":950},
  "3692241216": { "TITLE":"story018", "TEXT":"[He told me that there were rules. That a person couldn't go into their future any faster than that future came to them. 'What about your future?', I said. 'It's thousands of light years from here, and hundreds of actual years too. It's not like I could run into anyone who might know me.' But he just smiled this sad little smile.]", "AUDIOFILE":"log018", "AUDIOSPEED":925},
  "3698795584": { "TITLE":"story019", "TEXT":"[He was the prettiest man that I have ever met. I often found myself glancing out of the corner of my eye, catching sight of him, and having to do a damn double-take. As if my eyes were surprised that such a creature could exist. As if he didn't quite belong in this reality. And you know what? He didn't.]", "AUDIOFILE":"log019", "AUDIOSPEED":925},
  "3164936768": { "TITLE":"story020", "TEXT":"[He taught me about 'gender euphoria' -- his makeup always seemed to consist of a bright eyeliner and a bold lip, his clothes looked as if he had walked out of some wild, futuristic anime. When I was with him, it felt okay to try on new roles, new ways of being in the world.]", "AUDIOFILE":"log020", "AUDIOSPEED":1025},
  "210509120": { "TITLE":"story021", "TEXT":"[I loved him. But the longer he stayed, the more I could see our time wearing on him. It was dulling his edges, wearing him down slowly. His eyes lost some of their brightness, the constant mirth dancing on his lip turned into that sad little smile. So I told him to go back to his time and place. I told him I would be okay. And mostly, I am.]", "AUDIOFILE":"log021", "AUDIOSPEED":1325},
  "1817977152": { "TITLE":"story022", "TEXT":"[It isn't true -- what the handlers say -- we can change this timeline. I know it. I've seen it. I've done it. It is possible. In fact, it's inescapable. We leave traces in this time. We become quantum-entangled with what we care about -- people, things, times. A small part of us becomes forever entertwined.]", "AUDIOFILE":"log022", "AUDIOSPEED":1215},
  "1816863296": { "TITLE":"story023", "TEXT":"[Quantum Entanglement. Even when separated by great distances, the very substances of our being continue to affect each other... This journey into the past fundamentally changes us, and it changes what we connect to while we are here.]", "AUDIOFILE":"log023", "AUDIOSPEED":1000},
  "2901220672": { "TITLE":"story024", "TEXT":"[Knowing that they won't forget me or our time together when I leave, that we will still be connected on a quantum level, makes it a little easier to go. I wish I could take them with me.]", "AUDIOFILE":"log024", "AUDIOSPEED":1000},
  "1822301248": { "TITLE":"story025", "TEXT":"[When the handlers tell us that 'all of this has happened before', I understand that they don't want us to mess with the course of history. But the lies have to stop. Our actions impact this time in ways that we may not yet be able to imagine.]", "AUDIOFILE":"log025", "AUDIOSPEED":900},
  "3702989120": { "TITLE":"story026", "TEXT":"[If we are altering this timeline, we should come in with our eyes open, now that we have come at all. We will continue to affect this timeline long after we are gone. We are all entangled now.]", "AUDIOFILE":"log026", "AUDIOSPEED":950},
  "1813452864": { "TITLE":"story027", "TEXT":"[I just want to be clear. Everyone comes here to study this place as a cautionary tale, as a civilization on the brink of a major disaster, and I think it needs to be said: our home is no utopia.]", "AUDIOFILE":"log027", "AUDIOSPEED":1000},
  "1819353920": { "TITLE":"story028", "TEXT":"[There's no sudden break between before and after when things go to shit, even if there might be some major events here and there that we can point to. These things happen by degrees.]", "AUDIOFILE":"log028", "AUDIOSPEED":1000},
  "2354586176": { "TITLE":"story029", "TEXT":"[Us time travelers shouldn't pat ourselves on the back and say, 'at least we're not like that place.' We need to look at just how close we are to our own disasters, and we need to push back against them at every turn. I'm here to see the similarities, to see how we could in our own way become them.]", "AUDIOFILE":"log029", "AUDIOSPEED":1000},
  "2629771584": { "TITLE":"story030", "TEXT":"[This is a civilization that had thought it had moved past so many of its worst impulses, but it seems like maybe they just stopped being a topic for polite company. Yes, I'm glad that, at least for now, it's a lot safer for me and my friends, for all of us, to be who we are in our time and place.]", "AUDIOFILE":"log030", "AUDIOSPEED":1100},
  "2095979072": { "TITLE":"story031", "TEXT":"[It happens by degrees, sometimes slow, and sometimes fast. And what we think of as progress might just be a wheel ready to roll over onto us if we're not on the lookout. I wonder how many people, after an atrocity, think to themselves, 'it can't happen here.']", "AUDIOFILE":"log031", "AUDIOSPEED":1175},
  "3701875520": { "TITLE":"story032", "TEXT":"[Let me tell you about my friend. They smile at everyone that they meet. They give their time to their community. They are the staunchest supporters of their friends, colleagues, and family -- chosen or otherwise. They always have time to listen.]", "AUDIOFILE":"log032", "AUDIOSPEED":1000},
  "741285440": { "TITLE":"story033", "TEXT":"[Let me tell you about my friend. They are edging into their early thirties. They are tired. Every time they go to the doctor, they discover that they have a new health problem. They live with chronic pain and a cabinet full of prescription medicine.]", "AUDIOFILE":"log033", "AUDIOSPEED":925},
  "1016077888": { "TITLE":"story034", "TEXT":"[Let me tell you about my friend. Some days, they don't get out of bed. Some days, they wish that they hadn't gotten out of bed. Their cat seems to know what this soft lump of furniture signifies -- at once comforting and a reminder of their failure to rise. They cuddle together in the early morning until they can't put the day off any longer.]", "AUDIOFILE":"log034", "AUDIOSPEED":1000},
  "2897944896": { "TITLE":"story035", "TEXT":"[Let me tell you about my friend. They own one dozen chest binders and the only time that they are not wearing one is when they are asleep. They wish that they didn't harbour such ill will toward their body. On certain lucky days of the week, they don't.]", "AUDIOFILE":"log035", "AUDIOSPEED":975},
  "1817846080": { "TITLE":"story036", "TEXT":"[Let me tell you about my friend. They live in this era and, though they're exhausted, though they are burnt out, though they are in pain, though there seems to be no end to the demands on their attention and heart strings, though there is always the low-level hum of anxiety that threatens to come to the fore...they are here. They are still here.]", "AUDIOFILE":"log036", "AUDIOSPEED":1000},
  "1551505216": { "TITLE":"story037", "TEXT":"[I feel myself dissociating almost immediately. This whole time, it is if I was watching this happen to someone else. It seems to be the only way that my brain can process it.]", "AUDIOFILE":"log037", "AUDIOSPEED":875},
  "2354060096": { "TITLE":"story038", "TEXT":"[I should have been on the lookout for this, I guess. Is it my fault that I got beaten? I read the articles before coming -- about the violence against people like us. But I guess then it felt remote. Kind of like it does now.]", "AUDIOFILE":"log038", "AUDIOSPEED":815},
  "1279992384": { "TITLE":"story039", "TEXT":"[The wet thuds of fists against ruptured flesh punctuate the air. There's a sick rhythm to it. I watch myself throw my hands up to defend my face. Each time, my hands fly up a little less high.]", "AUDIOFILE":"log039", "AUDIOSPEED":850},
  "2359761472": { "TITLE":"story040", "TEXT":"[Time stretches like a rubber band about to snap back against itself. Saliva mixed with blood and plasma dribbles from my lips. I am making a sound that I don't recognize. Now that they've started to hit me, they can't seem to stop. My ears are ringing, and my vision blacks out, and I --]", "AUDIOFILE":"log040", "AUDIOSPEED":650},
  "3974832704": { "TITLE":"story041", "TEXT":"[***THIS SIGNAL IS CORRUPTED BEYOND MY ABILITY TO RESTORE IT. SO SORRY ABOUT THAT.*** Shit. Are you okay? Take a moment if you need to. I'll wait for you. I'll...I'll try to find out what happened to them.]", "AUDIOFILE":"log041", "AUDIOSPEED":1050},
  "1280254528": { "TITLE":"story042", "TEXT":"[Are we doing more harm than good in visiting this era? Harm to the culture here? Harm to ourselves? I hear so many stories about one of us being harmed, emotionally, physically, or feeling the need to become a 'time savior' when we need to empower these people to help themselves.]", "AUDIOFILE":"log042", "AUDIOSPEED":1050},
  "1023091008": { "TITLE":"story043", "TEXT":"[There are things that we take for granted in our own era that would seem, no doubt, strange or wrong to people from other times and other cultures. We're inured to our own context -- like frogs in a pot of water, heated slowly.]", "AUDIOFILE":"log043", "AUDIOSPEED":1000},
  "471999296": { "TITLE":"story044", "TEXT":"[One becomes habituated to the way things are in one's own time. It can be difficult to see any possibility of things being different from the way that they are.]", "AUDIOFILE":"log044", "AUDIOSPEED":1000},
  "4235731008": { "TITLE":"story045", "TEXT":"[Absolutisms and ideological purity do not help us. The systems that we build constrain us, and sometimes we make moral and ethical compromises.]", "AUDIOFILE":"log045", "AUDIOSPEED":1000},
  "3437763136": { "TITLE":"story046", "TEXT":"[We so easily recognize the compromises and contradictions in others, but not in ourselves. Hearing stories about our experiences in this era, I wonder if we ever should have come at all.]", "AUDIOFILE":"log046", "AUDIOSPEED":1000},
  "4242480192": { "TITLE":"story047", "TEXT":"[This pilot project has come to an end. There are too many risks in allowing the experiment to continue. We'll have to send operatives to collect and study the residue that our forays into this era have left behind. Those traces will no doubt be informative.]", "AUDIOFILE":"log047", "AUDIOSPEED":930},
  "4241628736": { "TITLE":"story048", "TEXT":"[Time travel is messy business, let alone when those who are most intent on doing the travel are marginalized in the era they intend to travel to. Many have already tried to alter this timeline, even knowing that our system could not allow that. As our motto goes, all of this has happened before.]", "AUDIOFILE":"log048", "AUDIOSPEED":1000},
  "1290083392": { "TITLE":"story049", "TEXT":"[We are drawn to others like us. We want to know their stories, we want them to know us, too. There is such power in recognizing that we're not alone. And with the headiness of that power, comes the will to act. To act in solidarity and better the lot of those who came before us -- who wouldn't want that?]", "AUDIOFILE":"log049", "AUDIOSPEED":1000},
  "1017652032": { "TITLE":"story050", "TEXT":"[There are still so many questions left unanswered about what we have allowed to happen. We thought that we had protected the timelines adequately -- but how would we know if we didn't? The theories make my head spin.]", "AUDIOFILE":"log050", "AUDIOSPEED":970},
  "3695385920": { "TITLE":"story051", "TEXT":"[Well, at the end of the day, living is a messy business too, isn't it? So if this era and our own aren't on the same paths that they were before, isn't that just the way that things were meant to be from the start? All of this has happened before.]", "AUDIOFILE":"log051", "AUDIOSPEED":1050},
  "3169787200": { "TITLE":"story052", "TEXT":"[Okay. It's time to come home for now. I'll prepare your return trip. Just place your scanner right there, in the fitted slot. \nSee you on the other side.]", "AUDIOFILE":"log052", "AUDIOSPEED":1000},
  "1291133760": { "TITLE":"story053", "TEXT":"[Stand By For Imminent Time Travel.]\r[Running System Diagnostics ... ]\r[ ... Calibrating Dark Matter Transfer System ... ]\r[ ... Calculating Pressure Differentials ... ]\r[ ... Analyzing Energy Needed for Jump ... ]\r[What Excellent News! You can safely return to your own era.]\r[ ... Preparing ... ]\r[ ... Adjusting Expected Vector Paths ... ]\r[ ... Stand By ... ]\r[ ... Please walk forward until you see your point of Origin ... ]\r[ ... Time Travel complete ... ]\r[ ... Please speak with the technician to return your equipment ... ]\r", "AUDIOFILE":"log053", "AUDIOSPEED":1200},
  "1813583936": { "TITLE":"story054", "TEXT":"Everything is connected and working. You can start playing the game!", "AUDIOFILE":"log054", "AUDIOSPEED":1000}
}

			createjs.Sound.registerSound("log001.ogg", "log001");
			createjs.Sound.registerSound("log002.ogg", "log002");
			createjs.Sound.registerSound("log003.ogg", "log003");
			createjs.Sound.registerSound("log004.ogg", "log004");
			createjs.Sound.registerSound("log005.ogg", "log005");
			createjs.Sound.registerSound("log006.ogg", "log006");
			createjs.Sound.registerSound("log007.ogg", "log007");
			createjs.Sound.registerSound("log008.ogg", "log008");
			createjs.Sound.registerSound("log009.ogg", "log009");
			createjs.Sound.registerSound("log010.ogg", "log010");
			createjs.Sound.registerSound("log011.ogg", "log011");
			createjs.Sound.registerSound("log012.ogg", "log012");
			createjs.Sound.registerSound("log013.ogg", "log013");
			createjs.Sound.registerSound("log014.ogg", "log014");
			createjs.Sound.registerSound("log015.ogg", "log015");
			createjs.Sound.registerSound("log016.ogg", "log016");
			createjs.Sound.registerSound("log017.ogg", "log017");
			createjs.Sound.registerSound("log018.ogg", "log018");
			createjs.Sound.registerSound("log019.ogg", "log019");
			createjs.Sound.registerSound("log020.ogg", "log020");
			createjs.Sound.registerSound("log021.ogg", "log021");
			createjs.Sound.registerSound("log022.ogg", "log022");
			createjs.Sound.registerSound("log023.ogg", "log023");
			createjs.Sound.registerSound("log024.ogg", "log024");
			createjs.Sound.registerSound("log025.ogg", "log025");
			createjs.Sound.registerSound("log026.ogg", "log026");
			createjs.Sound.registerSound("log027.ogg", "log027");
			createjs.Sound.registerSound("log028.ogg", "log028");
			createjs.Sound.registerSound("log029.ogg", "log029");
			createjs.Sound.registerSound("log030.ogg", "log030");
			createjs.Sound.registerSound("log031.ogg", "log031");
			createjs.Sound.registerSound("log032.ogg", "log032");
			createjs.Sound.registerSound("log033.ogg", "log033");
			createjs.Sound.registerSound("log034.ogg", "log034");
			createjs.Sound.registerSound("log035.ogg", "log035");
			createjs.Sound.registerSound("log036.ogg", "log036");
			createjs.Sound.registerSound("log037.ogg", "log037");
			createjs.Sound.registerSound("log038.ogg", "log038");
			createjs.Sound.registerSound("log039.ogg", "log039");
			createjs.Sound.registerSound("log040.ogg", "log040");
			createjs.Sound.registerSound("log041.ogg", "log041");
			createjs.Sound.registerSound("log042.ogg", "log042");
			createjs.Sound.registerSound("log043.ogg", "log043");
			createjs.Sound.registerSound("log044.ogg", "log044");
			createjs.Sound.registerSound("log045.ogg", "log045");
			createjs.Sound.registerSound("log046.ogg", "log046");
			createjs.Sound.registerSound("log047.ogg", "log047");
			createjs.Sound.registerSound("log048.ogg", "log048");
			createjs.Sound.registerSound("log049.ogg", "log049");
			createjs.Sound.registerSound("log050.ogg", "log050");
			createjs.Sound.registerSound("log051.ogg", "log051");
			createjs.Sound.registerSound("log052.ogg", "log052");
			createjs.Sound.registerSound("log053.ogg", "log053");
			createjs.Sound.registerSound("log054.ogg", "log054");

			socketNFC.on('onCurrentStory', function(data)
			{ 
				if (!(soundInstance && soundInstance.playState != createjs.Sound.PLAY_FINISHED)){
				console.log("DATA IS BEING RECEIVED THROUGH NFC SOCKET");

				if (data == "" || data == undefined || data == " " || data == null || isNaN(data)){
        return
      }
				newStory = data; 
				console.log(data);
				newStory = newStory.trim();
				callEverything(newStory);
				}
			});



function callEverything(data){
if (newStory != "") 
				{
					receivedCue = newStory;
					console.log("Text and Audio Reference: " + receivedCue);
					callStoryPrint(receivedCue);
					storyAudio(receivedCue);
				}
			};

function getDatabase(passedCue){
  return database[passedCue];
  //
}

//PLAY AUDIO

function storyAudio(passedCue) {
soundFile = getDatabase(passedCue);
// console.log("AUDIO DATABASE :" + soundFile);
var rawAudioID = soundFile.AUDIOFILE;
// console.log("RAW AUDIO ID: " + rawAudioID);
var audioID = rawAudioID;
// console.log("THIS IS THE PROCESSED AUDIO ID: " + audioID);

//if (!(soundInstance && soundInstance.playState != createjs.Sound.PLAY_FINISHED))
soundInstance = createjs.Sound.play(audioID);
console.log("Ooo sound should be playing.");
}


//ENRIC's awesome LCD text scroller

var lineMaxCharacters = 19;
var maxRows = 4;
var delayPerChunk = 1000;
var chunk;
var aStoryLine; 

console.log("Searching for traces...")
console.log(database);


function callStoryPrint(passedCue) {
	//if (!(soundInstance && soundInstance.playState != createjs.Sound.PLAY_FINISHED)){
storyLine = getDatabase(passedCue);
processRawText(storyLine);
displayStoryNode(storyLine);
}

// this expects a node with title, and rawtext, with chunks empty
function processRawText(aStoryLine){
  var rawText = aStoryLine.TEXT;
  var words = rawText.split(" ");
  delayPerChunk = aStoryLine.AUDIOSPEED;
  var rows = [];
  var currentRow = "";

  console.log(words);

  for (i = 0; i < words.length; i++){
    if(currentRow.length + words[i].length > lineMaxCharacters){
      // we need to split
      // add current row to array
      currentRow = currentRow.trim();
      rows.push(currentRow.substring(0, lineMaxCharacters));
      // create a new row
      currentRow = words[i] + " ";
    }
    else {
      currentRow += words[i] + " ";
    }
  }
  // currentRow += "\r";
  currentRow = currentRow.trim();
      rows.push(currentRow.substring(0, lineMaxCharacters));
  aStoryLine.rows = rows;
  return aStoryLine;
}

function displayStoryNode(storynode){
  // sends the text to serialport 4 rowas at a time
  var lastIndex =-1;
  var i = 0;
  var chunks = [];
  for (i = 0; i < storynode.rows.length; i++) {
    var msg = "";
    chunk = "\r" + storynode.rows[i];
    console.log(delayPerChunk);
     setTimeout(displaySingleChunk, delayPerChunk*(i+1), chunk);
    //.slice(i, i + 4);
  //   msg = chunk.join("\r");
  //   lastIndex = i+3;
  //   chunks.push(msg);
  // }
  // for (d = 0; d < chunks.length; d++){
  //   display = chunks[d];
  //   display = display.substring(0, display.length - 1);
  //   setTimeout(displaySingleChunk, delayPerChunk*(d+1), display);
  }
  setTimeout(displaySingleChunk, delayPerChunk*(i+1), "\r");
  setTimeout(displaySingleChunk, delayPerChunk*(i+2), "\r");
  setTimeout(displaySingleChunk, delayPerChunk*(i+3), "\r");
  setTimeout(displaySingleChunk, delayPerChunk*(i+4), "\r");
}

//sending chunks
function displaySingleChunk(chunk){
console.log(chunk);
parsedChunk = chunk;
parsedChunk = parsedChunk.toString();
console.log("Parsed Chunk: " + parsedChunk);
socketNFC.emit('storyChunk', parsedChunk);
console.log("The single chunk should be displaying.");
};


