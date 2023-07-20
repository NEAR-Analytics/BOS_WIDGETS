const accountId = props.accountId || context.accountId;
const thumbnails = props.thumbnails;

if (!accountId) {
  return <></>;
}

const f = fetch(
  `https://api.kitwallet.app/account/${accountId}/likelyNFTsFromBlock`
);

if (!f.ok) {
  return "Loading";
}

const allNfts = f.body.list;

return (
  <div className="d-flex gap-1 flex-wrap">
    {allNfts.map((contractId, i) => (
      <Widget
        key={i}
        src="a13x.near/widget/owned-nfts--set-profile-pic"
        props={{ accountId, contractId }}
      />
    ))}
  </div>
);
