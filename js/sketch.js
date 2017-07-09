var cannon;
var projectiles = [];
var explosions = [];
var enemies = [];
var score = 0;
var scl = 5;

function setup() {
  createCanvas(windowWidth - (windowWidth % scl), windowHeight - (windowHeight % scl));
  cannon = new Cannon();
  noCursor();
  enemies.push(new Enemy());
  enemies.push(new Enemy());
  enemies.push(new Enemy());
}

function draw() {
  background(51);

  updateEnemies();
  updateExplosions();
  updateProjectiles();
  updateCannon();

  checkCollisions();

  drawEnemies();
  drawExplosions();
  drawProjectiles();
  drawCannon();

  var fps = frameRate();
  fill(255);
  stroke(0);
  text("FPS: " + fps.toFixed(2), 10, height - 10);
  text("Score: " + score, 10, 20);
}

function mouseMoved() {
  cannon.target.x = mouseX;
  cannon.target.y = mouseY;
}

function mouseClicked() {
  projectiles.push(cannon.fire());
}

function updateExplosions() {
  for (var i = explosions.length-1; i >= 0; i--) {
    explosions[i].update();
    if (explosions[i].complete()) {
      explosions.splice(i, 1);
    }
  }
}

function drawExplosions() {
  for (var i = explosions.length-1; i >= 0; i--) {
    explosions[i].draw();
  }
}

function updateProjectiles() {
  for (var i = projectiles.length-1; i >= 0; i--) {
    projectiles[i].update();
    if (projectiles[i].reachTarget()) {
      explosions.push(projectiles[i].explode());
      projectiles.splice(i, 1);
    }
  }
}

function drawProjectiles() {
  for (var i = projectiles.length-1; i >= 0; i--) {
    projectiles[i].draw();
  }
}

function updateCannon() {
  cannon.update();
}

function drawCannon() {
  cannon.draw();
}

function updateEnemies() {
  for (var i = 0; i < enemies.length; i++) {
    enemies[i].update();
  }
}

function drawEnemies() {
  for (var i = 0; i < enemies.length; i++) {
    enemies[i].draw();
  }
}

function checkCollisions() {
  for (var i = explosions.length-1; i >= 0; i--) {
    if (explosions[i].active) {
      // Check explosions to projectile collisions
      for (var z = projectiles.length-1; z >= 0; z--) {
        if (projectileInExplosion(projectiles[z], explosions[i])) {
          explosions.push(projectiles[z].explode())
          projectiles.splice(z, 1);
        }
      }

      // Check explosions to enemy collisions
      for (var z = enemies.length-1; z >= 0; z--) {
        if (enemyInExplosion(enemies[z], explosions[i])) {
          score += enemies[z].points;
          enemies.splice(z, 1);
          enemies.push(new Enemy());
          enemies.push(new Enemy());
        }
      }
    }
  }
}

function projectileInExplosion(projectile, explosion) {
  d = dist(projectile.position.x, projectile.position.y, explosion.position.x, explosion.position.y)
  return d <= projectile.radius + explosion.radius;
}

function enemyInExplosion(enemy, explosion) {
  closeX = explosion.position.x;
  closeY = explosion.position.y;

  if (explosion.position.x < enemy.position.x) {
    closeX = enemy.position.x;
  }
  if (explosion.position.x > enemy.position.x + enemy.width) {
    closeX = enemy.position.x + enemy.width;
  }
  if (explosion.position.y < enemy.position.y) {
    closeY = enemy.position.y;
  }
  if (explosion.position.y > enemy.position.y + enemy.height) {
    closeY = enemy.position.y + enemy.height;
  }
  d = dist(closeX, closeY, explosion.position.x, explosion.position.y);
  return  d <= explosion.radius;
}
