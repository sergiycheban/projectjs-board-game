var CanvasManagerBattlefield = {
  canvas: null,
  context: null,
  hero: null,
  width: 800,
  territoryPlayerA: 1,
  territoryPlayerB: 5,
  row: 8,
  col: 10,
  boardCollection: [],
  colorsForTerritoryPlayers: { light: "#d1eefc", dark: "#1f1f21" },
  colorsForTerritoryBattle: "#848482",
  initialize: function(element) {
    this.canvas = document.querySelector(element);
    this.context = this.canvas.getContext("2d");
  },

  generationBattlefield: function() {
    var color = "";
    let squareWidth = this.width / this.row;
    let totalSquares = this.row * this.col;
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
      if (y <= this.territoryPlayerA || y >= this.territoryPlayerB) {
        color =
          (x + y) % 2
            ? this.colorsForTerritoryPlayers.dark
            : this.colorsForTerritoryPlayers.light;
      } else {
        color = this.colorsForTerritoryBattle;
      }
      boardRows.push(
        new Cell(
          x * squareWidth - squareWidth,
          y * squareWidth,
          squareWidth,
          squareName,
          color,
          this.hero
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
            if (square.hero == null) {
              square.hero = hero;
              square.drawHeroInCell();
              gamePlay.changePlayer();
              CanvasManagerHeroSelectionFields.drawBoard();
              CanvasManagerHeroSelectionFields.setSelectedHeroNull();
            } else {
              console.log("This cell is busy");
            }
          }
        }
      }
    });
  }
};
