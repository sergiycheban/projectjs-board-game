var gamePlay = null;

function startGame(){
    CanvasManagerBattlefield.initialize("#canvas");
    CanvasManagerBattlefield.generationBattlefield();
    CanvasManagerHeroSelectionFields.initialize("#canvas");
    CanvasManagerHeroSelectionFields.generationHeroSelectionFields();
    gamePlay = new GamePlay(CanvasManagerHeroSelectionFields.heroForPlayer, 2 ,CanvasManagerBattlefield.boardCollection) ;
    document.querySelector("#startGame").remove();
}

