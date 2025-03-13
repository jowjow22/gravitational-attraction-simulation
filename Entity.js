class Entity{
  #mass = 1000
  #color = '#fff'
  #position
  #radius
  #velocity = { x: 0, y: 0 }
  
  constructor(mass, color, position, radius, initialVelocity = { x: 0, y: 0 }) {
    this.#mass = mass
    this.#color = color
    this.#position = position
    this.#radius = radius
    this.#velocity = initialVelocity
  }

  draw(){
    fill(this.#color)
    circle(this.#position.x, this.#position.y, this.#radius)
  }

  getMass(){
    return this.#mass
  }

  getPosition(){
    return this.#position
  }

  setInitialVelocity(velocity){
    this.#velocity = velocity
  }

  getDirectionVector(entity){
    const { x, y } = entity.getPosition()
    
    const displacement = { x: x - this.#position.x, y: y - this.#position.y }
    const magnitude = Math.sqrt(Math.pow(displacement.x, 2)+Math.pow(displacement.y, 2))
    
    if (magnitude === 0) return { x: 0, y: 0 };

    return { x: displacement.x / magnitude, y: displacement.y / magnitude }
  }

  updatePosition(force, direction, mass, time) {
    const acceleration = force / mass;

    this.#velocity.x += acceleration * time * direction.x;
    this.#velocity.y += acceleration * time * direction.y;

   
    const maxVelocity = 1300;
    if (Math.abs(this.#velocity.x) > maxVelocity) {
      this.#velocity.x = maxVelocity * Math.sign(this.#velocity.x);
    }
    if (Math.abs(this.#velocity.y) > maxVelocity) {
      this.#velocity.y = maxVelocity * Math.sign(this.#velocity.y);
    }

    this.#position.x += this.#velocity.x * time;
    this.#position.y += this.#velocity.y * time;

  }
}