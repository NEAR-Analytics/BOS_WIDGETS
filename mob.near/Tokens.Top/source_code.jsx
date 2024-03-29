const [tokenId, setTokenId] = useState(
  props.tokenId || context.tokenId || "wrap.near"
);
const [inputActionId, setInputActionId] = useState(tokenId);

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
          tokenId === inputActionId ? "btn-outline-secondary" : "btn-primary"
        }`}
        onClick={() => setTokenId(inputActionId)}
        href={`/mob.near/widget/Tokens.Top?tokenId=${inputActionId}`}
        type="button"
      >
        Apply
      </Link>
    </div>
    <Widget src="mob.near/widget/Tokens.Top.Inner" props={{ tokenId }} />
  </div>
);
