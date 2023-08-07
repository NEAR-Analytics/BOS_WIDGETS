const src = `
  <script src="https://cdnjs.cloudflare.com/ajax/libs/p5.js/1.7.0/p5.js"></script>

<script>
let lastMouseX;
let lastMouseY;
let lineColor;

function setup() {
  createCanvas(800, 600);
  background(240);

  // Initial mouse position
  lastMouseX = mouseX;
  lastMouseY = mouseY;

  // Set the initial color
  lineColor = color(random(255), random(255), random(255));
}

function draw() {
  let speed = dist(mouseX, mouseY, lastMouseX, lastMouseY);

  // Determine the stroke weight based on speed
  let weight = map(speed, 0, 50, 2, 20);
  weight = constrain(weight, 2, 20);

  // Change the line color based on speed
  if (speed > 30) {
    lineColor = color(random(255), random(255), random(255));
  }

  stroke(lineColor);
  strokeWeight(weight);

  // Draw the line
  line(mouseX, mouseY, lastMouseX, lastMouseY);

  // Update the last mouse position
  lastMouseX = mouseX;
  lastMouseY = mouseY;
}

function mousePressed() {
  // Reset the canvas
  background(240);
}
  </script>

`;

return (
  <>
    <iframe srcDoc={src} />
  </>
);
