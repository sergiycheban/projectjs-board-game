var gamePlay = null;
var heroForPlayer1 = [];
var heroForPlayer2 = [];

for (let index = 0; index < listOfHeroes.length; index++) {
  heroForPlayer1.push({
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

for (let index = 0; index < listOfHeroes.length; index++) {
  heroForPlayer2.push({
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
    heroForPlayer1,
    heroForPlayer2,
    CanvasManagerBattlefield.boardCollection
  );
  CanvasManagerBattlefield.initialize("#canvas");
  CanvasManagerBattlefield.generationBattlefield();
  CanvasManagerHeroSelectionFields.initialize("#canvas");
  CanvasManagerHeroSelectionFields.generationHeroSelectionFields();

  document.querySelector("#startGame").remove();
}
