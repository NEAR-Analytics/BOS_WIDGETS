const Dialog = styled.div`
  position: fixed;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
  display: none;

  &.display {
    display: block;
  }
`;
const Overlay = styled.div`
  width: 100%;
  height: 100%;
  background-color: rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(10px);
  position: absolute;
  z-index: 9999;
  display: flex;
  justify-content: center;
  align-items: center;
  @media (max-width: 900px) {
    align-items: flex-end;
  }
`;
const Content = styled.div`
  width: 460px;
  border-radius: 16px;
  border: 1px solid #2c334b;
  background-color: #FFF;
  @media (max-width: 900px) {
    width: 100%;
    border-radius: 16px 16px 0px 0px;
  }
`;
const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  color: #000;
  padding: 30px 30px 0px 30px;
`;
const InputWarpper = styled.div`
  height: 46px;
  border-bottom: 1px solid #332c4b;
  padding: 14px 30px 6px;
`;
const Input = styled.input`
  font-size: 16px;
  color: #000;
  font-weight: 500;
  width: 100%;
  background-color: transparent;
  outline: none;
  border: none;
`;
const Title = styled.div`
  font-size: 18px;
  font-weight: 500;
`;
const CurrencyList = styled.div`
  padding: 0px 30px 20px;
  max-height: calc(80vh - 120px);
  overflow-x: auto;
  @media (max-width: 900px) {
    max-height: 50vh;
  }
`;
const Empty = styled.div`
  min-height: 100px;
  line-height: 100px;
  text-align: center;
  font-size: 18px;
  color: #000;
`;
const Tokens = {
  "0xB31f66AA3C1e785363F0875A1B74E27b85FD66c7": {
    chainId: 43114,
    address: "0xB31f66AA3C1e785363F0875A1B74E27b85FD66c7",
    decimals: 18,
    symbol: "WAVAX",
    name: "Wrapped AVAX",
    icon: "https://raw.githubusercontent.com/Uniswap/assets/master/blockchains/avalanchec/assets/0xB31f66AA3C1e785363F0875A1B74E27b85FD66c7/logo.png",
  },
  native: {
    chainId: 43114,
    address: "native",
    decimals: 18,
    symbol: "AVAX",
    name: "Avalanche",
    icon: "https://raw.githubusercontent.com/Uniswap/assets/master/blockchains/avalanchec/assets/0xB31f66AA3C1e785363F0875A1B74E27b85FD66c7/logo.png",
  },
  "0xfaB550568C688d5D8A52C7d794cb93Edc26eC0eC": {
    chainId: 43114,
    address: "0xfaB550568C688d5D8A52C7d794cb93Edc26eC0eC",
    decimals: 6,
    symbol: "axlUSDC",
    name: "Axelar Wrapped USDC",
    icon: "https://ethereum-optimism.github.io/data/USDC/logo.png",
  },
};
const DexTokens = {
  TraderJoe: [
    Tokens["0xB31f66AA3C1e785363F0875A1B74E27b85FD66c7"],
    Tokens["0xfaB550568C688d5D8A52C7d794cb93Edc26eC0eC"],
    Tokens["native"],
  ],
};
const { title } = props;

if (Storage.privateGet("prevCurrencyTitle") !== title || !state.tokens) {
  State.update({
    tokens: DexTokens[title],
  });
  Storage.privateSet("prevCurrencyTitle", title);
}
const handleSearch = (e) => {
  State.update({
    tokens: e.target.value
      ? DexTokens[title].filter(
          (token) =>
            token.address === e.target.value ||
            token.name.toLowerCase().includes(e.target.value?.toLowerCase())
        )
      : DexTokens[title],
  });
};

return (
  <Dialog className={props.display ? "display" : ""}>
    <Overlay>
      <Content>
        <Header>
          <Title>Select a token</Title>
          <Widget
            src="0xfafa.near/widget/.CloseIcon"
            props={{ onClose: props.onClose }}
          />
        </Header>
        <InputWarpper>
          <Input
            placeholder="Search name or paste address"
            onChange={handleSearch}
          />
        </InputWarpper>
        <CurrencyList>
          {state.tokens?.map((currency) => (
            <Widget
              src="0xfafa.near/widget/Avalanche.Swap.CurrencyRow"
              props={{
                selectedTokenAddress: props.selectedTokenAddress,
                currency,
                display: props.display,
                onClick: () => {
                  props.onSelect?.(currency);
                  props.onClose();
                },
              }}
              key={currency.address}
            />
          ))}
          {(!state.tokens || !state.tokens.length) && <Empty>No token.</Empty>}
        </CurrencyList>
      </Content>
    </Overlay>
  </Dialog>
);
