const indexVersion = props.indexVersion ?? "3.2.0";
const poll = props.poll;
const showVoteButton = props.showVoteButton ?? true;

State.init({
  answers: {},
  alreadyVoted: undefined,
});

function isActive(poll) {
  return (
    poll.value.startTimestamp < Date.now() &&
    Date.now() < poll.value.endTimestamp
  );
}

function isUpcoming(poll) {
  return poll.value.startTimestamp > Date.now();
}

function getValidAnswersQtyFromQuestion(questionBlockHeight) {
  const answers = Social.index("poll_question", `answer-v${indexVersion}`);
  console.log(answers, indexVersion);

  if (JSON.stringify(answers) != JSON.stringify(state.answers)) {
    State.update({ answers: answers });
  }

  if (!answers) {
    return "Loading";
  }
  const answersFromThisQuestion = answers.filter(
    (a) => a.value.pollBlockHeight == questionBlockHeight
  );
  const usersWithAnswers = answersFromThisQuestion.map((a) => a.accountId);

  State.update({
    alreadyVoted:
      context.accountId && usersWithAnswers.includes(context.accountId),
  });

  console.log(answersFromThisQuestion, questionBlockHeight);

  return answersFromThisQuestion.length;
}

const Label = styled.div`
  font-size: 13px;
  font-weight: 500;
  color: #000;
  background-color: #ebedee;
  padding: 4px 10px;
  border-radius: 6px;
  margin-top: auto;
  margin-bottom: auto;
`;

const VoteButton = styled.button`
  font-size: 15px;
  font-weight: 600;
  padding: 6px 18px;
  border-radius: 6px;
  border: none;
  transition: 200ms ease;
  width: 100%;

  @media screen and (min-width: 769px) {
    width: auto;
  }

  i {
    margin-right: 4px;
  }

  ${({ voted, view }) => {
    if (voted) {
      return `
        color: #239F28;
        background-color: #ddefeb;
        `;
    }
    if (view) {
      return `
        color: #000;
        background-color: #ffd50d;
        `;
    }
    return `
    color: #fff;
    background-color: #4f46e5;
    background: linear-gradient(90deg, #9333ea 0%, #4f46e5 100%);
    :hover {
        background: linear-gradient(90deg, #792ac0 0%, #423abd 100%);
    }
    :active {
        background: linear-gradient(90deg, #5d2193 0%, #2f2a87 100%);
    }
    `;
  }}
`;

return (
  <div className="d-flex gap-3 flex-wrap">
    <Label>{getValidAnswersQtyFromQuestion(poll.blockHeight)} votes</Label>
    <Label>
      {Date.now() < poll.value.startTimestamp ||
      (Date.now() > poll.value.startTimestamp &&
        Date.now() < poll.value.endTimestamp) ? (
        <span>Ends in</span>
      ) : (
        <span>Ended</span>
      )}
      <Widget
        src={`silkking.near/widget/timeAgo`}
        props={{
          reduced: true,
          timeInFuture: poll.value.endTimestamp,
        }}
      />
    </Label>
    <Label
      style={{
        backgroundColor: isUpcoming(poll)
          ? "#FFF3B4"
          : isActive(poll)
          ? "#D9FCEF"
          : "#FFE5E5",
        color: isUpcoming(poll)
          ? "#FFC905"
          : isActive(poll)
          ? "#00B37D"
          : "#FF4747",
      }}
    >
      {isUpcoming(poll) ? "Upcoming" : isActive(poll) ? "Active" : "Closed"}
    </Label>

    {!showVoteButton ? null : isUpcoming(poll) || !isActive(poll) ? (
      <VoteButton className="ms-auto" view={true}>
        <i className="bi bi-eye-fill"></i>
        View
      </VoteButton>
    ) : state.alreadyVoted === true ? (
      <VoteButton className="ms-auto" voted={true}>
        <i className="bi bi-check-lg"></i>
        Voted
      </VoteButton>
    ) : state.alreadyVoted === false ? (
      <VoteButton className="ms-auto">
        <i className="bi bi-ui-checks-grid"></i>
        Vote
      </VoteButton>
    ) : null}
  </div>
);
