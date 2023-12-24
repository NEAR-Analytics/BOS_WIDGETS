// TODO - optimise all handlers with repeating state update show: false - combine all emojies into array and render it from array via map
// "❤️ Positive"
const initialEmoji = "🤍 Like";
const item = props.item;

if (!item) {
  return "";
}

const likes = Social.index("like", item);
// ===============
const dataLoading = likes === null;

const likesByUsers = {};

(likes || []).forEach((like) => {
  if (like.value.type === "like") {
    likesByUsers[like.accountId] = like;
  } else if (like.value.type === "unlike") {
    delete likesByUsers[like.accountId];
  }
});
if (state.hasLike === true) {
  likesByUsers[context.accountId] = {
    accountId: context.accountId,
  };
} else if (state.hasLike === false) {
  delete likesByUsers[context.accountId];
}

const accountsWithLikes = Object.keys(likesByUsers);
const hasLike = context.accountId && !!likesByUsers[context.accountId];
if (likes.length) {
  console.log("likes", likes);
  console.log("accountsWithLikes = ", accountsWithLikes);
  console.log("hasLike = ", hasLike);
}

// =================

State.init({ emoji: initialEmoji, show: false, loading: false });

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
};

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
      ? "❤️ Positive"
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
    <button
      onClick={() => clickHandler("❤️ Positive")}
      style={smallButtonStyles}
    >
      ❤️
    </button>
    <button
      onClick={() => clickHandler("👀 Thinking")}
      style={smallButtonStyles}
    >
      👀
    </button>
    <button
      onClick={() => clickHandler("🙏 Thank you")}
      style={smallButtonStyles}
    >
      🙏
    </button>
    <button onClick={() => clickHandler("😁 LOL")} style={smallButtonStyles}>
      😁
    </button>
    <button
      onClick={() => clickHandler("👎 Negative")}
      style={smallButtonStyles}
    >
      👎
    </button>
    <button
      onClick={() => clickHandler("🚀 Ship it")}
      style={smallButtonStyles}
    >
      🚀
    </button>
    <button
      onClick={() => clickHandler("💯 Definitely")}
      style={smallButtonStyles}
    >
      💯
    </button>
    <button onClick={() => clickHandler("👍 Like")} style={smallButtonStyles}>
      👍
    </button>
  </div>
);

return (
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
);
