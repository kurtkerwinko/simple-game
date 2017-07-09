function Enemy() {
  this.position = createVector(-random(100), random(height/2));
  constrain(this.position.x, -500, -20);
  constrain(this.position.y, 30, height/2);
  this.points = 10;
  this.width = 20;
  this.height = 10;

  this.velocity = createVector(random(7), 0);
  constrain(this.velocity, 4, 7);

  this.outOfBounds = function() {
    if (this.position.x > width + 10) {
      return true;
    }
  }

  this.update = function() {
    this.position.x += this.velocity.x;
    this.position.y += this.velocity.y;
  };

  this.draw = function() {
    push();
    fill(255, 0, 0);
    noStroke();
    rect(this.position.x, this.position.y, this.width, this.height);
    pop();
  };
}
