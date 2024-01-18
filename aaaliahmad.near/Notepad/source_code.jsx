const accountId = context.accountId;

if (!accountId) {
  return "Please sign in with NEAR wallet";
}

const note = Social.get(`${accountId}/experimental/note`);

if (note === null) {
  return "Loading";
}

State.init({ note: note || "" });

return (
  <div className="notepad-container">
    <div className="mb-2">
      <h2 className="notepad-header">Open Web Academy Notepad</h2>
      <p className="notepad-info">
        Welcome to the Open Web Academy Notepad! Use this tool to jot down your
        thoughts and ideas. Your notes are securely stored on the NEAR
        blockchain.
      </p>
      <textarea
        type="text"
        rows={10}
        className="form-control notepad-textarea"
        value={state.note}
        onChange={(e) => State.update({ note: e.target.value })}
      />
    </div>
    <CommitButton data={{ experimental: { note: state.note } }}>
      Save note
    </CommitButton>
    <div className="notepad-footer">
      <p className="notepad-footer-text">
        Powered by NEAR Protocol | Developed with ❤️ by Open Web Academy
      </p>
    </div>
  </div>
);
