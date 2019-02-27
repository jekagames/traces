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
  "1635431931": { "TITLE":"story001", "TEXT":"[It's just a jump to the left! Time Re-Adjustment Complete!]\\n[Stand By.]\\n[Running System Diagnostics...]\\n[...Scanning Environment...]\\n[...Calculating Pressure Differentials...]\\n[...Analyzing Ambient Air for Breathability...]\\n[What Excellent News! You can safely exist in this physical environment.]\\n[...Downloading Known Cultural Archives...] \\n[...Adjusting Expected Vector Paths...]\\n[...Analysis is Ongoing...]\\n[...Cannot fully determine risk from cultural exposure.]\\n[Sorry About That! Be cautious when interacting with locals.]\\n[Please wait for information about your current assigned task.]\\n[Hey. This place isn't like our home. I know that you know that, but I want to remind you. I need you to remember it. The people here will look at you funny. They won't understand some of the words that you use. Hell, you even need to be careful about when and where you take a leak.]\\n[You're not exactly going to blend in here. This civilization hasn't committed to the liberation of all of its people yet. It's an ugly time for us.]\\n[But we need to collect this data. We need to find the traces left behind by those of us who traveled here before. Our comrades, our siblings, our friends.]\\n[You can see their traces permeating the space, tying echoes of their very beings to the artefacts that they left behind, to the spaces and things that meant something to them here. Track down the artefacts and spaces, and we can analyze the traces. That's what you're here to do.]\\n[This culture is breaking down -- falling prey to its species' worst impulses. Many of our scientists and researchers are drawn to this time and era. History is about to repeat itself when scant decades have passed since this world said never again. Maybe it is more accurate to say that it is functioning exactly as intended for the dominant group -- that their systems are working to keep them in power at the expense of their souls -- if you believe in that sort of thing.]\\n[As painful as it is, you aren't here to interfere. Remember: all of this has already happened. Collecting those traces, making sure that they survive to our time, that's your responsibility to those who will suffer here. Maybe we can avoid repeating their past ourselves. Maybe we can't. But let's ensure that the traces and memories of the people here are a boon to our present. Those born to this time who suffer are also our siblings, I figure, though our times may be out of sync, and though we may be from a distant star.]\\n[Let's start by taking a look around and having a little walk. I'll be with you most of the time... As much as I can be while not physically next to you. The traces...look for objects that seem out of place. They might be hard to spot at first, but you'll adjust soon. I'm detecting a trace nearby. Do you see it? Walk over and scan the surface until you hear from me again. Be casual. Act like you're not an intergalactic time traveler. And don't let anyone see you scanning the traces.]", "AUDIOFILE":"log001"},
  "4051744763": { "TITLE":"story002", "TEXT":"[These are the field notes of Dr. Moira Chess for November 21st, 2018 Common Earth Era. It has been a rough month for local and international politics. The people I am studying feel this particularly keenly.]", "AUDIOFILE":"log002"},
  "17938683": { "TITLE":"story003", "TEXT":"['There is a crack in everything. That's how the light gets in.' A poet from this era wrote that some decades ago. He was writing about the future, I think. I only hope that the light is enough to sustain them.]", "AUDIOFILE":"log003"},
  "2446767611": { "TITLE":"story004", "TEXT":"[I worry that I might be getting too close to this situation. I know that I have to participate sincerely for this ethnography to work, but it is so difficult to see all that is happening and not betray that I don't belong to this time or place.]", "AUDIOFILE":"log004"},
  "285915387": { "TITLE":"story005", "TEXT":"[As if basic decency weren't enough, even their science backs up their -- our -- existence in this era. But their politicians are doing all that they can to dehumanize them. To erase them.]", "AUDIOFILE":"log005"},
  "1552818752": { "TITLE":"story006", "TEXT":"[I'm worried about my new friends, but I know that they are resilient. Our kind have always existed. We will continue to exist. Though they may try to erase us. Though they may persecute us. I don't think that I can go home. I think that I have to stand with them.]", "AUDIOFILE":"log006"},
  "1280123456": { "TITLE":"story007", "TEXT":"[I was freshly arrived in this era. There was a single-stall, accessible 'family' bathroom nearby, but it was unfortunately locked. So I cast about and decided to use the Women's washroom. For anyone confused by that, that's the room with all stalls and no urinals.]", "AUDIOFILE":"log007"},
  "1281106240": { "TITLE":"story008", "TEXT":"[I was suddenly gripped right above my elbows from behind. I spun around, and there was a five foot tall woman smiling at me, a customer service smile. Surprised, I grabbed her wrists on reflex -- but gently. I tried to make my six foot tall frame smaller, less intimidating. 'This is the woman's washroom,' she said. 'I know,' I said, and -- still taking pains to be ever so gentle, lest she find me scary or intimidating -- pushed her hands away from my body.]", "AUDIOFILE":"log008"},
  "1016209984": { "TITLE":"story009", "TEXT":"[Going to the bathroom in this era often feels humiliating, dehumanizing. I pee sitting down, so the men's room, which usually has fewer stalls, was a dangerous, intimidating place, because I might be stuck there for longer. More chances of 'getting caught', as it were.]", "AUDIOFILE":"log009"},
  "471736384": { "TITLE":"story010", "TEXT":"[I started to practice certain phrases when I came to this era. 'I think I know what bathroom I ought to be using better than someone else.' That's my go-to. I have my pride, after all. I don't want to cause an incident, but for crying out loud, I'm just trying to pee.]", "AUDIOFILE":"log010"},
  "3424133184": { "TITLE":"story011", "TEXT":"[I know my work here is important. That's why I stay. But while there's the initial thrill of someone from the past mistaking you for another gender, based on the archaic rules here, it gets old real fast. It gets tiring.]", "AUDIOFILE":"log011"},
  "2353143104": { "TITLE":"story012", "TEXT":"[Coming to this era to make art about its people, it made me realize just how much I matter. Just how much my visibility matters. In my time, it's a matter of course. But here... the world would rather we shut up and be quiet. The system marches on more easily that way. Selling people solutions for their unhappiness. Addressing the symptoms, not the causes. That's how it works here.]", "AUDIOFILE":"log012"},
  "3962707520": { "TITLE":"story013", "TEXT":"[I get to watch them...I do think this is what the kids call it in this era... I get to watch them glow up. Once they realize that there is language for who they are and what they feel, once they realize that there are others like them, they glow up. They become more and more themselves. It is such an amazing transformation.]", "AUDIOFILE":"log013"},
  "3170572352": { "TITLE":"story014", "TEXT":"[I guess I had some notion that I was queerly dressed for this era, given the...uh...admiring stares that followed me wherever I went. There are two genders, really: those who are excited by the unusual and the unknown, and those who can't stand to see anything that deviates from their own specific comfort zone. Sorry for being facetious.]", "AUDIOFILE":"log014"},
  "3976078400": { "TITLE":"story015", "TEXT":"[When I meet them and others like us, I recognize myself in them. There is a certain immediate solidarity when that happens, a baseline level of immediate...kinship, maybe, that forms between two people. It's not enough on its own to be the basis of real friendship, but it is certainly helping me survive this era.]", "AUDIOFILE":"log015"},
  "2891651136": { "TITLE":"story016", "TEXT":"[When I make my art, I get to watch them glow up in front of the camera. To be made into art when you're already a work of art... to be recognized for the work of art that you are...I think that has a lasting effect on people. It is validating.]", "AUDIOFILE":"log016"},
  "2354455104": { "TITLE":"story017", "TEXT":"[When I found out that he came from another place and another time -- from the future, no less -- well, I flipped. I didn't understand the joke. I didn't understand why he would go to such elaborate lengths to play a prank on me. At the same time, I wanted to trust him. I knew that if this was true, he was taking an incalculable risk in telling me.]", "AUDIOFILE":"log017"},
  "3692241216": { "TITLE":"story018", "TEXT":"[He told me that there were rules. That a person couldn't go into their future any faster than that future came to them. 'What about your future?', I said. 'It's thousands of light years from here, and hundreds of actual years too. It's not like I could run into anyone who might know me.' But he just smiled this sad little smile.]", "AUDIOFILE":"log018"},
  "3698795584": { "TITLE":"story019", "TEXT":"[He was the prettiest man that I have ever met. I often found myself glancing out of the corner of my eye, catching sight of him, and having to do a damn double-take. As if my eyes were surprised that such a creature could exist. As if he didn't quite belong in this reality. And you know what? He didn't.]", "AUDIOFILE":"log019"},
  "3164936768": { "TITLE":"story020", "TEXT":"[He taught me about 'gender euphoria' -- his makeup always seemed to consist of a bright eyeliner and a bold lip, his clothes looked as if he had walked out of some wild, futuristic anime. When I was with him, it felt okay to try on new roles, new ways of being in the world.]", "AUDIOFILE":"log020"},
  "210509120": { "TITLE":"story021", "TEXT":"[I loved him. But the longer he stayed, the more I could see our time wearing on him. It was dulling his edges, wearing him down slowly. His eyes lost some of their brightness, the constant mirth dancing on his lip turned into that sad little smile. So I told him to go back to his time and place. I told him I would be okay. And mostly, I am.]", "AUDIOFILE":"log021"},
  "1817977152": { "TITLE":"story022", "TEXT":"[I came to this time to study the signs of a culture on the brink. The emergence of fascism that happened here -- first slow and tentative, but then fast once it realized how little resistance it found -- I thought I might find it instructive for my studies. I wanted to observe aloofly, but I wasn't prepared for the realities of watching it all happen live.]", "AUDIOFILE":"log022"},
  "1816863296": { "TITLE":"story023", "TEXT":"[I visited their own museums on the topic, which delineated in clean, simple language how fascism comes to grip a society. It turns out that few people read museum displays, I guess. Otherwise, more might have known that this was coming. Would it have mattered? Or was it just too inconvenient to organize and fight the insidious bigotry that surrounded them?]", "AUDIOFILE":"log023"},
  "2901220672": { "TITLE":"story024", "TEXT":"[I am angry in a way that I had not expected at the state of this world and the people inside of it. Knowing the underpinning of the fascism that blooms here like canker sores, knowing how it is held up by systems benefitting the rich and powerful, the privileged -- none of that helps to bring me any peace.]", "AUDIOFILE":"log024"},
  "1822301248": { "TITLE":"story025", "TEXT":"[I swore not to interfere, just like all of us who come here. I tell myself again and again that all of this has already happened, and that maybe there are lessons here to prevent it from happening again. But this isn't like reviewing footage in an archive.]", "AUDIOFILE":"log025"},
  "3702989120": { "TITLE":"story026", "TEXT":"[At its core, fascism needs our apathy, it needs to scapegoat others for the daily problems that it claims it can resolve, and it needs the people who will stand idly by and do nothing, just as it needs the banality of people 'just doing their jobs' and keeping their heads down. I know I probably won't have any impact on what is to come, but I still can't be a bystander. All of this has happened before.]", "AUDIOFILE":"log026"},
  "1813452864": { "TITLE":"story027", "TEXT":"[I just want to be clear. Everyone comes here to study this place as a cautionary tale, as a civilization on the brink of a major disaster, and I think it needs to be said: our home is no utopia.]", "AUDIOFILE":"log027"},
  "1819353920": { "TITLE":"story028", "TEXT":"[There's no sudden break between before and after when things go to shit, even if there might be some major events here and there that we can point to. These things happen by degrees.]", "AUDIOFILE":"log028"},
  "2354586176": { "TITLE":"story029", "TEXT":"[Us time travelers shouldn't pat ourselves on the back and say, 'at least we're not like that place.' We need to look at just how close we are to our own disasters, and we need to push back against them at every turn. I'm here to see the similarities, to see how we could in our own way become them.]", "AUDIOFILE":"log029"},
  "2629771584": { "TITLE":"story030", "TEXT":"[This is a civilization that had thought it had moved past so many of its worst impulses, but it seems like maybe they just stopped being a topic for polite company. Yes, I'm glad that, at least for now, it's a lot safer for me and my friends, for all of us, to be who we are in our time and place.]", "AUDIOFILE":"log030"},
  "2095979072": { "TITLE":"story031", "TEXT":"[It happens by degrees, sometimes slow, and sometimes fast. And what we think of as progress might just be a wheel ready to roll over onto us if we're not on the lookout. I wonder how many people, after an atrocity, think to themselves, 'it can't happen here.']", "AUDIOFILE":"log031"},
  "3701875520": { "TITLE":"story032", "TEXT":"[This is my second time visiting the past. In this era, people are obsessed with having gendered identification papers. The first time, when we were falsifying my documents, I flipped a coin to choose which one to put down.]", "AUDIOFILE":"log032"},
  "741285440": { "TITLE":"story033", "TEXT":"[During my last visit, I thought that I had chosen the wrong gender for my ID because everyone treated me very strangely. I thought that I must read the other way.]", "AUDIOFILE":"log033"},
  "1016077888": { "TITLE":"story034", "TEXT":"[I amended my paperwork to a different gender because of what happened last time, but it doesn't seem to have helped. I suppose that the way that I have been socialized is confusing to those who can only conceive of a binary gender. I tell myself that my pity does not help them.]", "AUDIOFILE":"log034"},
  "2897944896": { "TITLE":"story035", "TEXT":"[I see the harm that these rigid structures do to the people of this era -- both cisgender and trans. Even admitting that you're suffering can be taboo in this era. People repress their own impulses to fall in line, and falling outside of these norms is often severely punished.]", "AUDIOFILE":"log035"},
  "1817846080": { "TITLE":"story036", "TEXT":"[I have heard of those who have taken their own lives, and also of those who have had their lives taken. Non-conformity is dangerous in these times. All the talk about individualism and standing out is meant within narrow, safe bounds. Buy a colour jacket, or wear your hair a new way -- be funky! But don't question the system.]", "AUDIOFILE":"log036"},
  "1551505216": { "TITLE":"story037", "TEXT":"[I feel myself dissociating almost immediately. This whole time, it is if I was watching this happen to someone else. It seems to be the only way that my brain can process it.]", "AUDIOFILE":"log037"},
  "2354060096": { "TITLE":"story038", "TEXT":"[I should have been on the lookout for this, I guess. Is it my fault that I got beaten? I read the articles before coming -- about the violence against people like us. But I guess then it felt remote. Kind of like it does now.]", "AUDIOFILE":"log038"},
  "1279992384": { "TITLE":"story039", "TEXT":"[The wet thuds of fists against ruptured flesh punctuate the air. There's a sick rhythm to it. I watch myself throw my hands up to defend my face. Each time, my hands fly up a little less high.]", "AUDIOFILE":"log039"},
  "2359761472": { "TITLE":"story040", "TEXT":"[Time stretches like a rubber band about to snap back against itself. Saliva mixed with blood and plasma dribbles from my lips. I am making a sound that I don't recognize. Now that they've started to hit me, they can't seem to stop. My ears are ringing, and my vision blacks out, and I --]", "AUDIOFILE":"log040"},
  "3974832704": { "TITLE":"story041", "TEXT":"[***THIS SIGNAL IS CORRUPTED BEYOND MY ABILITY TO RESTORE IT. SO SORRY ABOUT THAT.*** Shit. Are you okay? Take a moment if you need to, okay? I'll wait for you. I'll...I'll try to find out what happened to them.]", "AUDIOFILE":"log041"},
  "1280254528": { "TITLE":"story042", "TEXT":"[Are we doing more harm than good in visiting this era? Harm to the culture here? Harm to ourselves? I hear so many stories about one of us being harmed, emotionally, physically, or feeling the need to become a 'time savior' when we need to empower these people to help themselves.]", "AUDIOFILE":"log042"},
  "1023091008": { "TITLE":"story043", "TEXT":"[There are things that we take for granted in our own era that would seem, no doubt, strange or wrong to people from other times and other cultures. We're inured to our own context -- like frogs in a pot of water, heated slowly.]", "AUDIOFILE":"log043"},
  "471999296": { "TITLE":"story044", "TEXT":"[One becomes habituated to the way things are in one's own time. It can be difficult to see any possibility of things being different from the way that they are.]", "AUDIOFILE":"log044"},
  "4235731008": { "TITLE":"story045", "TEXT":"[Absolutisms and ideological purity do not help us. The systems that we build constrain us, and sometimes we make moral and ethical compromises.]", "AUDIOFILE":"log045"},
  "3437763136": { "TITLE":"story046", "TEXT":"[We so easily recognize the compromises and contradictions in others, but not in ourselves. Hearing stories about our experiences in this era, I wonder if we ever should have come at all.]", "AUDIOFILE":"log046"},
  "4242480192": { "TITLE":"story047", "TEXT":"[This pilot project has come to an end. There are too many risks in allowing the experiment to continue. We'll have to send operatives to collect and study the residue that our forays into this era have left behind. Those traces will no doubt be informative.]", "AUDIOFILE":"log047"},
  "4241628736": { "TITLE":"story048", "TEXT":"[Time travel is messy business, let alone when those who are most intent on doing the travel are marginalized in the era they intend to travel to. Many have already tried to alter this timeline, even knowing that our system could not allow that. As our motto goes, all of this has happened before.]", "AUDIOFILE":"log048"},
  "1290083392": { "TITLE":"story049", "TEXT":"[We are drawn to others like us. We want to know their stories, we want them to know us, too. There is such power in recognizing that we're not alone. And with the headiness of that power, comes the will to act. To act in solidarity and better the lot of those who came before us -- who wouldn't want that?]", "AUDIOFILE":"log049"},
  "1017652032": { "TITLE":"story050", "TEXT":"[There are still so many questions left unanswered about what we have allowed to happen. We thought that we had protected the timelines adequately -- but how would we know if we didn't? The theories make my head spin.]", "AUDIOFILE":"log050"},
  "3695385920": { "TITLE":"story051", "TEXT":"[Well, at the end of the day, living is a messy business too, isn't it? So if this era and our own aren't on the same paths that they were before, isn't that just the way that things were meant to be from the start? All of this has happened before.]", "AUDIOFILE":"log051"},
  "3169787200": { "TITLE":"story052", "TEXT":"[Okay. It's time to come home for now. I'll prepare your return trip. Just place your scanner right there, in the fitted slot. See you on the other side.]", "AUDIOFILE":"log052"},
  "1291133760": { "TITLE":"story053", "TEXT":"[Stand By For Imminent Time Travel.]\\n[Running System Diagnostics...]\\n[...Calibrating Dark Matter Transfer System...]\\n[...Calculating Pressure Differentials...]\\n[...Analyzing Energy Needed for Jump...]\\n[What Excellent News! You can safely return to your own era.]\\n[...Preparing ...] \\n[...Adjusting Expected Vector Paths...]\\n[...Stand By...]\\n[...Please walk forward until you see your point of Origin...]\\n[...Time Travel complete...]\\n[...Please speak with the technician to return your equipment...]", "AUDIOFILE":"log053"},
  "1813583936": { "TITLE":"story054", "TEXT":"Everything is connected and working. You can start playing the game!", "AUDIOFILE":"log054"}
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
				console.log("DATA IS BEING RECEIVED THROUGH NFC SOCKET");

				if (data == "" || data == undefined || data == " " || data == null || isNaN(data)){
        return
      }
				var newStory = data; 
				console.log(data);
				newStory = newStory.trim();
				// console.log(newStory + " is being written to newStory");

				if (newStory != "") 
				{
					receivedCue = newStory;
					console.log("Text and Audio Reference: " + receivedCue);
					callStoryPrint(receivedCue);
					//THIS IS WHERE IT BORKSvvv
					storyAudio(receivedCue);
				}
			});


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

