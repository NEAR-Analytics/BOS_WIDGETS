const memes = [
  { tokenId: "intel.tkn.near", poolId: 4663 },
  { tokenId: "blackdragon.tkn.near", poolId: 4276 },
  { tokenId: "token.lonkingnearbackto2024.near", poolId: 4314 },
  { tokenId: "ftv2.nekotoken.near", poolId: 3807 },
  { tokenId: "slush.tkn.near", poolId: 4623 },
  { tokenId: "ndc.tkn.near", poolId: 4434 },
  { tokenId: "nearnvidia.near", poolId: 4547 },
  { tokenId: "bean.tkn.near", poolId: 4472 },
];

function getNearPrice() {
  const NEAR_USDT_POOL = 3;
  const NEAR_DECIMALS = 24;
  const USDT_DECIMALS = 6;
  const NEAR_TOKEN_ID = "wrap.near";

  return new Promise((resolve, reject) => {
    const REF_CONTRACT_ID = "v2.ref-finance.near";
    Near.asyncView(REF_CONTRACT_ID, "get_pool", {
      pool_id: NEAR_USDT_POOL,
    }).then((pool) => {
      const nearIndex = pool.token_account_ids.indexOf(NEAR_TOKEN_ID);
      const usdtIndex = 1 - nearIndex;
      const nearInPool = ethers.BigNumber.from(pool.amounts[nearIndex]);
      const usdtInPool = ethers.BigNumber.from(pool.amounts[usdtIndex]);
      const nearHumanReadable =
        nearInPool
          .mul(ethers.BigNumber.from(100))
          .div(
            ethers.BigNumber.from(10).pow(ethers.BigNumber.from(NEAR_DECIMALS))
          )
          .toNumber() / 100;
      const usdtHumanReadable =
        usdtInPool
          .mul(ethers.BigNumber.from(100))
          .div(
            ethers.BigNumber.from(10).pow(ethers.BigNumber.from(USDT_DECIMALS))
          )
          .toNumber() / 100;
      resolve(usdtHumanReadable / nearHumanReadable);
    });
  });
}

function getMarketCap(tokenId, poolId) {
  const REF_CONTRACT_ID = "v2.ref-finance.near";
  const NEAR_DECIMALS = 24;
  const NON_CIRCULATING_ADDRESSES = [
    "0".repeat(64),
    "staking.paras.near",
    "cex-nearnvidia.near",
    "lp-nearnvidia.near",
    "nftstaking.jumpfinance.near",
    "beanlabs-marketing.near",
    "beanlabs.near",
    "beanlabs-airdrop.near",
    "beanlabs-team.near",
    "creators.nekotoken.near",
    "cookie.nekotoken.near",
    "minigame.nekotoken.near",
    "coreteam.nekotoken.near",
    "launchpad.jumpfinance.near",
    "distributions.nekotoken.near",
  ];

  return new Promise((resolve, reject) => {
    const decimals = Near.view(tokenId, "ft_metadata", {}).decimals;
    const totalSupply = ethers.BigNumber.from(
      Near.view(tokenId, "ft_total_supply", {})
    );
    const nonCirculatingPromises = NON_CIRCULATING_ADDRESSES.map((address) =>
      Near.asyncView(tokenId, "ft_balance_of", { account_id: address })
    );
    Promise.all(nonCirculatingPromises).then((nonCirculating) => {
      const notInCirculation = nonCirculating.reduce(
        (acc, balance) => acc.add(balance),
        ethers.BigNumber.from(0)
      );
      const circulatingSupply = totalSupply
        .sub(notInCirculation)
        .div(ethers.BigNumber.from(10).pow(ethers.BigNumber.from(decimals)));
      Near.asyncView(REF_CONTRACT_ID, "get_pool", {
        pool_id: poolId,
      }).then((pool) => {
        const tokenIndex = pool.token_account_ids.indexOf(tokenId);
        const nearIndex = 1 - tokenIndex;
        const tokenInPool = ethers.BigNumber.from(pool.amounts[tokenIndex]).div(
          ethers.BigNumber.from(10).pow(ethers.BigNumber.from(decimals))
        );
        const nearInPool = ethers.BigNumber.from(pool.amounts[nearIndex]).div(
          ethers.BigNumber.from(10).pow(ethers.BigNumber.from(NEAR_DECIMALS))
        );
        const tokenCapInNear = nearInPool
          .mul(circulatingSupply)
          .div(tokenInPool);
        getNearPrice().then((nearPrice) => {
          resolve(tokenCapInNear.toNumber() * nearPrice);
        });
      });
    });
  });
}

const [marketCaps, setMarketCaps] = useState([]);

Promise.all(
  memes.map(
    ({ tokenId, poolId }) =>
      new Promise((resolve, reject) => {
        const metadata = Near.view(tokenId, "ft_metadata");
        getMarketCap(tokenId, poolId).then((marketCap) => {
          resolve({
            tokenSymbol: metadata.symbol,
            marketCap,
          });
        });
      })
  )
).then((result) =>
  setMarketCaps(result.sort((a, b) => b.marketCap - a.marketCap))
);

return (
  <>
    <h1>Top memecoins by market cap</h1>
    <ol>
      {marketCaps.map(({ tokenSymbol, marketCap }) => {
        const metadata = Near.view(tokenId, "ft_metadata");
        return (
          <li>
            {tokenSymbol}: ${marketCap.toFixed(2)}
          </li>
        );
      })}
    </ol>
    <p>
      Doesn&apos;t include SHITZU, UWON, and BENDOG because they exist on other
      chains.
    </p>
  </>
);
