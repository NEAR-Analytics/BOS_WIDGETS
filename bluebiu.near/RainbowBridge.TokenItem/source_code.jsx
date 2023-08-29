const {
  token,
  sender,
  onSelectToken,
  onlyShowHasBalance,
  sourceBridge,
  bothConnected,
  selectToken,
  forceReload,
} = props;

const TokenDark = styled.div`
  opacity: ${(p) => (p.haveBalance ? "1" : "0.5")};
  width: max-content;
  height: 36px;
  color: white;
  border-radius: 23px;
  background: #373a53;
  display: flex;
  align-items: center;
  border: 1px solid transparent;
  gap: 4px;
  padding-left: 2px;
  padding-right: 8px;

  .token-icon {
    width: 30px;
    height: 30px;
    border-radius: 100%;
    background: white;
  }
`;

const TokenLight = styled.div`
  width: max-content;
  height: 36px;
  color: white;
  border-radius: 23px;
  background: #373a53;
  display: flex;
  align-items: center;
  gap: 4px;
  padding-left: 2px;
  cursor: pointer;
  padding-right: 8px;
  border: 1px solid transparent;
  :hover {
    background: #1e202f;
    border: 1px solid #00ffa3;
  }
  .token-icon {
    width: 30px;
    height: 30px;
    border-radius: 100%;
    background: white;
  }
`;

const chainBalance =
  sourceBridge === "near"
    ? Number(state.nearBalance)
    : Number(state.ethBalance);

const showToken = !onlyShowHasBalance || (!!state.loadDone && chainBalance > 0);

const StyledToken =
  !bothConnected || chainBalance == 0 ? TokenDark : TokenLight;

console.log("nearbalance", state.nearBalance, "ethbalance", state.ethBalance);

return (
  <>
    <Widget
      src="bluebiu.near/widget/RainbowBridge.getBalanceOnToken"
      props={{
        token: token,
        sender: sender,
        onLoad: (data) => {
          State.update({
            nearBalance: data.nearBalance,
            ethBalance: data.ethBalance,
            loadDone: true,
          });
        },
      }}
    />

    {showToken && (
      <StyledToken
        onClick={() => {
          if (!bothConnected || chainBalance === 0) {
            return;
          }
          onSelectToken({
            token,
            nearBalance: state.nearBalance,
            ethBalance: state.ethBalance,
          });
        }}
        style={{
          background:
            !(!bothConnected || Number(chainBalance) === 0) &&
            selectToken.symbol === token.symbol
              ? "#1e202f"
              : "",
          border:
            !(!bothConnected || Number(chainBalance) === 0) &&
            selectToken.symbol === token.symbol
              ? "1px solid #00ffa3"
              : "",
        }}
      >
        <img className="token-icon" src={token.icon} />

        <span>{token.symbol}</span>
      </StyledToken>
    )}
  </>
);
