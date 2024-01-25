State.init({
  theme,
});

const css = fetch(
  "https://ipfs.io/ipfs/QmRz1UsQ74chuQ1D4HG28xhz6nQcZ32UbFbxLNfqoLrnB2",
).body;

if (!css) return "";

if (!state.theme) {
  State.update({
    theme: styled.div`
      ${css}
    `,
  });
}

const Theme = state.theme;

const abi = fetch(
  "https://docs.compound.finance/public/files/comet-interface-abi-98f438b.json",
);

if (!abi) return "Loading...";

const rewardsData = useCache(
  () =>
    asyncFetch(
      "https://v3-api.compound.finance/market/all-networks/all-contracts/rewards/dapp-data",
    ).then((res) => {
      const rewards = JSON.parse(res.body);

      const rewardsByChainId = rewards.reduce((acc, item) => {
        if (!acc[item.chain_id]) {
          acc[item.chain_id] = [item];
        } else {
          acc[item.chain_id].push(item);
        }
        return acc;
      }, {});

      return rewardsByChainId;
    }),
  "rewardData",
  { subscribe: false },
);

const data = useCache(
  () =>
    asyncFetch(
      "https://v3-api.compound.finance/market/all-networks/all-contracts/summary",
    ).then((res) => {
      const markets = JSON.parse(res.body);

      const martketsByChainId = markets.reduce((acc, item) => {
        if (!acc[item.chain_id]) {
          acc[item.chain_id] = [item];
        } else {
          acc[item.chain_id].push(item);
        }
        return acc;
      }, {});

      return martketsByChainId;
    }),
  "allContractsSummary",
  { subscribe: false },
);

const ChainNameByChainId = {
  1: "Ethereum",
  137: "Polygon",
  42161: "Airbitrum",
  8453: "Base",
};

const ChainIconByChainId = {};

const percentFormatter = (value) => {
  return `${value.toFixed(2)}%`;
};

const priceFormatter = (value) => {
  if (value > 1000000000) {
    return `${(value / 1000000000).toFixed(2)}B`;
  }

  if (value > 1000000) {
    return `${(value / 1000000).toFixed(2)}M`;
  }

  if (value > 1000) {
    return `${(value / 1000).toFixed(2)}K`;
  }

  return value.toFixed(2);
};

// ---------- CONTRACT
// TODO: Turn into a prop
const contracts = [
  {
    network: "Base",
    address: "0x46e6b214b524310239732D51387075E0e70970bf",
    chainId: 8453,
    httpRpcUrl: "https://base.llamarpc.com",
    borrowAssetCoingeckoId: "ethereum",
  },
];

const marketsData = {};

const marketDataPromises = [];

for (let contractInfo of contracts) {
  const marketPromise = new Promise((resolve, reject) => {
    const rpcProvider = new ethers.providers.JsonRpcProvider(
      contractInfo.httpRpcUrl,
    );

    const contract = new ethers.Contract(
      contractInfo.address,
      abi.body,
      rpcProvider,
    );

    const borrowAssetPrice = fetch(
      `https://api.coingecko.com/api/v3/simple/price?ids=${contractInfo.borrowAssetCoingeckoId}&vs_currencies=usd`,
    );

    const price =
      borrowAssetPrice.body[contractInfo.borrowAssetCoingeckoId].usd;

    contract.totalBorrow().then((res) => {
      const totalBorrow = (Number(res.toString()) / 1e18) * price;

      contract.getUtilization().then((res) => {
        const utilization = (Number(res.toString()) / 1e18) * 100;

        contract.totalSupply().then((res) => {
          const totalEarning = (Number(res.toString()) / 1e18) * price;

          contract.numAssets().then((res) => {
            const totalAssets = Number(res.toString());
            let i = 0;

            let assetsHash = {};

            while (i < totalAssets) {
              contract.getAssetInfo(i).then((res) => {
                const address = res[1];

                contract.totalsCollateral(address).then((res) => {
                  const totalSupplyAsset =
                    (Number(res[0].toString()) / 1e18) * price;

                  assetsHash[address] = {
                    totalSupplyAssetInUsd: totalSupplyAsset,
                    totalSupplyAsset: Number(res[0].toString()),
                  };
                });
              });
              i++;
            }

            resolve({
              totalBorrow,
              utilization,
              totalEarning,
              totalAssets,
              assetsHash,
              network: contractInfo.network,
              address: contractInfo.address,
            });
          });
        });
      });
    });
  });

  marketDataPromises.push(marketPromise);
}

const allMarkets = useCache(() => Promise.all(marketDataPromises), "markets", {
  subscribe: true,
});

