//document.getElementById("gameboard").addEventListener("click", getEnemyCode);

function getEnemyCode() {
  enemycode.session.setValue("// Bit Functions and Variables:\n  bit.health = 1;\n  bit.chargeEnergyBlast();\n  bit.shootEnergyBlast();\n\n// Enemy Code:\nif(bit.inRange(player)) {\n  bit.chargeEnergyBlast();\n}\nif(bit.inRange(player) && krisline > 28) {\n  bit.shootEnergyBlast();\n}");
}

function getSwordCode() {
  enemycode.session.setValue("// A tip from Kris: \n// You can pick the sword up using the \n// function player.pickUp(\"sword\"); \n// but you have to be next to it!");
}
