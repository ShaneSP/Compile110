var showText = function(target, message, index, interval) {
  if (index < message.length) {
    $(target).append(message[index++]);
    setTimeout(function() {showText(target, message, index, interval);}, interval);
  }
}

$(function () {
  showText("#textbox", "Welcome to compile(110);! Hope you enjoy your stay! ;)", 0, 100);
});
