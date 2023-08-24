const account = Ethers.send("eth_requestAccounts", [])[0];

const CHAIN_ID = 8453;
const CHAIN_NAME = "Base";

const CONNECT_PROPS = {
  imgProps: {
    src: "https://ipfs.near.social/ipfs/bafkreigkxrlezj5i7jk3sfm4rmv2kui7oxz4skngjyiopl5rvbvvllnnja",
    style: {
      width: "404px",
      height: "220px",
      marginTop: "60px",
    },
  },
  noAccountTips: "Base Swap Collection",
  wrongNetworkTips: "To proceed, kindly switch to Base Chain.",
  chainId: CHAIN_ID,
  chainName: CHAIN_NAME,
};
if (!account) {
  return (
    <Widget
      src="bluebiu.near/widget/Base.BaseConnect"
      props={{
        ...CONNECT_PROPS,
        isWrongNetwork: false,
      }}
    />
  );
}
const DEXS = [
  {
    name: "BaseSwap",
    logo: "https://www.gitbook.com/cdn-cgi/image/width=40,dpr=2,height=40,fit=contain,format=auto/https%3A%2F%2F1348261154-files.gitbook.io%2F~%2Ffiles%2Fv0%2Fb%2Fgitbook-x-prod.appspot.com%2Fo%2Fspaces%252F2l8R5PBQEb9j87AEVFTv%252Ficon%252FfO1NO60iKDdgbEaPqmpQ%252FBaseswap_Logo.png%3Falt%3Dmedia%26token%3Dc22d4fa3-7fc5-4927-b4c1-0ccc3f337cdb",
  },
  {
    name: "RocketSwap",
    logo: "https://app.rocketswap.cc/_next/image?url=https%3A%2F%2Ftoken.g34gsgv.top%2Flogo.png&w=256&q=75",
  },
  {
    name: "SwapBased",
    logo: "https://swapbased.finance/static/media/base-logo.8e4c7d33.png",
  },
  {
    name: "Synthswap",
    logo: "https://www.synthswap.io/_next/image?url=%2Fimages%2Fsynth.png&w=48&q=75",
  },
];

State.init({
  chainId: -1,
  selectedDex: "BaseSwap",
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
      src="bluebiu.near/widget/Base.BaseConnect"
      props={{
        ...CONNECT_PROPS,
        isWrongNetwork: true,
      }}
    />
  );
}

const BaseDex = styled.div`
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
  color: #3d76ff;
  font-size: 18px;
  font-weight: 500;
  line-height: 22px;
  padding-left: 30px;
  padding-bottom: 10px;
`;
const List = styled.div`
  width: 250px;
  height: 278px;
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
  &:hover {
    background-color: rgba(0, 75, 252, 0.1);
  }
  &.active {
    background-color: #004bfc;
  }
`;
const Icon = styled.img`
  width: 30px;
  height: 30px;
  border: 1px solid #5285df;
  border-radius: 10px;
  margin-right: 20px;
`;
const ChainName = styled.div`
  font-size: 16px;
  font-weight: 500;
  line-height: 20px;
  color: #fff;
`;
const DexName = styled.div`
  font-size: 18px;
  font-weight: 700;
  line-height: 22px;
  color: #fff;
`;
const WidgetWrapper = styled.div`
  width: 560px;
`;

return (
  <BaseDex>
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
                <ChainName>BASE</ChainName>
                <DexName>{dex.name}</DexName>
              </div>
            </Row>
          ))}
        </List>
      </Sider>
      <WidgetWrapper>
        <Widget
          src="bluebiu.near/widget/Base.BaseSwapV2"
          props={{ title: state.selectedDex }}
        />
      </WidgetWrapper>
    </Flex>
  </BaseDex>
);
