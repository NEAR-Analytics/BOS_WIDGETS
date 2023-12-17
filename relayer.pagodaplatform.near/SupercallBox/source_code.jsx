const tokens = [
  {
    tokenAddress: "0x38430d2703246F986685F68E2817CB370F5f3CCD",
    tokenName: "USD Tether",
    tokenSymbol: "USDT",
    decimal: 18,
    logo: "https://assets.coincap.io/assets/icons/usdt@2x.png",
  },
  {
    tokenAddress: "0xEa5363305017B2A6fD0d72Ba830513c678a2f1fE",
    tokenName: "Dai stablecoin",
    tokenSymbol: "DAI",
    decimal: 18,
    logo: "https://assets.coincap.io/assets/icons/dai@2x.png",
  },
  {
    tokenAddress: "0x68cF7D5CEC3f8Cd69d7Bd842e1665818E46E2126",
    tokenName: "Wrapped Etherum",
    tokenSymbol: "WETH",
    decimal: 18,
    logo: "https://assets.coincap.io/assets/icons/weth@2x.png",
  },
];

const Container = styled.div`
  border-radius: 14px;
  border: 1px solid #e9ebed;
  width: 328px;
`;

const ContainerContent = styled.div`
  padding: 18px 22px;
`;

const TextHeader = styled.span`
  color: var(--Text-Primary-Text, #262930);
  /* p-ui-semibold */
  font-family: Mona Sans;
  font-size: 16px;
  font-style: normal;
  font-weight: 600;
  line-height: 24px; /* 150% */
`;

const StyleTextTitle = styled.span`
  color: var(--Text-Secondary-Text, #656973);

  /* body */
  font-family: Mona Sans;
  font-size: 14px;
  font-style: normal;
  font-weight: 400;
  line-height: 20px; /* 142.857% */
`;

const Divider = styled.div`
  height: 1px;
  padding: 0;
  background: #e5e7eb;
`;

const StyledBoxInput = styled.div`
  margin-bottom: 10px;
`;

const StyledAddButton = styled.button`
  width: 78px;
  height: 32px;
  display: flex;
  justify-content: center;
  border-radius: 10px;
  border: 1px solid #dde1e8;
  background-color: #fff4;
  background: var(#fff);
  box-shadow: 0px 1px 2px 0px rgba(16, 24, 40, 0.05);
  align-items: center;
`;

const StyledAddText = styled.span`
  color: var(#262930);

  /* subtle-semibold */
  font-family: Mona Sans;
  font-size: 14px;
  font-style: normal;
  font-weight: 600;
  line-height: 20px; /* 142.857% */
`;

initState({
  functionName: "",
  typeFunction: "swap",
  token: "USDT",
  toWalletAddress: "",
  amount: "",
  functionList: [],
});

const renderFunction = () => {
  if (state.typeFunction === "transfer") {
    return (
      <>
        <ContainerContent>
          <TextHeader>Transfer</TextHeader>
        </ContainerContent>
        <Divider />
        <ContainerContent>
          <StyledBoxInput>
            <StyleTextTitle>Token</StyleTextTitle>
            <select
              class="form-select mt-2"
              id="selectFunction"
              value={state.token}
              onChange={(e) => {
                State.update({ token: e.target.value });
              }}
            >
              {tokens.map((token) => (
                <option value={token.tokenSymbol}>
                  {/* <img src={token.logo} width={16} height={16} alt="img" /> */}
                  {token.tokenSymbol}
                </option>
              ))}
            </select>
          </StyledBoxInput>
          <StyledBoxInput>
            <StyleTextTitle>To</StyleTextTitle>
            <input
              class="form-control mt-2"
              type="text"
              placeholder="Wallet Address"
              onChange={(e) => {
                State.update({ toWalletAddress: e.target.value });
              }}
            />
          </StyledBoxInput>
          <StyledBoxInput>
            <StyleTextTitle>Amount</StyleTextTitle>
            <input
              class="form-control mt-2"
              type="number"
              placeholder="Amount"
              onChange={(e) => {
                State.update({ amount: e.target.value });
              }}
            />
          </StyledBoxInput>
        </ContainerContent>
      </>
    );
  } else if (state.typeFunction === "swap") {
    return (
      <>
        <ContainerContent>
          <TextHeader>Swap</TextHeader>
        </ContainerContent>
        <Divider />
        <ContainerContent>
          <StyledBoxInput>
            <StyleTextTitle>Input token</StyleTextTitle>
            <select
              class="form-select mt-2"
              id="selectFunction"
              value={state.token}
              onChange={(e) => {
                State.update({ token: e.target.value });
              }}
            >
              {tokens.map((token) => (
                <option value={token.tokenSymbol}>
                  {/* <img src={token.logo} width={16} height={16} alt="img" /> */}
                  {token.tokenSymbol}
                </option>
              ))}
            </select>
          </StyledBoxInput>
          <StyledBoxInput>
            <StyleTextTitle>Input amount</StyleTextTitle>
            <input
              class="form-control mt-2"
              type="number"
              placeholder="Amount"
              onChange={(e) => {
                State.update({ amount: e.target.value });
              }}
            />
          </StyledBoxInput>
          <StyledBoxInput>
            <StyleTextTitle>Output token</StyleTextTitle>
            <select
              class="form-select mt-2"
              id="selectFunction"
              value={state.token}
              onChange={(e) => {
                State.update({ token: e.target.value });
              }}
            >
              {tokens.map((token) => (
                <option value={token.tokenSymbol}>
                  {/* <img src={token.logo} width={16} height={16} alt="img" /> */}
                  {token.tokenSymbol}
                </option>
              ))}
            </select>
          </StyledBoxInput>
          <StyledBoxInput>
            <StyleTextTitle>Output amount</StyleTextTitle>
            <input
              class="form-control mt-2"
              type="number"
              placeholder="Amount"
              onChange={(e) => {
                State.update({ amount: e.target.value });
              }}
            />
          </StyledBoxInput>
        </ContainerContent>
      </>
    );
  }
};

return <Container>{renderFunction()}</Container>;
