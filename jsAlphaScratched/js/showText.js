var linesoftext = [["Hello student! It seems you", "have been transported to a", "strange new world!"],
                    ["In this world, coding is", "EVERYTHING!"],
                    ["You will need to code to", "defend yourself against", "enemies."],
                    ["Like this one!"],
                    ["FIN."]];
var currentline = 0;
var globalinterval = 40;

var showText = function(target, message, line, index, interval) {
  if (line < message.length && index < message[line].length && linesoftext[currentline] == message) {
    $(target).append(message[line][index++]);
    setTimeout(function() {showText(target, message, line, index, interval);}, interval);
  }
  else if (line < message.length && linesoftext[currentline] == message) {
    line = line + 1;
    $(target).append("<br/>");
    setTimeout(function() {showText(target, message, line, 0, interval);}, interval);
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
