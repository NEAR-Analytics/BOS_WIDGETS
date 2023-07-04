const widgetOwner = "sking.near";
const id = props.id;
const onDelete = props.onDelete;
const onMoveUp = props.onMoveUp;
const onMoveDown = props.onMoveDown;
const onQuestionFieldChange = props.onQuestionFieldChange;
const question = props.question;

const validationConfig = {
  question: {
    required: true,
    minLength: 4,
    maxLength: 400,
  },
};

const onValidate = (field, value, setError) => {
  const options = validationConfig[field];

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

const Container = styled.div`
  background: #f4f7f7;
  padding: 16px;
  border-radius: 12px;
  box-shadow: rgba(0, 0, 0, 0.05) 0px 6px 24px 0px,
    rgba(0, 0, 0, 0.08) 0px 0px 0px 1px;
`;

const IconButton = styled.div`
  font-size: 18px;
  padding: 5px;
  transition: all 100ms ease;
  color: #000;

  &.danger {
    color: red;
  }

  &.danger:hover {
    color: red;
  }

  &:hover {
    color: #4f46e5;
    transform: scale(1.3);
  }
`;

return (
  <Container className="d-flex gap-3 flex-column">
    <div className="d-flex gap-3 mb-2">
      <h4 className="me-auto">Question {id + 1}</h4>
      <IconButton role="button" title="Move Up" onClick={onMoveUp}>
        <i class="bi bi-chevron-up"></i>
      </IconButton>
      <IconButton role="button" title="Move Down" onClick={onMoveDown}>
        <i class="bi bi-chevron-down"></i>
      </IconButton>
      <IconButton
        className="danger"
        role="button"
        title="Delete Question"
        onClick={onDelete}
      >
        <i class="bi bi-x-lg"></i>
      </IconButton>
    </div>
    <Widget
      src={`${widgetOwner}/widget/EasyPoll.Inputs.Text`}
      props={{
        label: "Title*",
        placeholder: "Enter Your Question (Markdown Supported)",
        value: question.question.value,
        error: question.question.error,
        onChange: (v) => onQuestionFieldChange(id, "question", "value", v),
        validate: () =>
          onValidate("question", question.question.value, (e) =>
            onQuestionFieldChange(id, "question", "error", e)
          ),
        inputProps: {
          minLength: 4,
          maxLength: 400,
          required: true,
        },
        textarea: true,
      }}
    />
    <Widget
      src={`${widgetOwner}/widget/EasyPoll.Inputs.Image`}
      props={{
        label: "Image",
        value: question.imageIPFS.value,
        error: question.imageIPFS.error,
        onChange: (v) => onQuestionFieldChange(id, "imageIPFS", "value", v),
      }}
    />
    <Widget
      src={`${widgetOwner}/widget/EasyPoll.Inputs.QuestionType`}
      props={{
        label: "Question Type*",
        value: question.questionType.value,
        error: question.questionType.error,
        onChange: (v) => onQuestionFieldChange(id, "questionType", "value", v),
      }}
    />
    {(question.questionType.value === "1" ||
      question.questionType.value === "2") && (
      <Widget
        src={`${widgetOwner}/widget/EasyPoll.Inputs.Options`}
        props={{
          label: "Answer Options*",
          value: question.choicesOptions.value,
          error: question.choicesOptions.error,
          onChange: (v) => {
            console.log(v);
            onQuestionFieldChange(id, "choicesOptions", "value", v);
          },
          placeholder: "",
        }}
      />
    )}
  </Container>
);
