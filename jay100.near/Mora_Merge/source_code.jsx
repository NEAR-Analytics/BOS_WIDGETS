const gameImgArr = [
  "https://upload.wikimedia.org/wikipedia/en/d/d0/Dogecoin_Logo.png",
  "https://cdn.iconscout.com/icon/free/png-256/free-ethereum-8-645838.png",
  "https://icons.iconarchive.com/icons/cjdowner/cryptocurrency-flat/512/Tether-USDT-icon.png",
  "https://cdn-icons-png.flaticon.com/512/6001/6001527.png",
  "https://upload.wikimedia.org/wikipedia/commons/thumb/5/58/Bitcoin_Cash.png/600px-Bitcoin_Cash.png?20210403103340",
];

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
    overflow: hidden;
   }

</style>
<body>
</body>
<script src="https://cdnjs.cloudflare.com/ajax/libs/p5.js/1.9.0/p5.js" integrity="sha512-2r+xZ/Dm8+HI0I8dsj1Jlfchv4O3DGfWbqRalmSGtgdbVQrZyGRqHp9ek8GKk1x8w01JsmDZRrJZ4DzgXkAU+g==" crossorigin="anonymous" referrerpolicy="no-referrer"></script>
<script>

let circleOptions = [];
let droppedCircles = [];
let groundY;
let hoveredCircle = null;
let gameStarted = false;
const sizes = [10, 20, 40, 80, 100];
let gameScore = 0;
let canDropCircle = true;
let allCircles = [];
let timer = 100;
let timerInterval;
let backgroundImage; // Declare a variable to hold the image
let bestScore = 0;

let imgArr = ['https://upload.wikimedia.org/wikipedia/en/d/d0/Dogecoin_Logo.png','https://cdn.iconscout.com/icon/free/png-256/free-ethereum-8-645838.png', 'https://cdn-icons-png.flaticon.com/512/6001/6001566.png', 'https://cdn-icons-png.flaticon.com/512/6001/6001527.png', 'https://upload.wikimedia.org/wikipedia/commons/thumb/5/58/Bitcoin_Cash.png/600px-Bitcoin_Cash.png?20210403103340']

function preload() {
  for (let i = 0; i < imgArr.length; i++) {
        const img = loadImage(imgArr[i]);
        const circleSize = sizes[i];
        const circle = new Circle(0, 0, circleSize, img, imgArr[i]);
        circleOptions.push(circle); // Add the circle to the options array
    }
}

function resetGame() {
    timer = 100;
    gameScore = 0;
    canDropCircle = true;
    allCircles = [];
    droppedCircles = [];
    gameStarted = false;
}

function setup() {
    createCanvas(350, windowHeight);
    groundY = height - 5; // Ground position
    timerInterval = setInterval(() => {
        if (timer > 0) {
            timer--;
        } else {
            // If the timer reaches 0, stop the timer and prevent circle dropping
            if(gameScore > bestScore){
                bestScore = gameScore;
            }
            clearInterval(timerInterval);
            canDropCircle = false;
            resetGame();
        }
    }, 1000); // Update the timer every second (1000 milliseconds)
}

function draw() {
    background(220);

    textFont("VT323");

    if(!gameStarted){
        textSize(32);
        textAlign(CENTER, CENTER);
        text("Click to Start", width / 2, height / 2);
        text("Best Score: " + bestScore, width / 2, height / 3);
    } else {

    textSize(30);
    fill(0);
    text("Time: " + timer, 290, 20);

    textSize(30);
    fill(0, 0, 0);
    text("Score: " + gameScore, 60, 20);

    if (hoveredCircle) {
        hoveredCircle.x = mouseX;
        hoveredCircle.y = 45; // Adjust the y position as needed
        image(hoveredCircle.texture, hoveredCircle.x - hoveredCircle.radius, hoveredCircle.y - hoveredCircle.radius, hoveredCircle.radius * 2, hoveredCircle.radius * 2);
    }

    for (let i = 0; i < droppedCircles.length; i++) {
        droppedCircles[i].spawn();
        droppedCircles[i].fall();
        droppedCircles[i].checkBounds();

        for (let j = i + 1; j < droppedCircles.length; j++) {
            droppedCircles[i].checkCircleCollision(droppedCircles[j]);
        }
    }
    }
 
}

