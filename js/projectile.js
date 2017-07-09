function Projectile(x, y, targetX, targetY) {
  this.position = createVector(x, y);
  this.target = createVector(targetX, targetY);
  this.radius = 5;
  this.velocity = createVector(8, 8);
  this.angle = atan2(this.target.y - this.position.y, this.target.x - this.position.x);

  this.trailLength = 5;
  this.trail = []
  for (var i = 0; i < this.trailLength; i++) {
    this.trail[i] = [this.position.x, this.position.y, this.radius * 2 * 0.8]
  }

  this.explode = function() {
    return new Explosion(this.position.x, this.position.y);
  }

  this.reachTarget = function() {
    d = int(dist(this.position.x, this.position.y, this.target.x, this.target.y))
    if (d <= this.radius) {
      return true;
    } else {
      return false;
    }
  }

  this.update = function() {
    for (var i = 0; i < this.trailLength-1; i++) {
      this.trail[i] = this.trail[i+1];
      this.trail[i][2] = this.trail[i][2] * 0.8
    }
    this.trail[this.trailLength-1] = [this.position.x, this.position.y, this.radius * 2 * 0.8];

    this.angle = atan2(this.target.y - this.position.y, this.target.x - this.position.x);
    this.position.x = this.position.x + cos(this.angle) * this.velocity.x;
    this.position.y = this.position.y + sin(this.angle) * this.velocity.y;
  };

  this.draw = function() {
    push();
    noStroke();
    opac = 95;
    for (var i = 0; i < this.trailLength; i++) {
      fill(175, 175, 175, opac);
      ellipse(this.trail[i][0], this.trail[i][1], this.trail[i][2], this.trail[i][2]);
      opac = opac * 0.95;
    }
    fill(175);
    ellipse(this.position.x, this.position.y, this.radius * 2, this.radius * 2);
    pop();
  };
}
