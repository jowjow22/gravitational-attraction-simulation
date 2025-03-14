let gravity;
let entity1;
let entity2;
let entity3;
let entity4;

function computeOrbitalVelocity(entity1, entity2, G) {
  const pos1 = entity1.getPosition();
  const pos2 = entity2.getPosition();
  
  const dx = pos2.x - pos1.x;
  const dy = pos2.y - pos1.y;
  const r = Math.sqrt(dx * dx + dy * dy);
  
  const orbitalSpeed = Math.sqrt(G * entity2.getMass() / r);
  
  let tangent = { x: dy, y: -dx };
  const mag = Math.sqrt(tangent.x * tangent.x + tangent.y * tangent.y);
  tangent.x /= mag;
  tangent.y /= mag;
  
  return { x: tangent.x * orbitalSpeed, y: 1 - tangent.y * orbitalSpeed };
}

function setup() {
  gravity = new Gravity();

  entity1 = new Entity(1e18, "#f00", { x: 300, y: 300 }, 60);
  
  entity2 = new Entity(1e16, "#000", { x: 300, y: 500 }, 20);

  entity3 = new Entity(1e16, "#0f0", { x: 500, y: 250 }, 20);

  entity4 = new Entity(1e10, "#00f", { x: 250, y: 500 }, 20);

  const orbitalVelocity = computeOrbitalVelocity(entity1, entity2, gravity.getGravitationalConstant());
  const orbitalVelocity2 = computeOrbitalVelocity(entity2, entity1, gravity.getGravitationalConstant());
  const orbitalVelocity3 = computeOrbitalVelocity(entity3, entity1, gravity.getGravitationalConstant());
  const orbitalVelocity4 = computeOrbitalVelocity(entity4, entity1, gravity.getGravitationalConstant());

  entity1.setInitialVelocity(orbitalVelocity);
  entity2.setInitialVelocity(orbitalVelocity2);
  entity3.setInitialVelocity(orbitalVelocity3);
  entity4.setInitialVelocity(orbitalVelocity4);

  createCanvas(10000, 10000);
}

function draw() {
  clear()
  background(220);
  const force = gravity.attractionForce(
    entity1.getMass(),
    entity2.getMass(),
    entity1.getPosition().x,
    entity1.getPosition().y,
    entity2.getPosition().x,
    entity2.getPosition().y
  );

  const force2 = gravity.attractionForce(
    entity2.getMass(),
    entity1.getMass(),
    entity2.getPosition().x,
    entity2.getPosition().y,
    entity1.getPosition().x,
    entity1.getPosition().y
  );

  const force3 = gravity.attractionForce(
    entity3.getMass(),
    entity1.getMass(),
    entity3.getPosition().x,
    entity3.getPosition().y,
    entity1.getPosition().x,
    entity1.getPosition().y
  );

  const force4 = gravity.attractionForce(
    entity4.getMass(),
    entity1.getMass(),
    entity4.getPosition().x,
    entity4.getPosition().y,
    entity1.getPosition().x,
    entity1.getPosition().y
  );




  const direction = entity1.getDirectionVector(entity2);

  const direction2 = entity2.getDirectionVector(entity1);

  const direction3 = entity3.getDirectionVector(entity1);

  const direction4 = entity4.getDirectionVector(entity1);

  entity1.updatePosition(force, direction, entity1.getMass(), 0.01);
  entity2.updatePosition(force2, direction2, entity2.getMass(), 0.01);
  entity3.updatePosition(force3, direction3, entity3.getMass(), 0.01);
  entity4.updatePosition(force4, direction4, entity4.getMass(), 0.01);
  entity1.draw();
  entity2.draw();
  entity3.draw();
  entity4.draw();
}
