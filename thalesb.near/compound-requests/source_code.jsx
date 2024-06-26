const POSITION_STORAGE_KEY = "POSITION_STATE";
const COLLATERAL_STORAGE_KEY = "COLLATERAL_STATE";

const abi = fetch(
  "https://docs.compound.finance/public/files/comet-interface-abi-98f438b.json",
);

if (!abi) return "Loading...";

const secondsPerYear = 60 * 60 * 24 * 365;

/**
 * Calculates the Annual Percentage Rate (APR) for a given Compound contract.
 * @param {Object} options - The options for calculating the APR.
 * @param {string} options.cometAddress - The address of the Compound contract.
 * @param {string} options.rpcUrl - The URL of the JSON-RPC provider.
 * @returns {Promise<Object>} - A promise that resolves to an object containing the APR and other related information.
 */
function getApr({ cometAddress, rpcUrl }) {
  const contract = new ethers.Contract(
    cometAddress,
    abi.body,
    new ethers.providers.JsonRpcProvider(rpcUrl),
  );

  return new Promise((resolve, reject) => {
    asyncFetch(
      "https://v3-api.compound.finance/market/all-networks/all-contracts/rewards/dapp-data",
    ).then((res) => {
      const rewards = JSON.parse(res.body);

      const rewardsByCometAddress = rewards.reduce((acc, item) => {
        const address = item.comet.address.toLowerCase();

        if (!acc[address]) {
          acc[address] = [item];
        } else {
          acc[address].push(item);
        }
        return acc;
      }, {});

      contract.baseTokenPriceFeed().then((baseTokenPriceFeed) => {
        contract.getPrice(baseTokenPriceFeed).then((price) => {
          const basePrice = price.toString() / 1e8;

          contract.decimals().then((decimals) => {
            contract.totalBorrow().then((res) => {
              const totalBorrow =
                Number(ethers.utils.formatUnits(res.toString(), decimals)) *
                basePrice;

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

                    contract
                      .getBorrowRate(utilization.toString())
                      .then((res) => {
                        const borrowRate = Number(res.toString());

                        const borrowApr =
                          (borrowRate / 1e18) * secondsPerYear * 100;

                        resolve({
                          totalBorrow,
                          utilization: parsedUtilization,
                          totalEarning,
                          supplyApr,
                          borrowApr,
                          borrowRate,
                          rewards:
                            rewardsByCometAddress[
                              cometAddress.toLowerCase()
                            ][0] || [],
                        });
                      });
                  });
                });
              });
            });
          });
        });
      });
    });
  });
}

/**
 * Retrieves the minimum borrow amount from a compound contract.
 *
 * @param {Object} options - The options object.
 * @param {string} options.cometAddress - The address of the compound contract.
 * @param {string} options.rpcUrl - The RPC URL for the provider.
 * @returns {Promise<number>} A promise that resolves to the minimum borrow amount.
 */
function getMinimumBorrowAmount({ cometAddress, rpcUrl }) {
  const contract = new ethers.Contract(
    cometAddress,
    abi.body,
    new ethers.providers.JsonRpcProvider(rpcUrl),
  );

  return new Promise((resolve, reject) => {
    return contract
      .decimals()
      .catch(reject)
      .then((decimals) => {
        return contract
          .baseBorrowMin()
          .catch(reject)
          .then((res) => {
            const minimumBorrowAmount = Number(
              ethers.utils.formatUnits(res.toString(), decimals),
            );

            resolve(minimumBorrowAmount);
          });
      });
  });
}

/**
 * Retrieves collateral assets information for a user.
 *
 * @param {Object} options - The options for retrieving collateral assets.
 * @param {string} options.cometAddress - The contract address.
 * @param {string} options.userAddress - The user address.
 * @param {string} options.rpcUrl - The RPC URL.
 * @returns {Promise<Object>} A promise that resolves to the collateral assets information.
 * @throws {Error} If no contract address, RPC URL, or user address is provided.
 */
