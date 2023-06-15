State.init({ currentQuestion: 0, vote: props.state.vote });

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
          {props.renderAnswers(questionNumber)}
        </div>
      ) : (
        <div>
          <textarea
            value={props.state.vote[questionNumber]}
            onChange={(e) => {
              let newVote = props.state.vote;
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
    {props.poll.value.questions.map((question, questionNumber) => {
      {
        questionNumber == state.currentQuestion && (
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
            (question.questionType == "0" || question.questionType == "1") ? (
              <p className="mb-1">Select one option:</p>
            ) : !props.hasVoted && question.questionType == "2" ? (
              <p className="mb-1">You can check multiple options:</p>
            ) : (
              !props.hasVoted && <p className="mb-1">Write your answer:</p>
            )}
            {question.questionType != "3"
              ? question.choicesOptions.map((option, optionNumber) => {
                  return props.renderMultipleChoiceInput({
                    questionNumber: questionNumber,
                    questionType: question.questionType,
                    option,
                    optionNumber,
                  });
                })
              : renderTextInput(questionNumber)}
          </div>
        );
      }
    })}

    {props.poll.value.questions.length > 1 && (
      <div className="d-flex justify-content-between">
        {state.currentQuestion > 0 ? (
          <div
            className="d-flex aling-items-center"
            style={{ cursor: "pointer" }}
            onClick={() => {
              stateUpdate({ vote: state.vote });
              State.update({ currentQuestion: state.currentQuestion - 1 });
            }}
          >
            <i className="bi bi-arrow-left" />
            <h6 className="mx-2">Previous question</h6>
          </div>
        ) : (
          <div style={{ minWidth: "1px" }}></div>
        )}
        {state.currentQuestion < props.poll.value.questions.length ? (
          <div
            className="d-flex aling-items-center"
            style={{ cursor: "pointer" }}
            onClick={() => {
              stateUpdate({ vote: state.vote });
              State.update({ currentQuestion: state.currentQuestion + 1 });
            }}
          >
            <h6 className="mx-2">Next question</h6>
            <i className="bi bi-arrow-right" />
          </div>
        ) : (
          <div style={{ minWidth: "1px" }}></div>
        )}
      </div>
    )}

    {props.isQuestionOpen ? (
      props.hasVoted ? (
        ""
      ) : props.isVoteValid() && hasSBTTokens ? (
        <CommitButton
          className="w-100"
          style={
            props.state.hoveringElement != "voteButton"
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
            props.stateUpdate({ hoveringElement: "voteButton" })
          }
          onMouseLeave={() => props.stateUpdate({ hoveringElement: "" })}
          data={props.getPublicationParams()}
        >
          Vote
        </CommitButton>
      ) : (
        <>
          {hasSBTTokens ? (
            <button
              className="w-100"
              style={
                props.state.hoveringElement != "voteButton"
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
                props.stateUpdate({ hoveringElement: "voteButton" })
              }
              onMouseLeave={() => props.stateUpdate({ hoveringElement: "" })}
              onClick={() => props.stateUpdate({ showErrorsInForm: true })}
            >
              Vote
            </button>
          ) : (
            <>
              <p className="p-2">
                In order to vote get verified on{" "}
                <a href="https://i-am-human.app">i-am-human.app</a> and get a FV
                SBT
              </p>
            </>
          )}
          {props.state.showErrorsInForm && (
            <span className="text-danger">Please answer all the questions</span>
          )}
        </>
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
