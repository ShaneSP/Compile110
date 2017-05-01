var linesoftext = [["Hello student! It seems you", "have been transported to a", "strange new world!"],
                    ["In this world, coding is", "EVERYTHING!"],
                    ["You will need to code to", "defend yourself against", "enemies."],
                    ["Like this one!"],
                    ["..."],
                    ["This is a bit! It may look", "harmless, but it's actually", "quite dangerous!"],
                    ["Every enemy in this world", "has its own code."],
                    ["In order to see enemy code,", "click on them and it will", "show up on the right pane!"],
                    ["Try clicking on the bit", "that just appeared here!"],
                    ["[INSERT TEXT PERTAINING","TO THE BIT HERE]"],
                    ["As you can see, if you are", "going to survive here, you'll", "need to learn enemies' code!"],
                    ["This bit looks like it can", "shoot energy blasts at you!"],
                    ["You can do things too!"],
                    ["Try typing 'this.moveRight();'", "into the console on the left."],
                    ["Then click on the run code button", "to execute the code you have", "just written."],
                    ["See how your character just moved", "one space to the right?"],
                    ["This line of code is called", "a 'function'. All entities in", "this world can call functions."],
                    ["There are various functions", "you can call to control", "your character in this world."],
                    ["To see what functions you can", "call, click the options", "above to learn more about them!"],
                    ["..."],
                    ["Have you finished reading", "about the functions? If so,", "prepare to defeat the bit!"],
                    ["From the enemy code, we can", "see that the bit charges", "a blast, and then fires it."],
                    ["To defeat the bit, we are", "going to "]
                    ["That's all for now!"],
                    ["..."]
                  ];
var currentline = 0;
var globalinterval = 40;

var showText = function(target, message, line, index, interval) {
  if(currentline==4) {
    SPAWN=true;
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

var nextText = (function(target) {
  currentline = (currentline + 1) % linesoftext.length;
  $(target).empty();
  showText(target, linesoftext[currentline], 0, 0, globalinterval);
});
