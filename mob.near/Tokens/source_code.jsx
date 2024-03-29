const [accountId, setAccountId] = useState(
  props.accountId || context.accountId || "v2.ref-finance.near"
);
const [inputActionId, setInputActionId] = useState(accountId);

return (
  <div>
    <div className="input-group mb-3">
      <input
        className="form-control"
        value={inputActionId}
        onChange={(e) => setInputActionId(e.target.value)}
      />
      <Link
        className={`btn ${
          accountId === inputActionId ? "btn-outline-secondary" : "btn-primary"
        }`}
        onClick={() => setAccountId(inputActionId)}
        href={`/mob.near/widget/Tokens?accountId=${inputActionId}`}
        type="button"
      >
        Apply
      </Link>
    </div>
    <Widget src="mob.near/widget/Tokens.Inner" props={{ accountId }} />
  </div>
);
