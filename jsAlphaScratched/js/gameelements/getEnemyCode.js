//document.getElementById("gameboard").addEventListener("click", getEnemyCode);

function getEnemyCode() {
  enemycode.session.setValue("// Bit Functions and Variables:\n  bit.health = 1;\n  bit.chargeEnergyBlast();\n  bit.shootEnergyBlast();\n\n// Enemy Code:\nif(bit.inRange(player)) {\n  bit.chargeEnergyBlast();\n}\nif(bit.inRange(player) && krisline > 28) {\n  bit.shootEnergyBlast();\n}");
}

function getSwordCode() {
  enemycode.session.setValue("// A tip from Kris: \n// You can pick the sword up using the \n// function player.pickUp(\"sword\"); \n// but you have to be next to it!");
}

function getPortalCode() {
  enemycode.session.setValue("// The portal can only be accessed\n// after picking up the sword.");
}

function getPlayerCode() {
  enemycode.session.setValue("// Player Functions:\n\n  player.moveUp();\n  // move up (accepts parameters)\n  player.moveDown();\n  // move down (accepts parameters)\n  player.moveLeft();\n  // move left (accepts parameters)\n  player.moveRight();\n  // move right (accepts parameters)\n\n  player.shieldUp();\n  // shield upwards\n  player.shieldDown();\n  // shield downwards\n  player.shieldLeft();\n  // shield towards the left\n  player.shieldRight();\n  // shield towards the right\n\n  player.pickUp()\n  // pick up an object\n  // (accepts parameters)\n\n  if player.hasSword = true;\n    player.attackUp();\n    // attack upwards\n    player.attackDown();\n    // attack downards\n    player.attackLeft();\n    // attack towards the left\n    player.attackRight();\n    // attack towards the right\n");
}
