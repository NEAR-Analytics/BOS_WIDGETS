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
let gameScore = 0;
let canDropCircle = true;
let allCircles = [];
let timer = 60;
let timerInterval;
let backgroundImage; // Declare a variable to hold the image

function preload() {
    // Load your image before the program starts
    backgroundImage = loadImage('https://coinpush.app/wp-content/uploads/2023/03/bitcoin-png-1.png'); // Replace 'path_to_your_image.jpg' with your image file
}

function setup() {
    createCanvas(350, windowHeight * 0.95);
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
    background(220);

    textFont("VT323");

    textSize(30);
    fill(0);
    text("Time: " + timer, 250, 20);

    textSize(30);
    fill(0, 0, 0);
    text("Score: " + gameScore, 20, 20);

    if (hoveredCircle) {
        hoveredCircle.x = mouseX;
        hoveredCircle.y = 45; // Adjust the y position as needed
        image(hoveredCircle.texture, hoveredCircle.x - hoveredCircle.radius, hoveredCircle.y - hoveredCircle.radius, hoveredCircle.radius * 2, hoveredCircle.radius * 2);
    }

    for (let i = 0; i < droppedCircles.length; i++) {
        droppedCircles[i].display();
        droppedCircles[i].fall();
        // droppedCircles[i].checkBounds();

        for (let j = i + 1; j < droppedCircles.length; j++) {
            droppedCircles[i].mergeWith(droppedCircles[j]);
        }
    }
}

function mouseClicked() {
    if (canDropCircle && timer > 0) {
        const randSizePos = Math.floor(Math.random() * 3);

        if (!hoveredCircle) {
            hoveredCircle = new Circle(mouseX, 45, sizes[randSizePos], backgroundImage);
        } else {
            let newDroppedCircle = new Circle(hoveredCircle.x, hoveredCircle.y, hoveredCircle.radius, backgroundImage);

            droppedCircles.push(newDroppedCircle); // Add the new dropped circle
            allCircles.push(newDroppedCircle);
            hoveredCircle = null; // Reset hoveredCircle

            canDropCircle = false; // Prevent dropping a new circle immediately
            setTimeout(() => {
                const newRandSizePos = Math.floor(Math.random() * 3);
                hoveredCircle = new Circle(mouseX, 45, sizes[newRandSizePos], backgroundImage);
                canDropCircle = true; // Allow dropping a new circle after the delay
            }, 500); // Adjust the delay duration in milliseconds (here, it's 1 second)
        }
    }
}

class Circle {
    constructor(x, y, radius, img) {
        this.x = x;
        this.y = y;
        this.radius = radius;
        this.speed = 6;
        this.isFalling = true;
        this.xSpeed = random(0, 0); // Initial random horizontal speed
        this.ySpeed = 5;
        this.texture = img; // Use the image as texture
        this.isMerged = false; // Track whether the circle is merged or not
    }

    display() {
        image(this.texture, this.x - this.radius, this.y - this.radius, this.radius * 2, this.radius * 2);
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

          
          // Check for hitting the ground
          if (this.y + this.radius >= groundY) {
            this.y = groundY - this.radius;
            this.ySpeed *= -0.1; // Reduce y speed upon ground impact (dampening)
            this.xSpeed *= 0.6; // Reduce x speed upon ground impact
          }
    }
}

    intersects(other) {
        // Check collision between circles
        let distance = dist(this.x, this.y, other.x, other.y);
        return distance < this.radius + other.radius;
    }

     mergeWith(otherCircle) {
        if (!this.isMerged && !otherCircle.isMerged && this.intersects(otherCircle)) {
            let combinedRadius = this.radius + otherCircle.radius;
            let distanceBetweenCenters = dist(this.x, this.y, otherCircle.x, otherCircle.y);

            if (distanceBetweenCenters <= combinedRadius / 2) {
                let newX = (this.x + otherCircle.x) / 2;
                let newY = (this.y + otherCircle.y) / 2;

                let mergedCircle = new Circle(newX, newY, combinedRadius, backgroundImage);
                droppedCircles.push(mergedCircle);
                this.isMerged = true;
                otherCircle.isMerged = true;
                this.radius = 0;
                otherCircle.radius = 0;
            }
        }
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
