const {
  account,
  config,
  multicall,
  multicallAddress,
  assetsToSupply,
  markets,
  rewardToken,
  onLoad,
} = props;

useEffect(() => {
  if (!account) return "";

  return <div style={{ display: "none" }} />;
}, [account]);
