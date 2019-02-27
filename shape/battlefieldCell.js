var Cell = function(x, y, width, name, color, content, isLock) {
  this.x = x;
  this.y = y;
  this.width = width;
  this.name = name;
  this.color = color;
  this.content = content;
  this.isLock = isLock;
};

Cell.prototype.drawCell = function() {
  CanvasManagerBattlefield.context.fillStyle = this.color;
  CanvasManagerBattlefield.context.strokeRect(
    this.x,
    this.y,
    this.width,
    this.width
  );
  CanvasManagerBattlefield.context.fillRect(
    this.x,
    this.y,
    this.width,
    this.width
  );
};

Cell.prototype.drawHeroInCell = function() {
  if (this.hero != null) {
    CanvasManagerBattlefield.context.font = "35px Courier New";
    CanvasManagerBattlefield.context.fillStyle = "#DD2C00";
    CanvasManagerBattlefield.context.fillText(
      this.hero.hero.symbol,
      this.x + this.width / 2,
      this.y + this.width / 2,
      150
    );
  }
};

Cell.prototype.lockedCells = function() {
  CanvasManagerBattlefield.context.fillStyle = "#9e9e9e";
  CanvasManagerBattlefield.context.strokeRect(
    this.x,
    this.y,
    this.width,
    this.width
  );
  CanvasManagerBattlefield.context.fillRect(
    this.x,
    this.y,
    this.width,
    this.width
  );
  CanvasManagerBattlefield.context.font = "35px Courier New";
  CanvasManagerBattlefield.context.fillStyle = "#DD2C00";
  CanvasManagerBattlefield.context.fillText(
    "X",
    this.x + this.width / 2,
    this.y + this.width / 2,
    150
  );
};

Cell.prototype.cellContainsCoordinates = function(clientX, clientY) {
  if (
    clientX > this.x &&
    clientX < this.x + this.width &&
    clientY > this.y &&
    clientY < this.y + this.width
  ) {
    return true;
  }

  return false;
};
