const walletPattern = props.walletPattern ?? "*/profile/wallet/*";
const placeholder = props.placeholder ?? "Wallet";
const initialWalletObject = props.initialWalletObject || {};

const walletObject = Social.keys(walletPattern, "final");

if (walletObject === null) {
  return "Loading";
}

const normalizeProf = (prof) =>
  prof
    .replaceAll(/[- \.]/g, "_")
    .replaceAll(/[^\w]+/g, "")
    .replaceAll(/_+/g, "-")
    .replace(/^-+/, "")
    .replace(/-+$/, "")
    .toLowerCase()
    .trim("-");

const walletCount = {};

const processWalletObject = (obj) => {
  Object.entries(obj).forEach((kv) => {
    if (typeof kv[1] === "object") {
      processWalletObject(kv[1]);
    } else {
      const prof = normalizeProf(kv[0]);
      walletCount[prof] = (walletCount[prof] || 0) + 1;
    }
  });
};

const getWallet = () => {
  processWalletObject(walletObject);
  const wallet = Object.entries(walletCount);
  wallet.sort((a, b) => b[1] - a[1]);
  return wallet.map((t) => ({
    name: t[0],
    count: t[1],
  }));
};

if (!state.allWallet) {
  initState({
    allWallet: getWallet(),
    wallet: Object.keys(initialWalletObject).map((prof) => ({
      name: normalizeProf(prof),
    })),
    originalWallet: Object.fromEntries(
      Object.keys(initialWalletObject).map((prof) => [prof, null])
    ),
    id: `wallet-selector-${Date.now()}`,
  });
}

const setWallet = (wallet) => {
  wallet = wallet.map((o) => {
    o.name = normalizeProf(o.name);
    return o;
  });
  State.update({ wallet });
  if (props.setWalletObject) {
    props.setWalletObject(
      Object.assign(
        {},
        state.originalWallet,
        Object.fromEntries(wallet.map((prof) => [prof.name, ""]))
      )
    );
  }
};

return (
  <>
    <Typeahead
      id={state.id}
      multiple
      labelKey="name"
      onChange={setWallet}
      options={state.allWallet}
      placeholder={placeholder}
      selected={state.wallet}
      positionFixed
      allowNew
    />
    {props.debug && (
      <div>
        Debugging wallet:
        <pre>{JSON.stringify(state.wallet)}</pre>
      </div>
    )}
  </>
);
