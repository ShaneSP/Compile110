var linesoftext = ["Hello student! It seems you have been transported to a strange new world!",
                    "In this world, coding is EVERYTHING!",
                    "You will need to code to defend yourself against enemies.",
                    "Like this one!",
                    "FIN."];
var currentline = 0;
var globalinterval = 40;

var showText = function(target, message, index, interval) {
  if (index < message.length && linesoftext[currentline] == message) {
    $(target).append(message[index++]);
    setTimeout(function() {showText(target, message, index, interval);}, interval);
  }
}

$(function () {
  showText("#textbox", linesoftext[0], 0, globalinterval);
});

var nextText = (function(target) {
  currentline = (currentline + 1) % linesoftext.length;
  $(target).empty();
  showText(target, linesoftext[currentline], 0, globalinterval);
});
