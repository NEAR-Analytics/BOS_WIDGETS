State.init({
  profile: {},
  showQuestionsByThisUser: false,
  pollsByThisCreator: [{}],
  polls: [{}],
  poll: {},
});

const polls =
  !props.previewInfo &&
  Social.index("poll_question", `question-v${indexVersion}`);
if (JSON.stringify(polls) != JSON.stringify(state.polls)) {
  State.update({ polls: polls });
}

if (!state.polls) {
  return "Loading";
} else {
  const poll =
    props.previewInfo ??
    state.polls.find((q) => q.blockHeight == questionBlockHeight);

  if (JSON.stringify(poll) != JSON.stringify(state.poll)) {
    State.update({ poll: poll });
  }

  if (!state.poll && !isPreview) {
    return "Loading... ";
  }
}

let pollsByThisCreator = Social.index(
  "poll_question",
  `question-v${indexVersion}`,
  {
    accountId: state.poll.accountId,
  }
);

if (
  JSON.stringify(pollsByThisCreator) != JSON.stringify(state.pollsByThisCreator)
) {
  State.update({ pollsByThisCreator: pollsByThisCreator });
}

if (!state.pollsByThisCreator) {
  return "Loading";
}

let profile = Social.getr(`${state.poll.accountId}/profile`);

if (JSON.stringify(profile) != JSON.stringify(state.profile)) {
  State.update({ profile: profile });
}

// if (!profile) {
//   return "Loading";
// }

let canOperate = props.canOperate;

function showDescription(description) {
  if (state.descriptionHeightLimited && description.length > 501) {
    return description.slice(0, 500) + "...";
  } else {
    return description;
  }
}

const renderPollTypeIcon = () => {
  let allPollTypes = [];
  for (let i = 0; i < poll.value.questions.length; i++) {
    if (!allPollTypes.includes(poll.value.questions[i].questionType)) {
      allPollTypes.push(poll.value.questions[i].questionType);
    }
  }

  return allPollTypes.length == 1 &&
    (allPollTypes[0] == "0" || allPollTypes[0] == "1") ? (
    <i className="bi bi-pie-chart" style={{ padding: "0.6rem 0.8rem" }}></i>
  ) : allPollTypes.length == 1 && allPollTypes[0] == "2" ? (
    <i
      style={{
        transform: "rotate(90deg)",
        padding: "0.6rem 0.8rem",
      }}
      className="bi bi-bar-chart-line"
    ></i>
  ) : allPollTypes.length == 1 && allPollTypes[0] == "3" ? (
    <i className="bi bi-file-text" style={{ padding: "0.6rem 0.8rem" }}></i>
  ) : (
    <i className="bi bi-collection" style={{ padding: "0.6rem 0.8rem" }}></i>
  );
};

const FlexContainer = styled.div`
    display:flex;
    @media screen and (max-width: 768px)  {
      display: block;
      padding: 1rem;
    }
`;

const VotingContainer = styled.div`
    width: 75%;
    margin: 2rem 0.5rem 2rem 2rem;
    padding: 2rem;
    @media screen and (max-width: 768px)  {
      width: 100%;
      margin: 0rem;
    }
`;

const NoFlexInMobile = styled.div`
  display:flex;
   @media screen and (max-width: 768px)  {
     display: block;
    }
`;

const renderQuestionsByThisCreator = () => {
  //TODO show only the 2 polls
  return state.pollsByThisCreator.map((pollByCreator, index) => {
    let divStyle =
      index == 0
        ? { backGroundColor: "white" }
        : {
            backGroundColor: "white",
            paddingTop: "1rem",
            borderTop: "1px solid #ced4da",
          };
    return (
      <div style={divStyle}>
        <div className="d-flex align-items-center">
          <div
            className="d-flex justify-content-center"
            style={{
              maxHeight: "2.8rem",
              aspectRatio: "1",
              borderRadius: "16px",
              backgroundColor: "#F2F6FA",
              marginRight: "0.8rem",
            }}
          >
            {renderPollTypeIcon(pollByCreator)}
          </div>
          <p
            style={{
              fontWeight: "500",
              margin: "0",
              maxWidth: "100%",
              overflow: "hidden",
              textOverflow: "ellipsis",
              textWrap: "nowrap",
            }}
          >
            {pollByCreator.value.title}
          </p>
        </div>
        <div className="d-flex justify-content-between flex-nowrap text-secondary mb-2">
          <div>
            <i className="bi bi-people"></i>
            <span>
              {getValidAnswersQtyFromQuestion(pollByCreator.blockHeight)}
            </span>
          </div>
          <span>
            Ends
            <Widget
              src={`silkking.near/widget/timeAgo`}
              props={{
                timeInFuture: pollByCreator.value.endTimestamp,
                reduced: true,
              }}
            />
          </span>
          <span
            style={{
              backgroundColor: isUpcoming(pollByCreator)
                ? "#FFF3B4"
                : isActive(pollByCreator)
                ? "#D9FCEF"
                : "#FFE5E5",

              height: "1.5rem",
              width: "4rem",
              textAlign: "center",
              borderRadius: "16px",
              marginRight: "1rem",
              lineHeight: "1.5rem",
              fontSize: "0.8rem",
              letterSpacing: "-0.025rem",
              color: isUpcoming(pollByCreator)
                ? "#FFC905"
                : isActive(pollByCreator)
                ? "#00B37D"
                : "#FF4747",
              fontWeight: "500",
            }}
          >
            {isUpcoming(pollByCreator)
              ? "Upcoming"
              : isActive(pollByCreator)
              ? "Active"
              : "Closed"}
          </span>
        </div>
      </div>
    );
  });
};

