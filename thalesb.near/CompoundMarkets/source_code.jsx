State.init({
  theme: undefined,
  markestData: [],
});

if (!props.contracts) return "No contracts provided";

const abi = fetch(
  "https://docs.compound.finance/public/files/comet-interface-abi-98f438b.json"
);

if (!abi) return "Loading...";

const rewardsData = useCache(
  () =>
    asyncFetch(
      "https://v3-api.compound.finance/market/all-networks/all-contracts/rewards/dapp-data"
    ).then((res) => {
      const rewards = JSON.parse(res.body);

      const rewardsByCometAddress = rewards.reduce((acc, item) => {
        if (!acc[item.comet.address]) {
          acc[item.comet.address] = [item];
        } else {
          acc[item.comet.address].push(item);
        }
        return acc;
      }, {});

      return rewardsByCometAddress;
    }),
  "rewardData",
  { subscribe: false }
);

const ChainNameByChainId = {
  1: "Ethereum",
  137: "Polygon",
  42161: "Airbitrum",
  8453: "Base",
};

const ChainIconByChainId = {};

/**
 * Formats a value as a percentage.
 * @param {number} value - The value to be formatted.
 * @returns {string} The formatted value as a percentage.
 */
const percentFormatter = (value) => {
  if (!value) return "0%";
  return `${value.toFixed(2)}%`;
};

/**
 * Formats a price value.
 * @param {number} value - The price value to be formatted.
 * @returns {string} The formatted price value.
 */
