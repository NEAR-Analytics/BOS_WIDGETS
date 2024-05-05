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

const nearButtonLink =
  props.nearButtonLink || "https://wallet.mintbase.xyz/connect";
const nearButtonLabel = props.nearButtonLabel || "⋈ NEAR ";
const web3ButtonLabel = props.web3ButtonLabel || "⬨ Ethereum";
const nearButtonClass = props.nearButtonClass || "m-2 btn btn-outline-dark";
const web3ButtonClass = props.web3ButtonClass || "m-2 btn btn-outline-dark";

return (
  <>
    {accountId ? (
      ""
    ) : (
      <div className="m-2 d-flex flex-row justify-content-center">
        <div className="m-2 d-flex flex-column align-items-center">
          <a href={nearButtonLink} className={nearButtonClass}>
            {nearButtonLabel}
          </a>
          <img
            className="mt-2"
            style={{ maxWidth: "93px" }}
            src="https://wallet.mintbase.xyz/mintbase-wallet-logo.svg"
          />
        </div>
        <div className="m-2 d-flex flex-column align-items-center">
          <Web3Connect
            className={web3ButtonClass}
            connectLabel={web3ButtonLabel}
          />
          <img
            className="mt-3"
            style={{ maxWidth: "112px" }}
            src="https://www.blocknative.com/hubfs/Icons%20and%20Illustrations/Header%20Icons/blocknative%20light%20mode%20logo.svg"
          />
        </div>
      </div>
    )}
  </>
);
