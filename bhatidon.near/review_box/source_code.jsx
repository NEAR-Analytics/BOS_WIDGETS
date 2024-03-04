const accountId = context.accountId;

if (!accountId) {
  return "Please sign in with NEAR wallet";
}

const note = Social.get(`${accountId}/experimental/note`);

if (note === null) {
  return "Loading";
}

State.init({ note: note || "" });

const body = styled.div`
background-color: pink;
`;

const text = styled.div`
background-color: white;
height:100px;
display:flex;
weight:50%;
`;

return (
  <body>
    <div>
      <img src="https://i.ibb.co/hH3SmWq/fotor-202401300583.png"></img>
      <div className="mb-2">
        <h4>NEAR INDIA </h4>
        <h5>Please write down 5 of the best things about Near India</h5>
        <text>
          <textarea
            type="text"
            rows={10}
            className="form-control"
            value={state.note}
            onChange={(e) => State.update({ note: e.target.value })}
          />
        </text>
      </div>
      <CommitButton data={{ experimental: { note: state.note } }}>
        Save note
      </CommitButton>
    </div>
  </body>
);
