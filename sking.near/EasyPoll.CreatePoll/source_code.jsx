const widgetOwner = "sking.near";
const indexVersion = props.indexVersion ?? "3.2.0";

State.init({
  step: 1,
  answers: {},
});

const steps = [
  {
    text: "Poll Information",
    active: state.step === 1,
  },
  {
    text: "Questions",
    active: state.step === 2,
  },
];

const formatStateForDB = (input) => {
  let firstStep = input[1];
  let secondStep = input[2];

  Object.keys(firstStep).forEach((key, index) => {
    firstStep[key] = firstStep[key].value;
  });

  firstStep["startTimestamp"] = new Date(
    `${firstStep["startTimestamp"]}`
  ).getTime();
  firstStep["endTimestamp"] = new Date(
    `${firstStep["endTimestamp"]}`
  ).getTime();
  firstStep["timestamp"] = Date.now();

  let new_questions = [];
  secondStep.questions.forEach((question, index) => {
    Object.keys(question).forEach((key) => {
      new_questions[index] = {
        ...new_questions[index],
        [key]: question[key].value,
      };
    });
    if (question.questionType == "0") {
      new_questions[index] = {
        ...new_questions[index],
        choicesOptions: ["Yes", "No"],
      };
    }
  });

  return {
    ...firstStep,
    questions: new_questions,
    isDraft: false, // TODO: add save to Draft button in the UI
  };
};

const onFinish = () => {
  const answers = state.answers;
  const formattedAnswers = formatStateForDB(answers);

  console.log(answers, formattedAnswers);

  const commit = {
    index: {
      poll_question: JSON.stringify(
        {
          key: `question-v${indexVersion}`,
          value: formattedAnswers,
        },
        undefined,
        0
      ),
    },
  };

  State.update({ commitLoading: true });
  Social.set(commit, {
    force: true,
    onCommit: () => {
      State.update({ commitLoading: false, committed: true });
    },
    onCancel: () => {
      State.update({ commitLoading: false });
    },
  });
};

const Container = styled.div`
  border-radius: 21px;
  padding: 24px;
  box-shadow: rgba(0, 0, 0, 0.1) -4px 9px 25px -6px;
  max-width: 860px;
  margin: auto;
  width: 100%;
  background: #fafbfb;
`;

if (state.committed) {
  return (
    <Container
      className="text-center d-flex flex-column align-items-center"
      style={{
        padding: "60px 12px",
        color: "#239f28",
      }}
    >
      <i
        className="bi bi-check-circle"
        style={{
          fontSize: 60,
        }}
      />
      <span
        style={{
          fontWeight: "bold",
          fontsize: 15,
          color: "#239f28",
        }}
      >
        Posted Successfully!
      </span>

      <a
        href={`#/${widgetOwner}/widget/EasyPoll?page=my_polls`}
        className="text-decoration-none mt-4"
      >
        <Widget
          src="rubycop.near/widget/NDC.StyledComponents"
          props={{
            Button: {
              text: "My Polls",
              icon: <i class="bi bi-person-fill"></i>,
              className:
                "primary dark d-flex flex-row-reverse gap-2 align-items-center",
              onClick: () => {},
            },
          }}
        />
      </a>
    </Container>
  );
}

if (state.commitLoading) {
  return (
    <Container
      className="text-center"
      style={{
        padding: "60px 12px",
      }}
    >
      <Widget
        src={`sking.near/widget/Common.Spinner`}
        props={{
          color1: "#ffd50d",
          color2: "#4f46e5",
        }}
      />
      <span
        style={{
          fontWeight: "bold",
          fontsize: 15,
          color: "#4f46e5",
          textAlign: "center",
        }}
      >
        Saving...
      </span>
    </Container>
  );
}

return (
  <Container>
    <Widget
      src={`${widgetOwner}/widget/EasyPoll.CreatePoll.Header`}
      props={{
        steps,
      }}
    />
    <Widget
      src={`${widgetOwner}/widget/EasyPoll.CreatePoll.Step${state.step}`}
      props={{
        onSubmit: (formState) => {
          State.update({
            answers: {
              ...state.answers,
              [state.step]: formState,
            },
          });
          if (steps.length === state.step) {
            onFinish();
          }
          State.update({
            step: steps.length === state.step ? state.step : state.step + 1,
          });
        },
        onPrev: (formState) => {
          State.update({
            answers: {
              ...state.answers,
              [state.step]: formState,
            },
            step: state.step - 1,
          });
        },
        initialFormState: state.answers[state.step],
      }}
    />
  </Container>
);
