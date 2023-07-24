const replaceXstr = () => {
  return ((Math.random() * 16) | 0).toString(16);
};

const refreshMongoObjectId = () => {
  var timestamp = ((new Date().getTime() / 1000) | 0).toString(16);
  var id =
    timestamp + "xxxxxxxxxxxxxxxx".replace(/[x]/g, replaceXstr).toLowerCase();

  console.log("id", id);
  State.update({ mongoObjectId: id });
};

const copyToClipboard = () => {
  console.log("id", state.mongoObjectId);
  clipboard.writeText(state.mongoObjectId);
};

if (state.mongoObjectId === undefined) {
  refreshMongoObjectId();
}

return (
  <div className="container">
    <h2>MongoDB ObjectId generator</h2>
    <div className="col-12  mb-3">
      <label for="objIdInput" class="form-label">
        Id:
      </label>
      <input
        type="text"
        id="objIdInput"
        className="form-control"
        value={state.mongoObjectId}
      />
    </div>
    <div className="col-12  mb-3">
      <button onClick={() => refreshMongoObjectId()}>New ObjectId</button>
    </div>
    <div className="col-12  mb-3">
      <button
        onClick={() => {
          clipboard.writeText(state.mongoObjectId);
        }}
      >
        Copy To Clipboard
      </button>
    </div>
  </div>
);
