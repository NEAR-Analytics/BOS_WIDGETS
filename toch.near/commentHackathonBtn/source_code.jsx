// if (!context.accountId) {
//   return "";
// }
// const blockHeight = parseInt("now");
// props.blockHeight === "now" ? "now" : parseInt(props.blockHeight);

// const item = props.item;
const item = {
  type: "social",
  path: `${context.accountId}/post/main`,
  blockHeight: 104037685,
};

const notifyAccountId = "toch.near";

// if (!context.accountId) {
//   return "";
// }

const content = {
  type: "md",
  text: "Yesss!!!",
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

  // const extractMentions = (text) => {
  //   const mentionRegex =
  //     /@((?:(?:[a-z\d]+[-_])*[a-z\d]+\.)*(?:[a-z\d]+[-_])*[a-z\d]+)/gi;
  //   mentionRegex.lastIndex = 0;
  //   const accountIds = new Set();
  //   for (const match of text.matchAll(mentionRegex)) {
  //     if (
  //       !/[\w`]/.test(match.input.charAt(match.index - 1)) &&
  //       !/[/\w`]/.test(match.input.charAt(match.index + match[0].length)) &&
  //       match[1].length >= 2 &&
  //       match[1].length <= 64
  //     ) {
  //       accountIds.add(match[1].toLowerCase());
  //     }
  //   }
  //   return [...accountIds];
  // };

  // const extractHashtags = (text) => {
  //   const hashtagRegex = /#(\w+)/gi;
  //   hashtagRegex.lastIndex = 0;
  //   const hashtags = new Set();
  //   for (const match of text.matchAll(hashtagRegex)) {
  //     if (
  //       !/[\w`]/.test(match.input.charAt(match.index - 1)) &&
  //       !/[/\w`]/.test(match.input.charAt(match.index + match[0].length))
  //     ) {
  //       hashtags.add(match[1].toLowerCase());
  //     }
  //   }
  //   return [...hashtags];
  // };

  // const extractMentionNotifications = (text, item) =>
  //   extractMentions(text || "")
  //     .filter((accountId) => accountId !== context.accountId)
  //     .map((accountId) => ({
  //       key: accountId,
  //       value: {
  //         type: "mention",
  //         item,
  //       },
  //     }));

  // const notifications = extractMentionNotifications(content.text, thisItem);

  // if (notifyAccountId && notifyAccountId !== context.accountId) {
  //   notifications.push({
  //     key: notifyAccountId,
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

  // const hashtags = extractHashtags(content.text);

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
