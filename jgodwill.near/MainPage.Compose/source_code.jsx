if (!context.accountId) {
  return "";
}

const composeData = () => {
  const data = {
    post: {
      main: JSON.stringify(state.content),
    },
    index: {
      post: JSON.stringify({
        key: "main",
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

  const notifications = state.extractMentionNotifications(
    state.content.text,
    item
  );

  if (notifications.length) {
    data.index.notify = JSON.stringify(
      notifications.length > 1 ? notifications : notifications[0]
    );
  }

  const hashtags = state.extractHashtags(state.content.text);

  if (hashtags.length) {
    data.index.hashtag = JSON.stringify(
      hashtags.map((hashtag) => ({
        key: hashtag,
        value: item,
      }))
    );
  }

  return data;
};

State.init({
  onChange: ({ content }) => {
    State.update({ content });
  },
});

console.log("content here", state.content);
return (
  <>
    <Widget
      src="jgodwill.near/widget/Common.Compose"
      props={{
        placeholder: "What's happening?",
        onChange: state.onChange,
        onHelper: ({ extractMentionNotifications, extractHashtags }) => {
          // Major changes here
          State.update({
            extractMentionNotifications: state.extractMentionNotifications,
            extractHashtags: state.extractHashtags,
          });
        },
        composeButton: (onCompose) => (
          <CommitButton
            disabled={!state.content}
            force
            className="btn btn-dark rounded-3"
            data={composeData}
            onCommit={() => {
              onCompose();
            }}
          >
            Post
          </CommitButton>
        ),
      }}
    />
    {state.content && state.content.text && (
      <div className="mt-3">
        <Widget
          src="jgodwill.near/widget/MainPage.Post"
          props={{
            accountId: context.accountId,
            content: state.content,
            blockHeight: "now",
          }}
        />
      </div>
    )}
  </>
);