function mouseClicked() {
     if (!gameStarted) {
        // Transition to the game screen upon clicking
        gameStarted = true;
        timer = 100; // Reset the timer when the game starts
        canDropCircle = true; // Reset circle dropping ability
        droppedCircles = []; // Clear dropped circles

          clearInterval(timerInterval);

        // Start a new timer interval
        timerInterval = setInterval(() => {
            if (timer > 0) {
                timer--;
            } else {
                // If the timer reaches 0, stop the timer and prevent circle dropping
                if(gameScore > bestScore){
                    bestScore = gameScore;
                }
                clearInterval(timerInterval);
                canDropCircle = false;
                resetGame();
            }
        }, 1000); 
    }

    if (canDropCircle && timer > 0) {

        if (!hoveredCircle) {
            const pos = Math.floor(Math.random() * 2);
            hoveredCircle = circleOptions[pos];
            hoveredCircle.x = mouseX;
            hoveredCircle.y = 45;
        } else {
            let newDroppedCircle = new Circle(hoveredCircle.x, hoveredCircle.y, hoveredCircle.radius, hoveredCircle.texture, hoveredCircle.imageUrl);

            droppedCircles.push(newDroppedCircle); // Add the new dropped circle
            allCircles.push(newDroppedCircle);
            hoveredCircle = null; // Reset hoveredCircle

            canDropCircle = false; // Prevent dropping a new circle immediately
            setTimeout(() => {
                const newPos = Math.floor(Math.random() * 2);
                hoveredCircle = circleOptions[newPos];
                hoveredCircle.x = mouseX;
                hoveredCircle.y = 45;
                canDropCircle = true; // Allow dropping a new circle after the delay
            }, 250); // Adjust the delay duration in milliseconds (here, it's 1 second)
        }
    }
}

class Circle {
    constructor(x, y, radius, img, imgUrl) {
        this.x = x;
        this.y = y;
        this.radius = radius;
        this.speed = 6;
        this.isFalling = true;
        this.xSpeed = random(-0.05, 0.05); // Initial random horizontal speed
        this.ySpeed = 5;
        this.texture = img; // Use the image as texture
        this.imageUrl = imgUrl;
        this.isMerged = false; // Track whether the circle is merged or not
    }

