const srcData = `

<style>


</style>


<script src="https://cdnjs.cloudflare.com/ajax/libs/p5.js/1.4.0/p5.js"></script>

<script>
function setup() {
      createCanvas(1200, 1200); // 캔버스 크기 설정
      background(220); // 배경색 설정
    }


function draw() {
  // 랜덤한 색상 생성
  let r = random(255);
  let g = random(255);
  let b = random(255);
  fill(r, g, b); // 랜덤한 색상 설정

  // 랜덤한 위치 생성
  let x = random(width);
  let y = random(height);
  
  ellipse(x, y, 100, 100); // 원 그리기
}

</script>
`;

return (
  <>
    <iframe
      srcDoc={srcData}
      style={{
        height: "1200vh",
        width: "100%",
      }}
    />
  </>
);
