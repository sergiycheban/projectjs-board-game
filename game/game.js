var PLAYERS = {
  PLAYER_ONE: true,
  PLAYER_TWO: false
};

var GamePlay = function(heroOfPlayers, count, board) {
  debugger;
  this.heroOfPlayers = [];
  for (let index = 0; index < count; index++) {
    this.heroOfPlayers.push(heroOfPlayers);
  }
  this.board = board;
};

GamePlay.prototype.getHeroOfPlayer = function() {
  if (PLAYERS.PLAYER_ONE == true) {
    return this.heroOfPlayers[0];
  } else if (PLAYERS.PLAYER_TWO == true) {
    return this.heroOfPlayers[1];
  }
};

// GamePlay.prototype.getCountHero = function(player, hero) {
//   var indexOfPlayer = player == 1 ? 0 : 1;
//   for (
//     let index = 0;
//     index < this.heroOfPlayers[indexOfPlayer].length;
//     index++
//   ) {
//     if (this.heroOfPlayers[indexOfPlayer].hero.name == hero) {
//       return this.heroOfPlayers[indexOfPlayer].count;
//     }
//   }
// };

GamePlay.prototype.changePlayer = function() {
  if (PLAYERS.PLAYER_ONE == true) {
    PLAYERS.PLAYER_ONE = false;
    PLAYERS.PLAYER_TWO = true;
  } else if (PLAYERS.PLAYER_TWO == true) {
    PLAYERS.PLAYER_ONE = true;
    PLAYERS.PLAYER_TWO = false;
  }
};

GamePlay.prototype.putHeroOnCell = function() {
  console.log("putHeroOnCell");
};
