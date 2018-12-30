function Vector(x,y)
{
	this.x = x || 0;
	this.y = y || 0;
}

Vector.prototype.add = function(vector)
{
	this.x += vector.x;
	this.y += vector.y;
}

Vector.prototype.getMagnitude = function()
{
	return Math.sqrt((this.x * this.x) + (this.y * this.y));
}

Vector.prototype.getAng = function()
{
	return Math.atan2(this.y,this.x);
}

Vector.getNewVectorFromAngMag = function(ang,magnitude)
{
	return new Vector(magnitude * Math.cos(ang), magnitude * Math.sin(ang));
}

Vector.randBtweenTwoNums = function(min,max)
{
	return Math.floor(Math.random() * (max - min + 1)) + min;
}