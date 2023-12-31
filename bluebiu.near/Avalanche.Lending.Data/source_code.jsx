const account = Ethers.send("eth_requestAccounts", [])[0];

if (!account) return;
const { dapps, update, multicallv2, onLoad, chainId } = props;

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
          multicallAddress: multicallv2,
          ...dapp,
          dapp: dapp.name,
          loaded,
          update:
            dapp.name === update || (update === "All" && !loaded[dapp.name]),
          account,
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
