const Container = styled.div`
  display: flex;
  justify-content: center;
  .mt_20 {
    margin-top: 20px;
  }
  .fw_700 {
    font-weight: 700;
  }
`;
const Panel = styled.div`
  max-width: 540px;
  width: 90vw;
`;
const Main = styled.div`
  width: 100%;
  background-color: #25283a;
  padding: 20px;
  border-radius: 0px 0px 20px 20px;
  @media (max-width: 768px) {
    padding: 0px;
  }
`;

const Chains = {
  ETH: {
    icon: "https://ipfs.near.social/ipfs/bafkreifamleycojeunphxcbdi7kkpvgfi3gukcctnelqzbbstdw6ckvvmq",
    symbol: "ETH",
  },
  NEAR: {
    icon: "https://ipfs.near.social/ipfs/bafkreidqawhdwguwpnxvphoudpx2rwm2db5bylwgqqgzw3rqtxr3arz3jm",
    symbol: "NEAR",
  },
};

const fetchMetrics = () => {
  asyncFetch("https://eth-metapool.narwallets.com/metrics_json").then((res) => {
    const data = res.body;
    State.update({
      ethApy: data?.mp_eth_30_day_apy ? data.mp_eth_30_day_apy.toFixed(2) : "-",
      mpethPrice: data?.mpethPrice,
    });
  });
  asyncFetch("https://validators.narwallets.com/metrics_json").then((res) => {
    const data = res.body;
    State.update({
      nearApy: data?.st_near_30_day_apy
        ? data.st_near_30_day_apy.toFixed(2)
        : "-",
      stnearPrice: data?.st_near_price,
      stnearPriceUsd: data?.st_near_price_usd,
      nearUsdPrice: data?.near_usd_price,
      nearContractData: {
        totalSupply: data?.total_stake_shares || 0,
        totalAssets: data?.total_for_staking || 0,
      },
    });
  });
};

if (!state.metrics) {
  fetchMetrics();
  State.update({
    metrics: true,
  });
}
if (!Storage.privateGet("tab")) {
  Storage.privateSet("tab", "ETH");
}

return (
  <Container>
    <Panel>
      <Widget
        src="bluebiu.near/widget/MetaPool.Header"
        props={{
          chain: Storage.privateGet("tab"),
          chains: Object.values(Chains),
          ethApy: state.ethApy,
          nearApy: state.nearApy,
          onChange: (chain) => {
            Storage.privateSet("tab", chain);
          },
        }}
      />
      <Main>
        {Storage.privateGet("tab") === "ETH" && (
          <Widget
            src="bluebiu.near/widget/MetaPool.StakeEth"
            props={{
              chainId: 1,
              // chainId: 5,
              liquidAddress: "0xdF261F967E87B2aa44e18a22f4aCE5d7f74f03Cc",
              // liquidAddress: "0x37774000C885e9355eA7C6B025EbF1704141093C",
              chain: "ETH",
              mpethPrice: state.mpethPrice,
              token: Chains["ETH"],
              lpToken: {
                icon: "https://ipfs.near.social/ipfs/bafkreiezivgkjk4uaz54jhczro53tjv7ojyzwxnmg2stebttrzfxsx5eae",
                symbol: "mpETH",
                address: "0x48AFbBd342F64EF8a9Ab1C143719b63C2AD81710",
                // address: "0x748c905130CC15b92B97084Fd1eEBc2d2419146f",
              },
              ethApy: state.ethApy,
            }}
          />
        )}
        {Storage.privateGet("tab") === "NEAR" && (
          <Widget
            src="bluebiu.near/widget/MetaPool.StakeNear"
            props={{
              chain: "NEAR",
              stnearPrice: state.stnearPrice,
              stnearPriceUsd: state.stnearPriceUsd,
              nearUsdPrice: state.nearUsdPrice,
              contractData: state.nearContractData,
              token: Chains["NEAR"],
              lpToken: {
                icon: "https://ipfs.near.social/ipfs/bafkreiangn6xr6nngmcfwg6nngu63wkr4hp5mtteak2w5c7tb44gwhu3oa",
                symbol: "stNEAR",
                address: "meta-token.near",
                // address: "token.meta.pool.testnet",
              },
              contractId: "meta-pool.near",
              // contractId: "meta-v2.pool.testnet",
              nearApy: state.nearApy,
              // network: "https://rpc.testnet.near.org",
              network: "https://rpc.mainnet.near.org",
            }}
          />
        )}
      </Main>
    </Panel>
  </Container>
);