if (!(soundInstance && soundInstance.playState != createjs.Sound.PLAY_FINISHED))
soundInstance = createjs.Sound.play(audioID);
console.log("Ooo sound should be playing.");
}


//ENRIC's awesome LCD text scroller

var lineMaxCharacters = 20;
var maxRows = 4;
var delayPerChunk = 1000;
var chunk;

console.log("Searching for traces...")
console.log(database);


function callStoryPrint(passedCue) {
storyLine = getDatabase(passedCue);
// console.log("Printing storyLine: " + storyLine);
processRawText(storyLine);
displayStoryNode(storyLine);
//displaySingleChunk(chunk);

}

// this expects a node with title, and rawtext, with chunks empty
function processRawText(aStoryLine){
  var rawText = storyLine.TEXT;
  // console.log(rawText);
  var words = rawText.split(" ");
  var rows = [];
  var currentRow = "";

  console.log(words);

  for (i = 0; i < words.length; i++){
    if(currentRow.length + words[i].length > lineMaxCharacters){
      // we need to split
      // add current row to array
      rows.push(currentRow.trim());
      // create a new row
      currentRow = words[i] + " ";
    }
    else {
      currentRow += words[i] + " ";
    }
  }
  rows.push(currentRow.trim());
  storyLine.rows = rows;
  return storyLine;
}

function displayStoryNode(storynode){
  // sends the text to serialport 4 rowas at a time
  var lastIndex =-1;
  var chunks = [];
  for (i = 0; i < storynode.rows.length; i++) {
    var msg = "";
    chunk = storynode.rows.slice(i, i + 4);
    msg = chunk.join(" ");
    lastIndex = i+3;
    chunks.push(msg);
  }
  for (d = 0; d < chunks.length; d++){
    display = chunks[d];
    setTimeout(displaySingleChunk, delayPerChunk*(d+1), display);
  }
}

//sending chunks
function displaySingleChunk(chunk){
console.log(chunk);
parsedChunk = chunk;
parsedChunk = parsedChunk.toString();
console.log("Parsed Chunk: " + parsedChunk);
socketNFC.emit('storyChunk', parsedChunk);
console.log("The single chunk should be displaying.");
// })
};


