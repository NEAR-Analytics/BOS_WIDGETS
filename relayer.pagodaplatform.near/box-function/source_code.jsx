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

return (
  <>
    <Container>{renderFunction()}</Container>
    <StyledAddButton>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="18"
        height="18"
        viewBox="0 0 18 18"
        fill="none"
      >
        <path
          d="M9 6.75V11.25M11.25 9H6.75M15.75 9C15.75 9.88642 15.5754 10.7642 15.2362 11.5831C14.897 12.4021 14.3998 13.1462 13.773 13.773C13.1462 14.3998 12.4021 14.897 11.5831 15.2362C10.7642 15.5754 9.88642 15.75 9 15.75C8.11358 15.75 7.23583 15.5754 6.41689 15.2362C5.59794 14.897 4.85382 14.3998 4.22703 13.773C3.60023 13.1462 3.10303 12.4021 2.76381 11.5831C2.42459 10.7642 2.25 9.88642 2.25 9C2.25 7.20979 2.96116 5.4929 4.22703 4.22703C5.4929 2.96116 7.20979 2.25 9 2.25C10.7902 2.25 12.5071 2.96116 13.773 4.22703C15.0388 5.4929 15.75 7.20979 15.75 9Z"
          stroke="#FF0420"
          stroke-width="1.2"
          stroke-linecap="round"
          stroke-linejoin="round"
        />
      </svg>
      <span>Add</span>
    </StyledAddButton>
  </>
);
