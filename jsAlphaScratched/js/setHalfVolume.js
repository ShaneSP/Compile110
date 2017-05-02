function setVolume() {
  var myAudio = document.getElementById("bgm");
  myAudio.volume = 0.07;
}

var bump = new Audio('assets/bump.wav');
bump.volume = .3;

function playBump() {
  bump.play();
}