const widgetOwner = "neardigitalcollective.near";
const indexVersion = props.indexVersion ?? "3.2.0";
const whitelist = props.whitelist;

return (
  <div>
    <FlexContainer className="content-align-start justify-content-between">
      <VotingContainer
        style={{
          borderRadius: "18px",
          background: "white",
          boxShadow: "0px 8px 28px rgba(43, 68, 106, 0.05)",
        }}
      >
        <NoFlexInMobile className="justify-content-between">
          <NoFlexInMobile>
            <Widget
              src="mob.near/widget/ProfileImage"
              props={{
                profile: state.profile,
                question: state.poll.accountId,
                className: "float-start d-inline-block me-2",
                style: {
                  width: "3.5rem",
                  aspectRatio: "1",
                  marginLeft: "1rem",
                  borderRadius: "100%",
                  overflow: "hidden",
                },
              }}
            />
            <div>
              <p style={{ margin: "0", fontWeight: "300" }}>Created by</p>
              <p
                style={{
                  fontWeight: "500",
                  maxWidth: "100%",
                  overflow: "hidden",
                  textOverflow: "ellipsis",
                  textWrap: "nowrap",
                }}
              >
                {state.poll.accountId}
              </p>
            </div>
          </NoFlexInMobile>

          {Date.now() < state.poll.value.endTimestamp && (
            <>
              <span>
                Started{" "}
                {new Date(state.poll.value.startTimestamp).toLocaleDateString()}
              </span>

              <span
                style={{
                  paddingLeft: "1.2rem",
                  borderLeft: "2px solid #ced4da",
                  height: "max-content",
                }}
              >
                Ends
                <Widget
                  src={`silkking.near/widget/timeAgo`}
                  props={{
                    timeInFuture: state.poll.value.endTimestamp,
                    reduced: true,
                  }}
                />
              </span>
            </>
          )}
          <span
            style={{
              backgroundColor: props.isUpcoming(state.poll)
                ? "#FFF3B4"
                : props.isActive(state.poll)
                ? "#D9FCEF"
                : "#FFE5E5",

              height: "2.1rem",
              width: "5rem",
              textAlign: "center",
              borderRadius: "16px",
              marginRight: "1rem",
              lineHeight: "1.9rem",
              fontSize: "1rem",
              letterSpacing: "-0.025rem",
              color: props.isUpcoming(state.poll)
                ? "#FFC905"
                : props.isActive(state.poll)
                ? "#00B37D"
                : "#FF4747",
              fontWeight: "500",
            }}
          >
            {props.isUpcoming(state.poll)
              ? "Upcoming"
              : props.isActive(state.poll)
              ? "Active"
              : "Closed"}
          </span>
        </NoFlexInMobile>
        <div className="d-flex my-3">
          <div
            style={{
              height: "inherit",
              backgroundColor: "#AAC8F7",
              width: "0.5rem",
              minWidth: "5px",
              marginRight: "0.5rem",
              borderRadius: "8px",
            }}
          >
            {/*Decorative div, do not delete*/}
          </div>
          <h2
            style={{
              fontWeight: "700",
              fontSize: "2rem",
              letterSpacing: "0.1px",
              color: "#010A2D",
              wordWrap: "anywhere",
            }}
          >
            {state.poll.value.title}
          </h2>
        </div>
        <div
          style={{
            position: "relative",
            width: "max-content",
            margin: "1rem",
          }}
        >
          <Widget
            src={`${widgetOwner}/widget/EasyPoll.Share`}
            props={{ blockHeight: props.questionBlockHeight }}
          />
        </div>
        <div
          className="p-3"
          style={{
            position: "relative",
            border: "1.5px solid rgb(206, 212, 218)",
            borderRadius: "24px",
            wordWrap: "anywhere",
          }}
        >
          <h3
            style={{
              fontWeight: "700",
              fontSize: "1.2rem",
              marginBottom: "1.2rem",
            }}
          >
            Description
          </h3>
          <p style={{ fontSize: "0.9rem" }}>
            {showDescription(state.poll.value.description)}
          </p>
          {state.poll.value.description.length > 501 &&
          !props.descriptionHeightLimited ? (
            <div
              style={{
                position: "absolute",
                bottom: "-1.125rem",
                left: "0",
                right: "0",
                marginRight: "auto",
                marginLeft: "auto",
                textAlign: "center",
              }}
            >
              <h4
                style={{
                  fontSize: "1.2rem",
                  display: "inline-block",
                  backgroundColor: "white",
                  padding: "0 1rem",
                  cursor: "pointer",
                }}
                onClick={() =>
                  props.stateUpdate({ descriptionHeightLimited: true })
                }
              >
                Show less <i className="bi bi-arrow-up"></i>
              </h4>
            </div>
          ) : (
            state.poll.value.description.length > 501 && (
              <div
                style={{
                  position: "absolute",
                  bottom: "-1.125rem",
                  left: "0",
                  right: "0",
                  marginRight: "auto",
                  marginLeft: "auto",
                  textAlign: "center",
                }}
              >
                <h4
                  style={{
                    fontSize: "1.2rem",
                    display: "inline-block",
                    backgroundColor: "white",
                    padding: "0 1rem",
                    cursor: "pointer",
                  }}
                  onClick={() =>
                    props.stateUpdate({ descriptionHeightLimited: false })
                  }
                >
                  Show more <i className="bi bi-arrow-down"></i>
                </h4>
              </div>
            )
          )}
        </div>
        {state.poll.value.tgLink != "" &&
          state.poll.value.tgLink != undefined && (
            <div
              className="mt-3 d-flex justify-content-between"
              style={{
                border: "1.5px solid #D4E5FB",
                padding: "1.2rem 1.7rem",
                borderRadius: "24px",
              }}
            >
              <div className="d-flex">
                <i
                  className="bi bi-people d-flex align-items-center justify-content-center"
                  style={{
                    height: "100%",
                    aspectRatio: "1",
                    backgroundColor: "#2F5BCF",
                    borderRadius: "14px",
                    marginRight: "1rem",
                    color: "white",
                  }}
                ></i>
                <div>
                  <p
                    className="m-0"
                    style={{
                      color: "#2F5BCF",
                      fontWeight: "500",
                      fontSize: "0.7rem",
                    }}
                  >
                    Discussion link
                  </p>
                  <h6>
                    <a
                      style={{
                        color: "#2346B1",
                        maxWidth: "100%",
                        overflow: "hidden",
                        textOverflow: "ellipsis",
                        textWrap: "nowrap",
                      }}
                      href={state.poll.value.tgLink}
                    >
                      {state.poll.value.tgLink}
                    </a>
                  </h6>
                </div>
              </div>
              <div className="d-flex align-items-center">
                <a
                  target="_blank"
                  href={state.poll.value.tgLink}
                  style={{ userSelect: "none" }}
                >
                  <i
                    className="bi bi-box-arrow-up-right"
                    style={{
                      color: "#2F5BCF",
                      cursor: "pointer",
                    }}
                  ></i>
                </a>
                <i
                  className="bi bi-clipboard"
                  style={{
                    userSelect: "none",
                    color: "#2F5BCF",
                    cursor: "pointer",
                    marginLeft: "0.8rem",
                  }}
                  onClick={() => clipboard.writeText(state.poll.value.tgLink)}
                ></i>
              </div>
            </div>
          )}
        {
          <Widget
            src={`${widgetOwner}/widget/EasyPoll.DisplayVote`}
            props={{
              poll: state.poll,
              isPreview: props.isPreview,
              indexVersion,
              whitelist,
            }}
          />
        }
      </VotingContainer>
      {
        // <Widget
        //   src={`${widgetOwner}/widget/EasyPoll.PollsByCreator`}
        //   props={{
        //     ...props,
        //   }}
        // />
      }
    </FlexContainer>
    {state.showQuestionsByThisUser && (
      <Widget
        src="f2bc8abdb8ba64fe5aac9689ded9491ff0e6fdcd7a5c680b7cf364142d1789fb/widget/renderVotingPollModal"
        props={{
          stateHandler: State.update(object),
          showQuestionsByThisUser: state.showQuestionsByThisUser,
          indexVersion,
          canOperate,
        }}
      />
    )}
  </div>
);
