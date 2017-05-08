var linesoftext = [["Hello student! It seems you", "have been transported to a", "strange new world!"],
                    ["In this world, coding is", "EVERYTHING!"],
                    ["You will need to code to", "defend yourself against", "enemies."],
                    ["Like this one!"],
                    ["..."],
                    ["This is a bit! It may look", "harmless, but it's actually", "quite dangerous!"],
                    ["Everything in this world", "has its own code."],
                    ["To see other code, click on", "entities and their code will", "show up on the right pane!"],
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
                    ["As we progress in this world,", "you will be learning more", "and more functions!"],
                    ["Click on yourself to see", "what functions you can use!"],
                    ["Now, it's time... prepare to", "defeat the bit!"],
                    ["There are multiple ways to", "kill the bit. See that sword", "up there?"],
                    ["You can kill the bit with", "that sword; however, there is", "a secret way to kill it."],
                    ["You have access to a shield", "already. I wonder what it", "does."],
                    ["The bit can shoot blasts at", "you, right? Maybe that has to", "do with it."],
                    ["Use what you have learned", "to defeat the bit and advance", "to the next level!"],
                    ["No matter what, you will need", "that sword to progress."],
                    ["You exit the level by stepping", "on the portal with that", "sword, so get it."],
                    ["Starting now, once you click", "'continue', the enemy will", "start attacking! Good luck!"],
                    ["..."]
                  ];
var importantlines = [2, 3, 13, 14, 29, 30];
var currentline = 0;
var globalinterval = 25;

var showText = function(target, message, line, index, interval) {
  if(currentline==0) {
    $("#runcode").prop("disabled", true);
  } else if(currentline==4) {
    SPAWN=true;
  } else if(currentline==15){
    RUNCODE=true;
    $("#runcode").prop("disabled", false);
    SPAWN=false;
  } else if(currentline==30){
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

//var textdiv = document.getElementById("textdiv")
//window.addEventListener("keypress", nextText, false);

//function doKeyDown(e) {
//  alert(e.keyCode);
//  if (e.keyCode == 39) {
//    nextText(target);
//  }
//}
