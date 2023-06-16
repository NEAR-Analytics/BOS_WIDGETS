State.init({
  currentQuestion: 0,
  vote: props.vote,
  showErrorsInForm: false,
});

//TODO review this!
const getPublicationParams = () => {
  return {
    index: {
      poll_question: JSON.stringify(
        {
          key: `answer-v${props.indexVersion}`,
          value: {
            answer: props.vote,
            questionBlockHeight: props.poll.blockHeight,
          },
        },
        undefined,
        0
      ),
    },
  };
};

function clickCheckboxInputHandler(questionNumber, optionNumber) {
  return () => {
    let newVote = state.vote;

    let oldQuestionVotes = newVote[questionNumber];
    let newQuestionVotes = [];

    if (!oldQuestionVotes.includes(optionNumber + "")) {
      newQuestionVotes = oldQuestionVotes;
      newQuestionVotes.push(optionNumber + "");
    } else {
      for (let i = 0; i < oldQuestionVotes.length; i++) {
        if (oldQuestionVotes[i] != optionNumber + "") {
          newQuestionVotes.push(oldQuestionVotes[i]);
        }
      }
    }

    newVote[questionNumber] = newQuestionVotes.filter((a) => a != "");

    State.update({ votes: newVote });
  };
}

function clickRadioInputHandler(questionNumber, optionNumber) {
  return () => {
    let newVote = props.vote;

    newVote[questionNumber] = optionNumber + "";
    State.update({ vote: newVote });
  };
}

const renderMultipleChoiceInput = ({
  questionNumber,
  questionType,
  option,
  optionNumber,
}) => (
  <>
    <Widget
      src={`f2bc8abdb8ba64fe5aac9689ded9491ff0e6fdcd7a5c680b7cf364142d1789fb/widget/EasyPoll.DisplayMultiVote`}
      props={{
        vote: props.vote,
        questionNumber,
        questionType,
        option,
        optionNumber,
        canVote: props.canVote,
        getBgColor: props.getBgColor,
        countVotes: props.countVotes,
        clickRadioInputHandler: clickRadioInputHandler,
        clickCheckboxInputHandler: clickCheckboxInputHandler,
        getInputStyles: props.getInputStyles,
      }}
    />
  </>
);

const renderAnswers = (questionNumber) => {
  return (
    <Widget
      src={`${widgetOwner}/widget/EasyPoll.AnswerCommentsContainer`}
      props={{
        answers: props.validAnswersToThisPoll,
        questionNumber,
      }}
    />
  );
};

let questions = props.questions;

const ChangeQuestionContainer = styled.div`
  div {
    cursor: pointer;
    display: flex;
    aling-items: center;
  }

  div:hover {
    transform: scale(1.1);
  }
`;

console.log("CPVS: ", props.vote);
console.log("TS: ", state);

const getFirstSBTToken = () => {
  const view = Near.view("registry.i-am-human.near", "sbt_tokens_by_owner", {
    account: `${context.accountId}`,
    issuer: "fractal.i-am-human.near",
  });
  return view?.[0]?.[1]?.[0];
};

const hasSBTTokens = true || getFirstSBTToken() !== undefined;

const renderTextInput = (questionNumber) => {
  return (
    <div>
      {props.hasVoted ? (
        <div style={{ display: "grid", gridTemplateColumns: "repeat(2,1fr)" }}>
          {renderAnswers(questionNumber)}
        </div>
      ) : (
        <div>
          <textarea
            value={state.vote[questionNumber]}
            onChange={(e) => {
              let newVote = state.vote;
              newVote[questionNumber] = e.target.value;

              State.update({ vote: newVote });
            }}
            style={{ width: "100%" }}
          />
        </div>
      )}
    </div>
  );
};

