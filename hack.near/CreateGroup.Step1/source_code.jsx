const { formState, errors, renderFooter } = props;

const initialAnswers = {
  name: formState.name,
  description: formState.description,
  links: formState.links.length > 0 ? formState.links : [""],
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

const onAddLink = () => update("links", [...state.answers.links, ""]);

const onLinkChange = (index, value) => {
  const newLinks = [...state.answers.links];
  newLinks[index] = value;
  update("links", newLinks);
};

const onRemoveLink = (index) => {
  const newLinks = [...state.answers.links];
  newLinks[index] = null;
  update("links", newLinks);
};

const Error = styled.span`
  display: inline-block;
  font-style: normal;
  font-weight: 400;
  font-size: 0.875em;
  line-height: 1.25em;
  color: #ff4d4f;
  height: 0;
  overflow: hidden;
  transition: height 0.3s ease-in-out;

  &.show {
    height: 1.25em;
  }
`;

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
          rows: 5,
          textarea: true,
          inputProps: {
            name: "description",
            defaultValue: state.answers.description,
          },
          onChange: (v) => onValueChange("description", v),
          error: errors["description"],
        }}
      />
    </div>

    {renderFooter(state.answers)}
  </div>
);
