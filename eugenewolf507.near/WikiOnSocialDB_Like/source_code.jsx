// TODO - optimise all handlers with repeating state update show: false - combine all emojies into array and render it from array via map

const initialEmoji = "🤍 Positive";

State.init({ emoji: initialEmoji, show: false, loading: false });

const Button = styled.button`
  border: 0 !important;
  display: inline-flex;
  align-items: center;
  justify-content: start;
  border-radius: 5px;
  padding-left: 12px;
  width: 8em;
  height: 2.5em;
  &:hover {
    color: DeepSkyBlue;
    background: rgba(0, 191, 255, 0.1);
  }
`;

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
  e.target.style.backgroundColor = "red";
};
const handleOnMouseLeave = (e) => {
  State.update({ show: false });
};

const clickHandler = () => {
  if (state.loading) {
    return;
  }
  // if (state.emoji === initialEmoji) {
  //   State.update({ emoji: "❤️ Positive" });
  // } else {
  //   State.update({ emoji: initialEmoji });
  // }
  // State.update({ show: false }); move it into Social.set function
  // ================== START ==================
  State.update({
    loading: true,
  });
  const data = {
    index: {
      like: JSON.stringify({
        key: item,
        value: {
          type: state.emoji,
        },
      }),
    },
  };
  Social.set(data, {
    // onCommit: () => State.update({ loading: false, show: false }),
    onCommit: () => {
      if (state.emoji === initialEmoji) {
        State.update({ emoji: "❤️ Positive", loading: false, show: false });
      } else {
        State.update({ emoji: initialEmoji, loading: false, show: false });
      }
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
      onClick={() => {
        State.update({ emoji: "❤️ Positive" });
        State.update({ show: false });
      }}
      style={smallButtonStyles}
    >
      ❤️
    </button>
    <button
      onClick={() => {
        State.update({ emoji: "👀 Thinking" });
        State.update({ show: false });
      }}
      style={smallButtonStyles}
    >
      👀
    </button>
    <button
      onClick={() => {
        State.update({ emoji: "🙏 Thank you" });
        State.update({ show: false });
      }}
      style={smallButtonStyles}
    >
      🙏
    </button>
    <button
      onClick={() => {
        State.update({ emoji: "😁 LOL" });
        State.update({ show: false });
      }}
      style={smallButtonStyles}
    >
      😁
    </button>
    <button
      onClick={() => {
        State.update({ emoji: "👎 Negative" });
        State.update({ show: false });
      }}
      style={smallButtonStyles}
    >
      👎
    </button>
    <button
      onClick={() => {
        State.update({ emoji: "🚀 Ship it" });
        State.update({ show: false });
      }}
      style={smallButtonStyles}
    >
      🚀
    </button>
    <button
      onClick={() => {
        State.update({ emoji: "💯 Definitely" });
        State.update({ show: false });
      }}
      style={smallButtonStyles}
    >
      💯
    </button>
    <button
      onClick={() => {
        State.update({ emoji: "👍 Like" });
        State.update({ show: false });
      }}
      style={smallButtonStyles}
    >
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
      onClick={clickHandler}
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
