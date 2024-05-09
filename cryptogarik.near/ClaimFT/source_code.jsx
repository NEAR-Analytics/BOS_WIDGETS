const accountId = props.accountId || context.accountId;
const ftContract = "dtest.tkn.near";
const claimContract = "claim-ft-example.near";

if (!(state.accountId && state.ftContract && state.claimContract)) {
  State.update({
    accountId,
    ftContract,
    claimContract,
  });
}

const handleClaim = () => {
  Near.call({
    contractName: state.claimContract,
    methodName: "claim",
    args: {},
    gas: 100000000000000,
    deposit: 1,
  });
};

return (
  <div>
    <div>
      FT contract
      <input type="text" value={state.ftContract} disabled />
    </div>
    <div>
      <button onClick={handleClaim}>Claim</button>
    </div>
  </div>
);
