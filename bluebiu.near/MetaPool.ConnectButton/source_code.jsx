const { isWrongNetwork, account, chainId, chainName, isNear } = props;

const Button = styled.div`
  .connect-button {
    background-color: #373a53;
    width: 100%;
    height: 60px;
    border-radius: 8px;
    color: #c7ff18;
    font-size: 18px;
    font-weight: 500;
    border: 1px solid #c7ff18;

    &:active {
      background-color: #373a53;
      color: #c7ff18;
      border-color: #c7ff18;
    }
    @media (max-width: 768px) {
      height: 40px;
      font-size: 16px;
    }
  }
`;
if (isNear) {
  return (
    <Button>
      <button className="connect-button" disabled>
        + Connect Your Wallet
      </button>
    </Button>
  );
}

if (!account) {
  return (
    <Button>
      {!account && (
        <Web3Connect
          className="connect-button"
          connectLabel="+ Connect Your Wallet"
        />
      )}
    </Button>
  );
}

if (isWrongNetwork) {
  return (
    <Button>
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
    </Button>
  );
}
