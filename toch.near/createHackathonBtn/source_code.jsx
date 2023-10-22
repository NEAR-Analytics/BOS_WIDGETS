const indexKey = props.indexKey ?? "main";
const groupId = props.groupId;

// const text = props.text || "";

const content = {
  type: "md",
  text: state.text,
};

const composeData = () => {
  const data = {
    post: {
      main: JSON.stringify(Object.assign({ groupId }, content)),
    },
    index: {
      post: JSON.stringify({
        key: indexKey,
        value: {
          type: "md",
        },
      }),
    },
  };

  const item = {
    type: "social",
    path: `${context.accountId}/post/main`,
  };

  return data;
};

State.init({
  onChange: ({ content }) => {
    State.update({ content });
  },
  text: "Hello World",
});

const onInput = ({ target }) => {
  State.update({ text: target.value });
};

return (
  <>
    <input onChange={onInput} />
    <CommitButton
      force
      className="btn btn-primary rounded-5 mt-2"
      data={composeData}
    >
      Create Hackathon
    </CommitButton>
  </>
);
