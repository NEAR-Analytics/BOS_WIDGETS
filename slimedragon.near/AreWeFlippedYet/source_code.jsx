const INTEL_NEAR_POOL = 4663;
const NVIDIA_NEAR_POOL = 4547;

const [intelMCap, setIntelMCap] = useState(undefined);
const [nvidiaMCap, setNvidiaMCap] = useState(undefined);

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

const intelCap = getMarketCap("intel.tkn.near", INTEL_NEAR_POOL);
const nvidiaCap = getMarketCap("nearnvidia.near", NVIDIA_NEAR_POOL);

Promise.all([intelCap, nvidiaCap]).then(([intel, nvidia]) => {
  setIntelMCap(intel);
  setNvidiaMCap(nvidia);
});

return intelMCap === undefined ? (
  "Loading ..."
) : (
  <>
    <h1>Are we flipped yet?</h1>
    {intelMCap > nvidiaMCap ? (
      <h3>Yes! INTEAR has flipped NEARVIDIA</h3>
    ) : (
      <>
        <h3>
          Not yet! But INTEAR has achieved{" "}
          {((intelMCap / nvidiaMCap) * 100).toFixed(2)}% progress towards
          flipping NEARVIDIA
        </h3>
        <p>
          <b>$INTEAR</b> market cap: ${intelMCap.toFixed(2)}
          <br />
          <b>$NEARVIDIA</b> market cap: ${nvidiaMCap.toFixed(2)}
        </p>
      </>
    )}
  </>
);
