var INDENT_FROM_BATTLEFIELD = 150;
var INDENT_FROM_START = 15;

var selectedHero = [];

var CanvasManagerHeroSelectionFields = {
  canvas: null,
  context: null,
  width: 200,
  height: 50,
  listOfHeroes: [
    {
      hero: {
        name: "Рицър",
        symbol: "Р",
        attack: 8,
        armor: 3,
        HP: 15,
        impactRadius: 1,
        speed: 1
      },
      count: 2
    },
    {
      hero: {
        name: "Елф",
        symbol: "Е",
        attack: 5,
        armor: 1,
        HP: 10,
        impactRadius: 3,
        speed: 3
      },
      count: 2
    },
    {
      hero: {
        name: "Джуджет",
        symbol: "Д",
        attack: 6,
        armor: 2,
        HP: 12,
        impactRadius: 2,
        speed: 2
      },
      count: 2
    }
  ],
  heroCollection: [],

  initialize: function(element) {
    this.canvas = document.querySelector(element);
    this.context = this.canvas.getContext("2d");
  },

  generationHeroSelectionFields: function() {
    for (let index = 0; index < this.listOfHeroes.length; index++) {
      this.heroCollection.push(
        new HeroCell(
          CanvasManagerBattlefield.width + INDENT_FROM_BATTLEFIELD,
          this.height * index + INDENT_FROM_START,
          this.width,
          this.height,
          this.listOfHeroes[index].hero.name,
          "white",
          new Hero(
            this.listOfHeroes[index].hero.name,
            this.listOfHeroes[index].hero.symbol,
            this.listOfHeroes[index].hero.attack,
            this.listOfHeroes[index].hero.armor,
            this.listOfHeroes[index].hero.HP,
            this.listOfHeroes[index].hero.impactRadius,
            this.listOfHeroes[index].hero.speed
          ),
          this.listOfHeroes[index].count
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
    console.log("call" + selectedHero);
    return selectedHero;
  }
};
