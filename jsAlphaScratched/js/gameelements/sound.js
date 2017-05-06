function setVolume() {
  var myAudio = document.getElementById("bgm");
  myAudio.volume = 0.07;
}

var unmute = document.getElementById('facecontainer');

unmute.onclick = function() {
  var myAudio = document.getElementById("bgm");
  if (myAudio.volume > 0.0) {
    myAudio.volume = 0.0;
  }
  else {
    myAudio.volume = 0.1;
  }
}

var bump = new Audio('assets/bump.wav');
bump.volume = .3;

function playBump() {
  bump.play();
}
