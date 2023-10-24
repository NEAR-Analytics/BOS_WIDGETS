const componentsUrl = "#/near/widget/ComponentsPage";
//bozon.near/widget/WidgetHistory

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 24px;
`;

const H2 = styled.h2`
  font-size: 19px;
  line-height: 22px;
  color: #11181c;
  margin: 0;
`;

const Header = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 12px;
`;

const TextLink = styled.a`
  color: #006adc;
  outline: none;
  font-weight: 600;
  font-size: 12px;
  line-height: 20px;

  &:hover,
  &:focus {
    color: #006adc;
    text-decoration: underline;
  }
`;

const componentsSrc = [
  "bluebiu.near/widget/AllChains.AllChainsPage",
  "juaner.near/widget/MetaPool.Stake",
  "bluebiu.near/widget/Linea.Lending",
  "bluebiu.near/widget/ZKEVM-all-in-one",
  "bluebiu.near/widget/Polygon.Lending",
  "bluebiu.near/widget/Mantle.Lending",
  "bluebiu.near/widget/Avalanche.Lending",
  "bluebiu.near/widget/Base.Lending",
  "bluebiu.near/widget/Gnosis.Lending",
  "bluebiu.near/widget/zkSync.Lending",
  "bluebiu.near/widget/Arbitrum.Lending",
  "bluebiu.near/widget/Optimism.Lending",
  "bluebiu.near/widget/Bsc.Lending",
  "bluebiu.near/widget/Base.All-in-one",
  "bluebiu.near/widget/Linea.Dapps",
  "bluebiu.near/widget/Linea.All-in-one",
  "bluebiu.near/widget/Optimism.Dex",
  "bluebiu.near/widget/Optimism.Dapps",
  "bluebiu.near/widget/Base.BaseDapps",
  "bluebiu.near/widget/Arbitrum.Dapps",
  "bluebiu.near/widget/Bsc.Dapps",
  "bluebiu.near/widget/Polygon.Dapps",
  "bluebiu.near/widget/Metis.Dapps",
  "bluebiu.near/widget/zkSync.Dapps",
  "bluebiu.near/widget/Gnosis.Dapps",
  "bluebiu.near/widget/Avalanche.Dapps",
  "bluebiu.near/widget/Metis.Bridge",
  "bluebiu.near/widget/Base.Bridge",
  "bluebiu.near/widget/Linea.Bridge",
  "bluebiu.near/widget/Bsc.Bridge",
  "bluebiu.near/widget/Mantle.All-in-one",
  "bluebiu.near/widget/Polygon.All-in-one",
  "bluebiu.near/widget/zkSync.All-in-one",
  "bluebiu.near/widget/Metis.All-in-one",
  "bluebiu.near/widget/Arbitrum.All-in-one",
  "bluebiu.near/widget/Gnosis.Swap.Dex",
  "bluebiu.near/widget/zkSync.Swap.Dex",
  "bluebiu.near/widget/Linea.Swap.Dex",
  "bluebiu.near/widget/Polygon.Swap.Dex",
  "bluebiu.near/widget/Bsc.Swap.Dex",
  "bluebiu.near/widget/Arbitrum.Swap.Dex",
  "bluebiu.near/widget/Metix.Swap.Dex",
  "bluebiu.near/widget/Mantle.Swap",
  "bluebiu.near/widget/Arbitrum.Pendle.TradeMarkets",
  "bluebiu.near/widget/0vix.Lending",
  "aave-v3.near/widget/AAVE",
  "ref-admin.near/widget/ZKEVM.GAMMA",
  "ref-admin.near/widget/ZKEVMSwap.zkevm-swap",
  "ref-admin.near/widget/ZKEVMSwap.zkevm-bridge",
  "ref-admin.near/widget/ZKEVM.AAVE",
  "meta-pool-official.near/widget/MetaPoolStakeEth",
  "zavodil.near/widget/DexData",
  "mattlock.near/widget/Galxe-SpaceID",
  "zavodil.near/widget/Lido",
  "0xprometheus.near/widget/GainsNetwork",
  "tribos.near/widget/swap",
  "mattlock.near/widget/canto-swap-container",
  "alotaco.near/widget/SushiSwap",
  "0xprometheus.near/widget/NftMinter",
  "a_liutiev.near/widget/ETHDenver2023",
  "zavodil.near/widget/erc20-sender",
  "syi216.near/widget/Swap-ethxsushi-usdt-near",
  "testbrrr.near/widget/zksync",
  "mattlock.near/widget/Galxe-SpaceID",
  "testbrrr.near/widget/zk-bridge",
  "testbrrr.near/widget/zkevm ciocan.near/widget/zk-bridge",
  "syi216.near/widget/GNS-Container",
  "onboarder.near/widget/polygon-erc20-sender",
  "chanon.near/widget/1inch",
  "garlicfaucet.near/widget/liquityWidget",
  "yairnava.near/widget/Burrito-Virtual-Pet-Interact",
  "yairnava.near/widget/Burrito-Virtual-Pet-Mint ",
];

const Items = styled.div`
  display: flex;
  flex-direction: column;
  gap: 18px;
`;

const Item = styled.div``;

const renderItems = () => {
  return componentsSrc.map((src) => (
    <Item key={src}>
      <Widget src="near/widget/ComponentCard" props={{ src: src }} />
    </Item>
  ));
};

return (
  <Wrapper>
    <Header>
      <H2>EVM/Eth Components</H2>
    </Header>
    <Items>{renderItems()}</Items>
  </Wrapper>
);
