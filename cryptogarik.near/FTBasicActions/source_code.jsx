State.init({
  showTokenListSection: false,
  showRegisterFTSection: false,
  showClaimFTSection: false,
});

const accountId = props.accountId || context.accountId;

if (!accountId) return <p>Please provide account id as props</p>;

const showTokenListSection = () => {
  State.update({
    showTokenListSection: !state.showTokenListSection,
    showRegisterFTSection: false,
    showClaimFTSection: false,
  });
};

const showRegisterFTSection = () => {
  State.update({
    showTokenListSection: false,
    showRegisterFTSection: !state.showRegisterFTSection,
    showClaimFTSection: false,
  });
};

const showClaimFTSection = () => {
  State.update({
    showTokenListSection: false,
    showRegisterFTSection: false,
    showClaimFTSection: !state.showClaimFTSection,
  });
};

return (
  <div>
    <Widget src="mob.near/widget/Profile.InlineBlock" props={{ accountId }} />
    <div>
      <button onClick={showTokenListSection}>Show balances</button>
      <button onClick={showRegisterFTSection}>Register new FT</button>
      <button onClick={showClaimFTSection}>Claim FT</button>
    </div>
    {state.showTokenListSection ? (
      <Widget
        src="cryptogarik.near/widget/FungibleTokenBalance"
        props={{ accountId }}
      />
    ) : null}
    {state.showRegisterFTSection ? (
      <Widget
        src="cryptogarik.near/widget/RegistrationFT"
        props={{ accountId }}
      />
    ) : null}
    {state.showClaimFTSection ? (
      <Widget src="cryptogarik.near/widget/ClaimFT" props={{ accountId }} />
    ) : null}
  </div>
);
