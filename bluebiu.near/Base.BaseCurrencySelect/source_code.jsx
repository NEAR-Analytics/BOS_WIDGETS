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
  background-color: #181a27;
  @media (max-width: 900px) {
    width: 100%;
    border-radius: 16px 16px 0px 0px;
  }
`;
const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  color: #fff;
  padding: 30px 30px 0px 30px;
`;
const InputWarpper = styled.div`
  height: 46px;
  border-bottom: 1px solid #332c4b;
  padding: 14px 30px 6px;
`;
const Input = styled.input`
  font-size: 16px;
  color: #fff;
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
  color: #fff;
`;
const Tokens = {
  "0x2Ae3F1Ec7F1F5012CFEab0185bfc7aa3cf0DEc22": {
    chainId: 8453,
    address: "0x2Ae3F1Ec7F1F5012CFEab0185bfc7aa3cf0DEc22",
    decimals: 18,
    symbol: "cbETH",
    name: "Coinbase Wrapped Staked ETH",
    icon: "https://basescan.org/token/images/coinbasecbeth_32.png",
  },
  "0x4200000000000000000000000000000000000006": {
    chainId: 8453,
    address: "0x4200000000000000000000000000000000000006",
    decimals: 18,
    symbol: "WETH",
    name: "Wrapped Ether",
    icon: "https://ethereum-optimism.github.io/data/WETH/logo.png",
  },
  native: {
    chainId: 8453,
    address: "native",
    decimals: 18,
    symbol: "ETH",
    name: "Ether",
    icon: "https://storage.googleapis.com/prod-pendle-bucket-a/images/assets/simple/55ac44e4-bb2e-4637-92d8-3031b672670a.svg",
  },
  "0xEB466342C4d449BC9f53A865D5Cb90586f405215": {
    chainId: 8453,
    address: "0xEB466342C4d449BC9f53A865D5Cb90586f405215",
    decimals: 6,
    symbol: "axlUSDC",
    name: "Axelar Wrapped USDC",
    icon: "https://ethereum-optimism.github.io/data/USDC/logo.png",
  },
  "0x78a087d713Be963Bf307b18F2Ff8122EF9A63ae9": {
    chainId: 8453,
    address: "0x78a087d713Be963Bf307b18F2Ff8122EF9A63ae9",
    decimals: 18,
    symbol: "BSWAP",
    name: "Baseswap Token",
    icon: "https://baseswap.fi/images/tokens/0x78a087d713be963bf307b18f2ff8122ef9a63ae9.png",
  },
  "0x50c5725949A6F0c72E6C4a641F24049A917DB0Cb": {
    chainId: 8453,
    address: "0x50c5725949A6F0c72E6C4a641F24049A917DB0Cb",
    decimals: 18,
    symbol: "DAI",
    name: "Dai Stablecoin",
    icon: "https://basescan.org/token/images/daistablecoin_32.png",
  },
  "0xd9aAEc86B65D86f6A7B5B1b0c42FFA531710b6CA": {
    chainId: 8453,
    address: "0xd9aAEc86B65D86f6A7B5B1b0c42FFA531710b6CA",
    decimals: 6,
    symbol: "USDbC",
    name: "USD Base Coin",
    icon: "https://basescan.org/token/images/usdbc_ofc_32.png",
  },
  "0x6653dD4B92a0e5Bf8ae570A98906d9D6fD2eEc09": {
    chainId: 8453,
    address: "0x6653dD4B92a0e5Bf8ae570A98906d9D6fD2eEc09",
    decimals: 18,
    symbol: "RCKT",
    name: "RocketSwap",
    icon: "https://basescan.org/token/images/rocketswap_32.png",
  },
  "0x27D2DECb4bFC9C76F0309b8E88dec3a601Fe25a8": {
    chainId: 8453,
    address: "0x27D2DECb4bFC9C76F0309b8E88dec3a601Fe25a8",
    decimals: 18,
    symbol: "BALD",
    name: "Bald",
    icon: "https://basescan.org/token/images/bald_32.png",
  },
  "0xd07379a755A8f11B57610154861D694b2A0f615a": {
    chainId: 8453,
    address: "0xd07379a755A8f11B57610154861D694b2A0f615a",
    decimals: 18,
    symbol: "BASE",
    name: "BASE Token",
    icon: "https://swapbased.finance/static/media/0xd07379a755a8f11b57610154861d694b2a0f615a.8e4c7d33.png",
  },
  "0xbd2DBb8eceA9743CA5B16423b4eAa26bDcfE5eD2": {
    chainId: 8453,
    address: "0xbd2DBb8eceA9743CA5B16423b4eAa26bDcfE5eD2",
    decimals: 18,
    symbol: "SYNTH",
    name: "Synth Token",
    icon: "https://basescan.org/token/images/synthswap_32.png",
  },
  "0x081AD949deFe648774C3B8deBe0E4F28a80716dc": {
    chianId: 8453,
    address: "0x081AD949deFe648774C3B8deBe0E4F28a80716dc",
    decimals: 18,
    symbol: "HZN",
    name: "Horizon",
    icon: "https://assets.coingecko.com/coins/images/31156/small/Circle_logo_black_%281%29.png?1691040942",
  },
  "0x2Ae3F1Ec7F1F5012CFEab0185bfc7aa3cf0DEc22": {
    chainId: 8453,
    address: "0x2Ae3F1Ec7F1F5012CFEab0185bfc7aa3cf0DEc22",
    decimals: 18,
    symbol: "cbETH",
    name: "Coinbase Wrapped Staked ETH",
    icon: "https://assets.coingecko.com/coins/images/27008/small/cbeth.png?1661390066",
  },
};
const DexTokens = {
  BaseSwap: [
    Tokens["0x2Ae3F1Ec7F1F5012CFEab0185bfc7aa3cf0DEc22"],
    Tokens["0x4200000000000000000000000000000000000006"],
    Tokens["native"],
    Tokens["0xEB466342C4d449BC9f53A865D5Cb90586f405215"],
    Tokens["0x78a087d713Be963Bf307b18F2Ff8122EF9A63ae9"],
    Tokens["0x50c5725949A6F0c72E6C4a641F24049A917DB0Cb"],
    Tokens["0xd9aAEc86B65D86f6A7B5B1b0c42FFA531710b6CA"],
  ],
  RocketSwap: [
    Tokens["0x6653dD4B92a0e5Bf8ae570A98906d9D6fD2eEc09"],
    Tokens["0x4200000000000000000000000000000000000006"],
    Tokens["native"],
    Tokens["0x27D2DECb4bFC9C76F0309b8E88dec3a601Fe25a8"],
    Tokens["0xd07379a755A8f11B57610154861D694b2A0f615a"],
    Tokens["0xEB466342C4d449BC9f53A865D5Cb90586f405215"],
  ],
  SwapBased: [
    Tokens["0x6653dD4B92a0e5Bf8ae570A98906d9D6fD2eEc09"],
    Tokens["0x4200000000000000000000000000000000000006"],
    Tokens["native"],
    Tokens["0x27D2DECb4bFC9C76F0309b8E88dec3a601Fe25a8"],
    Tokens["0xd07379a755A8f11B57610154861D694b2A0f615a"],
    Tokens["0xEB466342C4d449BC9f53A865D5Cb90586f405215"],
    Tokens["0x50c5725949A6F0c72E6C4a641F24049A917DB0Cb"],
  ],
  Synthswap: [
    Tokens["0xbd2DBb8eceA9743CA5B16423b4eAa26bDcfE5eD2"],
    Tokens["0x4200000000000000000000000000000000000006"],
    Tokens["native"],
    Tokens["0x50c5725949A6F0c72E6C4a641F24049A917DB0Cb"],
    Tokens["0xd9aAEc86B65D86f6A7B5B1b0c42FFA531710b6CA"],
  ],
  HorizonDEX: [
    Tokens["0x081AD949deFe648774C3B8deBe0E4F28a80716dc"],
    Tokens["0x2Ae3F1Ec7F1F5012CFEab0185bfc7aa3cf0DEc22"],
    Tokens["0x4200000000000000000000000000000000000006"],
    Tokens["native"],
    Tokens["0x50c5725949A6F0c72E6C4a641F24049A917DB0Cb"],
    Tokens["0xEB466342C4d449BC9f53A865D5Cb90586f405215"],
    Tokens["0xd9aAEc86B65D86f6A7B5B1b0c42FFA531710b6CA"],
    Tokens["0x78a087d713Be963Bf307b18F2Ff8122EF9A63ae9"],
    Tokens["0x27D2DECb4bFC9C76F0309b8E88dec3a601Fe25a8"],
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
            src="bluebiu.near/widget/Base.BaseCloseIcon"
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
              src="bluebiu.near/widget/Base.BaseCurrencyRow"
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
