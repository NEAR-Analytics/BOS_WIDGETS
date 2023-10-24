// if (!context.accountId) {
//   return "";
// }
// const blockHeight =
//   props.blockHeight === "now" ? "now" : parseInt(props.blockHeight);

// const item = props.item;
const item = {
  type: "social",
  path: `${accountId}/post/main`,
  blockHeight,
};

// if (!context.accountId) {
//   return "";
// }

const content = {
  type: "md",
  text: "Hello",
};

const composeData = () => {
  const data = {
    post: {
      comment: JSON.stringify(Object.assign({ item }, content)),
    },
    index: {
      comment: JSON.stringify({
        key: item,
        value: {
          type: "md",
        },
      }),
    },
  };

  // const thisItem = {
  //   type: "social",
  //   path: `${context.accountId}/post/comment`,
  // };

  // const notifications = state.extractMentionNotifications(
  //   state.content.text,
  //   thisItem
  // );

  // if (props.notifyAccountId && props.notifyAccountId !== context.accountId) {
  //   notifications.push({
  //     key: props.notifyAccountId,
  //     value: {
  //       type: "comment",
  //       item,
  //     },
  //   });
  // }

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
  //       value: thisItem,
  //     }))
  //   );
  // }

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
      disabled={!content}
      force
      className="btn btn-primary rounded-5"
      data={composeData}
      // onCommit={() => {
      //   onCompose();
      //   props.onComment && props.onComment(state.content);
      // }}
    >
      Comment
    </CommitButton>
  </>
);
