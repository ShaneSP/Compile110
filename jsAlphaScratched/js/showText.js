var showText = function(target, message, index, interval) {
  if (index < message.length) {
    $(target).append(message[index++]);
    setTimeout(function() {showText(target, message, index, interval);}, interval);
  }
}

$(function () {
  showText("#textbox", "This is a test message. I want to see how it will show up on the webpage.", 0, 100);
});
