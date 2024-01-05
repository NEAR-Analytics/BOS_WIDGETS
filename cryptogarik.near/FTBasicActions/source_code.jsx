const accountId = props.accountId || context.accountId;

if (!accountId) return <p>Please provide account id as props</p>;

return (
  <div>
    <Widget src="mob.near/widget/Profile.InlineBlock" props={{ accountId }} />
    <div>
      <button onClick={showListNFTsSection}>Register new FT</button>
      <button onClick={showMintNFTSection}>Claim FT</button>
    </div>
    <Widget
      src="cryptogarik.near/widget/FungibleTokenBalance"
      props={{ accountId }}
    />
  </div>
);
