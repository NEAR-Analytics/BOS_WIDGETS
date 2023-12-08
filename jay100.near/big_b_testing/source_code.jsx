State.init({
  score: 0,
});

const Game_Box = () => {
  const code = `
  <head>
      <link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Lugrasimo&family=VT323&display=swap" rel="stylesheet">
  </head>
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

   let droppedCircles = [];
   let groundY;
   let hoveredCircle = null;
   const sizes = [10, 20, 40];
   let circleColors = [{r: 255, g: 0, b: 0},{r: 0, g: 255, b: 0},{r: 0, g: 0, b: 255}]
   let gameScore = 0;
   let canDropCircle = true;
   let allCircles = [];
   let timer = 60;
let timerInterval;
 
   
   function setup() {
      createCanvas(400, windowHeight * 0.95);
      groundY = height - 5; // Ground position
       timerInterval = setInterval(() => {
        if (timer > 0) {
            timer--;
        } else {
            // If the timer reaches 0, stop the timer and prevent circle dropping
            clearInterval(timerInterval);
            canDropCircle = false;
        }
    }, 1000); // Update the timer every second (1000 milliseconds)
    }
   
    function draw() {
      background(220)

      textFont("VT323");

      textSize(30);
      fill(0);
      text("Time: " + timer, 300, 20);

      textSize(30);
      fill(0,0,0)
      text("Score: " + gameScore, 20, 20);
      
   
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
        // droppedCircles[i].checkCollision();
   
         for (let j = i + 1; j < droppedCircles.length; j++) {
            droppedCircles[i].checkCircleCollision(droppedCircles[j]);
        }
      }
    }
   
    function mouseClicked() {
      console.log('allCircles', allCircles);
      console.log('droppedCircles', droppedCircles);

        if (canDropCircle && timer > 0) {
        const randCircPos = Math.floor(Math.random() * 3);
        const randSizePos = Math.floor(Math.random() * 3);

        if (!hoveredCircle) {
            hoveredCircle = new Circle(mouseX, 45, circleColors[randCircPos]);
            hoveredCircle.radius = sizes[randSizePos];
        } else {
            const newRandCircPos = Math.floor(Math.random() * 3);
            const newRandSizePos = Math.floor(Math.random() * 3);
            let newDroppedCircle = new Circle(hoveredCircle.x, hoveredCircle.y, hoveredCircle.color);
            newDroppedCircle.radius = hoveredCircle.radius;

            droppedCircles.push(newDroppedCircle); // Add the new dropped circle
            allCircles.push(newDroppedCircle);
            hoveredCircle = null; // Reset hoveredCircle
            
            canDropCircle = false; // Prevent dropping a new circle immediately
            setTimeout(() => {
                hoveredCircle = new Circle(mouseX, 45, circleColors[newRandCircPos]);
                hoveredCircle.radius = sizes[newRandSizePos];
                canDropCircle = true; // Allow dropping a new circle after the delay
            }, 500); // Adjust the delay duration in milliseconds (here, it's 1 second)
        }
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

             if(newRadius === 20){
              gameScore += 2
            }

            if(newRadius === 40){
              gameScore += 4
            }

            if(newRadius === 80){
              gameScore += 8
            }
            

            if (newRadius === 160) {
                gameScore += 16;
                let mergedCircle = new Circle(this.x, this.y, this.color);
                mergedCircle.radius = newRadius;
                allCircles = allCircles.filter(circle => circle !== this && circle !== otherCircle);
                allCircles.push(mergedCircle);
                 this.radius = 0; // Set current circle's radius to zero
                otherCircle.radius = 0; // Set other circle's radius to zero
            } else {
                this.radius = newRadius;
                otherCircle.radius = 0;
                allCircles = allCircles.filter(circle => circle !== otherCircle);
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

  return (
    <div
      style={{ height: "35rem", display: "flex", flexDirection: "column" }}
      className="mx-auto"
    >
      {" "}
      <iframe className="w-100 h-100" srcDoc={code} />
    </div>
  );
};

return (
  <div style={{ width: "100%", height: "100%", background: "blue" }}>
    <Game_Box />
  </div>
);
