const AIPlayer = new (function() {
	
  let elapsedSinceUpdate = 0;
  const updateInterval = 1;
	
  this.update = function (delta){
    elapsedSinceUpdate += delta;
    if (updateInterval <= elapsedSinceUpdate) {
	  elapsedSinceUpdate = 0;
	  this.findAllEnemyUnits();
    }
  };
	
  //To test AI functionality
  this.findAllEnemyUnits = (function(){
    let length = Game.units.length;
      for (let i = 0; i < length; i++) {
        let unit = Game.units[i];
        if (unit.isPlayer(TEAM_ENEMY)) {
		  //console.log("Enemy unit at " + unit.x + "," + unit.y + " found");
		}
	  }
  });

})();	