var INDENT_FROM_EDGE = 3;

var HeroCell = function(x, y, width, height, name, color, numberHero) {
  this.x = x;
  this.y = y;
  this.width = width;
  this.height = height;
  this.name = name;
  this.color = color;
  this.numberHero = numberHero;
};

HeroCell.prototype.draw = function() {
  CanvasManagerHeroSelectionFields.context.fillStyle = this.color;
  CanvasManagerHeroSelectionFields.context.strokeRect(
    this.x,
    this.y,
    this.width,
    this.height
  );
  CanvasManagerHeroSelectionFields.context.fillRect(
    this.x,
    this.y,
    this.width,
    this.height
  );

  // console.log(
  //   JSON.stringify(gamePlay.getHeroOfPlayer()) +
  //     "               1111111111111111"
  // );
  var name = gamePlay.getHeroOfPlayer()[this.numberHero].hero.name;
  var count = gamePlay.getHeroOfPlayer()[this.numberHero].count;

  if (JSON.stringify(gamePlay.getHeroOfPlayer()) != null) {
    CanvasManagerHeroSelectionFields.context.font = "30px Courier New";
    CanvasManagerHeroSelectionFields.context.fillStyle = "red";
    CanvasManagerHeroSelectionFields.context.fillText(
      name + " " + count,
      this.x + INDENT_FROM_EDGE,
      this.y + this.height / 2
    );
  }
};

HeroCell.prototype.cellContainsCoordinates = function(clientX, clientY) {
  if (
    clientX > this.x &&
    clientX < this.x + this.width &&
    clientY > this.y &&
    clientY < this.y + this.height
  ) {
    return true;
  }

  return false;
};
