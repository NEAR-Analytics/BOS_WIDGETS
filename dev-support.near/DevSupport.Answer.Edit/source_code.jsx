if (!context.accountId) {
  return "";
}

const item = props.item;

const composeData = () => {
  const data = {
    question: {
      answer: JSON.stringify(Object.assign({ item }, state.content)),
    },
    index: {
      answer: JSON.stringify({
        key: item,
        value: {
          type: "md",
        },
      }),
    },
  };

  const notifications = state.extractTagNotifications(state.content.text, {
    type: "social",
    path: `${context.accountId}/question/answer`,
  });

  if (props.notifyAccountId) {
    notifications.push({
      key: props.notifyAccountId,
      value: {
        type: "custom",
        message: "Tagged you on a discussion",
        widget: props.previewWidget,
        blockHeight: item.blockHeight,
        params:
          typeof identifier === "string"
            ? { identifier: identifier }
            : identifier,
      },
    });
  }

  if (notifications.length) {
    data.index.notify = JSON.stringify(
      notifications.length > 1 ? notifications : notifications[0]
    );
  }

  return data;
};

State.init({
  onChange: ({ content }) => {
    State.update({ content });
  },
});

return (
  <>
    <Widget
      src="dima_sheleg.near/widget/DevSupport.Compose"
      props={{
        placeholder: `Reply${
          props.notifyAccountId ? ` to ${props.notifyAccountId}` : ""
        }`,
        initialText: props.initialText,
        onChange: state.onChange,
        onHelper: ({ extractTagNotifications }) => {
          State.update({ extractTagNotifications });
        },
        withProfileImage: context.accountId,
        composeButton: (onCompose) => (
          <CommitButton
            disabled={!state.content}
            force
            className="commit-post-button"
            data={composeData}
            onCommit={() => {
              onCompose();
              props.onComment && props.onComment(state.content);
            }}
          >
            Reply
          </CommitButton>
        ),
      }}
    />
  </>
);
