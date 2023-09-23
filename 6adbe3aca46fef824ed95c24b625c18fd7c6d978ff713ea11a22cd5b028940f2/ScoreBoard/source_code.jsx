const score = 100;
const timestamp = Date.now();

State.init({
  score: score,
  message: message,
  timestamp: timestamp,
});

const data = {
  // ㅜ Social.getr(`${accountId}/scoreboard_gaenchanaa/timestamp`)로 조회할 예정
  scoreboard_gaenchanaa: {
    [timestamp]: {
      score: state.score,
      message: state.message,
    },
  },
  // ㅜ Social.index("scoreboard_gaenchanaa", "timestamp")로 검색할 예정 ?
  index: {
    scoreboard_gaenchanaa: {
      timestamp: "test",
    },
  },
};

// ㅜ 로그인한 지갑 주소
const myAccountId = context.accountId;
console.log(myAccountId);

// ㅜ { widget, index, profile, post, scoreboard }
// ㅜ myAccountData와 myAccountData2는 동일
const myAccountData = Social.get(`${context.accountId}/**`);
console.log(myAccountData);

const myAccountData2 = Social.getr(`${context.accountId}`);
console.log(myAccountData2);

// ㅜ myScoreboardData와 myScoreboardData2는 동일
const myScoreboardData = Social.get(
  `${context.accountId}/scoreboard_gaenchanaa/**`
);
console.log(myScoreboardData);

const myScoreboardData2 = Social.getr(
  `${context.accountId}/scoreboard_gaenchanaa`
);
console.log(myScoreboardData2);
// ㅗㅗㅗㅗㅗㅗㅗㅗㅗㅗㅗㅗㅗㅗㅗㅗㅗㅗㅗ

const scoreboardIndex = Social.index("scoreboard_gaenchanaa", "timestamp", {
  order: "desc",
});
console.log(scoreboardIndex);

const myIndexData = Social.get(
  `${context.accountId}/index/scoreboard_gaenchanaa/timestamp`
);
console.log(myIndexData);

// // ㅜ 22개의 데이터
// const collegiumPostIndex = Social.index("collegium.post", "main", {
//   order: "desc",
// });
// console.log(collegiumPostIndex);

// // ㅜ 23711개의 데이터
// const tosAcceptIndex = Social.index("tosAccept", "adminalpha.near/widget/TosContent", {
//   order: "desc",
// });
// console.log(tosAcceptIndex);

// // ㅜ 24698개의 데이터
// const postIndex = Social.index("post", "main", {
//   order: "desc",
// });
// console.log(postIndex);

return (
  <>
    <div>당신의 점수는 {state.score}점입니다!</div>
    <input
      placeholder="남기고 싶은 메세지를 입력하세요!"
      onChange={(e) => State.update({ message: e.target.value })}
    />
    <CommitButton force data={data}>
      기록 저장하기
    </CommitButton>
  </>
);
