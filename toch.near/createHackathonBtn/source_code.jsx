const indexKey = props.indexKey ?? "main";
const draftKey = props.indexKey ?? "draft";
const draft = Storage.privateGet(draftKey);
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
    Storage.privateSet(draftKey, content.text || "");
  },
  text: "",
});

const onInput = ({ target }) => {
  State.update({ text: target.value });
};

return (
  <>
    <div className="container">
      <input onChange={onInput} />
      <CommitButton
        disable={!context.content.text}
        force
        className="btn btn-primary rounded-5 mt-2"
        data={composeData}
      >
        Create Hackathon
      </CommitButton>
    </div>
  </>
);
