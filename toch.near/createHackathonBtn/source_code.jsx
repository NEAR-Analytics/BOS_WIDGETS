const indexKey = props.indexKey ?? "main";
const groupId = props.groupId;

const text = props.text || "";

const content = {
  type: "md",
  text: text,
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
});

return (
  <>
    <CommitButton
      force
      className="btn btn-primary rounded-5"
      data={composeData}
    >
      Create Hackathon
    </CommitButton>
  </>
);
