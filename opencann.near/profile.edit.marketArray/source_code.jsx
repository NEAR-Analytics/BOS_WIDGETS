const marketPattern = props.marketPattern ?? "*/profile/market/*";
const placeholder = props.placeholder ?? "Market";
const initialMarketObject = props.initialMarketObject || {};

const marketObject = Social.keys(marketPattern, "final");

if (marketObject === null) {
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

const marketCount = {};

const processMarketObject = (obj) => {
  Object.entries(obj).forEach((kv) => {
    if (typeof kv[1] === "object") {
      processMarketObject(kv[1]);
    } else {
      const prof = normalizeProf(kv[0]);
      marketCount[prof] = (marketCount[prof] || 0) + 1;
    }
  });
};

const getMarket = () => {
  processMarketObject(marketObject);
  const market = Object.entries(marketCount);
  market.sort((a, b) => b[1] - a[1]);
  return market.map((t) => ({
    name: t[0],
    count: t[1],
  }));
};

if (!state.allMarket) {
  initState({
    allMarket: getMarket(),
    market: Object.keys(initialMarketObject).map((prof) => ({
      name: normalizeProf(prof),
    })),
    originalMarket: Object.fromEntries(
      Object.keys(initialMarketObject).map((prof) => [prof, null])
    ),
    id: `market-selector-${Date.now()}`,
  });
}

const setMarket = (market) => {
  market = market.map((o) => {
    o.name = normalizeProf(o.name);
    return o;
  });
  State.update({ market });
  if (props.setMarketObject) {
    props.setMarketObject(
      Object.assign(
        {},
        state.originalMarket,
        Object.fromEntries(market.map((prof) => [prof.name, ""]))
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
      onChange={setMarket}
      options={state.allMarket}
      placeholder={placeholder}
      selected={state.market}
      positionFixed
      allowNew
    />
    {props.debug && (
      <div>
        Debugging market:
        <pre>{JSON.stringify(state.market)}</pre>
      </div>
    )}
  </>
);
