var INDENT_FROM_EDGE = 3;

var HeroCell = function(x, y, width, height, name, color, hero) {
  this.x = x;
  this.y = y;
  this.width = width;
  this.height = height;
  this.name = name;
  this.color = color;
  this.hero = hero;
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
  if (this.hero != null) {
    CanvasManagerHeroSelectionFields.context.font = "20px Georgia";
    CanvasManagerHeroSelectionFields.context.fillStyle = "red";
    CanvasManagerHeroSelectionFields.context.fillText(
      this.name,
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
