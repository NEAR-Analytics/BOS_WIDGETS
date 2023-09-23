const score = 100;

State.init({
  score: score,
  message: message,
});

const data = {
  scoreboard: {
    score: state.score,
    message: state.message,
  },
};

console.log(state.message, "dsdf");

return (
  <>
    <div>당신의 점수는 {state.score}점입니다!</div>
    <input
      placeholder="남기고 싶은 메세지를 입력하세요!"
      onChange={(e) => State.update({ message: e.target.value })}
    />
    <CommitButton data={data}>기록 저장하기</CommitButton>
  </>
);
