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
  native: {
    chainId: props.chainId,
    address: "native",
    decimals: 18,
    symbol: "ETH",
    name: "Ether",
    icon: "https://app.camelot.exchange/images/tokens/weth.svg",
  },
  "0x912CE59144191C1204E64559FE8253a0e49E6548": {
    chainId: props.chainId,
    address: "0x912CE59144191C1204E64559FE8253a0e49E6548",
    decimals: 18,
    symbol: "ARB",
    name: "Arbitrum",
    icon: "https://arbiscan.io/token/images/arbitrumone2_32_new.png",
  },
  "0xFF970A61A04b1cA14834A43f5dE4533eBDDB5CC8": {
    chainId: props.chainId,
    address: "0xFF970A61A04b1cA14834A43f5dE4533eBDDB5CC8",
    decimals: 6,
    symbol: "USDC.e",
    name: "Bridged USDC",
    icon: "https://arbiscan.io/token/images/centre-usdc_28.png",
  },
  "0xaf88d065e77c8cC2239327C5EDb3A432268e5831": {
    chainId: props.chainId,
    address: "0xaf88d065e77c8cC2239327C5EDb3A432268e5831",
    decimals: 6,
    symbol: "USDC",
    name: "USD Coin",
    icon: "https://arbiscan.io/token/images/centre-usdc_28.png",
  },
  "0xFd086bC7CD5C481DCC9C85ebE478A1C0b69FCbb9": {
    chainId: props.chainId,
    address: "0xFd086bC7CD5C481DCC9C85ebE478A1C0b69FCbb9",
    decimals: 6,
    symbol: "USDT",
    name: "Tether USD",
    icon: "https://arbiscan.io/token/images/tether_32.png",
  },
  "0x6dD963C510c2D2f09d5eDdB48Ede45FeD063Eb36": {
    chainId: props.chainId,
    address: "0x6dD963C510c2D2f09d5eDdB48Ede45FeD063Eb36",
    decimals: 18,
    symbol: "FCTR",
    name: "Factor",
    icon: "https://arbiscan.io/token/images/factorfi2_32.png",
  },
  "0xD77B108d4f6cefaa0Cae9506A934e825BEccA46E": {
    chainId: props.chainId,
    address: "0xD77B108d4f6cefaa0Cae9506A934e825BEccA46E",
    decimals: 18,
    symbol: "WINR",
    name: "WINR",
    icon: "https://arbiscan.io/token/images/winr_32.png",
  },
  "0x0c880f6761F1af8d9Aa9C466984b80DAb9a8c9e8": {
    chainId: props.chainId,
    address: "0x0c880f6761F1af8d9Aa9C466984b80DAb9a8c9e8",
    decimals: 18,
    symbol: "PENDLE",
    name: "Pendle",
    icon: "https://arbiscan.io/token/images/pendlefin_32.png",
  },
  "0xfc5A1A6EB076a2C7aD06eD22C90d7E710E35ad0a": {
    chainId: props.chainId,
    address: "0xfc5A1A6EB076a2C7aD06eD22C90d7E710E35ad0a",
    decimals: 18,
    symbol: "GMX",
    name: "GMX",
    icon: "https://arbiscan.io/token/images/gmxarbi_32.png",
  },
  "0x982239D38Af50B0168dA33346d85Fb12929c4c07": {
    chainId: props.chainId,
    address: "0x982239D38Af50B0168dA33346d85Fb12929c4c07",
    decimals: 18,
    symbol: "TROVE",
    name: "Arbitrove Governance Token",
    icon: "https://arbiscan.io/token/images/nitrocartel_32.png",
  },
  "0x10393c20975cF177a3513071bC110f7962CD67da": {
    chainId: props.chainId,
    address: "0x10393c20975cF177a3513071bC110f7962CD67da",
    decimals: 18,
    symbol: "JONES",
    name: "Jones DAO",
    icon: "https://arbiscan.io/token/images/jonesdaoarb_32.png",
  },
  "0x82aF49447D8a07e3bd95BD0d56f35241523fBab1": {
    chainId: props.chainId,
    address: "0x82aF49447D8a07e3bd95BD0d56f35241523fBab1",
    decimals: 18,
    symbol: "WETH",
    name: "Wrapped Ether",
    icon: "https://arbiscan.io/token/images/weth_28.png",
  },
  "0x11F98c7E42A367DaB4f200d2fdc460fb445CE9a8": {
    chainId: props.chainId,
    address: "0x11F98c7E42A367DaB4f200d2fdc460fb445CE9a8",
    decimals: 18,
    symbol: "SPARTA",
    name: "SPARTA",
    icon: "https://arbiscan.io/token/images/spartadex_32.png",
  },
  "0x2f2a2543B76A4166549F7aaB2e75Bef0aefC5B0f": {
    chainId: props.chainId,
    address: "0x2f2a2543B76A4166549F7aaB2e75Bef0aefC5B0f",
    decimals: 8,
    symbol: "WBTC",
    name: "Wrapped BTC",
    icon: "https://arbiscan.io/token/images/wbtc_28.png",
  },
  "0x580E933D90091b9cE380740E3a4A39c67eB85B4c": {
    chainId: props.chainId,
    address: "0x580E933D90091b9cE380740E3a4A39c67eB85B4c",
    decimals: 18,
    symbol: "GSWIFT",
    name: "GameSwift",
    icon: "https://arbiscan.io/token/images/gswiftdao_32.png",
  },
  "0x3d9907F9a368ad0a51Be60f7Da3b97cf940982D8": {
    chainId: props.chainId,
    address: "0x3d9907F9a368ad0a51Be60f7Da3b97cf940982D8",
    decimals: 18,
    symbol: "GRAIL",
    name: "Camelot token",
    icon: "https://arbiscan.io/token/images/camelotexchange_32.png",
  },

  "0xAAA6C1E32C55A7Bfa8066A6FAE9b42650F262418": {
    chainId: props.chainId,
    address: "0xAAA6C1E32C55A7Bfa8066A6FAE9b42650F262418",
    decimals: 18,
    symbol: "RAM",
    name: "Ramses",
    icon: "https://arbiscan.io/token/images/ramsesexchange_32.png?v=3",
  },

  "0x17FC002b466eEc40DaE837Fc4bE5c67993ddBd6F": {
    chainId: props.chainId,
    address: "0x17FC002b466eEc40DaE837Fc4bE5c67993ddBd6F",
    decimals: 18,
    symbol: "FRAX",
    name: "Frax",
    icon: "https://arbiscan.io/token/images/frxcanonarb_32.png",
  },
};
const DexTokens = {
  Camelot: [
    Tokens["native"],
    Tokens["0x3d9907F9a368ad0a51Be60f7Da3b97cf940982D8"],
    Tokens["0x912CE59144191C1204E64559FE8253a0e49E6548"],
    Tokens["0xFF970A61A04b1cA14834A43f5dE4533eBDDB5CC8"],
    Tokens["0xaf88d065e77c8cC2239327C5EDb3A432268e5831"],
    Tokens["0xFd086bC7CD5C481DCC9C85ebE478A1C0b69FCbb9"],
    Tokens["0x6dD963C510c2D2f09d5eDdB48Ede45FeD063Eb36"],
    Tokens["0xD77B108d4f6cefaa0Cae9506A934e825BEccA46E"],
    Tokens["0x0c880f6761F1af8d9Aa9C466984b80DAb9a8c9e8"],
    Tokens["0xfc5A1A6EB076a2C7aD06eD22C90d7E710E35ad0a"],
    Tokens["0x982239D38Af50B0168dA33346d85Fb12929c4c07"],
    Tokens["0x10393c20975cF177a3513071bC110f7962CD67da"],
  ],
  Apeswap: [
    Tokens["native"],
    Tokens["0x82aF49447D8a07e3bd95BD0d56f35241523fBab1"],
    Tokens["0xFF970A61A04b1cA14834A43f5dE4533eBDDB5CC8"],
    Tokens["0xFd086bC7CD5C481DCC9C85ebE478A1C0b69FCbb9"],
  ],
  Spartadex: [
    Tokens["0x82aF49447D8a07e3bd95BD0d56f35241523fBab1"],
    Tokens["0xFF970A61A04b1cA14834A43f5dE4533eBDDB5CC8"],
    Tokens["0x11F98c7E42A367DaB4f200d2fdc460fb445CE9a8"],
    Tokens["0x912CE59144191C1204E64559FE8253a0e49E6548"],
    Tokens["0x2f2a2543B76A4166549F7aaB2e75Bef0aefC5B0f"],
    Tokens["0xFd086bC7CD5C481DCC9C85ebE478A1C0b69FCbb9"],
    Tokens["0x580E933D90091b9cE380740E3a4A39c67eB85B4c"],
  ],
  "Ramses V2": [
    Tokens["0x82aF49447D8a07e3bd95BD0d56f35241523fBab1"],
    Tokens["0xaf88d065e77c8cC2239327C5EDb3A432268e5831"],
    Tokens["0xFd086bC7CD5C481DCC9C85ebE478A1C0b69FCbb9"],
    Tokens["0x912CE59144191C1204E64559FE8253a0e49E6548"],
    Tokens["0xAAA6C1E32C55A7Bfa8066A6FAE9b42650F262418"],
    Tokens["0x17FC002b466eEc40DaE837Fc4bE5c67993ddBd6F"],
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
              src="bluebiu.near/widget/Arbitrum.Swap.CurrencyRow"
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
