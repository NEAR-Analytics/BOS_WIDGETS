const style = {
  titleFont: {
    margin: "10vw",
    fontSize: "10vw",
    fontWeight: "900",
    textAlign: "center",
  },
  startButton: {
    transform: "translate(-50%)",
    position: "absolute",
    left: "50%",
    top: "60vw",
  },
};

const developerAccountId =
  "6adbe3aca46fef824ed95c24b625c18fd7c6d978ff713ea11a22cd5b028940f2";

function getAnswer() {
  //
  const defaultDb = ["ㄱㅣㅁㅅㅔㅈㅓㅇ", "ㅅㅓㅎㅕㄴㅈㅣㄴ"];
  
  const res = fetch(
    "https://raw.githubusercontent.com/mydreamis-18/Ludium-2023-collegium-BOS-KoreanHackmanGame/main/%EB%B0%B0%EC%9A%B0%20%EC%9D%B4%EB%A6%84.csv"
  );

  const db = res.body.split(",") || defaultDb;

  const randomIndex = Math.floor(Math.random() * db.length);

  return db[randomIndex];
}

/**
 * answer: db 배열에서 랜덤 인덱스로 뽑은 정답 단어
 * subject: db 단어의 주제
 * isStart: 게임 시작 여부 (버튼과 연동)
 */
State.init({
  answer: getAnswer(),
  subject: "배우 이름",
  isStart: false,
});

// console.log(state.answer);

const startGame = () => {
  State.update({
    isStart: true,
  });
};

return (
  <>
    {!state.isStart && (
      <>
        <div style={style.titleFont}>
          Korean
          <br />
          Hackman
          <br />
          Game
        </div>
        <button style={style.startButton} onClick={startGame}>
          게임 시작
        </button>
      </>
    )}
    {state.isStart && (
      <Widget
        src={`${developerAccountId}/widget/KoreanHackman`}
        props={{ answer: state.answer, subject }}
      />
    )}
  </>
);