const markets = allMarkets?.reduce((acc, item) => {
  if (!acc[item.network]) {
    acc[item.network] = [item];
  } else {
    acc[item.network].push(item);
  }

  return acc;
}, {});

console.log(markets);

// Promise.all(marketDataPromises).then((res) => {
//   console.log(res);
// });

return (
  <Theme>
    {Object.keys(markets).map((network) => {
      return (
        <div className="theme theme--dark page" key={network}>
          <div className="market-overview-panels__tables-container">
            <div className="panel-with-header assets-table-panel grid-column--12">
              <div className="panel-with-header__header">
                <div className="market-overview-panels__header-with-logo">
                  <span className="asset asset--ETHEREUM"></span>
                  <label className="label L1 text-color--1">{network}</label>
                </div>
              </div>
              <div className="panel-with-header__content">
                <div className="panel panel--markets-assets L3">
                  <div className="panel--markets-assets__content">
                    <table className="assets-table">
                      <thead>
                        <tr className="assets-table__row assets-table__row--header market-overview-panels__table-header L2">
                          <th className="label">Market</th>
                          <th className="label">Utilization</th>
                          <th className="label">Net Earn APR</th>
                          <th className="label">Net Borrow APR</th>
                          <th className="label">Total Earning</th>
                          <th className="label">Total Borrowing</th>
                          <th className="label">Total Collateral</th>
                          <th className="label">Collateral Assets</th>
                        </tr>
                      </thead>
                      <tbody>
                        {markets[network].map((item) => {
                          const totalCollateral = Object.values(
                            item.assetsHash,
                          )?.reduce((acc, item) => {
                            return acc + item.totalSupplyAssetInUsd;
                          }, 0);

                          return (
                            <tr
                              className="market-overview-panels__table-row"
                              key={item.address}
                            >
                              <td>
                                <div className="market-overview-panels__market-container">
                                  <div className="icon-pair icon-pair--reverse-draw">
                                    <span className="asset asset--ETH icon-pair__item"></span>
                                    <img
                                      className="asset asset--ETHEREUM icon-pair__item"
                                      src="https://cdn.jsdelivr.net/gh/atomiclabs/cryptocurrency-icons@1a63530be6e374711a8554f31b17e4cb92c25fa5/128/color/eth.png"
                                    />
                                  </div>
                                  <div className="market-overview-panels__asset-description-container">
                                    <div>
                                      <span className="body--emphasized text-color--1 L3">
                                        Ether
                                      </span>
                                    </div>
                                    <div className="label text-color--2 L2">
                                      ETH ∙ Ethereum
                                    </div>
                                  </div>
                                </div>
                              </td>
                              <td>
                                <div className="market-overview-panels__utilization-container">
                                  <div className="circle-meter">
                                    <svg viewBox="0 0 19 19">
                                      <path
                                        className="circle-meter__bg"
                                        d="M9.5 1.5
              a 8 8 0 0 1 0 16
              a 8 8 0 0 1 0 -16"
                                      ></path>
                                      <path
                                        className="circle-meter__circle"
                                        stroke-dasharray="27.972740987563515,50.26548245743669"
                                        d="M9.5 1.5
              a 8 8 0 0 1 0 16
              a 8 8 0 0 1 0 -16"
                                      ></path>
                                    </svg>
                                  </div>
                                  <div className="body text-color--1 L3">
                                    {percentFormatter(item.utilization)}
                                  </div>
                                </div>
                              </td>
                              <td>
                                <div className="body text-color--1 L3">???</div>
                              </td>
                              <td>
                                <div className="body text-color--1 L3">???</div>
                              </td>
                              <td>
                                <div className="body text-color--1 L3">
                                  {priceFormatter(item.totalEarning ?? 0)}
                                </div>
                              </td>
                              <td>
                                <div className="body text-color--1 L3">
                                  {priceFormatter(item.totalBorrow ?? 0)}
                                </div>
                              </td>
                              <td>
                                <div className="body text-color--1 L3">
                                  {priceFormatter(totalCollateral ?? 0)}
                                </div>
                              </td>
                              <td>
                                <div className="market-overview-panels__collateral-asset-container">
                                  <label className="body text-color--1 L3">
                                    {item.totalAssets}
                                  </label>
                                  <div className="market-overview-panels__collateral-asset-icons-container">
                                    <div className="asset asset--cbETH market-overview-panels__collateral-asset-icon"></div>
                                    <div className="asset asset--wstETH market-overview-panels__collateral-asset-icon"></div>
                                    <div className="asset asset--rETH market-overview-panels__collateral-asset-icon"></div>
                                  </div>
                                </div>
                              </td>
                            </tr>
                          );
                        })}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      );
    })}
  </Theme>
);
