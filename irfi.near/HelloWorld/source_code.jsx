State.init({
  message: "Ini pesan",
});

function onChangeMessage() {
  State.update({
    message: "Pesan terganti",
  });
}

return (
  <>
    <h1>Hello World</h1>
    <h2>Hello World</h2>
    <p style={{ color: "blue" }}>Hello World</p>

    <p>Message: {state.message}</p>

    <button onClick={onChangeMessage}>Change Message</button>

    <p>Reply: {props.reply ? props.reply : <b>"Empty reply"</b>}</p>
  </>
);
