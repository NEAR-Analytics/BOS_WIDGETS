// "❤️ Positive"
const initialEmoji = "🤍 Like";
const emojiArray = [
  "❤️ Positive",
  "👀 Thinking",
  "🙏 Thank you",
  "😁 LOL",
  "👎 Negative",
  "🚀 Ship it",
  "💯 Definitely",
  "👍 Like",
];
const item = props.item;

if (!item) {
  return "";
}

State.init({
  emoji: initialEmoji,
  show: false,
  loading: false,
});

const mainButtonStyles = {
  border: 0,
  display: "inline-flex",
  alignItems: "center",
  justifyContent: "start",
  borderRadius: "5px",
  paddingLeft: "12px",
  width: "8em",
  height: "2.5em",
};

const smallButtonStyles = {
  border: 0,
  color: "DeepSkyBlue",
  background: "rgba(0, 191, 255, 0.1)",
  marginRight: "4px",
};

// ===============
const likes = Social.index("like", item, { order: "desc" });
const uniqueAccounts = {};

const lastLikes =
  likes &&
  likes.filter((obj) => {
    if (!uniqueAccounts[obj.accountId]) {
      uniqueAccounts[obj.accountId] = true;
      return true;
    }
    return false;
  });

const doesUserVoted = () => {
  const resObject = lastLikes.find(
    (item) => item.accountId === "eugenewolf507.near"
    // (item) => item.accountId === "testwiki.near"
  );
  if (resObject) {
    State.update({ emoji: resObject.value.type });
  }
};

lastLikes && doesUserVoted();
// const testArray = [
//   {
//     accountId: "eugenewolf507.near",
//     blockHeight: 93610551,
//     value: {
//       type: "🚀 Ship it",
//     },
//   },
//   {
//     accountId: "testwiki.near",
//     blockHeight: 93611581,
//     value: {
//       type: "💯 Definitely",
//     },
//   },
//   {
//     accountId: "alex.near",
//     blockHeight: 93610551,
//     value: {
//       type: "🚀 Ship it",
//     },
//   },
// ];

const getLikesStats = (acc, likeObj) => {
  if (likeObj.value.type === initialEmoji) {
    return acc;
  }
  if (!acc.hasOwnProperty(likeObj.value.type)) {
    acc[likeObj.value.type] = {};
    acc[likeObj.value.type].quantity = 0;
    acc[likeObj.value.type].emoji = likeObj.value.type.slice(0, 2);
    acc[likeObj.value.type].accounts = [];
  }
  acc[likeObj.value.type].quantity += 1;
  acc[likeObj.value.type].accounts = [
    likeObj.accountId,
    ...acc[likeObj.value.type].accounts,
  ];

  return acc;
};
const countLikes = (arr) => Object.values(arr.reduce(getLikesStats, {}));
const likesCount = lastLikes && countLikes(lastLikes);

// =================

const handleOnMouseEnter = (e) => {
  State.update({ show: true });
};
const handleOnMouseLeave = (e) => {
  State.update({ show: false });
};

const clickHandler = (emojiMessage) => {
  if (state.loading) {
    return;
  }
  //   if (state.emoji === initialEmoji) {
  //     State.update({ emoji: "❤️ Positive" });
  //   } else {
  //     State.update({ emoji: initialEmoji });
  //   }
  // ================== START ==================
  State.update({
    loading: true,
  });
  const emojiToWrite =
    emojiMessage === initialEmoji && state.emoji === initialEmoji
      ? emojiArray[0]
      : emojiMessage;

  const data = {
    index: {
      like: JSON.stringify({
        key: item,
        value: {
          type: emojiToWrite,
        },
      }),
    },
  };
  Social.set(data, {
    onCommit: () => {
      State.update({ emoji: emojiToWrite, loading: false, show: false });
      //   State.update({ loading: false, show: false });
    },
    onCancel: () => State.update({ loading: false, show: false }),
  });
  // ================== END ==================
};

const overlay = (
  <div
    className="border m-3 p-3 rounded-4 bg-white shadow"
    style={{ maxWidth: "25em", zIndex: 1070 }}
    onMouseEnter={handleOnMouseEnter}
    onMouseLeave={handleOnMouseLeave}
  >
    {emojiArray &&
      emojiArray.map((item) => (
        <button onClick={() => clickHandler(item)} style={smallButtonStyles}>
          {item.slice(0, 2)}
        </button>
      ))}
  </div>
);

return (
  <span className="ps-2">
    <OverlayTrigger
      show={state.show}
      trigger={["hover", "focus"]}
      delay={{ show: 250, hide: 300 }}
      placement="auto"
      overlay={overlay}
    >
      <button
        onClick={() => clickHandler(initialEmoji)}
        onMouseEnter={handleOnMouseEnter}
        onMouseLeave={handleOnMouseLeave}
        style={{
          ...mainButtonStyles,
          backgroundColor:
            state.emoji === initialEmoji
              ? "transparent"
              : "rgba(0, 191, 255, 0.1)",
          color: state.emoji === initialEmoji ? "#000" : "DeepSkyBlue",
        }}
      >
        {state.emoji}
      </button>
    </OverlayTrigger>
    {likesCount &&
      likesCount.map((item) => (
        <span className="ps-3">
          {item.quantity} {item.emoji}{" "}
        </span>
      ))}
  </span>
);
