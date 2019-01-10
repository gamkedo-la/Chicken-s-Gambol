const AIPlayer = new (function() {

  let elapsedSinceUpdate = 0;
  const updateInterval = 1;

  let allEnemyUnits = [];
  let allEnemyMovingUnits = [];
  let allEnemyPigUnits = [];
  let allEnemyGoblinUnits = [];
  let allEnemyChickenUnits = [];
  let allEnemyBuildingUnits = [];
  let allEnemyHouseUnits = [];
  let allEnemyMudpitUnits = [];
  let allEnemyBarracksUnits = [];
  let allEnemySlimeUnits = [];
  let allEnemySlimePatchUnits = [];

  let allPlayerUnits = [];
  let allPlayerMovingUnits = [];
  let allPlayerPigUnits = [];
  let allPlayerGoblinUnits = [];
  let allPlayerChickenUnits = [];
  let allPlayerBuildingUnits = [];
  let allPlayerHouseUnits = [];
  let allPlayerMudpitUnits = [];
  let allPlayerBarracksUnits = [];
  let allPlayerSlimePatchUnits = [];
  let allPlayerSlimeUnits = [];

  this.update = function (delta){
    elapsedSinceUpdate += delta;
    if (updateInterval <= elapsedSinceUpdate) {
	  elapsedSinceUpdate = 0;

	  this.clearEnemyAndPlayerUnitArrays();
	  this.findAllEnemyUnits();
	  this.findAllPlayerUnits();

	  this.collectSlime();

	  //if (allEnemySlimeUnits[0].getHealth() < allEnemySlimeUnits[0].getMaxHealth()){
	 //   this.defendSlime();
	  //}

	  //this.attackAllPlayerUnits();
    }
  };

  this.getUnitHealth = function (unit){
    console.log(unit.getHealth());
  }

  this.getUnitMaxHealth = function (unit){
    console.log(unit.getMaxHealth());
  }

  this.collectSlime = function(){
	let length = allEnemyChickenUnits.length;
	for (let i = 0; i < length; i++){
	  allEnemyChickenUnits[i].setTarget(allEnemyChickenUnits[i].findSlimePatch(allEnemyChickenUnits[i].getPosition(), allEnemySlimePatchUnits));
	}
  }

  this.defendSlime = function(){
    let length = allPlayerMovingUnits.length;
	for (let i = 0; i < length; i++){
	  //console.log(allPlayerMovingUnits[i].getTarget());
	  if (allPlayerMovingUnits[i].getTarget() === allEnemySlimeUnits[0]){
		//console.log("target found");
		let enemyUnitsLength = allEnemyMovingUnits.length;
	    for (let j = 0; j < enemyUnitsLength; j++){
		  allEnemyMovingUnits[j].setTarget(allPlayerMovingUnits[i]);
		}
	  }
	}
  }

  this.findAllEnemyUnits = (function(){

    let length = Game.units.length;
    for (let i = 0; i < length; i++) {
      let unit = Game.units[i];
      if (unit.isPlayer(TEAM_ENEMY)) {
        allEnemyUnits.push(unit);
	  }
	}

	length = allEnemyUnits.length;
    for (let i = 0; i < length; i++) {
      let unit = allEnemyUnits[i];
      switch (unit.constructor.name){
		case "PigEnemy":
		  allEnemyPigUnits.push(unit);
	      allEnemyMovingUnits.push(unit);
		  break;
		case "GoblinEnemy":
		  allEnemyGoblinUnits.push(unit);
		  allEnemyMovingUnits.push(unit);
	      break;
		case "ChickenEnemy":
		  allEnemyChickenUnits.push(unit);
		  allEnemyMovingUnits.push(unit);
		  break;
		case "BarracksEnemy":
		  allEnemyBarracksUnits.push(unit);
		  allEnemyBuildingUnits.push(unit);
		  break;
		case "MudPitEnemy":
		  allEnemyMudpitUnits.push(unit);
		  allEnemyBuildingUnits.push(unit);
	      break;
		case "HouseEnemy":
		  allEnemyHouseUnits.push(unit);
		  allEnemyBuildingUnits.push(unit);
		  break;
		case "SlimePatchEnemy":
		  allEnemySlimePatchUnits.push(unit);
		  break;
		case "SlimeEnemy":
		  allEnemySlimeUnits.push(unit);
		  break;
		}

	  }
  });

  this.findAllPlayerUnits = (function(){

    let length = Game.units.length;
    for (let i = 0; i < length; i++) {
      let unit = Game.units[i];
      if (unit.isPlayer(TEAM_PLAYER)) {
        allPlayerUnits.push(unit);
	  }
	}

	length = allPlayerUnits.length;
      for (let i = 0; i < length; i++) {
        let unit = allPlayerUnits[i];
		switch (unit.constructor.name){
		  case "Pig":
		  case "Goblin":
		  case "Chicken":
			allPlayerMovingUnits.push(unit);
			break;
		  case "Barracks":
		  case "MudPit":
		  case "House":
			allPlayerBuildingUnits.push(unit);
			break;
		  case "SlimePatch":
			allPlayerSlimePatchUnits.push(unit);
			break;
		  case "Slime":
			allPlayerSlimeUnits.push(unit);
			break;
		}
	  }

  });

  this.attackAllPlayerUnits = (function(){

	let enemyUnitsLength = allEnemyMovingUnits.length;
	for (let i = 0; i < enemyUnitsLength; i++){

	  let playerUnitsLength = allPlayerUnits.length;
	  for (let j = 0; j < playerUnitsLength; j++){

		let enemyUnit = allEnemyMovingUnits[i];
		  if(allPlayerUnits[j].canDamage() === true /* && allPlayerUnits[j].constructor.name != "Slime"*/){ //Bug: attacking slime causes game to slow/crash
		     enemyUnit.setTarget(allPlayerUnits[j]);
		  }

	  }

	}

  });

  this.clearEnemyAndPlayerUnitArrays = (function (){
    allEnemyUnits = [];
    allEnemyMovingUnits = [];
	allEnemyPigUnits = [];
    allEnemyGoblinUnits = [];
    allEnemyChickenUnits = [];
    allEnemyBuildingUnits = [];
	allEnemyHouseUnits = [];
    allEnemyMudpitUnits = [];
    allEnemyBarracksUnits = [];
    allEnemySlimePatchUnits = [];
    allEnemySlimeUnits = [];
	allPlayerUnits = [];
  });

  //For Testing Purposes
  this.logArrayContentToConsole = (function (array){
    let length = array.length;
    for (let i = 0; i < length; i++) {
        console.log(array[i]);
	}
  });

});
