var particles = [];
var maxParticles = 2500;

var usableParticles = {
	//Non-Mechanical
	organic: [
				{emissionRate: Vector.randBtweenTwoNums(5,10), image: greenSplat, life:{min:10,max:20}, size:{min:15,max:25}},
				{emissionRate: Vector.randBtweenTwoNums(50,100), image: greenSplat, life:{min:20,max:30}, size:{min:10,max:20}},
			],
	//Mechanical
	nonOrganic: [
					{emissionRate: Vector.randBtweenTwoNums(20,50), image: null, life:{min:5,max:10}, size:{min:5,max:10}},
					{emissionRate: Vector.randBtweenTwoNums(10,300), image: null, life:{min:5,max:10}, size:{min:50,max:100}},
				],
    //Other
    fight: [
	{emissionRate: Vector.randBtweenTwoNums(5,10), image: fightRune, life:{min:5,max:8}, size:{min:5,max:15}},
	{emissionRate: Vector.randBtweenTwoNums(10,15), image: fightRune, life:{min:8,max:12}, size:{min:10,max:15}},
    ]
}

function Particle(point,velocity,acceleration,whichImage,life,size)
{
	this.pos = point || new Vector(0,0);
	this.vel = velocity || new Vector(0,0);
	this.acceleration = acceleration || new Vector(0,0,);

	this.bitmap = whichImage;

	//get min/max based on whichImage. for example, green splat will return 10,20 for life and 5,10 for size
	this.life = Vector.randBtweenTwoNums(life.min,life.max);
	this.size = Vector.randBtweenTwoNums(size.min,size.max);
}

Particle.prototype.move = function()
{
	this.vel.add(this.acceleration);

	this.pos.add(this.vel);
}

function addParticles(emissionRate,whichImage,life,size)
{
	if(particles.length > maxParticles) return;

	for(var i = 0; i < emitters.length; i++)
	{
		for(var j = 0; j < emissionRate; j++)
		{
			particles.push(emitters[i].emitParticle(whichImage,life,size));
		}
	}
}

function plotParticles(boundsX,boundsY)
{
	var currentParticles = [];

	for(var i = 0; i < particles.length; i++)
	{
		var particle = particles[i];
		var pos = particle.pos;

		particle.size -= 0.3;
		particle.life -= 0.5;
		if(particle.life <= 0)
			continue;

		particle.move();
		currentParticles.push(particle);
	}

	particles = currentParticles;
}

function drawParticles()
{
	for(var i = 0; i < particles.length; i++)
	{
		var pos = particles[i].pos;
		var img = particles[i].bitmap;
		var size = particles[i].size;
		if(size <= 0)
			continue;

		if(img != null || img != undefined)
			canvasContext.drawImage(img,0, 0, 40, 40, pos.x, pos.y, size, size);
		else
			drawCircle(pos.x,pos.y, size, 'blue');
	}
}