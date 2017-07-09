function Explosion(x, y) {
  this.position = createVector(x, y);
  this.radius = this.baseRadius;
  this.baseRadius = 40;
  this.active = false;

  this.frameNum = 0;
  this.frameCount = 0;
  this.factor = 0.8;
  // [factor, frames]
  this.frames = [
    [1 / 2, 4],
    [1, 6],
    [pow(this.factor, 1), 2],
    [pow(this.factor, 2), 2],
    [pow(this.factor, 3), 2],
    [pow(this.factor, 4), 2]
  ];

  this.complete = function() {
    if (this.frameNum == this.frames.length) {
      return true;
    }
  }

  this.update = function() {
    this.frameCount++
    this.radius = this.baseRadius * this.frames[this.frameNum][0];
    if (this.frameCount > this.frames[this.frameNum][1]) {
      this.frameCount = 0;
      this.frameNum++;
    }
    if (this.frameNum == 1) {
      this.active = true;
    } else {
      this.active = false;
    }
  };

  this.draw = function() {
    push();
    noStroke();
    fill(255 * this.frames[this.frameNum][0]);
    ellipse(this.position.x, this.position.y, this.radius * 2, this.radius * 2);
    pop();
  };
}
