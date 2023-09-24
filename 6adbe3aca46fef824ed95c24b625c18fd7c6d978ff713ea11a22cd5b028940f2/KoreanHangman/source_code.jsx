const style = {
  //
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
    fontSize: "5vw",
    textAlign: "center",
  },
  hangmanImageWrapper: {
    position: "relative",
    height: "50vh",
  },
  hangmanImage: {
    transform: "translate(-50%)",
    position: "absolute",
    width: "50vw",
    left: "50%",
    top: "5vw",
  },
};

console.log(props.answer);
const answer = props.answer || "ㄱㅣㅁㅅㅔㅈㅓㅇ";

const inputStates = {};
answer.split("").forEach((v, i) => {
  inputStates[`inputCharacter${i}`] = "";
});

/**
 * answer: 정답 단어
 * inputStates: inputCharacter0, ... 정답 철자 별로 상태 값 관리
 * successCount: 현재까지 맞춘 철자 수 (정답 단어 길이와 동일해질 경우 게임 성공)
 * opportunityCount: 남은 기회 수 (기본값 10번)
 * startTime: 게임 시작 타임스탬프
 * endTime: 게임 종료 타임스탬프 (성공 및 실패 시 업데이트)
 * hangmanImages: 11개의 핵맨 이미지 경로
 */
State.init({
  answer: answer,
  ...inputStates,
  successCount: 0,
  opportunityCount: 10,
  startTime: Date.now(),
  endTime: 0,
  hangmanImages: Array.from(
    { length: 11 },
    (v, i) =>
      `https://raw.githubusercontent.com/mydreamis-18/Ludium-2023-collegium-BOS-KoreanHangmanGame/main/%ED%96%89%EB%A7%A8${
        i + 1
      }.jpg`
  ),
});

const inputHandle = (e) => {
  //
  const { answer, successCount, opportunityCount } = state;
  const index = e.target.id.split("").pop();
  const isCorrect = answer[index] === e.target.value;
  const isEmpty = e.target.value === "";

  // ㅜ 빈 값 입력 시
  if (isEmpty) {
    State.update({
      [e.target.id]: e.target.value,
    });
    return;
  }

  // ㅜ 오답 입력 시
  if (!isCorrect) {
    State.update({
      [e.target.id]: e.target.value,
      opportunityCount: opportunityCount - 1,
      endTime: opportunityCount - 1 <= 0 ? Date.now() : 0,
    });
  }

  // ㅜ 정답 입력 시
  else {
    State.update({
      [e.target.id]: e.target.value,
      successCount: successCount + 1,
      endTime: successCount + 1 === answer.length ? Date.now() : 0,
    });
  }
};

return (
  <>
    <div style={{ ...style.titleFont, marginTop: "10vw" }}>
      Korean Hangman Game
    </div>
    <div style={style.titleFont}>{props.subject || "배우 이름"} 맞추기!</div>
    <div style={style.infoFont}>남은 횟수: {state.opportunityCount}</div>
    {/** ㅜ 정답 입력 칸 */}
    <div style={style.inputWrapper}>
      {Array.from({ length: state.answer.length }, (v, i) => (
        <input
          style={style.inputElement}
          disabled={
            state.opportunityCount <= 0 ||
            state[`inputCharacter${i}`] === answer[i]
          }
          onChange={inputHandle}
          id={`inputCharacter${i}`}
          maxLength={1}
          autoComplete={"off"}
        />
      ))}
    </div>
    {/** */}
    {/** ㅜ 게임 성공 시 메세지 표시 */}
    {state.successCount >= state.answer.length && (
      <>
        <div style={style.titleFont}>게임 성공!</div>
        <div style={style.infoFont}>
          기록: {(state.endTime - state.startTime) / 1000}초
        </div>
      </>
    )}
    {/** */}
    {/** ㅜ 기회 소진 시 게임 종료 및 정답 공개 */}
    {state.opportunityCount <= 0 && (
      <>
        <div style={style.infoFont}>정답 공개</div>
        <div style={style.inputWrapper}>
          {state.answer.split("").map((v, i) => (
            <input style={style.inputElement} disabled value={v} />
          ))}
        </div>
        <div style={style.titleFont}>게임 실패!</div>
        <div style={style.infoFont}>
          기록: {(state.endTime - state.startTime) / 1000}초
        </div>
      </>
    )}
    {/** */}
    <div style={style.hangmanImageWrapper}>
      <img
        style={style.hangmanImage}
        src={
          state.hangmanImages[
            state.hangmanImages.length - state.opportunityCount - 1
          ]
        }
        alt={`행맨 이미지 ${
          state.hangmanImages.length - state.opportunityCount
        }`}
      />
    </div>
  </>
);