function getCollateralAssets({ cometAddress, userAddress, rpcUrl }) {
  if (!cometAddress) throw new Error("No contract address provided");

  if (!rpcUrl) throw new Error("No rpc url provided");

  if (!userAddress) throw new Error("No user address provided");

  const contract = new ethers.Contract(
    cometAddress,
    abi.body,
    new ethers.providers.JsonRpcProvider(rpcUrl),
  );

  function getAssetsPromises(numAssets) {
    const collateralsPromises = [];

    for (let i = 0; i < numAssets; i++) {
      collateralsPromises.push(contract.getAssetInfo(i));
    }

    return Promise.all(collateralsPromises);
  }

  function getAssetInfo(assets) {
    const pricesPromises = [];

    for (let i = 0; i < assets.length; i++) {
      const asset = assets[i];
      const priceFeed = asset[2];

      pricesPromises.push(
        contract.getPrice(priceFeed).then((price) => {
          const assetContract = new ethers.Contract(
            asset[1],
            ["function decimals() view returns (uint8)"],
            new ethers.providers.JsonRpcProvider(rpcUrl),
          );

          return assetContract.decimals().then((decimals) => {
            return {
              asset: asset[1],
              price: price.toString() / 1e8,
              decimals: decimals.toString(),
            };
          });
        }),
      );
    }

    return Promise.all(pricesPromises).then((prices) => {
      const pricesHash = prices.reduce((acc, item) => {
        acc[item.asset] = item;
        return acc;
      }, {});

      return {
        assets,
        prices: pricesHash,
      };
    });
  }

  function getAssetsBalance(data) {
    const balancesPromises = [];

    for (let i = 0; i < data.assets.length; i++) {
      const asset = data.assets[i][1];

      balancesPromises.push(
        contract.userCollateral(userAddress, asset).then((balance) => {
          return contract.borrowBalanceOf(userAddress).then((borrowBalance) => {
            return {
              asset,
              balance: ethers.utils.formatUnits(
                balance[0],
                data.prices[asset].decimals,
              ),
              borrowBalance: ethers.utils.formatUnits(
                borrowBalance,
                data.prices[asset].decimals,
              ),
            };
          });
        }),
      );
    }

    return Promise.all(balancesPromises).then((balances) => {
      const balancesHash = balances.reduce((acc, item) => {
        acc[item.asset] = item;
        return acc;
      }, {});

      return {
        ...data,
        balances: balancesHash,
      };
    });
  }

  function formatCollateralData(data) {
    const formattedAssets = data.assets.map((asset) => {
      return {
        offset: asset[0],
        address: asset[1],
        priceFeed: asset[2],
        scale: asset[3],
        borrowCollateralFactor: asset[4] / 1e18,
        liquidateCollateralFactor: asset[5] / 1e18,
        liquidationFactor: asset[6] / 1e18,
        supplyCap: ethers.utils.formatUnits(
          asset[7],
          data.prices[asset[1]].decimals,
        ),
        decimals: data.prices[asset[1]].decimals,
        price: data.prices[asset[1]].price,
        balance: data.balances[asset[1]].balance,
        borrowBalance: data.balances[asset[1]].borrowBalance,
      };
    });

    let collateralValueUsd = 0;
    let totalBorrowCapacityUsd = 0;

    return contract.baseTokenPriceFeed().then((baseTokenPriceFeed) => {
      return contract.getPrice(baseTokenPriceFeed).then((price) => {
        return contract.borrowBalanceOf(userAddress).then((borrowBalance) => {
          return contract.decimals().then((decimals) => {
            const balance = borrowBalance.toString();
            const baseDecimals = decimals.toString();
            const basePrice = price.toString() / 1e8;

            for (let i = 0; i < formattedAssets.length; i++) {
              const asset = formattedAssets[i];

              collateralValueUsd += asset.balance * asset.price;

              totalBorrowCapacityUsd +=
                asset.balance * asset.price * asset.borrowCollateralFactor;
            }

            const borrowedInUsd =
              (balance / Math.pow(10, baseDecimals)) * basePrice;

            const borrowCapacityUsd = totalBorrowCapacityUsd - borrowedInUsd;

            const borrowCapacityBase = borrowCapacityUsd / basePrice;

            const borrowedInBase = borrowedInUsd / basePrice;

            return {
              assets: formattedAssets,
              baseTokenPriceFeed,
              basePrice,
              collateralValueUsd,
              totalBorrowCapacityUsd,
              borrowCapacityBase,
              borrowedInUsd,
              borrowedInBase,
              borrowBalance: ethers.utils.formatUnits(
                borrowBalance,
                baseDecimals,
              ),
            };
          });
        });
      });
    });
  }

  return new Promise((resolve, reject) => {
    if (stored) return resolve(stored);

    contract
      .numAssets()
      .catch(reject)
      .then(getAssetsPromises)
      .then(getPricesPromises)
      .then(getAssetInfo)
      .then(getAssetsBalance)
      .then(formatCollateralData)
      .then((data) => {
        resolve(data);
      });
  });
}

/**
 * Calculates the liquidation data for a user's collaterals.
 *
 * @param {Object} options - The options for calculating liquidation data.
 * @param {string} options.cometAddress - The address of the Compound contract.
 * @param {string} options.rpcUrl - The RPC URL for connecting to the blockchain.
 * @param {string} options.userAddress - The address of the user.
 * @returns {Promise<Object>} A promise that resolves to the liquidation data.
 */
function getCollateralsWithLiquidationData({
  cometAddress,
  rpcUrl,
  userAddress,
}) {
  function calculateLiquidationCapacity(data) {
    const assets = data.assets;

    const liquidation = assets.reduce(
      (acc, asset) => {
        const liquidationValue =
          asset.balance * asset.price * asset.liquidateCollateralFactor;

        const borrowValue =
          asset.balance * asset.price * asset.borrowCollateralFactor;

        return {
          liquidationCapacity: acc.liquidationCapacity + liquidationValue,
          borrowCapacity: acc.borrowCapacity + borrowValue,
        };
      },
      {
        liquidationCapacity: 0,
        borrowCapacity: 0,
      },
    );

    const liquidationRisk = Math.round(
      (data.borrowBalance / liquidation.liquidationCapacity) * 100,
    );

    return {
      liquidationRisk,
      liquidationPoint:
        (data.collateralValueUsd * Math.min(100, liquidationRisk)) / 100,
      ...data,
    };
  }

  return new Promise((resolve, reject) => {
    getCollateralAssets({ cometAddress, rpcUrl, userAddress })
      .catch(reject)
      .then(calculateLiquidationCapacity)
      .then((data) => {
        resolve(data);
      });
  });
}

return {
  getApr,
  getCollateralsWithLiquidationData,
  getMinimumBorrowAmount,
};
