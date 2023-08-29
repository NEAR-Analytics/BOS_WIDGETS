let appName = "chainlist";

let data = {
  [appName]: {
    chains: {
      [state.chain_id]: {
        coingecko_id: state.coingecko_id,
        name: state.name,
        icon_svg: state.icon_svg,
        rpc_url: state.rpc_url,
      },
    },
    contracts: {
      [state.chain_id]: {
        weth: state.weth,
      },
    },
  },
};
console.log(data, state);

const getSvgImage = (svg, className, width) => {
  if (!svg) return;

  const buff = new Buffer(svg);
  const base64data = buff.toString("base64");

  return (
    <img
      style={{ maxWidth: width ?? "32px" }}
      class={`img-thumbnail ${className}`}
      src={`data:image/svg+xml;base64,${base64data}`}
      alt=""
    />
  );
};

if (state.refresh) {
  console.log("Refresh");
  State.update({
    refresh: false,
    coingecko_id: null,
    rpc_url: null,
    name: null,
    icon_svg: null,
    weth: null,
  });

  const chainId = state.chain_id;
  if (!chainId) {
    console.log("No chainId");
  }
  const chainlistData = Social.get(
    `zavodil.near/chainlist/*/${chainId}/**`,
    "final"
  );

  State.update({
    coingecko_id: chainlistData.chains[chainId].coingecko_id,
    rpc_url: chainlistData.chains[chainId].rpc_url,
    name: chainlistData.chains[chainId].name,
    icon_svg: chainlistData.chains[chainId].icon_svg,
    weth: chainlistData.contracts[chainId].weth,
  });
}

let chainlistData = [];

if (!state.chainlistLoaded) {
  const chainlist = Social.get(`zavodil.near/chainlist/chains/**`, "final");

  if (chainlist) {
    State.update({
      chainlistLoaded: true,
      chainlist,
    });
  }
} else {
  chainlistData = Object.keys(state.chainlist).map((chainId) => (
    <div>
      <h5>{state.chainlist[chainId].name}</h5>
      <div>
        chainId: {chainId}{" "}
        <button
          class="btn btn-secondary btn-sm"
          onClick={() => {
            State.update({ chain_id: chainId, refresh: true });
          }}
        >
          Load
        </button>
      </div>
      {Object.keys(state.chainlist[chainId]).map((name) => (
        <div>
          {name}:{" "}
          {name === "icon_svg"
            ? getSvgImage(state.chainlist[chainId][name], "", "16px")
            : state.chainlist[chainId][name]}
        </div>
      ))}
    </div>
  ));
}

return (
  <div class="container">
    <div class="form-floating">
      <div class="mb-3">
        <label for="chainId" class="form-label">
          Chain ID
        </label>
        <input
          type="text"
          class="form-control"
          value={state.chain_id}
          onChange={(e) => State.update({ chain_id: e.target.value })}
          id="chainId"
        />
      </div>
      <div class="mb-3">
        <input
          type="button"
          class="btn btn-secondary mw-200"
          onClick={() => State.update({ refresh: true })}
          disabled={!state.chain_id}
          value="Load Data by Chain ID"
        />
      </div>
      <div class="mb-3">
        <label for="coingeckoId" class="form-label">
          Coingecko API ID
        </label>
        <input
          type="text"
          class="form-control"
          value={state.coingecko_id}
          onChange={(e) => State.update({ coingecko_id: e.target.value })}
          id="coingeckoId"
        />
      </div>
      <div class="mb-3">
        <label for="rpcUrl" class="form-label">
          RPC URL
        </label>
        <input
          type="text"
          class="form-control"
          value={state.rpc_url}
          onChange={(e) => State.update({ rpc_url: e.target.value })}
          id="rpcUrl"
        />
      </div>
      <div class="mb-3">
        <label for="name" class="form-label">
          Network name
        </label>
        <input
          type="text"
          class="form-control"
          value={state.name}
          onChange={(e) => State.update({ name: e.target.value })}
          id="name"
        />
      </div>

      <div class="mb-3">
        <label for="icon_svg" class="form-label">
          SVG Icon
        </label>
        <textarea
          class="form-control"
          value={state.icon_svg}
          onChange={(e) =>
            State.update({
              icon_svg: e.target.value
                .replace(/\t/g, " ")
                .replace(/\n/g, "")
                .replace(/\s{2,}/g, " ")
                .replace(/\> \</g, "><"),
            })
          }
          id="icon_svg"
        />
        {state.icon_svg && <>{getSvgImage(state.icon_svg, "mt-2")}</>}
      </div>

      <div class="mb-3">
        <label for="weth" class="form-label">
          Weth Contract
        </label>
        <input
          type="text"
          class="form-control"
          value={state.weth}
          onChange={(e) => State.update({ weth: e.target.value })}
          id="weth"
        />
      </div>

      <div class="mb-3">
        <CommitButton disabled={!(state.chain_id && state.name)} data={data}>
          Add a chain
        </CommitButton>
      </div>
    </div>

    <hr />
    <h3>Existing data: </h3>
    {chainlistData}
  </div>
);
