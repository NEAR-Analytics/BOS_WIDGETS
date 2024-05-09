const {
  dapps,
  update,
  multicall,
  multicallAddress,
  wethAddress,
  onLoad,
  chainId,
  prices,
  account,
} = props;

if (!account) return;

const dappsToList = Object.values(dapps);
if (!dappsToList.length || !update) return;

const cachedKey = `cached_loaded_${chainId}`;

const loaded = Storage.privateGet(cachedKey) || {};

return (
  <>
    {dappsToList.map((dapp) => (
      <Widget
        key={dapp.name}
        src={dapp.data}
        props={{
          ...dapp,
          dapp: dapp.name,
          loaded,
          update:
            dapp.name === update || (update === "All" && !loaded[dapp.name]),
          account,
          multicall,
          multicallAddress,
          wethAddress,
          prices,
          onLoad: (data) => {
            const { markets, ...rest } = data;
            loaded[dapp.name] = true;
            Storage.privateSet(cachedKey, loaded);
            const allLoaded = Object.keys(loaded).length === dappsToList.length;
            if (allLoaded) {
              Storage.privateSet(cachedKey, {});
            }
            onLoad({
              markets,
              dapp: {
                dappName: dapp.name,
                dappIcon: dapp.icon,
                ...rest,
              },
              allLoaded: allLoaded,
            });
          },
          initConfig: dapp,
        }}
      />
    ))}
  </>
);
