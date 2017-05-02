//document.getElementById("gameboard").addEventListener("click", getEnemyCode);

function getEnemyCode() {
  enemycode.session.setValue("if(bit.inRange(player)) {\n  bit.chargeEnergyBlast();\n}\nif(bit.inRange(player) && krisline > 28) {\n  bit.shootEnergyBlast();\n}");
}