    spawn() {
       if (this.texture) {
        image(this.texture, this.x - this.radius, this.y - this.radius, this.radius * 2, this.radius * 2);
    } else {
        // Optionally, draw something else or just the circle without an image
        ellipse(this.x, this.y, this.radius * 2);
      }
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

    checkBounds() {
        if (this.x - this.radius < 0 || this.x + this.radius > width) {
          this.x = constrain(this.x, this.radius, width - this.radius);
        }
        if (this.y - this.radius < 0 || this.y + this.radius > height) {
          this.y = constrain(this.y, this.radius, height - this.radius);
        }
      }


    checkCircleCollision(otherCircle) {
        let dx = this.x - otherCircle.x;
        let dy = this.y - otherCircle.y;
        let distanceSquared = dx * dx + dy * dy;
        let minDistanceSquared = (this.radius + otherCircle.radius) * (this.radius + otherCircle.radius);

        if (distanceSquared <= minDistanceSquared) {
            let radiusDifference = abs(this.radius - otherCircle.radius);
            let mergeThreshold = 3; // Set your threshold for merging circles

            // Check conditions for merging circles
            if (this.imageUrl === otherCircle.imageUrl && radiusDifference <= mergeThreshold) {
                // Merge circles if they touch and have similar radius
                let newRadius = this.radius + otherCircle.radius;

                // Increment game score based on the merged circle radius
                if (newRadius === 20) {
                    gameScore += 2;
                    let newCircleOption = circleOptions.filter(circle => circle.radius === newRadius);
                    this.texture = newCircleOption[0].texture;
                    this.radius = newCircleOption[0].radius;
                    this.imageUrl = newCircleOption[0].imageUrl;
                    otherCircle.removeFromArrays();
                } else if (newRadius === 40) {
                    gameScore += 4;
                    let newCircleOption = circleOptions.filter(circle => circle.radius === newRadius);
                    this.texture = newCircleOption[0].texture;
                    this.radius = newCircleOption[0].radius;
                    this.imageUrl = newCircleOption[0].imageUrl;
                    otherCircle.removeFromArrays();
                } else if (newRadius === 80) {
                    gameScore += 8;
                     let newCircleOption = circleOptions.filter(circle => circle.radius === newRadius);
                    this.texture = newCircleOption[0].texture;
                    this.radius = newCircleOption[0].radius;
                    this.imageUrl = newCircleOption[0].imageUrl;
                    otherCircle.removeFromArrays();
                }

                // Create a new merged circle if the radius exceeds a certain threshold
                if (newRadius == 160) {
                    gameScore += 16;
                    let newCircleOption = circleOptions.filter(circle => circle.radius === 100);
                    this.texture = newCircleOption[0].texture;
                    this.radius = newCircleOption[0].radius;
                    this.imageUrl = newCircleOption[0].imageUrl;
                    otherCircle.removeFromArrays();
                    
                }

                if(newRadius > 160){
                  gameScore += 32;
                    let mergedCircle = new Circle(this.x, this.y, newRadius, this.texture, this.imageUrl);
                    allCircles = allCircles.filter(circle => circle !== this && circle !== otherCircle);
                    allCircles.push(mergedCircle);
                    this.removeFromArrays();
                    otherCircle.removeFromArrays();
                }


            } else {
                // Resolve collision as a bounce
                this.resolveCollision(otherCircle);
            }
        }
    }

    removeFromArrays() {
        // Remove this circle from both arrays
        const droppedIndex = droppedCircles.indexOf(this);
        if (droppedIndex !== -1) {
            droppedCircles.splice(droppedIndex, 1);
        }

        const allIndex = allCircles.indexOf(this);
        if (allIndex !== -1) {
            allCircles.splice(allIndex, 1);
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
      style={{
        width: "100%",
        height: "85%",
        display: "flex",
        flexDirection: "column",
      }}
      className="mx-3"
    >
      {" "}
      <iframe className="w-100 h-100" srcDoc={code} />
    </div>
  );
};

return (
  <div
    style={{
      height: "100vh",
      display: "flex",
      alignItems: "center",
      justifyContent: "space-evenly",
      flexDirection: "column",
      margin: "auto",
    }}
    className="w-100"
  >
    <Game_Box />
    <div
      style={{
        width: "100%",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-evenly",
        alignItems: "center",
      }}
    >
      <h1>Mora Merge</h1>
      <span>
        <img src={gameImgArr[0]} style={{ width: "30px" }} /> {">"}{" "}
        <img src={gameImgArr[1]} style={{ width: "30px" }} /> {">"}{" "}
        <img src={gameImgArr[2]} style={{ width: "30px" }} /> {">"}{" "}
        <img src={gameImgArr[3]} style={{ width: "30px" }} /> {">"}{" "}
        <img src={gameImgArr[4]} style={{ width: "30px" }} />{" "}
      </span>
      <p>
        Mora Merge, is a Tetris like game inspired by the popular Suika Game aka
        Watermelon Game. Players must stack and combine the various coins before
        the time runs out, Coins of the same kind can combine and become larger
        coins, which increase the player's score.
      </p>
    </div>
  </div>
);
