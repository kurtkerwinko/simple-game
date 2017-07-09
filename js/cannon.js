function Cannon() {
  this.position = createVector((width / 2) - ((width / 2) % scl), height);
  this.radius = 20;
  this.width = 10;
  this.height = this.radius + 15;
  this.target = createVector(50, 50);

  this.angle = atan2(this.target.y - this.position.y, this.target.x - this.position.x);
  this.angleInt = createVector(this.position.x + this.radius * cos(this.angle), this.position.y + this.radius * sin(this.angle));

  this.fire = function() {
    return new Projectile(this.angleInt.x, this.angleInt.y, this.target.x, this.target.y);
  }

  this.update = function() {
    this.angle = atan2(this.target.y - this.position.y, this.target.x - this.position.x);
    this.angleInt.x = this.position.x + this.radius * cos(this.angle);
    this.angleInt.y = this.position.y + this.radius * sin(this.angle);
  };

  this.draw = function() {
    push();
    fill(100);
    ellipse(this.target.x, this.target.y, 10, 10);

    push();
    rectMode(CENTER);
    translate(this.angleInt.x, this.angleInt.y);
    rotate(this.angle+radians(90));
    rect(0, 0, this.width, this.height - 5, 0, 0, 50, 50);
    pop();

    fill(40);
    ellipse(this.position.x, this.position.y, this.radius * 2, this.radius * 2);
    pop();
  };
}
