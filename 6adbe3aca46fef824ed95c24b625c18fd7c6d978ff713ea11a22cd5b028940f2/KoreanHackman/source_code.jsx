const style = {
  titleFont: {
    margin: "1vw",
    fontSize: "5vw",
    fontWeight: "900",
    textAlign: "center",
  },
  infoFont: {
    fontSize: "3vw",
    fontWeight: "900",
    textAlign: "center",
  },
  inputWrapper: {
    display: "flex",
    marginBottom: "3vw",
    flexDirection: "row",
    justifyContent: "center",
  },
  inputElement: {
    width: "10vw",
    height: "10vw",
  },
};

const database = ["ㄱㅣㅁㅅㅔㅈㅓㅇ", "ㅅㅓㅎㅕㄴㅈㅣㄴ"];
const randomIndex = Math.floor(Math.random() * database.length);
// const answer = database[randomIndex];
const answer = "ㄱㅣㅁㅅㅔㅈㅓㅇ";

const inputStates = {};
answer.split("").forEach((v, i) => {
  inputStates[`inputCharacter${i}`] = "";
});

/**
 * answer: 정답 단어
 * inputStates: inputCharacter0, ... 정답 철자 별로 상태 값 관리
 * successCount: 현재까지 맞춘 철자 수
 * opportunityCount: 남은 기회 수
 */
State.init({
  answer,
  ...inputStates,
  successCount: 0,
  opportunityCount: 10,
});

const inputHandle = (e) => {
  //
  const index = e.target.id.split("").pop();
  const isCorrect = answer[index] === e.target.value;
  const isEmpty = e.target.value === "";

  if (!isEmpty && !isCorrect) {
    State.update({
      opportunityCount: state.opportunityCount - 1,
    });
  }

  State.update({
    [e.target.id]: e.target.value,
    successCount: state.successCount + 1,
  });
};

console.log(state);

return (
  <>
    <div style={style.titleFont}>배우의 이름을 맞춰주세요!</div>
    <div style={style.infoFont}>남은 횟수: {state.opportunityCount}</div>
    <div style={style.inputWrapper}>
      {state.answer.split("").map((v, i) => (
        <input
          style={style.inputElement}
          disabled={
            state.opportunityCount <= 0 ||
            state[`inputCharacter${i}`] === answer[i]
          }
          onChange={inputHandle}
          id={`inputCharacter${i}`}
        />
      ))}
    </div>
    {/** ㅜ 게임 성공 시 메세지 표시 */}
    {state.successCount >= state.answer.length && (
      <div style={style.titleFont}>게임 성공!</div>
    )}
    {/** */}
    {/** ㅜ 기회 소진 시 게임 종료 및 정답 공개 */}
    {state.opportunityCount <= 0 && (
      <>
        <div style={style.infoFont}>정답</div>
        <div style={style.inputWrapper}>
          {state.answer.split("").map((v, i) => (
            <input style={style.inputElement} disabled value={v} />
          ))}
        </div>
      </>
    )}
    {/** */}
  </>
);
