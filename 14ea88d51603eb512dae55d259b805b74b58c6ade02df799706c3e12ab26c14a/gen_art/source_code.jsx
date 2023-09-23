const srcData = `

<style>
</style>

<script src="https://cdnjs.cloudflare.com/ajax/libs/p5.js/1.4.0/p5.js"></script>

<script>
function setup() {
      createCanvas(1000, 1000); // 캔버스 크기 설정
      background(220); // 배경색 설정
    }


function draw() {
  // 랜덤한 색상 생성
  let r = map(sin(frameCount * 0.05), -1, 1, 0, 255); // 빨간색 성분
  let g = map(cos(frameCount * 0.05), -1, 1, 0, 255); // 초록색 성분
  let b = map(sin(frameCount * 0.03), -1, 1, 0, 255); // 파란색 성분
  fill(r, g, b); // 랜덤한 색상 설정

  // 랜덤한 위치 생성
  let x = random(width);
  let y = random(height);
  let size = random(width/10);
  
  ellipse(x, y, size, size); // 원 그리기
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
