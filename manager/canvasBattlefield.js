const NUMBER_OF_PLAYER_ROWS = 2;
const MAX_NUMBER_OF_BARRIER = 5;
const MIN_NUMBER_OF_BARRIER = 1;

var CanvasManagerBattlefield = {
  canvas: null,
  context: null,
  color: null,
  width: 90,
  territoryPlayerA: 2,
  territoryPlayerB: 5,
  row: 7,
  col: 9,
  boardCollection: [],
  colorsForTerritoryPlayers: { light: "#4fc3f7", dark: "#ffab91" },
  colorsForTerritoryBattle: "#E0E0E0",
  initialize: function(element) {
    this.canvas = document.querySelector(element);
    this.context = this.canvas.getContext("2d");
  },

  generationBattlefield: function() {
    var count = 1;
    for (let i = 0; i < this.row; i++) {
      this.color = "#e8eaf6";
      for (let j = 0; j < this.col; j++) {
        var randomList = this.randomBarriersPlace();
        for (let index = 0; index < randomList.length; index++) {
          if (randomList[index] == count) {
            this.color = "#37474f";
          }
        }

        count++;
        if (this.territoryPlayerA > i || i >= this.territoryPlayerB) {
          this.color = (i * 9 + j) % 2 ? "#4fc3f7" : "#ffab91";
        }
        this.boardCollection.push(
          new Cell(
            this.width * j,
            this.width * i,
            this.width,
            null,
            this.color,
            null,
            false
          )
        );
        this.color = "#e8eaf6";
      }
    }

    this.drawBoard();
    this.clickOnCell();
  },

  drawBoard: function() {
    var boardRows = this.boardCollection;
    for (let index = 0; index < boardRows.length; index++) {
      boardRows[index].drawCell();
      if (boardRows[index].content != null) {
        boardRows[index].drawHeroInCell();
      }
    }
  },

  drawLockedCells: function() {
    var boardRows = this.boardCollection;
    if (PLAYERS.PLAYER_ONE == true) {
      for (let index = 0; index < boardRows.length; index++) {
        if (2 * this.col - 1 < index) {
          boardRows[index].lockedCells();
          boardRows[index].isLock = true;
        } else {
          boardRows[index].isLock = false;
        }
      }
    } else if (PLAYERS.PLAYER_TWO == true) {
      for (let index = 0; index < boardRows.length; index++) {
        if (5 * this.col > index) {
          boardRows[index].lockedCells();
          boardRows[index].isLock = true;
        } else {
          boardRows[index].isLock = false;
        }
      }
    }
  },

  clickOnCell: function() {
    var boardRows = this.boardCollection;

    var _this = this;

    this.canvas.addEventListener("click", function(e) {
      var hero = CanvasManagerHeroSelectionFields.getSelectedHero();
      for (var i = 0; i < boardRows.length; i++) {
        if (boardRows[i].cellContainsCoordinates(e.clientX, e.clientY)) {
          var square = boardRows[i];
          if (square.cellContainsCoordinates(e.clientX, e.clientY)) {
            if (square.hero == null && hero != null && square.isLock != true) {
              square.hero = hero;
              _this.boardCollection[i].content = hero;
              hero = null;
              square.drawHeroInCell();
              gamePlay.changePlayer();
              CanvasManagerHeroSelectionFields.drawBoard();
              CanvasManagerHeroSelectionFields.setSelectedHeroNull();
              if (gamePlay.isEndPreparation()) {
                _this.drawBoard();
                gamePlay.startBattle();
                CanvasManagerHeroSelectionFields.clearBoard();
              }
            } else {
              alert("OoooooPS");
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
