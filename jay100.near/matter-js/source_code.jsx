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
      createCanvas(windowWidth, windowHeight);
      groundY = height - 50; // Ground position
    }

    function draw() {
       background(220);

      for (let i = 0; i < circles.length; i++) {
        circles[i].display();
        circles[i].fall();

      if (circles[i].isFalling) {
          circles[i].checkCollision(i);
        }
      }
    }

    function mouseClicked() {
    let newCircle = new Circle(mouseX, mouseY);
      circles.push(newCircle);
    }
   
     class Circle {
      constructor(x, y) {
        this.x = x;
        this.y = y;
        this.radius = 25;
        this.speed = 6;
        this.isFalling = true;
      }

      display() {
        fill(255, 0, 0);
        ellipse(this.x, this.y, this.radius * 2);
      }

      fall() {
        if (this.isFalling) {
          this.y += this.speed;
        } else {
          let spaceBelow = true;
          for (let j = 0; j < circles.length; j++) {
            if (this !== circles[j] && this.intersects(circles[j]) && this.y < circles[j].y) {
              spaceBelow = false;
              break;
            }
          }
          if (spaceBelow && this.y + this.radius < groundY) {
            this.y += this.speed;
          }
        }
        if (this.y + this.radius >= groundY) {
          this.stopFalling();
        }
      }

        checkCollision(index) {
        for (let j = 0; j < circles.length; j++) {
          if (index !== j && circles[index].intersects(circles[j])) {
            this.stopFalling();
            circles[j].stopFalling();
            break;
          }
        }

        if (this.y + this.radius >= groundY) {
          this.stopFalling();
        }
      }

      intersects(other) {
        let distance = dist(this.x, this.y, other.x, other.y);
        return distance < this.radius + other.radius;
      }

      stopFalling() {
        this.isFalling = false;
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
