const accountId = props.accountId || context.accountId;

if (
  state.chainId === undefined &&
  ethers !== undefined &&
  Ethers.send("eth_requestAccounts", [])[0]
) {
  Ethers.provider()
    .getNetwork()
    .then((chainIdData) => {
      if (chainIdData?.chainId) {
        State.update({ chainId: chainIdData.chainId });
      }
    });
}

const nearButtonLabel = props.nearButtonLabel || "⋈ Get NEAR";
const web3ButtonLabel = props.web3ButtonLabel || "⬨ Web3Connect";
const nearButtonClass = props.nearButtonClass || "m-1 btn btn-outline-dark";
const web3ButtonClass = props.web3ButtonClass || "m-1 btn btn-outline-dark";

return (
  <>
    {accountId ? (
      ""
    ) : (
      <>
        <a href="https://shard.dog/nearweek" className={nearButtonClass}>
          {nearButtonLabel}
        </a>
        <Web3Connect
          className={web3ButtonClass}
          connectLabel={web3ButtonLabel}
        />
      </>
    )}
  </>
);
