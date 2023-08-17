let appName = "chainlist";

let data = {
  [appName]: {
    chains: {
      [state.chain_id]: {
        coingecko_id: state.coingecko_id,
        name: state.name,
        icon_svg: state.icon_svg,
      },
    },
    contracts: {
      [state.chain_id]: {
        weth: state.weth,
      },
    },
  },
};

const getSvgImage = (svg) => {
  if (!svg) return;

  const buff = new Buffer(svg);
  const base64data = buff.toString("base64");

  return (
    <img
      style={{ maxWidth: "32px" }}
      class="img-thumbnail mt-2"
      src={`data:image/svg+xml;base64,${base64data}`}
      alt=""
    />
  );
};

const load = () => {
  State.update({
    coingecko_id: null,
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
    name: chainlistData.chains[chainId].name,
    icon_svg: chainlistData.chains[chainId].icon_svg,
    weth: chainlistData.contracts[chainId].weth,
  });
};

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
          class="form-control mw-200"
          onClick={() => load()}
          disabled={!state.chain_id}
          value="Load Data by Chain ID"
        />
      </div>
      <div class="mb-3">
        <label for="coingeckoId" class="form-label">
          Coingecko ID
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
        {state.icon_svg && <>{getSvgImage(state.icon_svg)}</>}
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
  </div>
);
