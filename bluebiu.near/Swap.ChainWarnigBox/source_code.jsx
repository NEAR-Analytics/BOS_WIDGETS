const { chain, theme } = props;

const SwitchButton = styled.button`
  cursor: pointer;
  white-space: nowrap;
  display: flex;
  align-items: center;
  justify-content: center;
  font-family: Gantari;
  font-size: 18px;
  font-weight: 500;
  letter-spacing: 0em;
  text-align: center;
  border-radius: 8px;
  width: 100%;
  margin-top: 22px;
  height: 46px;
  border: none;
  background: var(--button-color);
  color: var(--button-text-color);
`;

const Wrapper = styled.div`
  position: absolute;
  z-index: 40;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  padding: 36px 33px 20px;
  font-family: Gantari;
  font-size: 18px;
  font-weight: 500;
  line-height: 22px;
  letter-spacing: 0em;
  text-align: center;

  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  width: 334px;

  color: white;
  border-radius: 16px;
  border: 1px solid #373a53;
  background: #262836;
`;

const handleSwitchChain = () => {
  if (props.onSwitchChain) {
    props.onSwitchChain({
      chainId: `0x${Number(chain.chain_id).toString(16)}`,
    });
  } else {
    Ethers.send("wallet_switchEthereumChain", [
      { chainId: `0x${Number(chain.chain_id).toString(16)}` },
    ]);
  }
};

return (
  <Wrapper>
    <div
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        gap: "8px",
      }}
    >
      <img src={chain.logo} style={{ width: "26px", height: "26px" }} />
      <div style={{ fontSize: "18px", fontWeight: 500 }}>{chain.name}</div>
    </div>
    <div style={{ marginTop: "17px" }}>Please connect to {chain.name}</div>
    <SwitchButton
      onClick={() => handleSwitchChain()}
      style={theme ? theme : {}}
    >
      {props.switchingChain ? (
        <Widget
          src="bluebiu.near/widget/0vix.LendingLoadingIcon"
          props={{
            size: 16,
          }}
        />
      ) : (
        "Switch Network"
      )}
    </SwitchButton>
    {/* <div
      style={{
        fontSize: "14px",
        fontWeight: 400,
        color: "#979ABE",
        cursor: "pointer",
        textAlign: "center",
        marginTop: "15px",
      }}
    >
      Close
    </div> */}
  </Wrapper>
);
