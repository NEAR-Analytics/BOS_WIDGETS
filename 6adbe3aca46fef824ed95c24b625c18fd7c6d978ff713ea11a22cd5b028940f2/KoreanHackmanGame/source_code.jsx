const style = {
  titleFont: {
    margin: "10vw",
    fontSize: "10vw",
    fontWeight: "900",
    textAlign: "center",
  },
  startButton: {
    transform: "translate(-50%, -50%)",
    position: "absolute",
    left: "50%",
    top: "50vh",
  },
};

const developerAccountId =
  "6adbe3aca46fef824ed95c24b625c18fd7c6d978ff713ea11a22cd5b028940f2";

const database = ["ㄱㅣㅁㅅㅔㅈㅓㅇ", "ㅅㅓㅎㅕㄴㅈㅣㄴ"];
const randomIndex = Math.floor(Math.random() * database.length);
const answer = database[randomIndex];

State.init({
  answer,
  isStart: false,
});

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
        props={{ answer: state.answer }}
      />
    )}
  </>
);
