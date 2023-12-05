State.init({
  text: `"b" + "a" + +"a" + "a"`,
});

const Game_Box = () => {
  const code = `
   <style>
    body {
      margin: 0;
      display: flex;
      align-items: center;
      justify-content: center;
      height: 80vh;
    }
  </style>
    <body>
    
    </body>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/p5.js/1.9.0/p5.js" integrity="sha512-2r+xZ/Dm8+HI0I8dsj1Jlfchv4O3DGfWbqRalmSGtgdbVQrZyGRqHp9ek8GKk1x8w01JsmDZRrJZ4DzgXkAU+g==" crossorigin="anonymous" referrerpolicy="no-referrer"></script>
  <script>

   let circles = [];
   let groundY;

   function setup() {
      createCanvas(windowWidth / 2, windowHeight);
      groundY = height - 20; // Ground position
    }

    function draw() {
      background(220);

      let mouseYPos = mouseY;
      stroke(0);
      line(mouseX, 0, mouseX, windowHeight);

      for (let i = 0; i < circles.length; i++) {
        circles[i].display();
        circles[i].fall();
        circles[i].checkBounds();

        // Check for collision with other circles
        circles[i].checkCollision();
      }
    }

    function mouseClicked() {
    let newCircle = new Circle(mouseX, 100);
      circles.push(newCircle);
    }
   
     class Circle {
      constructor(x, y) {
        this.x = x;
        this.y = y;
        this.radius = 25;
        this.speed = 6;
        this.isFalling = true;
        this.xSpeed = random(-0.5, 0.5); // Initial random horizontal speed
        this.ySpeed = 0;
      }

      display() {
        fill(255, 0, 0);
        ellipse(this.x, this.y, this.radius * 2);
      }

      fall() {
        if (this.isFalling) {
          this.y += this.ySpeed;
          this.ySpeed += 0.1; // Simulate gravity
          this.x += this.xSpeed;

          // Bounce off walls
          if (this.x + this.radius >= width || this.x - this.radius <= 0) {
            this.xSpeed *= -0.8; // Reduce x speed upon wall impact
          }

           // Check for hitting another circle
          for (let j = 0; j < circles.length; j++) {
            if (this !== circles[j] && this.intersects(circles[j])) {
              this.resolveCollision(circles[j]);
            }
          }

          // Check for hitting the ground
          if (this.y + this.radius >= groundY) {
            this.y = groundY - this.radius;
            this.ySpeed *= -0.15; // Reduce y speed upon ground impact (dampening)
            this.xSpeed *= 0.8; // Reduce x speed upon ground impact
          }
        }
      }

      checkCollision() {
        for (let j = 0; j < circles.length; j++) {
          if (this !== circles[j] && this.intersects(circles[j])) {
            this.resolveCollision(circles[j]);
          }
        }
      }

      checkBounds() {
        if (this.x - this.radius < 0 || this.x + this.radius > width) {
          this.x = constrain(this.x, this.radius, width - this.radius);
        }
        if (this.y - this.radius < 0 || this.y + this.radius > height) {
          this.y = constrain(this.y, this.radius, height - this.radius);
        }
      }

      intersects(other) {
        let distance = dist(this.x, this.y, other.x, other.y);
        return distance < this.radius + other.radius;
      }

      stopFalling() {
        this.isFalling = false;
      }

      resolveCollision(other) {
        let dx = other.x - this.x;
        let dy = other.y - this.y;
        let distance = sqrt(dx * dx + dy * dy);

        // Calculate the minimum translation distance to separate circles
        let minDistance = this.radius + other.radius;
        let separationX = dx / distance * (minDistance - distance);
        let separationY = dy / distance * (minDistance - distance);

        // Move circles apart to avoid overlap
        this.x -= separationX / 2;
        this.y -= separationY / 2;
        other.x += separationX / 2;
        other.y += separationY / 2;

        // Update velocities for a bounce effect
        let angle = atan2(dy, dx);
        let thisSpeed = sqrt(this.xSpeed * this.xSpeed + this.ySpeed * this.ySpeed);
        let otherSpeed = sqrt(other.xSpeed * other.xSpeed + other.ySpeed * other.ySpeed);
        let thisDirection = atan2(this.ySpeed, this.xSpeed);
        let otherDirection = atan2(other.ySpeed, other.xSpeed);

        let newThisXSpeed = otherSpeed * cos(otherDirection - angle) * cos(angle) + thisSpeed * sin(thisDirection - angle) * cos(angle + HALF_PI);
        let newThisYSpeed = otherSpeed * cos(otherDirection - angle) * sin(angle) + thisSpeed * sin(thisDirection - angle) * sin(angle + HALF_PI);
        let newOtherXSpeed = thisSpeed * cos(thisDirection - angle) * cos(angle) + otherSpeed * sin(otherDirection - angle) * cos(angle + HALF_PI);
        let newOtherYSpeed = thisSpeed * cos(thisDirection - angle) * sin(angle) + otherSpeed * sin(otherDirection - angle) * sin(angle + HALF_PI);

        this.xSpeed = newThisXSpeed;
        this.ySpeed = newThisYSpeed;
        other.xSpeed = newOtherXSpeed;
        other.ySpeed = newOtherYSpeed;
      }
    }
  </script>
`;
  return <iframe className="w-100 h-100" srcDoc={code} />;
};

return (
  <div className="w-100 h-100 d-flex align-items-center">
    <Game_Box />
  </div>
);
