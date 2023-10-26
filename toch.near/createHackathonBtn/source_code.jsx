const indexKey = props.indexKey ?? "main";
const draftKey = props.indexKey ?? "draft";
const draft = Storage.privateGet(draftKey);
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

  // const item = {
  //   type: "social",
  //   path: `${context.accountId}/post/main`,
  // };

  // const notifications = state.extractMentionNotifications(
  //   state.content.text,
  //   item
  // );

  // if (notifications.length) {
  //   data.index.notify = JSON.stringify(
  //     notifications.length > 1 ? notifications : notifications[0]
  //   );
  // }

  // const hashtags = state.extractHashtags(state.content.text);

  // if (hashtags.length) {
  //   data.index.hashtag = JSON.stringify(
  //     hashtags.map((hashtag) => ({
  //       key: hashtag,
  //       value: item,
  //     }))
  //   );
  // }

  return data;
};

State.init({
  onChange: ({ content }) => {
    State.update({ content });
    Storage.privateSet(draftKey, content.text || "");
  },
});

return (
  <>
    <div className="container">
      <CommitButton
        disabled={!text}
        force
        className="btn btn-primary rounded-5 mt-2"
        data={composeData}
      >
        Create Hackathon
      </CommitButton>
    </div>
  </>
);
