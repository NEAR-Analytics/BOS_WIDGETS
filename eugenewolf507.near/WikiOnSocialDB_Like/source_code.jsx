// TODO - add fixed with of the main button
// TODO - optimise all handlers with repeating state update show: false
// TODO - add CSS styling, height for emoji 24 px, position, bgcolor

const initialEmoji = "🤍 Positive";

State.init({ emoji: initialEmoji, show: false });

const handleOnMouseEnter = () => {
  State.update({ show: true });
};
const handleOnMouseLeave = () => {
  State.update({ show: false });
};

const clickHandler = () => {
  if (state.emoji === initialEmoji) {
    State.update({ emoji: "❤️ Positive" });
  } else {
    State.update({ emoji: initialEmoji });
  }
  State.update({ show: false });
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
    >
      ❤️
    </button>
    <button
      onClick={() => {
        State.update({ emoji: "👀 Thinking" });
        State.update({ show: false });
      }}
    >
      👀
    </button>
    <button
      onClick={() => {
        State.update({ emoji: "🙏 Thank you" });
        State.update({ show: false });
      }}
    >
      🙏
    </button>
    <button
      onClick={() => {
        State.update({ emoji: "😁 LOL" });
        State.update({ show: false });
      }}
    >
      😁
    </button>
    <button
      onClick={() => {
        State.update({ emoji: "👎 Negative" });
        State.update({ show: false });
      }}
    >
      👎
    </button>
    <button
      onClick={() => {
        State.update({ emoji: "🚀 Ship it" });
        State.update({ show: false });
      }}
    >
      🚀
    </button>
    <button
      onClick={() => {
        State.update({ emoji: "💯 Definitely" });
        State.update({ show: false });
      }}
    >
      💯
    </button>
    <button
      onClick={() => {
        State.update({ emoji: "👍 Like" });
        State.update({ show: false });
      }}
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
    >
      {state.emoji}
    </button>
  </OverlayTrigger>
);
