const tokens = [
  // eth testnet assets
  {
    address: "0x0000000000000000000000000000000000000000",
    chainId: 5,
    symbol: "ETH",
    decimals: 18,
    logoURI: "https://assets.coingecko.com/coins/images/279/small/ethereum.png",
  },
  {
    address: "0x07865c6E87B9F70255377e024ace6630C1Eaa37F",
    chainId: 5,
    symbol: "USDC",
    decimals: 6,
    logoURI:
      "https://assets.coingecko.com/coins/images/6319/small/USD_Coin_icon.png",
  },
  // eth mainnet assets
  {
    address: "0x0000000000000000000000000000000000000000",
    chainId: 1,
    symbol: "ETH",
    decimals: 18,
    logoURI: "https://assets.coingecko.com/coins/images/279/small/ethereum.png",
  },
  {
    address: "0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48",
    chainId: 1,
    symbol: "USDC",
    decimals: 6,
    logoURI:
      "https://assets.coingecko.com/coins/images/6319/small/USD_Coin_icon.png",
  },
];

const Container = styled.div`
    --op-primary-600: #EB0822;

    td, th {
        padding: 2px 5px;
        font-size: 12px;
    }
    button,
    fieldset,
    input {
        all: unset;
    }

    .TabsRoot {
        display: flex;
        flex-direction: column;
        max-width: 640px;
    }

    .TabsList {
        flex-shrink: 0;
        display: flex;
        border-bottom: 1px solid var(--mauve-6);
    }

    .TabsTrigger {
        font-family: inherit;
        background-color: white;
        padding: 0 20px;
        height: 45px;
        flex: 1;
        display: flex;
        align-items: center;
        justify-content: center;
        font-size: 15px;
        line-height: 1;
        user-select: none;
    }
    .TabsTrigger:first-child {
        border-top-left-radius: 6px;
    }
    .TabsTrigger:last-child {
        border-top-right-radius: 6px;
    }
    .TabsTrigger[data-state='active'] {
        box-shadow: inset 0 -1px 0 0 var(--op-primary-600), 0 1px 0 0 var(--op-primary-600);
    }

    .TabsContent {
        flex-grow: 1;
        padding: 20px;
        background-color: white;
        border-bottom-left-radius: 6px;
        border-bottom-right-radius: 6px;
        outline: none;
    }
`;

return (
  <Container>
    <Tabs.Root className="TabsRoot" defaultValue="deposits">
      <Tabs.List className="TabsList" aria-label="Transactions List">
        <Tabs.Trigger className="TabsTrigger" value="deposits">
          Deposits
        </Tabs.Trigger>
        <Tabs.Trigger className="TabsTrigger" value="withdrawals">
          Withdrawals
        </Tabs.Trigger>
      </Tabs.List>
      <Tabs.Content className="TabsContent" value="deposits">
        <Widget
          src="ciocan.near/widget/op-bridge-list-deposits"
          props={{ tokens }}
        />
      </Tabs.Content>
      <Tabs.Content className="TabsContent" value="withdrawals">
        <Widget
          src="ciocan.near/widget/op-bridge-list-withdrawals"
          props={{ tokens }}
        />
      </Tabs.Content>
    </Tabs.Root>
  </Container>
);
