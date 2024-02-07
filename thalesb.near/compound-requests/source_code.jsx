const POSITION_STORAGE_KEY = "POSITION_STATE";

const abi = fetch(
  "https://docs.compound.finance/public/files/comet-interface-abi-98f438b.json"
);

if (!abi) return "Loading...";

function getUserPosition({ userAddress, cometAddress, rpcUrl, force }) {
  return new Promise((resolve, reject) => {
    const stored = Storage.get(POSITION_STORAGE_KEY + cometAddress);

    if (!userAddress) return reject("No user address provided");

    if (!cometAddress) return reject("No contract address provided");

    if (stored && !force) return resolve(stored);

    const contract = new ethers.Contract(
      cometAddress,
      abi.body,
      new ethers.providers.JsonRpcProvider(rpcUrl)
    );

    const promisesAssets = [];
    const promisesCollaterals = [];
    const promisesPrices = [];

    getMinimumBorrowAmount({ cometAddress, rpcUrl }).then((minBorrowAmount) => {
      contract.numAssets().then((numAssets) => {
        for (let i = 0; i < numAssets; i++) {
          promisesAssets.push(contract.getAssetInfo(i));
        }

        Promise.all(promisesAssets)
          .then((infos) => {
            for (let i = 0; i < numAssets; i++) {
              const assetInfo = infos[i];

              const asset = assetInfo[1];
              const priceFeed = assetInfo[2];

              promisesCollaterals.push(
                contract.collateralBalanceOf(userAddress, asset)
              );

              promisesPrices.push(contract.getPrice(priceFeed));
            }

            return infos;
          })
          .then((infos) => {
            contract.baseTokenPriceFeed().then((baseTokenPriceFeed) => {
              contract.getPrice(baseTokenPriceFeed).then((price) => {
                const basePrice = price.toString() / 1e8;

                contract.decimals().then((decimals) => {
                  const baseDecimals = decimals.toString();

                  let collateralValueUsd = 0;
                  let totalBorrowCapacityUsd = 0;
                  let borrowCapacityUsd = 0;
                  let borrowCapacityBase = 0;
                  let borrowedInUsd = 0;
                  let borrowedInBase = 0;

                  Promise.all(promisesCollaterals).then(
                    (collateralBalances) => {
                      Promise.all(promisesPrices).then((collateralPrices) => {
                        for (let i = 0; i < numAssets; i++) {
                          const balance =
                            Number(collateralBalances[i].toString()) /
                            Number(infos[i][3].toString());

                          const price =
                            Number(collateralPrices[i].toString()) / 1e8;

                          collateralValueUsd += balance * price;

                          totalBorrowCapacityUsd +=
                            balance *
                            price *
                            (Number(infos[i][4].toString()) / 1e18);

                          contract
                            .borrowBalanceOf(userAddress)
                            .then((borrowBalance) => {
                              const balance = borrowBalance.toString();

                              borrowedInUsd =
                                (balance / Math.pow(10, baseDecimals)) *
                                basePrice;

                              borrowCapacityUsd =
                                totalBorrowCapacityUsd - borrowedInUsd;

                              borrowCapacityBase =
                                borrowCapacityUsd / basePrice;

                              borrowedInBase = borrowedInUsd / basePrice;

                              const data = {
                                collaterals: infos,
                                baseTokenPriceFeed,
                                numAssets,
                                basePrice,
                                baseDecimals,
                                collateralValueUsd,
                                totalBorrowCapacityUsd,
                                borrowCapacityUsd,
                                borrowCapacityBase:
                                  Math.floor(
                                    (borrowCapacityBase + Number.EPSILON) * 100
                                  ) / 100,
                                borrowedInUsd,
                                borrowedInBase,
                                minBorrowAmount,
                              };

                              resolve(data);
                              Storage.set(
                                POSITION_STORAGE_KEY + cometAddress,
                                data
                              );
                            });
                        }
                      });
                    }
                  );
                });
              });
            });
          });
      });
    });
  });
}

const secondsPerYear = 60 * 60 * 24 * 365;

function getApr({ cometAddress, rpcUrl }) {
  const contract = new ethers.Contract(
    cometAddress,
    abi.body,
    new ethers.providers.JsonRpcProvider(rpcUrl)
  );

  return new Promise((resolve, reject) => {
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
                          rewards: rewardsByCometAddress[cometAddress][0] || [],
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

function getMinimumBorrowAmount({ cometAddress, rpcUrl }) {
  const contract = new ethers.Contract(
    cometAddress,
    abi.body,
    new ethers.providers.JsonRpcProvider(rpcUrl)
  );

  return new Promise((resolve, reject) => {
    contract
      .decimals()
      .catch(reject)
      .then((decimals) => {
        contract
          .baseBorrowMin()
          .catch(reject)
          .then((res) => {
            const minimumBorrowAmount = Number(
              ethers.utils.formatUnits(res.toString(), decimals)
            );

            resolve(minimumBorrowAmount);
          });
      });
  });
}

return { getUserPosition, getApr };
