document.getElementById("gameboard").addEventListener("click", getEnemyCode);

function getEnemyCode() {
  enemycode.session.setValue("bit.chargeEnergyBlast();\nbit.shootEnergyBlast();");
}
