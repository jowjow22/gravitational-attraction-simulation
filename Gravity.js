class Gravity {
  #G = 6.67430e-11

 attractionForce(m1, m2, x1, y1, x2, y2) {
    let dx = x2 - x1;
    let dy = y2 - y1;
    let r = Math.sqrt(dx * dx + dy * dy);

    let minDistance = 100; // Prevent extreme forces
    if (r < minDistance) r = minDistance;

    let epsilon = 5; // Prevent division by zero

    if (this.detectCollision(x1, y1, x2, y2, 20, 20)) {
      r = minDistance;
    }

    return (this.#G * m1 * m2) / (r * r + epsilon * epsilon);
}

  getGravitationalConstant(){
    return this.#G
  }

  detectCollision(c1_x, c1_y, c2_x, c2_y, radius1, radius2) {
    const distance = Math.sqrt(Math.pow(c1_x - c2_x, 2) + Math.pow(c1_y - c2_y, 2))
    return distance <= (radius1 + radius2)
  }

}