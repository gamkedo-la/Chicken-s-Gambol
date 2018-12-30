function clickParticles() {
  let mousePos = Input.getMousePosition();
  emitters.push(new Emitter(new Vector(mousePos.x, mousePos.y), Vector.getNewVectorFromAngMag(0, 2), Math.PI, usableParticles.click));
}
