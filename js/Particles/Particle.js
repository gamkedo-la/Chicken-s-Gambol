let particles = [];
const MAX_PARTICLES = 2500;

let usableParticles = {
  //Non-Mechanical
  organic: [
    {
      emissionRate: Vector.randBtweenTwoNums(5, 10),
      image: null,
      life: { min: 10, max: 20 },
      size: { min: 15, max: 25 }
    },
    {
      emissionRate: Vector.randBtweenTwoNums(50, 100),
      image: null,
      life: { min: 20, max: 30 },
      size: { min: 10, max: 20 }
    },
  ],
  //Mechanical
  nonOrganic: [
    {
      emissionRate: Vector.randBtweenTwoNums(20, 50),
      image: null,
      life: { min: 5, max: 10 },
      size: { min: 5, max: 10 }
    },
    {
      emissionRate: Vector.randBtweenTwoNums(10, 300),
      image: null,
      life: { min: 5, max: 10 },
      size: { min: 50, max: 100 }
    },
  ],
  //Other
  click: {
    emissionTime: 0,
    emissionRate: 1,
    emissionCount: Vector.randBtweenTwoNums(10, 15),
    image: null,
    life: { min: 0.02, max: 0.1 },
    size: { min: 0.3, max: 1 }
  },
};

function Particle(point, velocity, acceleration, whichImage, life, size) {
  this.pos = point || new Vector(0, 0);
  this.vel = velocity || new Vector(0, 0);
  this.acceleration = acceleration || new Vector(0, 0);

  this.bitmap = whichImage;

  this.life = Vector.randBtweenTwoFloats(life.min, life.max);
  this.size = Vector.randBtweenTwoFloats(size.min, size.max);
}

Particle.prototype.move = function(delta) {
  this.size -= 0.3 * delta;
  this.life -= 0.5 * delta;
  if (this.life <= 0) {
    return;
  }

  this.vel.add(this.acceleration);

  this.pos.add(this.vel);
};

Particle.prototype.draw = function() {
  if (this.size <= 0) {
    return;
  }

  if (this.bitmap) {
    gameContext.drawImage(this.bitmap, 0, 0, this.bitmap.width, this.bitmap.height, this.pos.x, this.pos.y, this.size, this.size);
  }
  else {
    drawFillCircle(gameContext, this.pos.x, this.pos.y, this.size, 'blue');
  }
};

function updateParticles(delta) {
  for (let i = particles.length - 1; 0 <= i; i--) {
    let particle = particles[i];

    particle.move(delta);

    if (particle.life <= 0) {
      particles.splice(i, 1);
    }
  }

  for (let i = emitters.length - 1; 0 <= i; i--) {
    let emitter = emitters[i];

    emitter.update(delta);

    if (emitter.life <= 0) {
      emitters.splice(i, 1);
    }
  }
}

function drawParticles() {
  for (let i = 0; i < particles.length; i++) {
    particles[i].draw();
  }
}
