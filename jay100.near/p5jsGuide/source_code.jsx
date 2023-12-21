const GameContainer = () => {
  const code = `
    <head>
<link href="https://fonts.googleapis.com/css2?family=Lugrasimo&family=VT323&display=swap" rel="stylesheet">
<script src="https://cdnjs.cloudflare.com/ajax/libs/p5.js/1.9.0/p5.js" integrity="sha512-2r+xZ/Dm8+HI0I8dsj1Jlfchv4O3DGfWbqRalmSGtgdbVQrZyGRqHp9ek8GKk1x8w01JsmDZRrJZ4DzgXkAU+g==" crossorigin="anonymous" referrerpolicy="no-referrer"></script>
  </head>
<style>
   body {
   margin: 0;
   display: flex;
   align-items: center;
   flex-direction: column;
   overflow: hidden;
   }

</style>
<body>
</body>
<script>

  let circle = null;
  let groundHeight;
  let gameCircles = [];
  const sizes = [10, 20, 40];
  let circleColors = [{r: 255, g: 0, b: 0},{r: 0, g: 255, b: 0},{r: 0, g: 0, b: 255}]
  let gameScore = 0;
  let timer = 30;

function setup() {
    createCanvas(350, windowHeight);
    groundHeight = height; // Ground position

  setInterval(() => {
        if (timer > 0) {
            timer--;
        }
    }, 1000);
}

   
    function draw() {
      background(220);

      textFont("VT323");

      textSize(30);
      fill(0);
      text("Time: " + timer, 250, 20);

      textSize(30);
      fill(0)
      text("Score: " + gameScore, 20, 20);

     for(let i = 0; i < gameCircles.length; i++){
      gameCircles[i].display();
      gameCircles[i].fall();
      gameCircles[i].checkBounds();
         for (let j = i + 1; j < gameCircles.length; j++) {
            gameCircles[i].handleCircleCollision(gameCircles[j]);
        }
     }

    }
   
    function mouseClicked() {

      if(timer > 0){
      const randPos = Math.floor(Math.random() * sizes.length);
        
      let newCircle = new Circle(mouseX, 50, circleColors[randPos]);
      newCircle.radius = sizes[randPos];
      newCircle.isFalling = true;
      gameCircles.push(newCircle);
      }
    }

    class Circle {
       constructor(x, y, color) {
        this.x = x;
        this.y = y;
        this.radius = 25;
        this.color = color;
        this.isFalling = false;
        this.xSpeed = 0;
        this.ySpeed = 0;
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
          }
      }

      checkBounds() {
        if (this.x - this.radius < 0 || this.x + this.radius > width) {
          this.x = constrain(this.x, this.radius, width - this.radius);

            // Bounce off walls
          if (this.x + this.radius >= width || this.x - this.radius <= 0) {
            this.xSpeed *= -0.1; // Reduce x speed upon wall impact
          }
        }
        if (this.y - this.radius < 0 || this.y + this.radius > height) {
          this.y = constrain(this.y, this.radius, height - this.radius);

          // Check for hitting the ground
          if (this.y + this.radius >= groundHeight) {
            this.y = groundHeight - this.radius;
            this.ySpeed *= -0.1; // Reduce y speed upon ground impact (dampening)
            this.xSpeed *= 0.6; // Reduce x speed upon ground impact
          }

        }
      }

  handleCircleCollision(otherCircle) {
    // Calculate the differences in x and y positions between the circles
    let dx = this.x - otherCircle.x;
    let dy = this.y - otherCircle.y;

    // Calculate the squared distance between the centers of the circles
    let distanceSquared = dx * dx + dy * dy;

    // Calculate the squared minimum distance at which the circles should collide
    let minDistanceSquared = (this.radius + otherCircle.radius) * (this.radius + otherCircle.radius);

    // Check if the squared distance is less than or equal to the squared minimum distance
    if (distanceSquared <= minDistanceSquared) {
      if (
            this.color.r === otherCircle.color.r &&
            this.color.g === otherCircle.color.g &&
            this.color.b === otherCircle.color.b &&
            this.radius === otherCircle.radius
        ){
                // Merge circles if they touch and have similar color and radius
                let newRadius = (this.radius) + (otherCircle.radius);
                this.radius = newRadius;
                otherCircle.radius = 0;
                gameCircles = gameCircles.filter(circle => circle !== otherCircle);

                if(newRadius > 100){
                  gameScore += 10;
                  gameCircles = gameCircles.filter(circle => circle !== this && circle !== otherCircle);
                } else {
                  gameScore += 5;
                }
      }else{
        // If the circles are colliding, resolve the collision between them
        this.handleCollisionBounce(otherCircle);
      }
       
    }
}


handleCollisionBounce(other) {
    // Calculate the difference in positions between the two circles
    let dx = other.x - this.x;
    let dy = other.y - this.y;
    let distance = sqrt(dx * dx + dy * dy); // Calculate the distance between the circles

    // Calculate the minimum distance needed to separate the circles without overlap
    let minDistance = this.radius + other.radius;
    let separationX = dx / distance * (minDistance - distance);
    let separationY = dy / distance * (minDistance - distance);

    // Move circles apart to prevent overlap
    this.x -= separationX / 2;
    this.y -= separationY / 2;
    other.x += separationX / 2;
    other.y += separationY / 2;

    // Calculate collision angles and speeds for bouncing effect
    let angle = atan2(dy, dx); // Calculate angle of collision
    let thisSpeed = sqrt(this.xSpeed * this.xSpeed + this.ySpeed * this.ySpeed); // Calculate speed of this circle
    let otherSpeed = sqrt(other.xSpeed * other.xSpeed + other.ySpeed * other.ySpeed); // Calculate speed of other circle
    let thisDirection = atan2(this.ySpeed, this.xSpeed); // Calculate direction of this circle's movement
    let otherDirection = atan2(other.ySpeed, other.xSpeed); // Calculate direction of other circle's movement

    // Calculate new velocities after collision
    let newThisXSpeed = otherSpeed * cos(otherDirection - angle) * cos(angle) + (thisSpeed) * sin(thisDirection - angle) * cos(angle + HALF_PI);
    let newThisYSpeed = otherSpeed * cos(otherDirection - angle) * sin(angle) + (thisSpeed) * sin(thisDirection - angle) * sin(angle + HALF_PI);
    let newOtherXSpeed = (thisSpeed) * cos(thisDirection - angle) * cos(angle) + otherSpeed * sin(otherDirection - angle) * cos(angle + HALF_PI);
    let newOtherYSpeed = (thisSpeed) * cos(thisDirection - angle) * sin(angle) + otherSpeed * sin(otherDirection - angle) * sin(angle + HALF_PI);

    // Update velocities to reflect the new directions and speeds after collision
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
      style={{
        width: "100%",
        height: "80%",
        display: "flex",
        flexDirection: "column",
      }}
      className="mx-auto"
    >
      <iframe className="w-100 h-100" srcDoc={code} />
    </div>
  );
};

return (
  <div style={{ width: "100%", height: "100%", background: "blue" }}>
    <GameContainer />
  </div>
);
