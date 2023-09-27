let appName = "dexlist";

let data = {
  [appName]: {
    chains: {
      [state.chain_id]: {
        [state.dex_name]: {
          assets: state.assets,
          coingecko_token_ids: state.coingecko_token_ids,
          input_asset_token_id: state.input_asset_token_id,
          output_asset_token_id: state.output_asset_token_id,
          router_contract: state.router_contract,
          router_contract_abi_url: state.router_contract_abi_url,
          quoter_contract: state.quoter_contract,
          quoter_contract_abi_url: state.quoter_contract_abi_url,
        },
      },
    },
  },
};
console.log(data, state);

if (state.refresh) {
  console.log("Refresh");
  State.update({
    refresh: false,
    assets: null,
    coingecko_token_ids: null,
    input_asset_token_id: null,
    output_asset_token_id: null,
    router_contract: null,
    quoter_contract: null,
  });

  const chainId = state.chain_id;
  if (!chainId) {
    console.log("No chainId");
  }
  const dexName = state.dex_name;
  if (!dex_name) {
    console.log("No dexName");
  }
  const chainlistData = Social.get(
    `zavodil.near/${appName}/chains/${chainId}/${dexName}/*`,
    "final"
  );

  State.update({
    assets: chainlistData.chains[chainId][dexName].assets,
    coingecko_token_ids:
      chainlistData.chains[chainId][dexName].coingecko_token_ids,
    input_asset_token_id:
      chainlistData.chains[chainId][dexName].input_asset_token_id,
    output_asset_token_id:
      chainlistData.chains[chainId][dexName].output_asset_token_id,
    router_contract: chainlistData.chains[chainId][dexName].router_contract,
    quoter_contract: chainlistData.chains[chainId][dexName].quoter_contract,
  });
}

let chainlistData = [];

if (!state.dexDataListLoaded) {
  const dexDataList = Social.get(`zavodil.near/${appName}/chains/**`, "final");

  if (chainlist) {
    State.update({
      dexDataListLoaded: true,
      dexDataList,
    });
  }
} else {
  /*dexData = Object.keys(state.chainlist).map((chainId) => (
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
  ));*/
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
        <label for="chainId" class="form-label">
          Dex Name
        </label>
        <input
          type="text"
          class="form-control"
          value={state.dex_name}
          onChange={(e) => State.update({ dex_name: e.target.value })}
          id="chainId"
        />
      </div>
      <div class="mb-3">
        <input
          type="button"
          class="btn btn-secondary mw-200"
          onClick={() => State.update({ refresh: true })}
          disabled={!(state.chain_id && state.dex_name)}
          value="Load Data by Chain ID & Dex Name"
        />
      </div>
      <div class="mb-3">
        <label for="assets" class="form-label">
          Assets List
        </label>
        <input
          type="text"
          class="form-control"
          value={state.assets}
          onChange={(e) => State.update({ assets: JSON.parse(e.target.value) })}
          id="assets"
        />
      </div>
      <div class="mb-3">
        <label for="coingecko_token_ids" class="form-label">
          Coingecko Token Ids List
        </label>
        <input
          type="text"
          class="form-control"
          value={state.coingecko_token_ids}
          onChange={(e) =>
            State.update({ coingecko_token_ids: JSON.parse(e.target.value) })
          }
          id="coingecko_token_ids"
        />
      </div>
      <div class="mb-3">
        <label for="input_asset_token_id" class="form-label">
          Input Asset Token Id
        </label>
        <input
          type="text"
          class="form-control"
          value={state.input_asset_token_id}
          onChange={(e) =>
            State.update({ input_asset_token_id: e.target.value })
          }
          id="input_asset_token_id"
        />
      </div>
      <div class="mb-3">
        <label for="output_asset_token_id" class="form-label">
          Output Asset Token Id
        </label>
        <input
          type="text"
          class="form-control"
          value={state.output_asset_token_id}
          onChange={(e) =>
            State.update({ output_asset_token_id: e.target.value })
          }
          id="output_asset_token_id"
        />
      </div>

      <div class="mb-3">
        <label for="router_contract" class="form-label">
          Router Contract
        </label>
        <input
          type="text"
          class="form-control"
          value={state.router_contract}
          onChange={(e) => State.update({ router_contract: e.target.value })}
          id="router_contract"
        />
      </div>

      <div class="mb-3">
        <label for="router_contract_abi_url" class="form-label">
          Router Contract ABI url
        </label>
        <input
          type="text"
          class="form-control"
          value={state.router_contract_abi_url}
          onChange={(e) =>
            State.update({ router_contract_abi_url: e.target.value })
          }
          id="router_contract_abi_url"
        />
      </div>

      <div class="mb-3">
        <label for="quoter_contract" class="form-label">
          Quoter Contract
        </label>
        <input
          type="text"
          class="form-control"
          value={state.quoter_contract}
          onChange={(e) => State.update({ quoter_contract: e.target.value })}
          id="quoter_contract"
        />
      </div>

      <div class="mb-3">
        <label for="quoter_contract_abi_url" class="form-label">
          Quoter Contract ABI url
        </label>
        <input
          type="text"
          class="form-control"
          value={state.quoter_contract_abi_url}
          onChange={(e) =>
            State.update({ quoter_contract_abi_url: e.target.value })
          }
          id="quoter_contract_abi_url"
        />
      </div>

      <div class="mb-3">
        <CommitButton
          disabled={!(state.chain_id && state.dex_name)}
          data={data}
        >
          Add a dex
        </CommitButton>
      </div>
    </div>

    <hr />
    <h3>Data: </h3>
    {JSON.stringify(data)}
    {/*chainlistData*/}
  </div>
);
