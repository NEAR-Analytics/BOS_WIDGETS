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
   let droppedCircles = [];
   let groundY;
   let nextCircleColor = { r: 255, g: 0, b: 0 }; // Color of the next circle to be dropped
   let lastDroppedCircleColor = { r: 255, g: 0, b: 0 }; // Color of the last dropped circle
   let hoveredCircle = null;
   const sizes = [20, 30, 40];
   let circleColors = [{r: 255, g: 0, b: 0},{r: 0, g: 255, b: 0},{r: 0, g: 0, b: 255}]
  
   
   
   
   function setup() {
      createCanvas(windowWidth, windowHeight);
      groundY = height; // Ground position
    }
   
    function draw() {
      background(220)
   
      let mouseYPos = mouseY;
      stroke(0);
      line(mouseX, 0, mouseX, windowHeight);
   
      if (hoveredCircle) {
        hoveredCircle.x = mouseX;
        hoveredCircle.y = 100; // Adjust the y position as needed
        fill(hoveredCircle.color.r, hoveredCircle.color.g, hoveredCircle.color.b);
        ellipse(hoveredCircle.x, hoveredCircle.y, hoveredCircle.radius * 2);
    }      
   
      for (let i = 0; i < droppedCircles.length; i++) {
        droppedCircles[i].display();
        droppedCircles[i].fall();
        droppedCircles[i].checkBounds();
   
        // Check for collision with other droppedCircles
        droppedCircles[i].checkCollision();
   
         for (let j = i + 1; j < droppedCircles.length; j++) {
            droppedCircles[i].checkCircleCollision(droppedCircles[j]);
        }
      }
    }
   
    function mouseClicked() {
      const randPos = Math.floor(Math.random() * 3);

      console.log(droppedCircles);

         if (!hoveredCircle) {
        hoveredCircle = new Circle(mouseX, 100, circleColors[randPos]);
        hoveredCircle.radius = sizes[randPos];
          } else {
        
        let newDroppedCircle = new Circle(hoveredCircle.x, hoveredCircle.y, hoveredCircle.color);
        newDroppedCircle.radius = hoveredCircle.radius;

        droppedCircles.push(newDroppedCircle); // Add the new dropped circle
        hoveredCircle = null; // Reset hoveredCircle
          }
     }
   
     class Circle {
      constructor(x, y, color) {
        this.x = x;
        this.y = y;
        this.radius = 25;
        this.speed = 6;
        this.isFalling = true;
        this.xSpeed = random(-0.5, 0.5); // Initial random horizontal speed
        this.ySpeed = 0;
        this.color = color;
      }
   
      display() {
        fill(this.color.r, this.color.g, this.color.b);
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
          for (let j = 0; j < droppedCircles.length; j++) {
            if (this !== droppedCircles[j] && this.intersects(droppedCircles[j])) {
              this.resolveCollision(droppedCircles[j]);
            }
          }
   
          // Check for hitting the ground
          if (this.y + this.radius >= groundY) {
            this.y = groundY - this.radius;
            this.ySpeed *= -0.1; // Reduce y speed upon ground impact (dampening)
            this.xSpeed *= 0.6; // Reduce x speed upon ground impact
          }
        }
      }
   
      checkCollision() {
        for (let j = 0; j < droppedCircles.length; j++) {
          if (this !== droppedCircles[j] && this.intersects(droppedCircles[j])) {
            this.checkCircleCollision(droppedCircles[j]);
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
   
      checkCircleCollision(otherCircle) {
                let dx = this.x - otherCircle.x;
    let dy = this.y - otherCircle.y;
    let distanceSquared = dx * dx + dy * dy;

    let minDistanceSquared = (this.radius + otherCircle.radius) * (this.radius + otherCircle.radius);

    if (distanceSquared <= minDistanceSquared) {
        let radiusDifference = abs(this.radius - otherCircle.radius);
        let mergeThreshold = 3; // Set your threshold for merging circles

        if (
            this.color.r === otherCircle.color.r &&
            this.color.g === otherCircle.color.g &&
            this.color.b === otherCircle.color.b &&
            radiusDifference <= mergeThreshold
        ) {
            // Merge circles if they touch and have similar color and radius
            let newRadius = sqrt(sq(this.radius) + sq(otherCircle.radius));
            this.radius = newRadius;
            otherCircle.radius = 0; // Make the other circle disappear
        } else {
            // Resolve collision as a bounce
            this.resolveCollision(otherCircle);
        }
    }
      }
   
      resolveCollision(other) {
        let dx = other.x - this.x;
        let dy = other.y - this.y;
        let distance = sqrt(dx * dx + dy * dy);
   
        // Calculate the minimum translation distance to separate droppedCircles
        let minDistance = this.radius + other.radius;
        let separationX = dx / distance * (minDistance - distance);
        let separationY = dy / distance * (minDistance - distance);
   
        // Move droppedCircles apart to avoid overlap
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
  <div style={{ width: "400px", height: "90%" }} className="mx-auto">
    <Game_Box />
  </div>
);
