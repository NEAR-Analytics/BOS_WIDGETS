const Game_Box = () => {
  const code = `
<style>
   body {
   margin: 0;
   display: flex;
   align-items: center;
   height: 80vh;
   flex-direction: column;
   }

   .score{
    padding: 1rem;
    font-size: 1.5rem;
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
   const sizes = [10, 20, 40];
   let circleColors = [{r: 255, g: 0, b: 0},{r: 0, g: 255, b: 0},{r: 0, g: 0, b: 255}]
   let gameScore = 0;
  
   
   
   
   function setup() {
      createCanvas(windowWidth, windowHeight * 0.9);
      groundY = height; // Ground position
    }
   
    function draw() {
      background(220)
   
      let mouseYPos = mouseY;
      stroke(0);
      line(mouseX, 0, mouseX, windowHeight);
   
      if (hoveredCircle) {
        hoveredCircle.x = mouseX;
        hoveredCircle.y = 45; // Adjust the y position as needed
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
      gameScore += 1;
      const randCircPos = Math.floor(Math.random() * 3);
      const randSizePos = Math.floor(Math.random() * 3);

         if (!hoveredCircle) {
        hoveredCircle = new Circle(mouseX, 45, circleColors[randCircPos]);
        hoveredCircle.radius = sizes[randSizePos];
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
        this.xSpeed = random(0, 0); // Initial random horizontal speed
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
          this.ySpeed += 0.2; // Simulate gravity
          this.x += this.xSpeed;
   
          // Bounce off walls
          if (this.x + this.radius >= width || this.x - this.radius <= 0) {
            this.xSpeed *= -0.1; // Reduce x speed upon wall impact
          }
   
           // Check for hitting another circle
          // for (let j = 0; j < droppedCircles.length; j++) {
           // if (this !== droppedCircles[j] && this.intersects(droppedCircles[j])) {
              // this.resolveCollision(droppedCircles[j]);
           // }
         // }
   
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
            let newRadius = (this.radius) + (otherCircle.radius);
            console.log(newRadius);
            if(newRadius === 160){
              this.radius = 0;
              otherCircle.radius = 0; // Make the other circle disappear
            } else{
              this.radius = newRadius;
              otherCircle.radius = 0; // Make the other circle disappear
            }
            
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


        // Update velocities for a bounce effect with mass consideration

         // let massFactor = 0.03;
        // let forceFactor = (this.radius - other.radius) * massFactor;

    // Update velocities for a bounce effect with mass consideration
    // Modify this part accordingly to suit your specific behavior

    let angle = atan2(dy, dx);
    let thisSpeed = sqrt(this.xSpeed * this.xSpeed + this.ySpeed * this.ySpeed);
    let otherSpeed = sqrt(other.xSpeed * other.xSpeed + other.ySpeed * other.ySpeed);
    let thisDirection = atan2(this.ySpeed, this.xSpeed);
    let otherDirection = atan2(other.ySpeed, other.xSpeed);


    // this(thisSpeed - forceFactor)
    // other(thisSpeed + forceFactor)
    let newThisXSpeed = otherSpeed * cos(otherDirection - angle) * cos(angle) + (thisSpeed) * sin(thisDirection - angle) * cos(angle + HALF_PI);
    let newThisYSpeed = otherSpeed * cos(otherDirection - angle) * sin(angle) + (thisSpeed) * sin(thisDirection - angle) * sin(angle + HALF_PI);
    let newOtherXSpeed = (thisSpeed) * cos(thisDirection - angle) * cos(angle) + otherSpeed * sin(otherDirection - angle) * cos(angle + HALF_PI);
    let newOtherYSpeed = (thisSpeed) * cos(thisDirection - angle) * sin(angle) + otherSpeed * sin(otherDirection - angle) * sin(angle + HALF_PI);

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

  const ScoreContainer = styled.div`
    width: 100%;
    background-color: #0e0e1e;
    display: flex;
    align-items: center;
    padding: 1rem;
  `;

return (
  <div style={{ width: "400px", height: "530px", display: "flex", flexDirection: 'column'}} className="mx-auto">
    <ScoreContainer />
    <Game_Box />
  </div>
);
