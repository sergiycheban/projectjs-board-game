var gamePlay = null;
var heroForPlayer = [];

for (let index = 0; index < listOfHeroes.length; index++) {
  heroForPlayer.push({
    hero: new Hero(
      listOfHeroes[index].hero.name,
      listOfHeroes[index].hero.symbol,
      listOfHeroes[index].hero.attack,
      listOfHeroes[index].hero.armor,
      listOfHeroes[index].hero.HP,
      listOfHeroes[index].hero.impactRadius,
      listOfHeroes[index].hero.speed
    ),
    count: listOfHeroes[index].count
  });
}

function startGame() {
  gamePlay = new GamePlay(
    heroForPlayer,
    2,
    CanvasManagerBattlefield.boardCollection
  );
  CanvasManagerBattlefield.initialize("#canvas");
  CanvasManagerBattlefield.generationBattlefield();
  CanvasManagerHeroSelectionFields.initialize("#canvas");
  CanvasManagerHeroSelectionFields.generationHeroSelectionFields();

  document.querySelector("#startGame").remove();
}
