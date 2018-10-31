const MINI_MAP_MARGIN = 10;
function Minimap() {
    this.draw = function() {
        var minimapH = 100;
        var minimapW = minimapH * Grid.returnMapRatio();
        drawFillRect(gameContext, MINI_MAP_MARGIN, 
                     gameCanvas.height - minimapH - MINI_MAP_MARGIN, 
                     minimapW, minimapH, "green");
        
        callbackList(Game.units, "minimapDraw", [minimapW, minimapH, "yellow"]);
        callbackList(Game.enemies, "minimapDraw", [minimapW, minimapH, "red"]);
    }
}