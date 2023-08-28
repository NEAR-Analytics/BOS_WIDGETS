//시간값 초기화
const StyledBackground = styled.div`
  background-image: url('https://ipfs.io/ipfs/QmPDwhrLSvYe678abszxWbDksanyKee5yP9qU25uP8AZrA?filename=%E1%84%86%E1%85%AE%E1%84%85%E1%85%AD%E1%84%8B%E1%85%B5%E1%84%86%E1%85%B5%E1%84%8C%E1%85%B52.avif');
  background-size: cover;
  background-position: center;
  width: 100vw;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
`;
const StyledSeparator = styled.div`
  width: 50px;
  height: 2px;
  background-color: white;
  margin: 0 10px;
`;
const StyledTime = styled.p`
  font-size: 140px;
  font-weight: bold;
  font-family: 'Arial', sans-serif;
  color: white
`;

const StyledDate = styled.p`
  font-size: 30px;
  font-family: 'Arial', sans-serif;
  color: white
`;

const StyledAmpm = styled.p`
  font-size: 40px;
  font-weight: bold;
  font-family: 'Arial', sans-serif;
  color: white;
  display:flex;
  flex-direction:column;
`;

const daysOfWeek = ["일", "월", "화", "수", "목", "금", "토"];

var currentTime = new Date();
var dayOfWeekIndex = currentTime.getDay(); // 0 (일요일)부터 6 (토요일)까지의 숫자
var dayOfWeek = daysOfWeek[dayOfWeekIndex];
var date = currentTime.getDate();
var month = currentTime.getMonth() + 1;
var year = currentTime.getFullYear();
currentTime = currentTime.toLocaleTimeString();
var notifier = currentTime.split(" ").slice(0, 1);
var cur = currentTime.split(" ").slice(1, 2);
var clock = cur.join("").split(":").slice(0, 1);
var min = cur.join("").split(":").slice(1, 2);
var second = cur.join("").split(":").slice(2);

var dateString = `${year}년 ${month}월 ${date}일, ${dayOfWeek}요일`;

State.init({
  clock: clock,
  minute: min,
  second: second,
  ampm: notifier,
  dateString,
});

const interval = setInterval(() => {
  currentTime = new Date();

  dayOfWeekIndex = currentTime.getDay(); // 0 (일요일)부터 6 (토요일)까지의 숫자
  dayOfWeek = daysOfWeek[dayOfWeekIndex];
  date = currentTime.getDate();
  month = currentTime.getMonth() + 1;
  year = currentTime.getFullYear();
  dateString = `${year}년 ${month}월 ${date}일, ${dayOfWeek}요일`;
  currentTime = currentTime.toLocaleTimeString();

  notifier = currentTime.split(" ").slice(0, 1);
  cur = currentTime.split(" ").slice(1, 2);
  clock = clock = cur.join("").split(":").slice(0, 1);
  min = min = cur.join("").split(":").slice(1, 2);
  second = cur.join("").split(":").slice(2);
  State.update({
    clock: clock,
    minute: min,
    second: second,
    ampm: notifier,
    dateString,
  });
}, 1000);

return (
  <StyledBackground>
    <div>
      <div style={{ display: "flex", alignItems: "center" }}>
        <StyledTime>
          {state.clock < 10 ? "0" + state.clock : state.clock}:{state.minute}
        </StyledTime>
        <StyledAmpm>
          <div>{state.ampm}</div>
          <StyledSeparator /> {/* 구분선 추가 */}
          <div>{state.second}</div>
        </StyledAmpm>
      </div>
      <StyledDate>{state.dateString}</StyledDate>
    </div>
  </StyledBackground>
);
