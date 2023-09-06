const account = Ethers.send("eth_requestAccounts", [])[0];

const CHAIN_ID = 42161;
const CHAIN_NAME = "Arbitrum One";

const CONNECT_PROPS = {
  imgProps: {
    src: "https://ipfs.near.social/ipfs/bafkreifeitks2bp3vyy7v7iznq6lf67dutvjjplzzbiwv4j2dheqiqqbpi",
    style: {
      width: "179px",
      height: "143px",
      marginTop: "80px",
    },
  },
  noAccountTips: "Arbitrum Dex Collection",
  wrongNetworkTips: "To proceed, kindly switch to Arbitrum One Chain.",
  chainId: CHAIN_ID,
  chainName: CHAIN_NAME,
};
if (!account) {
  return (
    <Widget
      src="bluebiu.near/widget/Arbitrum.Swap.ConnectButton"
      props={{
        ...CONNECT_PROPS,
        isWrongNetwork: false,
      }}
    />
  );
}
const DEXS = [
  {
    name: "Camelot",
    logo: "data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0idXRmLTgiPz4NCjwhLS0gR2VuZXJhdG9yOiBBZG9iZSBJbGx1c3RyYXRvciAyNS4xLjAsIFNWRyBFeHBvcnQgUGx1Zy1JbiAuIFNWRyBWZXJzaW9uOiA2LjAwIEJ1aWxkIDApICAtLT4NCjxzdmcgdmVyc2lvbj0iMS4xIiBpZD0iTGF5ZXJfMSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIiB4bWxuczp4bGluaz0iaHR0cDovL3d3dy53My5vcmcvMTk5OS94bGluayIgeD0iMHB4IiB5PSIwcHgiDQoJIHZpZXdCb3g9IjAgMCAxOTkuNyAyMDAiIHN0eWxlPSJlbmFibGUtYmFja2dyb3VuZDpuZXcgMCAwIDE5OS43IDIwMDsiIHhtbDpzcGFjZT0icHJlc2VydmUiPg0KPHN0eWxlIHR5cGU9InRleHQvY3NzIj4NCgkuc3Qwe2ZpbGw6I0ZBRkFGQTt9DQoJLnN0MXtmaWxsOiNGRkFGMUQ7fQ0KCS5zdDJ7ZmlsbDojMTYxNjE2O30NCjwvc3R5bGU+DQo8cGF0aCBjbGFzcz0ic3QxIiBkPSJNMTE3LjEsMjAwdi04Mi4yYzE5LjYsMi4xLDMyLjksMTEuMSwzMi45LDExLjFsMTIuNS0xNC4xYy0yMC41LTE0LjYtNTAuOS0xNS4yLTUwLjktMTUuMmwtNS01NS4yDQoJYzMuMy0yLjIsNS41LTUuOSw1LjUtMTAuMmMwLTYuNy01LjUtMTIuMi0xMi4yLTEyLjJzLTEyLjIsNS41LTEyLjIsMTIuMmMwLDQuMywyLjIsOC4xLDUuNSwxMC4ybC01LDU1LjJjMCwwLTMwLjQsMC41LTUwLjksMTUuMg0KCWwxMi41LDE0LjFjMCwwLDEzLjMtOSwzMi45LTExLjFWMjAwQzYuMSwxNDMuMi0wLjIsNjAuNywwLDMzLjNjMC01LjcsMy40LTEwLjksOC42LTEzLjJDMjMuOSwxMy4zLDU4LjgsMCw5OS44LDANCgljNDEsMCw3NS45LDEzLjMsOTEuMiwyMC4xYzUuMiwyLjMsOC42LDcuNSw4LjYsMTMuMkMxOTkuOCw2MC43LDE5My41LDE0My4yLDExNy4xLDIwMHoiLz4NCjwvc3ZnPg0K",
  },
  {
    name: "Apeswap",
    logo: "https://www.gitbook.com/cdn-cgi/image/width=40,dpr=2,height=40,fit=contain,format=auto/https%3A%2F%2F4031390532-files.gitbook.io%2F~%2Ffiles%2Fv0%2Fb%2Fgitbook-legacy-files%2Fo%2Fspaces%252F-MTJ1qyFf3rQZjewhth_%252Favatar-1615657020974.png%3Fgeneration%3D1615657021220196%26alt%3Dmedia",
  },
  {
    name: "Spartadex",
    logo: "https://spartadex.io/images/logo.svg",
  },

  {
    name: "Ramses V2",
    logo: "https://ipfs.near.social/ipfs/bafkreidgayoqzg4kqxz6eag4eridejkx3rszflfwbnitfqfohlmpk54w3i",
  },
];

State.init({
  chainId: -1,
  selectedDex: "Camelot",
});

Ethers.provider()
  .getNetwork()
  .then(({ chainId }) => {
    State.update({ chainId });
  })
  .catch(() => {});

if (state.chainId !== CHAIN_ID) {
  return (
    <Widget
      src="bluebiu.near/widget/Arbitrum.Swap.ConnectButton"
      props={{
        ...CONNECT_PROPS,
        isWrongNetwork: true,
      }}
    />
  );
}
const theme = {
  textColor: "#7794D3",
  buttonColor: "#33549C",
};
const Dex = styled.div`
  display: flex;
  justify-content: center;
  padding-top: 50px;
`;
const Flex = styled.div`
  display: flex;
`;
const Sider = styled.div`
  margin-right: 10px;
`;
const Title = styled.div`
  color: ${theme.textColor};
  font-size: 18px;
  font-weight: 500;
  line-height: 22px;
  padding-left: 30px;
  padding-bottom: 10px;
`;
const List = styled.div`
  width: 250px;
  border-radius: 16px;
  border: 1px solid #2c334b;
  padding: 10px;
  background-color: #181a27;
`;
const Row = styled.div`
  display: flex;
  align-items: center;
  cursor: pointer;
  padding: 10px;
  border-radius: 16px;
  background-color: transparent;
  transition: 0.5s;
  color: rgba(255, 255, 255, 0.5);
  &:hover {
    background-color: rgba(0, 75, 252, 0.1);
  }
  &.active {
    color: #fff;
    background-color: ${theme.buttonColor};
  }
`;
const Icon = styled.img`
  width: 30px;
  height: 30px;
  border: 1px solid #5285df;
  border-radius: 10px;
  margin-right: 20px;
  padding: 4px;
`;
const ChainName = styled.div`
  font-size: 16px;
  font-weight: 500;
  line-height: 20px;
`;
const DexName = styled.div`
  font-size: 18px;
  font-weight: 700;
  line-height: 22px;
`;
const WidgetWrapper = styled.div`
  width: 560px;
`;

return (
  <Dex>
    <Flex>
      <Sider>
        <Title>Chain & Dapp</Title>
        <List>
          {DEXS.map((dex) => (
            <Row
              key={dex.name}
              className={state.selectedDex === dex.name ? "active" : ""}
              onClick={() => {
                State.update({
                  selectedDex: dex.name,
                  dexProps: DexsConfig[dex.name],
                });
              }}
            >
              <Icon src={dex.logo} />
              <div>
                <ChainName>Arbitrum</ChainName>
                <DexName>{dex.name}</DexName>
              </div>
            </Row>
          ))}
        </List>
      </Sider>
      <WidgetWrapper>
        <Widget
          src="bluebiu.near/widget/Arbitrum.Swap.SwapV2"
          props={{ title: state.selectedDex, chainId: CHAIN_ID, theme }}
        />
      </WidgetWrapper>
    </Flex>
  </Dex>
);
