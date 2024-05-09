const INTEL_NEAR_POOL = 4663;
const NVIDIA_NEAR_POOL = 4547;
const REF_CONTRACT_ID = "v2.ref-finance.near";
const INTEL_TOTAL_SUPPLY = 100_000_000_000;
const NVIDIA_TOTAL_SUPPLY = 3_000_000_000_000;
const NEAR_DECIMALS = 24;
const INTEL_DECIMALS = 18;
const NVIDIA_DECIMALS = 8;

const [value, setValue] = useState(undefined);

const intelPool = Near.asyncView(REF_CONTRACT_ID, "get_pool", {
  pool_id: INTEL_NEAR_POOL,
});
const nvidiaPool = Near.asyncView(REF_CONTRACT_ID, "get_pool", {
  pool_id: NVIDIA_NEAR_POOL,
});

Promise.all([intelPool, nvidiaPool]).then(([intel, nvidia]) => {
  const intelInIntelPool = ethers.BigNumber.from(intel.amounts[1]).div(
    ethers.BigNumber.from(10).pow(ethers.BigNumber.from(INTEL_DECIMALS))
  );
  const nearInIntelPool = ethers.BigNumber.from(intel.amounts[0]).div(
    ethers.BigNumber.from(10).pow(ethers.BigNumber.from(INTEL_DECIMALS))
  );
  const intelCapInNear = nearInIntelPool
    .mul(
      ethers.BigNumber.from(INTEL_TOTAL_SUPPLY).mul(
        ethers.BigNumber.from(10).pow(ethers.BigNumber.from(INTEL_DECIMALS))
      )
    )
    .div(ethers.BigNumber.from(intelInIntelPool));

  const nvidiaInNvidiaPool = ethers.BigNumber.from(nvidia.amounts[0]).div(
    ethers.BigNumber.from(10).pow(ethers.BigNumber.from(NVIDIA_DECIMALS))
  );
  const nearInNvidiaPool = ethers.BigNumber.from(nvidia.amounts[1]).div(
    ethers.BigNumber.from(10).pow(ethers.BigNumber.from(NVIDIA_DECIMALS))
  );
  const nvidiaCapInNear = nearInNvidiaPool
    .mul(
      ethers.BigNumber.from(NVIDIA_TOTAL_SUPPLY).mul(
        ethers.BigNumber.from(10).pow(ethers.BigNumber.from(NVIDIA_DECIMALS))
      )
    )
    .div(ethers.BigNumber.from(nvidiaInNvidiaPool));

  setValue(intelCapInNear.mul(10000).div(nvidiaCapInNear).toNumber() / 10000);
});

return value === undefined ? (
  "Loading ..."
) : (
  <h2>
    We're {Math.min(100, value * 100).toFixed(2)}% close to flipping nearvidia.
  </h2>
);
