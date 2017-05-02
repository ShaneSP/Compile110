var linesoftext = [["Hello student! It seems you", "have been transported to a", "strange new world!"],
                    ["In this world, coding is", "EVERYTHING!"],
                    ["You will need to code to", "defend yourself against", "enemies."],
                    ["Like this one!"],
                    ["..."],
                    ["This is a bit! It may look", "harmless, but it's actually", "quite dangerous!"],
                    ["Every enemy in this world", "has its own code."],
                    ["In order to see enemy code,", "click on them and it will", "show up on the right pane!"],
                    ["Try clicking on the bit", "that just appeared here!"],
                    ["See how the enemy code", "appeared in the right console?"],
                    ["As you can see, if you are", "going to survive here, you'll", "need to learn enemies' code!"],
                    ["This bit looks like it can", "shoot energy blasts at you!"],
                    ["However, you can perform", "actions too!"],
                    ["Type 'player.moveRight();'", "into the console on the left."],
                    ["Be sure to always remember", "to clear out the player code", "when typing new code in."],
                    ["Now, click the 'run code'", "button to execute the code", "you have just written."],
                    ["See how your character just", "moved one space to the right?"],
                    ["This line of code is called", "a 'function'. All entities in", "this world can call functions."],
                    ["There are various functions", "you can call to control", "your character in this world."],
                    ["To see what functions you can", "call, click on my face", "above to learn about them!"],
                    ["..."],
                    ["Have you finished reading", "about the functions? If so,", "prepare to defeat the bit!"],
                    ["From the enemy code we can", "see that the bit charges", "a blast, and then fires it."],
                    ["To defeat the bit, we are", "going to call the", "shieldRight(); function."],
                    ["Your shield should reflect", "the blast back at the bit and", "destroy it!"],
                    ["Use what you have learned", "to defeat the bit and advance", "to the next level!"],
                    ["Starting now, once you click", "'continue', the enemy will", "start attacking! Good luck!"],
                    ["..."]
                  ];
var importantlines = [2, 3, 13, 14, 25, 26];
var currentline = 0;
var globalinterval = 35;

var showText = function(target, message, line, index, interval) {
  if(currentline==4) {
    SPAWN=true;
  } else if(currentline==14){
    RUNCODE=true;
    SPAWN=false;
  } else if(currentline==27){
    ATTACK=true;
    SPAWN=false;
  } else {
    SPAWN=false;
  }
  if (line < message.length && index < message[line].length && linesoftext[currentline] == message) {
    $(target).append(message[line][index++]);
    setTimeout(function() {showText(target, message, line, index, interval);}, interval);
  }
  else if (line < message.length && linesoftext[currentline] == message) {
    line = line + 1;
    $(target).append("<br/>");
    showText(target, message, line, 0, interval);
  }
}

$(function () {
  showText("#text_target", linesoftext[0], 0, 0, globalinterval);
});

var skipText = function(target) {
  for (var i in importantlines) {
    if (currentline <= importantlines[i]) {
      currentline = importantlines[i];
      nextText(target);
      return;
    }
  }
  nextText(target);
  return;
}

var nextText = (function(target) {
  if (currentline < linesoftext.length - 1) {
    currentline = (currentline + 1);
  }
  $(target).empty();
  showText(target, linesoftext[currentline], 0, 0, globalinterval);
});