const priceFormatter = (value) => {
  if (!value) return "-";
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

const contracts = props.contracts;

const coingeckoIds = contracts.reduce((acc, contract) => {
  acc.push(contract.borrowAssetCoingeckoId);

  for (let i = 0; i < contract.collateralAssets.length; i++) {
    const collateralAsset = contract.collateralAssets[i];

    acc.push(collateralAsset.coingegkoId);
  }

  return acc;
}, []);

const coingeckoIdsString = coingeckoIds.join(",");

const coingeckoPrices = fetch(
  `https://api.coingecko.com/api/v3/simple/price?ids=${coingeckoIdsString}&vs_currencies=usd`
);

if (!coingeckoPrices) return "Loading...";

const marketDataPromises = [];
const collateralPricesPromises = [];

const secondsPerYear = 60 * 60 * 24 * 365;

for (let contractInfo of contracts) {
  const rpcProvider = new ethers.providers.JsonRpcProvider(
    contractInfo.httpRpcUrl
  );

  const contract = new ethers.Contract(
    contractInfo.address,
    abi.body,
    rpcProvider
  );

  const name = contractInfo.network;
  const baseAddress = contractInfo.address;
  const decimals = contractInfo.borrowDecimals;
  const totalAssets = contractInfo.collateralAssets.length;
  const icons = {
    networkIcon: contractInfo.networkIcon,
    baseCoinIcon: contractInfo.baseCoinIcon,
    collateralIcons:
      contractInfo.collateralAssets.map((asset) => {
        return asset.icon;
      }) || [],
  };
  const baseToken = {
    name: contractInfo.baseTokenName,
    symbol: contractInfo.baseTokenSymbol,
  };

  const marketPromise = new Promise((resolve, reject) => {
    const basePrice =
      coingeckoPrices.body[contractInfo.borrowAssetCoingeckoId].usd;

    contract.totalBorrow().then((res) => {
      const totalBorrow =
        Number(ethers.utils.formatUnits(res.toString(), decimals)) * basePrice;

      contract.getUtilization().then((res) => {
        const utilization = Number(res.toString());
        const parsedUtilization = (utilization / 1e18) * 100;

        contract.totalSupply().then((res) => {
          const totalEarning =
            Number(ethers.utils.formatUnits(res.toString(), decimals)) *
            basePrice;

          contract.getSupplyRate(utilization.toString()).then((res) => {
            const rate = Number(res.toString());

            const supplyApr = (rate / 1e18) * secondsPerYear * 100;

            contract.getBorrowRate(utilization.toString()).then((res) => {
              const borrowRate = Number(res.toString());

              const borrowApr = (borrowRate / 1e18) * secondsPerYear * 100;

              resolve({
                totalBorrow,
                utilization: parsedUtilization,
                totalEarning,
                totalAssets,
                network: name,
                address: baseAddress,
                supplyApr,
                borrowApr,
                icons,
                baseToken,
              });
            });
          });
        });
      });
    });
  });

  marketDataPromises.push(marketPromise);

  for (let i = 0; i < contractInfo.collateralAssets.length; i++) {
    const collateralAsset = contractInfo.collateralAssets[i];
    const name = collateralAsset.name;
    const baseAddress = contractInfo.address;

    const collateralPromise = new Promise((resolve, reject) => {
      contract.totalsCollateral(collateralAsset.address).then((res) => {
        const totalSupplyAsset = Number(
          ethers.utils.formatUnits(res[0], collateralAsset.decimals)
        );

        const totalSupplyAssetPrice =
          coingeckoPrices.body[collateralAsset.coingegkoId].usd;

        const totalSupplyAssetValue = totalSupplyAsset * totalSupplyAssetPrice;

        resolve({
          baseContractAddress: baseAddress,
          name,
          totalSupplyAsset,
          totalSupplyAssetPrice,
          totalSupplyAssetValue,
        });
      });
    });

    collateralPricesPromises.push(collateralPromise);
  }
}

const marketsData = useCache(
  () => Promise.all(marketDataPromises),
  "marketsData",
  { subscribe: false }
);

const collateralPricesData = useCache(
  () => Promise.all(collateralPricesPromises),
  "collateralPricesData",
  { subscribe: false }
);

const markets = (marketsData ?? [])?.reduce((acc, item) => {
  if (!acc[item.network]) {
    acc[item.network] = [item];
  } else {
    acc[item.network].push(item);
  }

  return acc;
}, {});

if (!state.theme) {
  State.update({
    theme: styled.div`
      --font-primary: "Quicksand", sans-serif;

      --color-brand: #00ec97;
      --color-brand-secondary: #00d186;

      --color-purple: #aa00fa;
      --color-purple-secondary: #7900b2;

      --color-neutral-100: #d7d9e5;
      --color-neutral-200: #888baf;
      --color-neutral-500: #373a53;
      --color-neutral-600: #323345;
      --color-neutral-700: #292a3d;
      --color-neutral-800: #1e202e;
      --color-neutral-white: #ffffff;
      --color-neutral-black: #000000;
      --color-neutral-black-70: rgba(0, 0, 0, 0.7);

      --radius-lg: 24px;
      --radius-md: 8px;
      --radius-sm: 4px;

      --spacing-0: 0;
      --spacing-1: 2px;
      --spacing-2: 4px;
      --spacing-3: 6px;
      --spacing-4: 8px;
      --spacing-5: 12px;
      --spacing-6: 16px;
      --spacing-7: 20px;
      --spacing-8: 24px;
      --spacing-9: 32px;
      --spacing-10: 40px;
      --spacing-11: 48px;
      --spacing-12: 56px;
      --spacing-13: 64px;
      --spacing-14: 72px;
      --spacing-15: 80px;
      --spacing-16: 88px;
      --spacing-17: 96px;
      --spacing-18: 104px;
      --spacing-19: 112px;
      --spacing-20: 120px;
      --spacing-21: 128px;

      .font-primary {
        font-family: var(--font-primary);
      }

      .font-body-sm-bold {
        font-size: 14px;
        line-height: 20px;
        font-weight: 700;
        font-style: normal;
      }

      .font-body-lg-bold {
        font-size: 18px;
        line-height: 24px;
        font-weight: 700;
        font-style: normal;
      }

      .font-body-md-bold {
        font-size: 16px;
        line-height: 22px;
        font-weight: 700;
        font-style: normal;
      }

      .font-body-md-semibold {
        font-size: 16px;
        font-style: normal;
        font-weight: 600;
        line-height: 22px;
      }

      .font-body-md {
        font-size: 16px;
        font-style: normal;
        font-weight: 500;
        line-height: 22px;
      }

      .text-secondary {
        color: var(--color-neutral-200);
      }

      .chip {
        background-color: var(--color-neutral-500);
        padding: 0px 4px;
        border-radius: var(--radius-sm);
        color: var(--color-neutral-white);
      }

      .collateral_icons {
        display: flex;
        gap: 0 !important;

        img {
          width: 24px;
          height: 24px;
          margin-right: -8px;
        }
      }
    `,
  });
}

const Theme = state.theme;

const TableContainer = styled.div`
  display: flex;
  flex-direction: column;
  background-color: var(--color-neutral-700);
  color: var(--color-neutral-white);
  border-radius: var(--radius-lg);
  padding-right: var(--spacing-8);
  padding-left: var(--spacing-8);
  padding-top: var(--spacing-8);
  padding-bottom: var(--spacing-6);
  overflow-x: auto;

  @media (max-width: 768px) {
    display: none;
  }
`;

const TableTitle = styled.div`
  display: flex;
  text-transform: uppercase;
  gap: var(--spacing-4);
`;

const MarketTable = styled.table`
  width: 100%;
  border-collapse: separate;
  border-spacing: 0 24px;
  min-width: 1290px;

  th {
    text-align: left;
    color: var(--color-neutral-200);
  }
`;

const MobileMarketContainer = styled.div`
  display: flex;
  flex-direction: column;
  background-color: var(--color-neutral-700);
  border-radius: var(--radius-lg);
  color: var(--color-neutral-white);
  padding: var(--spacing-8);

  hr {
    margin-top: var(--spacing-8);
    margin-bottom: var(--spacing-8);
    border-style: dashed;
  }

  div:first-child {
    display: flex;
    gap: var(--spacing-4);
    margin-bottom: var(--spacing-8);

    img {
      width: 24px;
      height: 24px;
    }
  }

  .info {
    display: flex;
    flex-direction: column;

    &-network {
      display: flex;
      flex-direction: column;
      margin-left: var(--spacing-6);
    }

    &-line {
      display: flex;
      justify-content: space-between;

      &:not(:last-child) {
        margin-bottom: var(--spacing-6);
      }

      &__value {
        color: var(--color-neutral-200);
        display: flex;
        align-items: center;
        gap: 1px;
      }
    }
  }

  @media (min-width: 768px) {
    display: none;
  }
`;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  gap: var(--spacing-8);
  padding: var(--spacing-6);
`;

const LoadingContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  padding: var(--spacing-8);
`;

if (!Object.values(markets)?.length) {
  return (
    <Theme>
      <LoadingContainer className="font-primary">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="4em"
          height="4em"
          viewBox="0 0 24 24"
        >
          <path
            fill="white"
            d="M12,1A11,11,0,1,0,23,12,11,11,0,0,0,12,1Zm0,19a8,8,0,1,1,8-8A8,8,0,0,1,12,20Z"
            opacity=".25"
          />
          <path
            fill="white"
            d="M12,4a8,8,0,0,1,7.89,6.7A1.53,1.53,0,0,0,21.38,12h0a1.5,1.5,0,0,0,1.48-1.75,11,11,0,0,0-21.72,0A1.5,1.5,0,0,0,2.62,12h0a1.53,1.53,0,0,0,1.49-1.3A8,8,0,0,1,12,4Z"
          >
            <animateTransform
              attributeName="transform"
              dur="0.75s"
              repeatCount="indefinite"
              type="rotate"
              values="0 12 12;360 12 12"
            />
          </path>
        </svg>
      </LoadingContainer>
    </Theme>
  );
}

return (
  <Theme>
    <Container className="font-primary">
      {Object.keys(markets).map((network) => {
        const networkIcon = markets[network][0].icons.networkIcon;

        return (
          <>
            <TableContainer key={network}>
              <TableTitle>
                <img style={{ width: 24, height: 24 }} src={networkIcon} />
                <div className="font-body-lg-bold">{network}</div>
              </TableTitle>

              <MarketTable>
                <thead>
                  <tr className="font-body-sm-bold">
                    <th>Market</th>
                    <th>Utilization</th>
                    <th>Net Earn APR</th>
                    <th>Net Borrow APR</th>
                    <th>Total Earning</th>
                    <th>Total Borrowing</th>
                    <th>Total collateral</th>
                    <th>Collateral Assets</th>
                  </tr>
                </thead>
                <tbody>
                  {markets[network].map((market) => {
                    const totalCollateral = collateralPricesData
                      ?.filter(
                        (item) => item.baseContractAddress === market.address
                      )
                      ?.reduce((total, item) => {
                        return total + item.totalSupplyAssetValue;
                      }, 0);

                    const rewards = rewardsData[market.address][0];

                    return (
                      <tr key={market.baseContractAddress}>
                        <td
                          style={{
                            display: "flex",
                            gap: "var(--spacing-6)",
                          }}
                        >
                          <div>
                            <img
                              style={{
                                width: 48,
                                height: 48,
                                zIndex: 10,
                                position: "relative",
                              }}
                              src={market.icons.baseCoinIcon}
                            />
                            <img
                              style={{
                                width: 48,
                                height: 48,
                                marginLeft: -16,
                              }}
                              src={market.icons.networkIcon}
                            />
                          </div>
                          <div
                            style={{ display: "flex", flexDirection: "column" }}
                          >
                            <span className="font-body-md-bold">
                              {market.baseToken.name}
                            </span>
                            <span style={{ color: "var(--color-neutral-200)" }}>
                              {market.baseToken.symbol}{" "}
                              <span style={{ color: "#00EC97" }}>•</span>
                              {network}
                            </span>
                          </div>
                        </td>
                        <td>{percentFormatter(market.utilization)}</td>
                        <td>
                          {percentFormatter(
                            market.supplyApr +
                              Number(rewards?.earn_rewards_apr || 0) * 100
                          )}
                        </td>
                        <td>
                          {percentFormatter(
                            market.borrowApr -
                              Number(rewards?.borrow_rewards_apr || 0) * 100
                          )}
                        </td>
                        <td>
                          {network === "Base" &&
                          market.icons.collateralIcons.length === 1
                            ? "-"
                            : priceFormatter(market.totalEarning)}
                        </td>
                        <td>
                          {network === "Base" &&
                          market.icons.collateralIcons.length === 1
                            ? "-"
                            : priceFormatter(market.totalBorrow)}
                        </td>
                        <td>
                          {network === "Base" &&
                          market.icons.collateralIcons.length === 2
                            ? "-"
                            : priceFormatter(totalCollateral)}
                        </td>
                        <td style={{ display: "flex", gap: "1px" }}>
                          <span className="chip">
                            {market.icons.collateralIcons.length}
                          </span>
                          <div className="collateral_icons">
                            {market.icons.collateralIcons
                              .filter((a) => !!a)
                              .map((icon) => {
                                return <img src={icon} key={icon} />;
                              })}
                          </div>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </MarketTable>
            </TableContainer>

            <MobileMarketContainer key={network}>
              <div>
                <img src={networkIcon} />
                <span className="font-body-md-bold">{network}</span>
              </div>

              {markets[network].map((market, i) => {
                return (
                  <>
                    <div className="info">
                      <div>
                        <img
                          style={{
                            width: 48,
                            height: 48,
                            zIndex: 10,
                            position: "relative",
                          }}
                          src={market.icons.baseCoinIcon}
                        />
                        <img
                          style={{
                            width: 48,
                            height: 48,
                            marginLeft: -16,
                          }}
                          src={market.icons.networkIcon}
                        />

                        <div className="info-network">
                          <span className="font-body-md-bold">
                            {market.baseToken.name}
                          </span>
                          <span style={{ color: "var(--color-neutral-200)" }}>
                            {market.baseToken.symbol}
                            <span style={{ color: "#00EC97" }}>•</span>
                            {network}
                          </span>
                        </div>
                      </div>

                      <div className="info-line font-body-md">
                        <span className="info-line__title">Utilization</span>
                        <span className="info-line__value font-body-md-semibold">
                          {percentFormatter(market.utilization)}
                        </span>
                      </div>

                      <div className="info-line font-body-md">
                        <span className="info-line__title">Net Earn APR</span>
                        <span className="info-line__value font-body-md-semibold">
                          {percentFormatter(
                            market.supplyApr +
                              Number(
                                rewardsData[market.address][0]
                                  ?.earn_rewards_apr || 0
                              ) *
                                100
                          )}
                        </span>
                      </div>

                      <div className="info-line font-body-md">
                        <span className="info-line__title">Net Borrow APR</span>
                        <span className="info-line__value font-body-md-semibold">
                          {percentFormatter(
                            market.borrowApr -
                              Number(
                                rewardsData[market.address][0]
                                  ?.borrow_rewards_apr || 0
                              ) *
                                100
                          )}
                        </span>
                      </div>

                      <div className="info-line font-body-md">
                        <span className="info-line__title">Total Earning</span>
                        <span className="info-line__value font-body-md-semibold">
                          {priceFormatter(market.totalEarning)}
                        </span>
                      </div>

                      <div className="info-line font-body-md">
                        <span className="info-line__title">
                          Total Borrowing
                        </span>
                        <span className="info-line__value font-body-md-semibold">
                          {priceFormatter(market.totalBorrow)}
                        </span>
                      </div>

                      <div className="info-line font-body-md">
                        <span className="info-line__title">
                          Total collateral
                        </span>
                        <span className="info-line__value font-body-md-semibold">
                          {priceFormatter(
                            collateralPricesData
                              ?.filter(
                                (item) =>
                                  item.baseContractAddress === market.address
                              )
                              ?.reduce((total, item) => {
                                return total + item.totalSupplyAssetValue;
                              }, 0)
                          )}
                        </span>
                      </div>

                      <div className="info-line font-body-md">
                        <span className="info-line__title">
                          Collateral Assets
                        </span>
                        <span className="info-line__value font-body-md-semibold">
                          <span className="chip">
                            {market.icons.collateralIcons.length}
                          </span>

                          <div className="collateral_icons">
                            {market.icons.collateralIcons
                              .filter((a) => !!a)
                              .map((icon) => {
                                return <img src={icon} key={icon} />;
                              })}
                          </div>
                        </span>
                      </div>
                    </div>
                    {i !== markets[network].length - 1 && (
                      <hr className="divider" />
                    )}
                  </>
                );
              })}
            </MobileMarketContainer>
          </>
        );
      })}
    </Container>
  </Theme>
);
