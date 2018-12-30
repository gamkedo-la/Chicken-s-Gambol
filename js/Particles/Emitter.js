var emitters = [];

function Emitter(point,velocity,spread)
{
	this.pos = point; //Vector
	this.vel = velocity; //Vector
	this.spread = spread || Math.PI / 32; //possible angles = velocity +/- spread
	this.life = 240;//30 fps * 8 seconds

	this.color = "#999";
	this.texture = "";

	this.draw = function()
	{
		drawCircle(this.pos.x,this.pos.y, 5, 'red');
	}
}

Emitter.prototype.emitParticle = function(image,life,size)
{
	var ang = this.vel.getAng() + this.spread - (Math.random() * this.spread * 2);
	var magnitude = this.vel.getMagnitude();
	var pos = new Vector(this.pos.x,this.pos.y);
	var vel = Vector.getNewVectorFromAngMag(ang,magnitude);

	return new Particle(pos,vel,0,image,life,size);
}