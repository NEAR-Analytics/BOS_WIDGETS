const hasVoted = props.hasVoted ?? false;
const widgetOwner = props.widgetOwner ?? "sking.near";
const indexVersion = props.indexVersion ?? "3.2.0";
const blockHeight = props.blockHeight;
const {
  value: { questions },
} = props.poll;

if (!questions) return <></>;

State.init({
  step: 0,
  form: {
    0: {
      value: "",
      error: null,
    },
  },
});

const currentQuestion = questions[state.step];
const ipfsUrl = (cid) => `https://ipfs.near.social/ipfs/${cid}`;

const handleNext = () => {
  if (state.form[state.step].error) return;

  if (questions.length === state.step) {
    return onFinish();
  }
  State.update({
    step: questions.length === state.step ? state.step : state.step + 1,
  });
};
const handlePrev = () => {
  State.update({
    step: state.step - 1,
  });
};

const onFormFieldChange = (step, key, value) => {
  State.update({
    ...state,
    form: {
      ...state.form,
      [step]: {
        ...state.form[step],
        [key]: value,
      },
    },
  });
};

const onValidate = (value, setError, options) => {
  if (options.required) {
    if (!value || value === "" || value.length < 1) {
      return setError("This field is required");
    }
  }

  if (options.minLength) {
    if (value.length < options.minLength) {
      return setError(
        `Input is too short. Minimum length is ${options.minLength} characters.`
      );
    }
  }

  if (options.maxLength) {
    if (value.length > options.maxLength) {
      return setError(
        `Input is too long. Maximum length is ${options.maxLength} characters.`
      );
    }
  }

  if (options.custom) {
    const customError = options.custom(value);
    if (customError) {
      return setError(customError);
    }
  }

  setError(null);
};

const formatStateForDB = (input) => {
  let answers = input;

  Object.keys(answers).forEach((key, index) => {
    answers[key] = answers[key].value;
  });

  return {
    answers: answers,
    timestamp: Date.now(),
    pollBlockHeight: blockHeight,
  };
};

const onFinish = () => {
  const formattedAnswers = formatStateForDB(state.form);

  console.log(formattedAnswers);

  const commit = {
    index: {
      poll_question: JSON.stringify(
        {
          key: `answer-v${indexVersion}`,
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

return (
  <div
    className="d-flex flex-column gap-1"
    style={{
      border: "1.5px solid #4f46e520",
      padding: "12px",
      borderRadius: "16px",
    }}
  >
    <div className="d-flex">
      <p
        style={{
          backgroundColor: "#4f46e5",
          color: "#ffd50d",
          borderRadius: "100px",
          minWidth: 36,
          height: 36,
          fontSize: 17,
          fontWeight: "700",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        {state.step + 1}
      </p>
      <div
        style={{
          fontWeight: "700",
          fontSize: currentQuestion.question.length > 200 ? 17 : 24,
          marginLeft: "15px",
          maxHeight: 1000,
          overflow: "auto",
        }}
      >
        <Markdown text={currentQuestion.question} />
      </div>
    </div>

    {currentQuestion.imageIPFS && (
      <div className="d-flex w-100 mb-3">
        <img
          src={ipfsUrl(currentQuestion.imageIPFS)}
          style={{
            maxHeight: 400,
            minHeight: 200,
            maxWidth: "100%",
            minWidth: "100px",
            objectFit: "contain",
          }}
        />
      </div>
    )}

    {(currentQuestion.questionType === "0" ||
      currentQuestion.questionType === "1" ||
      currentQuestion.questionType === "2") && (
      <Widget
        src={`${widgetOwner}/widget/EasyPoll.Inputs.Choices`}
        props={{
          label:
            currentQuestion.questionType === "0" ||
            currentQuestion.questionType === "1"
              ? "Select one option:"
              : "Select multiple options:",
          placeholder: "Type Your Answer Here...",
          value: state.form[state.step].value,
          error: state.form[state.step].error,
          onChange: (v) => onFormFieldChange(state.step, "value", v),
          choices:
            currentQuestion.questionType === "0"
              ? ["Yes", "No"]
              : currentQuestion.choicesOptions,
          type: currentQuestion.questionType === "2" ? "multiple" : "single",
        }}
      />
    )}
    {currentQuestion.questionType === "3" && (
      <Widget
        src={`${widgetOwner}/widget/EasyPoll.Inputs.Text`}
        props={{
          label: "Answer",
          placeholder: "Type Your Answer Here...",
          value: state.form[state.step].value,
          error: state.form[state.step].error,
          onChange: (v) => onFormFieldChange(state.step, "value", v),
          validate: () =>
            onValidate(
              state.form[state.step].value,
              (e) => onFormFieldChange(state.step, "error", e),
              {
                maxLength: 2000,
              }
            ),
          inputProps: {
            maxLength: 2000,
            autoFocus: true,
          },
          textarea: true,
        }}
      />
    )}

    <Widget
      src={`${widgetOwner}/widget/EasyPoll.Inputs.Footer`}
      props={{
        hasNext: questions.length > 1 && state.step !== questions.length - 1,
        onNext: handleNext,
        hasSubmit: state.step === questions.length - 1,
        onSubmit: onFinish,
        hasPrev: state.step > 0,
        onPrev: handlePrev,
      }}
    />
  </div>
);
