const minimap = new(function () {
    var minimapH;
    var minimapW;
    var mainViewRatio;
    var mainViewToMapScale;
    
    this.initMinimap = function() {
        minimapH = 100
        minimapW = minimapH * Grid.returnMapRatio()
        mainViewRatio = gameCanvas.height/gameCanvas.width;
        mainViewToMapScale = gameCanvas.width / Grid.returnWorldWidth();
    }
    
    this.mouseInputCheckForMinimap = function() {
        let mousePos = Input.getMousePosition();
        var minimapTop = gameCanvas.height - minimapH - MINI_MAP_MARGIN;
        if(mousePos.sx < minimapW + MINI_MAP_MARGIN &&
            mousePos.sy > minimapTop &&
            mousePos.sx > MINI_MAP_MARGIN &&
            mousePos.sy < minimapTop+minimapH
            ) {
                let mapX = mousePos.sx - MINI_MAP_MARGIN;
                let mapY = mousePos.sy - minimapTop;
                let mapXPerc = mapX / minimapW;
                let mapYPerc = mapY /minimapH;
                console.log('mapX: ' + mapX);
                console.log('mapY:' + mapY);
                console.log('mapXP:' + mapXPerc);
                console.log('mapYP:' + mapYPerc);

                Grid.setPanAsPercentage(mapXPerc, mapYPerc);

            console.log("click was intercepted by minimap. TODO: jump main view to this location :)");
            return true;
        }
        return false;
    }
    
    this.draw = function () {
        drawFillRect(gameContext, MINI_MAP_MARGIN,
            gameCanvas.height - minimapH - MINI_MAP_MARGIN,
            minimapW, minimapH, "green");

        let camPan = Grid.getPanAsPercentage();
        drawStrokeRect(gameContext, MINI_MAP_MARGIN + camPan.x * minimapW,
            gameCanvas.height - minimapH - MINI_MAP_MARGIN + camPan.y * minimapW,
            mainViewToMapScale * minimapW,
            mainViewToMapScale * minimapW * mainViewRatio, "white", 1);

        callbackList(Game.units, "minimapDraw", [minimapW, minimapH, "yellow"]);
        callbackList(Game.enemies, "minimapDraw", [minimapW, minimapH, "red"]);
    }
})();