return (
  <>
    {state.showVoteButton ? (
      <h4
        className="border border-top-0 rounded"
        style={{
          textDecoration: "underline",
          cursor: "pointer",
          backgroundColor: "rgb(242, 246, 250)",
        }}
        onClick={() =>
          State.update({ showVoteButton: false, currentQuestion: 0 })
        }
      >
        Change the votes
      </h4>
    ) : (
      questions.map((question, questionNumber) => {
        {
          if (questionNumber == state.currentQuestion) {
            return (
              <div
                style={{
                  border: "1.5px solid rgb(206, 212, 218)",
                  borderRadius: "24px",
                  position: "relative",
                }}
                className="p-3 my-3"
              >
                <div className="d-flex">
                  <p
                    style={{
                      backgroundColor: "#353A40",
                      padding: "0.15rem 0.65rem",
                      borderRadius: "9px",
                      color: "white",
                    }}
                  >
                    {questionNumber + 1}
                  </p>
                  <h4 style={{ fontWeight: "700", marginLeft: "0.8rem" }}>
                    {question.question}
                  </h4>
                </div>

                {!props.hasVoted &&
                (question.questionType == "0" ||
                  question.questionType == "1") ? (
                  <p className="mb-1">Select one option:</p>
                ) : !props.hasVoted && question.questionType == "2" ? (
                  <p className="mb-1">You can check multiple options:</p>
                ) : (
                  !props.hasVoted && <p className="mb-1">Write your answer:</p>
                )}
                {question.questionType != "3"
                  ? question.choicesOptions.map((option, optionNumber) => {
                      return renderMultipleChoiceInput({
                        questionNumber: questionNumber,
                        questionType: question.questionType,
                        option,
                        optionNumber,
                      });
                    })
                  : renderTextInput(questionNumber)}
              </div>
            );
          } else <></>;
        }
      })
    )}

    {questions.length > 1 && !state.showVoteButton && (
      <div className="d-flex justify-content-between">
        {state.currentQuestion > 0 ? (
          <ChangeQuestionContainer
            onClick={() => {
              props.stateUpdate({ vote: state.vote });
              State.update({ currentQuestion: state.currentQuestion - 1 });
            }}
          >
            <div>
              <i className="bi bi-arrow-left" />
              <h6 className="mx-2">Previous question</h6>
            </div>
          </ChangeQuestionContainer>
        ) : (
          <div style={{ minWidth: "1px" }}></div>
        )}
        {state.currentQuestion < questions.length - 1 ? (
          <ChangeQuestionContainer
            onClick={() => {
              props.stateUpdate({ vote: state.vote });
              State.update({ currentQuestion: state.currentQuestion + 1 });
            }}
          >
            <div>
              <h6 className="mx-2">Next question</h6>
              <i className="bi bi-arrow-right" />
            </div>
          </ChangeQuestionContainer>
        ) : (
          <ChangeQuestionContainer
            onClick={() => {
              props.stateUpdate({ vote: state.vote });
              State.update({ showVoteButton: true });
            }}
          >
            <div>
              <h6 className="mx-2">Show vote button</h6>
              <i className="bi bi-arrow-right" />
            </div>
          </ChangeQuestionContainer>
        )}
      </div>
    )}

    {state.showVoteButton ? (
      props.isQuestionOpen ? (
        props.hasVoted ? (
          ""
        ) : props.isVoteValid() && hasSBTTokens ? (
          <CommitButton
            className="w-100"
            style={
              state.hoveringElement != "voteButton"
                ? {
                    marginTop: "0.5rem",
                    padding: "0.5rem",
                    backgroundColor: "#000000",
                    color: "#FFFFFF",
                    fontSize: "1rem",
                    borderRadius: "9px",
                    border: "1.5px solid transparent",
                  }
                : {
                    marginTop: "0.5rem",
                    padding: "0.5rem",
                    backgroundColor: "#FFFFFF",
                    color: "#000000",
                    fontSize: "1rem",
                    borderRadius: "9px",
                    border: "1.5px solid #000000",
                  }
            }
            onMouseEnter={() => {
              State.update({
                hoveringElement: "voteButton",
              });
              props.stateUpdate({ vote: state.vote });
            }}
            onMouseLeave={() => State.update({ hoveringElement: "" })}
            data={getPublicationParams()}
          >
            Vote
          </CommitButton>
        ) : (
          <>
            {hasSBTTokens ? (
              <button
                className="w-100"
                style={
                  state.hoveringElement != "voteButton"
                    ? {
                        marginTop: "0.5rem",
                        padding: "0.5rem",
                        backgroundColor: "#000000",
                        color: "#FFFFFF",
                        fontSize: "1rem",
                        borderRadius: "9px",
                        border: "1.5px solid transparent",
                      }
                    : {
                        marginTop: "0.5rem",
                        padding: "0.5rem",
                        backgroundColor: "#FFFFFF",
                        color: "#000000",
                        fontSize: "1rem",
                        borderRadius: "9px",
                        border: "1.5px solid #000000",
                      }
                }
                onMouseEnter={() =>
                  State.update({ hoveringElement: "voteButton" })
                }
                onMouseLeave={() => State.update({ hoveringElement: "" })}
                onClick={() => State.update({ showErrorsInForm: true })}
              >
                Vote
              </button>
            ) : (
              <>
                <p className="p-2">
                  In order to vote get verified on{" "}
                  <a href="https://i-am-human.app">i-am-human.app</a> and get a
                  FV SBT
                </p>
              </>
            )}
            {state.showErrorsInForm && (
              <span className="text-danger">
                Please answer all the questions
              </span>
            )}
          </>
        )
      ) : (
        ""
      )
    ) : (
      ""
    )}
    <p
      style={{
        fontWeight: "500",
        fontSize: "1.1rem",
        color: "#767B8E",
        letterSpacing: "-0.02em",
        marginTop: "0.8rem",
      }}
    >
      {props.validAnswersToThisPoll.length} votes
    </p>
  </>
);
