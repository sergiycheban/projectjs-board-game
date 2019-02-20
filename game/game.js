var GamePlay = function(heroOfPlayer , count , board) {
    this.heroOfPlayer = [];
    for (let index = 0; index < count; index++) {
        this.heroOfPlayer[index] = heroOfPlayer;
    }
    this.board = board;
  };

  GamePlay.prototype.getHeroOfPlayer = function() {
    return this.heroOfPlayer[0];
  };
  
  GamePlay.prototype.getHeroOfPlayer2 = function() {
    return this.heroOfPlayer[1];
  };