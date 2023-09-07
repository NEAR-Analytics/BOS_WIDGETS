const { formState, errors } = props; // {renderFooter(state.answers)}

const initialAnswers = {
  name: formState.name,
  description: formState.description,
};

State.init({
  answers: initialAnswers,
});

const onValueChange = (key, value) => {
  State.update({
    answers: {
      ...state.answers,
      [key]: value,
    },
  });
};

return (
  <div className="mt-4 ndc-card p-4">
    <div className="d-flex flex-column gap-4">
      <h2 className="h5 fw-bold">
        <span
          className="rounded-circle d-inline-flex align-items-center justify-content-center fw-bolder h5 me-2"
          style={{
            width: "48px",
            height: "48px",
            border: "1px solid #82E299",
          }}
        >
          1
        </span>
        Basics
      </h2>
      <Widget
        src="nearui.near/widget/Input.ExperimentalText"
        props={{
          label: "Name",
          placeholder: `What should it be called?`,
          size: "md",
          inputProps: {
            name: "name",
            defaultValue: state.answers.name,
          },
          error: errors["name"],
        }}
      />
      <Widget
        src="nearui.near/widget/Input.ExperimentalText"
        props={{
          label: "Description",
          placeholder: "What is the group about?",
          size: "md",
          textarea: true,
          inputProps: {
            rows: 5,
            name: "description",
            defaultValue: state.answers.description,
          },
          onChange: (v) => onValueChange("purpose", v),
          error: errors["purpose"],
        }}
      />
    </div>
  </div>
);
