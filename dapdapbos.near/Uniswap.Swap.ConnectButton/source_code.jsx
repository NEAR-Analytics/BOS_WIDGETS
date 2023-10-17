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

  .bridge-text {
    font-size: 32px;
    letter-spacing: 0em;
    color: #ffffff;
    line-height: 38px;
  }

  .connect-button {
    background-color: var(--button-color);
    width: 100%;
    max-width: 488px;
    height: 60px;
    border-radius: 10px;
    color: var(--button-text-color);
    border: none;
    font-size: 18px;
    font-weight: 700;
    &:active {
      background-color: var(--button-color);
    }
    &:focus-visible {
      box-shadow: none;
    }
  }
  @media (max-width: 768px) {
    .bridge-text {
      font-size: 24px;
      line-height: 28px;
      text-align: center;
    }
    .connect-img {
      width: 100% !important;
      height: auto !important;
    }
  }
`;

return (
  <ConnectWrapper>
    {imgProps && <img {...imgProps} className="connect-img" />}
    <div className="bridge-text">
      {!account && noAccountTips}
      {isWrongNetwork && wrongNetworkTips}
    </div>

    {/* select chains  */}

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
  </ConnectWrapper>
);
