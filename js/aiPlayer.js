const AIPlayer = new (function() {
	
  let elapsedSinceUpdate = 0;
  const updateInterval = 1;
  
  let allEnemyUnits = [];
  let allEnemyMovingUnits = [];
  let allEnemyBuildingUnits = [];
  let allEnemySlimePatchUnits = [];
  let allEnemySlimeUnits = [];
	
  this.update = function (delta){
    elapsedSinceUpdate += delta;
    if (updateInterval <= elapsedSinceUpdate) {
	  elapsedSinceUpdate = 0;
	  this.findAllEnemyUnits();
	  //console.log("allEnemyUnits = " + allEnemyUnits.length);
	  //console.log("allEnemyMovingUnits = " + allEnemyMovingUnits.length);
	  //console.log("allEnemySlimePatchUnits = " + allEnemySlimePatchUnits.length);
	  //console.log("allEnemySlimeUnits = " + allEnemySlimeUnits.length);
	  //console.log("allEnemyBuildingUnits = " + allEnemyBuildingUnits.length);
	  //this.logArrayContentToConsole(allEnemyUnits);
	  //this.logArrayContentToConsole(allEnemyMovingUnits);
	  //this.logArrayContentToConsole(allEnemySlimeUnits);
    }
  };
	
  this.findAllEnemyUnits = (function(){
	  
    this.clearEnemyUnitArrays();
	
    let length = Game.units.length;
    for (let i = 0; i < length; i++) {
      let unit = Game.units[i];
      if (unit.isPlayer(TEAM_ENEMY)) {
        allEnemyUnits.push(unit);
	  }
	}
	
	length = allEnemyUnits.length;
	allEnemyMovingUnits = [];
      for (let i = 0; i < length; i++) {
        let unit = allEnemyUnits[i];
		switch (unit.constructor.name){
		  case "Pig":
		  case "GoblinEnemy":
		  case "ChickenEnemy":
			allEnemyMovingUnits.push(unit);
			break;
		  case "Barracks":
		  case "MudPit":
		  case "House":
			allEnemyBuildingUnits.push(unit);
			break;
		  case "SlimePatch":
			allEnemySlimePatchUnits.push(unit);
			break;
		  case "SlimeEnemy":
			allEnemySlimeUnits.push(unit);
			break;
		}
	  }
  });
  
  this.clearEnemyUnitArrays = function (){
    allEnemyUnits = [];
    allEnemyMovingUnits = [];
    allEnemyBuildingUnits = [];
    allEnemySlimePatchUnits = [];
    allEnemySlimeUnits = [];
  }
  
  //For Testing Purposes
  this.logArrayContentToConsole = function (array){
    let length = array.length;
    for (let i = 0; i < length; i++) {
        console.log(array[i]);
	  }
  };

})();	