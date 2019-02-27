var PLAYERS = {
  PLAYER_ONE: true,
  PLAYER_TWO: false
};

var GAME = {
  BATTLE_PREPARATION: true,
  BATTLE: false
};

var GamePlay = function(heroOfPlayers1, heroOfPlayers2, board) {
  this.heroOfPlayers = [];
  this.heroOfPlayers.push(heroOfPlayers1);
  this.heroOfPlayers.push(heroOfPlayers2);
  // for (let index = 0; index < count; index++) {
  //   // heroOfPlayers[0][index].count--;
  //   this.heroOfPlayers.push(heroOfPlayers);
  // }
  this.board = board;
};

GamePlay.prototype.getHeroOfPlayer = function() {
  if (PLAYERS.PLAYER_ONE == true) {
    return this.heroOfPlayers[0];
  } else if (PLAYERS.PLAYER_TWO == true) {
    return this.heroOfPlayers[1];
  }
};

GamePlay.prototype.changeCountOfHero = function(i) {
  if (!this.heroOfPlayers[0][i].count == 0) {
    if (PLAYERS.PLAYER_ONE == true) {
      this.heroOfPlayers[0][i].count--;
    }
  }
  if (!this.heroOfPlayers[1][i].count == 0) {
    if (PLAYERS.PLAYER_TWO == true) {
      this.heroOfPlayers[1][i].count--;
    }
  }
};

GamePlay.prototype.changePlayer = function() {
  if (PLAYERS.PLAYER_ONE == true) {
    PLAYERS.PLAYER_ONE = false;
    PLAYERS.PLAYER_TWO = true;
  } else if (PLAYERS.PLAYER_TWO == true) {
    PLAYERS.PLAYER_ONE = true;
    PLAYERS.PLAYER_TWO = false;
  }
};

GamePlay.prototype.startBattle = function() {
  GAME.BATTLE_PREPARATION = false;
  GAME.BATTLE = true;
};

GamePlay.prototype.isEndPreparation = function() {
  var isEndPreparation = false;
  for (let index = 0; index < this.heroOfPlayers.length; index++) {
    if (
      this.heroOfPlayers[0][index].count == 0 &&
      this.heroOfPlayers[1][index].count == 0
    ) {
      isEndPreparation = true;
    } else {
      return false;
    }
  }
  return isEndPreparation;
};
