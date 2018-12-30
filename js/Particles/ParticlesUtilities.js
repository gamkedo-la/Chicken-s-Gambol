function getParticleBasedOnType(charType)
{
	let particle = null;

	switch(charType)
	{
		case 'Wormex':
			particle = usableParticles.organic[Vector.randBtweenTwoNums(0,usableParticles.organic.length - 1)];
			break;
		case 'Tank':
			particle = usableParticles.nonOrganic[Vector.randBtweenTwoNums(0,usableParticles.nonOrganic.length - 1)];
			break;
	}

	return particle;
}

function spawnEnemyBasedParticles(whichEnemy)
{
	let particle = getParticleBasedOnType(whichEnemy.charType);

	//need a way to pass in whichEnemy's pos equation according to their specific bitmap size, 
	//angle/magnitude based whichEnemy, and spread based whichEnemy
	emitters.push(new Emitter(new Vector(whichEnemy.centerX - whichEnemy.bitmap.width/8, whichEnemy.centerY - whichEnemy.bitmap.height/2),
                                        Vector.getNewVectorFromAngMag(0,2),Math.PI));
     addParticles(particle.emissionRate,particle.image,particle.life,particle.size);
}

function spawnFightParticles(enemy)
{
    let particle = usableParticles.fight[Vector.randBtweenTwoNums(0, usableParticles.fight.length - 1)];
    var x = (enemy.centerX + player.centerX)/2;
    var y = (enemy.centerY + player.centerY)/2;
    emitters.push(new Emitter(new Vector(x, y), Vector.getNewVectorFromAngMag(0, 2), Math.PI));
    addParticles(particle.emissionRate, particle.image, particle.life, particle.size);
}
