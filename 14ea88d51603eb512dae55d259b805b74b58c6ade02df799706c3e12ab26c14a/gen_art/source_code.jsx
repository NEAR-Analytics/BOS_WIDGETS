const srcData = `

<style>
</style>

<script src="https://cdnjs.cloudflare.com/ajax/libs/p5.js/1.4.0/p5.js"></script>

 <script src="https://cdn.rawgit.com/generative-light/p5.scribble.js/master/p5.scribble.js"></script>

<script>
function setup() {
      createCanvas(1000, 1000); // 캔버스 크기 설정
      strokeWeight(1); // 선의 두께 설정
      background(240); // 배경색 설정
    }


function draw() {
  // 랜덤한 색상 생성
  let r = random(255); // 빨간색 성분
  let g = random(255); // 초록색 성분
  let b = random(255); // 파란색 성분
  stroke(r, g, b);
  // 랜덤한 위치 생성
  let x = random(width);
  let y = random(height);
  let size = random(width/10);
  var scribble       = new Scribble();
        scribble.bowing    = 0.1;

 // scribble.scribbleEllipse( x, y, size, size );
let numPoints = 40; // 효과 선분의 개수
  let angleIncrement = TWO_PI / numPoints;
  let radius = size / 2 + 10; // 원의 반지름 + 여백

  let xCoords = [];
  let yCoords = [];

  for (let i = 0; i < numPoints; i++) {
    let angle = i * angleIncrement;
    let xPos = x + cos(angle) * radius;
    let yPos = y + sin(angle) * radius;
    xCoords.push(xPos);
    yCoords.push(yPos);
  }
  var gap = 2.1;
          // the angle of the hachure in degrees
  let angle = random(90);
  scribble.scribbleFilling( xCoords, yCoords, gap, angle );
  
  
}

</script>
`;

return (
  <>
    <iframe
      srcDoc={srcData}
      style={{
        height: "100vh",
        width: "100%",
      }}
    />
  </>
);
