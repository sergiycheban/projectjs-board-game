var INDENT_FROM_EDGE = 3;

var HeroCell = function(x, y, width, height, name, color, numberHero, symbol) {
  this.x = x;
  this.y = y;
  this.width = width;
  this.height = height;
  this.name = name;
  this.color = color;
  this.numberHero = numberHero;
  this.heroSymbol = symbol;
};

HeroCell.prototype.draw = function() {
  var name = gamePlay.getHeroOfPlayer()[this.numberHero].hero.name;
  var count = gamePlay.getHeroOfPlayer()[this.numberHero].count;

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

HeroCell.prototype.clear = function() {
  CanvasManagerHeroSelectionFields.context.clearRect(
    this.x,
    this.y,
    this.width,
    this.height
  );
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
