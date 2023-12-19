const {
  isWrongNetwork,
  imgProps,
  noAccountTips,
  wrongNetworkTips,
  chainId,
  chainName,
} = props;

const account = Ethers.send("eth_requestAccounts", [])[0];

const ConnectWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 20px;
  padding-top: 150px;

  .bridge-text {
    font-size: 32px;
    letter-spacing: 0em;
    color: #ffffff;
    line-height: 38px;
    @media (max-width: 640px) {
      font-size: 22px;
      line-height: 26px;
      text-align: center;
    }
  }

  .connect-button {
    background-color: #794fdd;
    max-width: 488px;
    width: 100%;
    height: 60px;
    border-radius: 10px;
    color: #ffffff;
    border: none;
    font-size: 18px;
    &:active {
      background-color: #794fdd;
    }
    &:focus-visible {
      box-shadow: none;
    }
  }
`;

return (
  <ConnectWrapper>
    {imgProps && <img {...imgProps} />}
    <div className="bridge-text">
      {!account && noAccountTips}
      {isWrongNetwork && wrongNetworkTips}
    </div>
    {!account && (
      <Web3Connect
        className="connect-button"
        connectLabel="Connect ETH Wallet"
      />
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
  </ConnectWrapper>
);
