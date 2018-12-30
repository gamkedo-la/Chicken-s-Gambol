let emitters = [];

function Emitter(point, velocity, spread, particleConfig) {
  this.pos = point; //Vector
  this.vel = velocity; //Vector
  this.spread = spread || Math.PI / 32; //possible angles = velocity +/- spread
  this.life = particleConfig.emissionTime || 0;

  if (particleConfig.emissionRate === 0) {
    this.life = 0;
  }

  this.particleConfig = particleConfig;
  this.emissionTimeout = 0;

  this.draw = function() {
    drawFillCircle(gameContext, this.pos.x, this.pos.y, 5, 'red');
  };
}

Emitter.prototype.emitParticle = function() {
  if (MAX_PARTICLES < particles.length) {
    return;
  }

  let ang = this.vel.getAng() + this.spread - (Math.random() * this.spread * 2);
  let magnitude = this.vel.getMagnitude();
  let pos = new Vector(this.pos.x, this.pos.y);
  let vel = Vector.getNewVectorFromAngMag(ang, magnitude);

  particles.push(new Particle(pos, vel, 0, this.particleConfig.image, this.particleConfig.life, this.particleConfig.size));
};

Emitter.prototype.update = function(delta) {
  if (this.life < 0) {
    return;
  }

  this.life -= delta;

  this.emissionTimeout -= delta;
  if (0 < this.emissionTimeout) {
    return;
  }

  this.emissionTimeout += this.particleConfig.emissionRate;
  for (let i = 0; i < this.particleConfig.emissionCount; i++) {
    this.emitParticle();
  }
};
