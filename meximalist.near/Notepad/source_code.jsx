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
  <div>
    <div className="mb-2">
      <h4>ETH Cinco de Mayo - Lessons Learnead</h4>
      <h5>
        Please write down 5 of the best things in the hackathon and what you
        learned from them
      </h5>
      <textarea
        type="text"
        rows={10}
        className="form-control"
        value={state.note}
        onChange={(e) => State.update({ note: e.target.value })}
      />
    </div>
    <CommitButton data={{ experimental: { note: state.note } }}>
      Save note
    </CommitButton>
  </div>
);
