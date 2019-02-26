const NUMBER_OF_PLAYER_ROWS = 2;
const MAX_NUMBER_OF_BARRIER = 5;
const MIN_NUMBER_OF_BARRIER = 1;

var CanvasManagerBattlefield = {
  canvas: null,
  context: null,
  content: null,
  color: null,
  width: 800,
  territoryPlayerA: 1,
  territoryPlayerB: 5,
  row: 8,
  col: 10,
  boardCollection: [],
  colorsForTerritoryPlayers: { light: "#90CAF9", dark: "#FFCC80" },
  colorsForTerritoryBattle: "#E0E0E0",
  initialize: function(element) {
    this.canvas = document.querySelector(element);
    this.context = this.canvas.getContext("2d");
  },

  generationBattlefield: function() {
    let squareWidth = this.width / this.row;
    let totalSquares = this.row * this.col;
    console.log(totalSquares);
    let i = 0,
      x = 0,
      y = -1;
    var boardRows = [];
    for (i = 0; i < totalSquares; i++) {
      if (i) var squareName = "row" + y + "col" + x;
      x++;
      if (i % this.col == 0) {
        x = 0;
        y++;
        this.boardCollection.push(boardRows);
        boardRows = [];
      }
      this.setTerritoryColor(y, x);
      if (y > this.territoryPlayerA || y < this.territoryPlayerB) {
        var arr = this.randomBarriersPlace();
        for (let index = 0; index < arr.length; index++) {
          if (arr[index] == i) {
            this.color = "#000000";
          }
        }
      }
      boardRows.push(
        new Cell(
          x * squareWidth - squareWidth,
          y * squareWidth,
          squareWidth,
          squareName,
          // own,
          this.color,
          this.content
        )
      );
    }
    this.boardCollection.splice(0, 1);
    for (let index = 0; index < this.boardCollection.length; index++) {
      this.boardCollection[index].splice(0, 1);
    }
    this.drawBoard();
    this.clickOnCell();
  },

  drawBoard: function() {
    var boardRows = this.boardCollection;

    for (var i = 0; i < boardRows.length; i++) {
      var row = boardRows[i];
      for (var j = 0; j < row.length; j++) {
        var square = boardRows[i][j];
        square.drawCell();
      }
    }
  },

  clickOnCell: function() {
    var boardRows = this.boardCollection;

    this.canvas.addEventListener("click", function(e) {
      var hero = CanvasManagerHeroSelectionFields.getSelectedHero();
      for (var i = 0; i < boardRows.length; i++) {
        var row = boardRows[i];
        for (var j = 0; j < row.length; j++) {
          var square = boardRows[i][j];
          if (square.cellContainsCoordinates(e.clientX, e.clientY)) {
            if (square.hero == null || hero != null) {
              square.hero = hero;
              hero = null;
              square.drawHeroInCell();
              gamePlay.changePlayer();
              CanvasManagerHeroSelectionFields.drawBoard();
              CanvasManagerHeroSelectionFields.setSelectedHeroNull();
              if (gamePlay.isEndPreparation()) {
                gamePlay.startBattle();
                CanvasManagerHeroSelectionFields.clearBoard();
              }
            } else {
              console.log("square");
              // square.color = "#9965f4";
              // square.drawCell();
              // square.drawHeroInCell();
            }
          }
        }
      }
    });
  },

  setTerritoryColor: function(row, col) {
    if (row <= this.territoryPlayerA || row >= this.territoryPlayerB) {
      this.color =
        (col + row) % 2
          ? this.colorsForTerritoryPlayers.dark
          : this.colorsForTerritoryPlayers.light;
    } else {
      this.color = this.colorsForTerritoryBattle;
    }
  },

  setBarriers: function(row) {
    if (row > this.territoryPlayerA || row < this.territoryPlayerB) {
    }
  },

  randomBarriersPlace: function() {
    var arrayOfPlaceBarriesrs = [];
    var numberOfBarriers =
      Math.floor(Math.random() * MAX_NUMBER_OF_BARRIER) + MIN_NUMBER_OF_BARRIER;

    for (let index = 0; index < numberOfBarriers; index++) {
      arrayOfPlaceBarriesrs.push(
        Math.floor(Math.random() * this.getNumberOfCellTerritoryBattleCount()) +
          1 +
          27
      );
    }

    return arrayOfPlaceBarriesrs;
  },

  getNumberOfCellTerritoryBattleCount: function(row) {
    var cellСount = (this.row - 1) * (this.col - 1);
    var cellTerritoryPlayersCount = (this.col - 1) * NUMBER_OF_PLAYER_ROWS * 2;
    var cellTerritoryBattleCount = cellСount - cellTerritoryPlayersCount;

    return cellTerritoryBattleCount;
  }
};
