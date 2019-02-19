var INDENT_FROM_BATTLEFIELD = 150;
var INDENT_FROM_START = 15;

var selectedHero = [];

var CanvasManagerHeroSelectionFields = {
  canvas: null,
  context: null,
  width: 200,
  height: 50,
  color: "#d1eefc",
  heroCollection: [],

  initialize: function(element) {
    this.canvas = document.querySelector(element);
    this.context = this.canvas.getContext("2d");
  },

  generationHeroSelectionFields: function() {
    for (let index = 0; index < listOfHeroes.length; index++) {
      this.heroCollection.push(
        new HeroCell(
          CanvasManagerBattlefield.width + INDENT_FROM_BATTLEFIELD,
          this.height * index + INDENT_FROM_START,
          this.width,
          this.height,
          listOfHeroes[index].hero.name,
          this.color,
          new Hero(
            listOfHeroes[index].hero.name,
            listOfHeroes[index].hero.symbol,
            listOfHeroes[index].hero.attack,
            listOfHeroes[index].hero.armor,
            listOfHeroes[index].hero.HP,
            listOfHeroes[index].hero.impactRadius,
            listOfHeroes[index].hero.speed
          ),
          listOfHeroes[index].count
        )
      );
    }
    this.drawBoard();
    this.clickOnCell();
  },

  drawBoard: function() {
    var heroCollection = this.heroCollection;
    for (var i = 0; i < heroCollection.length; i++) {
      var hero = heroCollection[i];
      hero.draw();
    }
  },

  clickOnCell: function() {
    var heroCollection = this.heroCollection;
    this.canvas.addEventListener("click", function(e) {
      for (var i = 0; i < heroCollection.length; i++) {
        var hero = heroCollection[i];
        if (hero.cellContainsCoordinates(e.clientX, e.clientY)) {
          if (hero.count > 0) {
            selectedHero.push(hero.hero);
            hero.count--;
            hero.draw();
          }
        }
      }
    });
  },

  getSelectedHero: function() {
    return selectedHero;
  }
};
