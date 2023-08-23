const {
  isWrongNetwork,
  imgProps,
  noAccountTips,
  wrongNetworkTips,
  chainId,
  chainName,
} = props;

const account = Ethers.send("eth_requestAccounts", [])[0];

const BaseConnectWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 20px;

  .bridge-text {
    font-size: 32px;
    letter-spacing: 0em;
    color: #ffffff;
    line-height: 38px;
  }

  .connect-button {
    background-color: #004bfc;
    width: 488px;
    height: 60px;
    border-radius: 10px;
    color: #ffffff;
    border: none;
    font-size: 18px;
  }
`;

return (
  <BaseConnectWrapper>
    {imgProps && <img {...imgProps} />}
    <div className="bridge-text">
      {!account && noAccountTips}
      {isWrongNetwork && wrongNetworkTips}
    </div>
    {!account && (
      <Web3Connect className="connect-button" connectLabel="Connect Wallet" />
    )}
    {isWrongNetwork && (
      <button
        className="connect-button"
        onClick={() => {
          Ethers.send("wallet_switchEthereumChain", [
            { chainId: `0x${Number(chainId).toString(16)}` },
          ]);
        }}
      >
        Switch to {chainName} Chain
      </button>
    )}
  </BaseConnectWrapper>
);
