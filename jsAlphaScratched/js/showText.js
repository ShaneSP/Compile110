var intro = "Hello student! It seems you have been transported to a strange new world!";
var intro2 = "In this world, coding is EVERYTHING!"
var par1 = "This is the first paragraph.";

var showText = function(target, message, index, interval) {
  if (index < message.length) {
    $(target).append(message[index++]);
    setTimeout(function() {showText(target, message, index, interval);}, interval);
  }
}

// $(function () {
//  showText("#textbox", "Welcome to compile(110);! Hope you enjoy your stay! ;)", 0, 50);
// });

$(function () {
  showText("#textbox", intro, 0, 50);
});

var nextText = (function() {
  var textArray = [intro, intro2, par1];
  var count = -1;
  return function() {
    return textArray[++count % textArray.length];
  }
}());
