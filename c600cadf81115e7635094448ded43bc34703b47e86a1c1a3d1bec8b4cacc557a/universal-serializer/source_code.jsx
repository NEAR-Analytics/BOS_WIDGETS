const onChange = ({ target }) => {
  State.update({ json: target.value });
};

const onClick = () => {
  asyncFetch("https://api.welldonestudio.io/universal-tx-serializer/near", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(JSON.parse(state.json)),
  })
    .then((res) => {
      State.update({ result: res.body.serializedTx });
    })
    .catch(() => {
      State.update({ result: "errors" });
    });
};

return (
  <>
    <div class="container">
      <p>
        <b> Input Tx Info (JSON): </b>
      </p>
      <textarea rows="4" cols="50" onChange={onChange} />
      <button id="clickButton" onClick={onClick}>
        Send
      </button>
      <p>
        <b> Serialized Tx: </b> {state.result}{" "}
      </p>
    </div>
  </>
);
