initState({
  labels: [],
  title: props.title ?? "",
  content: props.content ?? "",
});

// Predefined Labels
const predefinedLabels = [""];

const labelOptions = predefinedLabels.map((s) => {
  return { label: s };
});

const setLabels = (labels) => {
  let labelStrings = labels.map((o) => {
    return o.label;
  });
  State.update({ labels, labelStrings });
};

const Wrapper = styled.div`
  padding: 1.5em;
  background-color: #1e1e1e; /* Dark background color */
  border: 1px solid #333333; /* Darker border color */
  border-radius: 8px;
`;

const Title = styled.span`
  font-size: 20px;
  font-weight: 600;
  color: #ffffff; /* White text color */
  margin-left: -12px;
`;

const InputWrapper = styled.div`
  margin-left: -12px;
  outline: none;

  &:focus-within {
    box-shadow: inset 0 0 30px rgba(0, 0, 0, 0.2); /* Slightly lighter shadow */
    border-color: #30A46C; /* Dark green border color on focus */
  }

  .form-control {
    transition: all 200ms;
    border: 1px solid #333333; /* Darker border color */
    border-radius: 8px;
    outline: none;
    box-shadow: none;

    &:focus,
    &:focus-within {
      box-shadow: inset 0 0 30px rgba(0, 0, 0, 0.2); /* Slightly lighter shadow */
      border-color: #30A46C; /* Dark green border color on focus */
    }
  }
`;
return (
  <Wrapper className="row">
    <div className="col-12">
      <Title>Notebook</Title>
      <InputWrapper>
        <input
          type="text"
          placeholder={"Describe your notebook"}
          value={state.title}
          onChange={(event) => State.update({ title: event.target.value })}
        />
      </InputWrapper>
    </div>
    <div className="col-12 mt-3">
      <Title>Topics</Title>
      <InputWrapper>
        <Typeahead
          multiple
          labelKey="label"
          onChange={setLabels}
          options={labelOptions}
          placeholder=" ..."
          selected={state.labels}
          positionFixed={true}
          allowNew={false}
        />
      </InputWrapper>
    </div>
    <div className="col-12 mt-3">
      <Title>Details</Title>
      <Widget
        src="dima_sheleg.near/widget/DevSupport.Compose"
        props={{
          placeholder: "Add additional details here",
          initialText: props.initialText,
          onChange: ({ content }) => State.update({ content: content }),
          composeButton: (onCompose) => (
            <CommitButton
              disabled={!state.content}
              force
              className="commit-post-button"
              onCommit={props.onCommit}
              data={{
                notebook: {
                  minorityprogrammers: JSON.stringify({
                    title: state.title,
                    labels: state.labelStrings,
                    content: state.content,
                  }),
                },
                index: {
                  notebook: JSON.stringify({
                    key: "y3k",
                    value: { type: "md" },
                  }),
                },
              }}
            >
              <i class="bi bi-chat"></i> Post
            </CommitButton>
          ),
        }}
      />
    </div>
  </Wrapper>
);
