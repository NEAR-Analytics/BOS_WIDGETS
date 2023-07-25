const encodeBtn = () => {
  var txt = Buffer.from(state.inputText).toString("base64");
  State.update({ outputText: txt });
};

const decodeBtn = () => {
  var txt = Buffer.from(state.inputText, "base64").toString();
  State.update({ outputText: txt });
};

const inputChange = (event) => {
  console.log("val:", event.target.value);
  State.update({ inputText: event.target.value });
};

return (
  <div>
    <h2>Base64 Encode & Decode</h2>
    <div className="col-12  mb-3">
      <label for="inputText" className="form-label">
        Input:
      </label>
      <textarea
        id="inputText"
        className="form-control"
        name="inputText"
        rows="4"
        cols="50"
        value={state.inputText}
        onChange={inputChange}
      ></textarea>
    </div>
    <div className="col-12  mb-3">
      <label for="outputText" className="form-label">
        Output:
      </label>
      <textarea
        id="outputText"
        className="form-control"
        name="outputText"
        rows="4"
        cols="50"
        value={state.outputText}
      ></textarea>
    </div>
    <div className="col-12  mb-3">
      <button onClick={() => encodeBtn()}>Encode</button>
      <button onClick={() => decodeBtn()}>Decode</button>
      <button
        onClick={() => {
          clipboard.writeText(state.outputText);
          State.update({ copied: true });
          setTimeout(() => {
            State.update({ copied: false });
          }, 2000);
        }}
      >
        {state.copied ? "Copied" : "Copy Output To Clipboard"}
      </button>
    </div>
  </div>
);
