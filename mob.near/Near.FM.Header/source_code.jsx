const accountId = props.accountId;
const isValidAccount =
  accountId && accountId.endsWith(".near") && accountId.split(".").length === 2;

return (
  <div className="text-center my-3">
    <h1>{isValidAccount ? `${accountId}.fm` : "near.fm"}</h1>
    {isValidAccount ? (
      <div>Your personal premium URL shortener</div>
    ) : (
      <p>Shorten your long URLs</p>
    )}
  </div>
);
