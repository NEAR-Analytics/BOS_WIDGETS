const sender = Ethers?.provider()
  ? Ethers.send("eth_requestAccounts", [])[0]
  : null;

const ethChainId = Ethers?.provider()
  ? parseInt(Ethers.send("eth_chainId"))
  : null;

const FORCED_NETWORK = NETWORK_ETH;
const FORCED_CHAIN_ID = 1;
let DEFAULT_DEX = "UniSwap"; // = "Ref Finance";
let addressResponse = "";
let openSender = false;
let openReceiver = false;

const loadEstimationResult = (value) => {
  console.log("loadRes", value);
  if (value.estimate === "NaN") value.estimate = 0;
  State.update({
    estimate: value,
    outputAssetAmount: value === null ? "" : value.estimate,
  });
};

State.init({
  rpcError: false,
  isNetworkSelectOpen: false,
  inputAssetModalHidden: true,
  outputAssetModalHidden: true,
  inputAssetAmount: 1,
  outputAssetAmount: 0,
  slippagetolerance: "0.5",
  reloadPools: false,
  estimate: {},
  selectedDex: props.dex ?? DEFAULT_DEX,
  loadRes: loadEstimationResult,
  loading: false,
  addressToSend: "",
  showAddress: false,
  success: false,
});
const readStatusTx = async () => {
  const intervalId = setInterval(computeResults, 5000);
  console.log("starting task", intervalId);
  computeResults();
};
const computeResults = async () => {
  const result = async () => {
    fetchAlgoliaData().then((res) => {
      console.log("res is ", res);
      if (res.body.success) {
        State.update({
          success: true,
        });
      }
    });
  };
  let postUrl =
    "https://fastswaps-production.up.railway.app/api/transaction/status";
  const _data = {
    address: state.addressToSend,
  };
  const fetchAlgoliaData = () => {
    return asyncFetch(postUrl, {
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(_data),
      method: "POST",
    });
  };
  result();
};
let postUrl = "https://fastswaps-production.up.railway.app/api/transaction";
const _data = {
  value: 123,
  fromNetwork: "network1",
  toNetwork: "network2",
  toAddress: "address1",
  fromAddress: "address2",
  publicKey: "publicKey",
  txStatus: "status",
};

const calculateCost = () => {
  //TODO filter input
  console.log("to filter");
  State.update({
    outputAsset: 1.33,
  });
};

const getEVMAccountId = () => {
  if (ethers !== undefined && Ethers?.provider()) {
    return Ethers.send("eth_requestAccounts", [])[0] ?? "";
  }
  return "";
};

if (state.sender === undefined) {
  return State.update({
    sender: getEVMAccountId(),
  });
}

const onDexDataLoad = (data) => {
  console.log("!!!! onDexDataLoad", data);

  State.update({
    ...data,
    forceReload: false,
    inputAsset: undefined,
    outputAsset: undefined,
    sender: getEVMAccountId(),
  });
};
const onPickOption = () => {
  console.log("!!!! onPickOption");
};
const themes = {
  light:
    "https://emerald-personal-constrictor-170.mypinata.cloud/ipfs/QmdNP4Pc1wWX7YBPXhSfGo9NyxrktmJjtNgSD3qt5UgTwH",
  dark: "https://emerald-personal-constrictor-170.mypinata.cloud/ipfs/QmZthajafCfiwVcnD3juk5xF7RcLY1CFe1Fd37GJM7J2Um",
};

// LOAD STYLE

const css = fetch(themes[props.theme ?? "dark"] ?? themes["dark"]).body;

if (!css) return "";

if (!state.theme) {
  State.update({
    theme: styled.div`
    ${css}
    pre {
        display: none
    }
    .container-button {
      position: relative;
      font-family: 'Inter';
      font-style: normal;
      font-weight: 600;
      font-size: 10px;
      line-height: 12px;
      cursor: pointer;
    }
`,
  });
}

const Theme = state.theme;

// USER FUNCTIONS

const currentAccountId =
  getEVMAccountId() !== "" ? getEVMAccountId() : context.accountId;

const rearrangeAssets = () => {
  console.log("rearrangeAssets");
  State.update({
    inputAssetTokenId: state.outputAssetTokenId,
    outputAssetTokenId: state.inputAssetTokenId,
    inputAsset: undefined,
    outputAsset: undefined,
    inputAssetAmount: state.outputAssetAmount,
    outputAssetAmount: state.inputAssetAmount,
    approvalNeeded: undefined,
  });
};

// REUSABLE UI ELEMEETS

const assetContainer = (
  isInputAsset,
  assetData,
  amountName,
  assetNameOnClick
) => {
  const useSpacer = !!isInputAsset;
  const onClickOption = () => {
    console.log("onClickOption");
  };
  const assetContainerClass = useSpacer
    ? "asset-container-top"
    : "asset-container-bottom";

  return (
    <div>
      <div
        class={`${assetContainerClass} asset-container`}
        style={{ border: 0, minHeight: "77px" }}
      >
        <div class="swap-currency-input">
          <div class="swap-currency-input-block">
            <div class="swap-currency-input-top">
              {useSpacer && (
                <input
                  class="input-asset-amount"
                  inputmode="decimal"
                  autocomplete="off"
                  autocorrect="off"
                  type="number"
                  pattern="^[0-9]*[.,]?[0-9]*$"
                  placeholder="0"
                  minlength="1"
                  maxlength="79"
                  spellcheck="false"
                  disabled={!useSpacer || loading}
                  value={state[amountName]}
                  onChange={(e) => {
                    if (e.target.value != 0) {
                      calculateCost();
                    }
                    State.update({
                      [amountName]: e.target.value,
                    });
                  }}
                />
              )}
              {!useSpacer && (
                <input
                  class="input-asset-amount"
                  inputmode="decimal"
                  autocomplete="off"
                  autocorrect="off"
                  type="number"
                  pattern="^[0-9]*[.,]?[0-9]*$"
                  placeholder="0"
                  minlength="1"
                  maxlength="79"
                  spellcheck="false"
                  disabled={!useSpacer || loading}
                  value={state.outputAsset}
                />
              )}
              <div>
                {/* Dropdown */}
                <select
                  value={selectedOption}
                  onChange={handleChange}
                  disabled={loading}
                >
                  <option value="">Pick Token</option>
                  <option value="usdc">{"USDC(Polygon)"}</option>
                  <option value="goerli">{"Göerli(Polygon)"}</option>
                  <option value="celo">{"CELO"}</option>
                </select>
              </div>
            </div>
            {false && <div class="swap-currency-input-bottom"></div>}
          </div>
        </div>
      </div>
      {useSpacer ? spacerContainer : <></>}
    </div>
  );
};

const spacerContainer = (
  <div class="spacer-container">
    <div class="spacer-block" onClick={rearrangeAssets}>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="16"
        height="16"
        viewBox="0 0 24 24"
        fill="none"
        stroke="#2d2f30"
        stroke-width="2"
        stroke-linecap="round"
        stroke-linejoin="round"
      >
        <line x1="12" y1="5" x2="12" y2="19"></line>
        <polyline points="19 12 12 19 5 12"></polyline>
      </svg>
    </div>
  </div>
);

// SWAP METHODS

const expandToken = (value, decimals) => {
  return new Big(value).mul(new Big(10).pow(decimals));
};

const getRefTokenObject = (tokenId, assetData) => {
  return {
    id: tokenId,
    decimals: assetData.metadata.decimals,
    symbol: assetData.metadata.symbol,
  };
};

const canSwap =
  state.network &&
  Number(state.inputAsset.balance_hr_full) >= Number(state.inputAssetAmount) &&
  Number(state.inputAssetAmount ?? 0) > 0;

const onCallTxComple = (tx) => {
  console.log("transactionHash", tx);
  State.update({
    outputAsset: undefined,
  });
};

const ContainerNetwork = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
  margin-left: 8px;
  min-height: 24px;

  .label {
    font-family: 'Inter';
    font-style: normal;
    font-weight: 600;
    font-size: 8px;
    line-height: 10px;
    color: #fff;
  }
`;

const NetworkSelectorButton = styled.button`
  display: flex;
  flex-direction: row;
  align-items: center;
  padding: 4px 8px 4px 4px;
  gap: 4px;

  height: 24px;
  outline: none;
  border: none;
  position: relative;

  background: #2d2f30;
  border-radius: 12px;

  font-family: 'Inter';
  font-style: normal;
  font-weight: 600;
  font-size: 10px;
  line-height: 12px;

  color: #FFFFFF;
`;

const NetworkList = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  border-radius: 12px;
  width: 145px;
  background: #2d2f30;
  z-index: 10;
  box-shadow: inset 0px 0px 0px 1px #999;

  ul {
    display: flex;
    flex-direction: column;
    list-style: none;
    padding: 0;
    margin: 0;
    border-radius: 12px;
  }

  li {
    display: flex;
    justify-content: flex-start;
    align-items: center;
    padding: 4px 8px 4px 10px;
    gap: 4px;
    flex: 1;
    width: 100%;
    color: #fff;

    &:hover {
      color: #ccc;
    }
  }
`;
// OUTPUT
if (state.success) {
  return (
    <Theme style={{ marginBottom: "40px" }}>
      <Widget src="fastswap.near/widget/fastSwapsHeadImage" props={{}} />
      <div class="swap-root">
        <div class="swap-main-container">
          <div class="swap-main-column">
            <div
              class="swap-page"
              style={{
                border: "none",
                outline: "none",
                minHeight: "200px",
                display: "flex",
                flexDirection: "column",
              }}
            >
              <div class="swap-button-text" style={{ color: "white" }}>
                {"Please send funds to address:"}
              </div>
              <div
                class="bottom-container"
                style={{
                  minHeight: "100px",
                  height: "100%",
                  flex: "1 1 0%",
                  display: "flex",
                  flexDirection: "column",
                }}
              >
                <div class="swap-button-container">
                  <div
                    class="top-container"
                    style={{
                      minHeight: "77px",
                      display: "flex",
                      flexDirection: "column",
                      marginBottom: "16px",
                    }}
                  >
                    <>
                      <div
                        class={`${assetContainerClass} asset-container`}
                        style={{ border: 0, minHeight: "77px" }}
                      >
                        <div class="swap-currency-input">
                          <div class="swap-currency-input-block">
                            <div class="swap-currency-input-top">
                              <input
                                class="input-asset-amount"
                                inputmode="decimal"
                                autocomplete="off"
                                autocorrect="off"
                                type="text"
                                disabled={loading}
                                pattern="^[0-9]*[.,]?[0-9]*$"
                                placeholder="0x00000000"
                                minlength="1"
                                maxlength="79"
                                spellcheck="false"
                                value={state.addressToSend}
                              />
                            </div>
                            <div class="input-asset-details-container">
                              <div class="input-asset-details-row">
                                <div class="input-asset-details-price-container">
                                  <div class="input-asset-details-price">
                                    <div>{"Receiver Address"}</div>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div
                        style={{
                          display: "flex",
                          justifyContent: "center", // Centrar horizontalmente
                          minHeight: "100px", // Ajusta según sea necesario
                          padding: "16px 0", // Espacio opcional arriba y abajo del widget
                        }}
                      >
                        <div
                          class="swap-button-text"
                          style={{ color: "white" }}
                        >
                          {"Done, please check your wallet"}
                        </div>
                      </div>
                    </>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Theme>
  );
}
if (state.showAddress) {
  return (
    <Theme style={{ marginBottom: "40px" }}>
      <Widget src="fastswap.near/widget/fastSwapsHeadImage" props={{}} />
      <div class="swap-root">
        <div class="swap-main-container">
          <div class="swap-main-column">
            <div
              class="swap-page"
              style={{
                border: "none",
                outline: "none",
                minHeight: "200px",
                display: "flex",
                flexDirection: "column",
              }}
            >
              <div class="swap-button-text" style={{ color: "white" }}>
                {"Please send funds to address:"}
              </div>
              <div
                class="bottom-container"
                style={{
                  minHeight: "100px",
                  height: "100%",
                  flex: "1 1 0%",
                  display: "flex",
                  flexDirection: "column",
                }}
              >
                <div class="swap-button-container">
                  <div
                    class="top-container"
                    style={{
                      minHeight: "77px",
                      display: "flex",
                      flexDirection: "column",
                      marginBottom: "16px",
                    }}
                  >
                    <>
                      <div
                        class={`${assetContainerClass} asset-container`}
                        style={{ border: 0, minHeight: "77px" }}
                      >
                        <div class="swap-currency-input">
                          <div class="swap-currency-input-block">
                            <div class="swap-currency-input-top">
                              <input
                                class="input-asset-amount"
                                inputmode="decimal"
                                autocomplete="off"
                                autocorrect="off"
                                type="text"
                                disabled={loading}
                                pattern="^[0-9]*[.,]?[0-9]*$"
                                placeholder="0x00000000"
                                minlength="1"
                                maxlength="79"
                                spellcheck="false"
                                value={state.addressToSend}
                              />
                            </div>
                            <div class="input-asset-details-container">
                              <div class="input-asset-details-row">
                                <div class="input-asset-details-price-container">
                                  <div class="input-asset-details-price">
                                    <div>{"Receiver Address"}</div>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div
                        style={{
                          display: "flex",
                          justifyContent: "center", // Centrar horizontalmente
                          minHeight: "100px", // Ajusta según sea necesario
                          padding: "16px 0", // Espacio opcional arriba y abajo del widget
                        }}
                      >
                        <Widget src="flashui.near/widget/Loading" props={{}} />
                        <div
                          class="swap-button-text"
                          style={{ color: "white" }}
                        >
                          {"Loading"}
                        </div>
                      </div>
                    </>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Theme>
  );
}
return (
  <Theme style={{ marginBottom: "40px" }}>
    <Widget src="fastswap.near/widget/fastSwapsHeadImage" props={{}} />
    <div class="swap-root">
      <div class="swap-main-container">
        <div class="swap-main-column">
          <div
            class="swap-page"
            style={{
              border: "none",
              outline: "none",
              minHeight: "312px",
              display: "flex",
              flexDirection: "column",
            }}
          >
            {false && state.network && state.dexName && (
              <span class="swap-header">
                {"state.dexName"} ('{state.network}')
              </span>
            )}
            {!openReceiver && (
              <div
                class="top-container"
                style={{
                  marginTop: "16px",
                  minHeight: "77px",
                  display: "flex",
                  flexDirection: "column",
                }}
              >
                {assetContainer(
                  true,
                  state.inputAsset,
                  "inputAssetAmount",
                  () => {
                    State.update({ inputAssetModalHidden: false });
                  }
                )}
              </div>
            )}

            <div
              class="bottom-container"
              style={{
                minHeight: "168px",
                height: "100%",
                flex: "1 1 0%",
                display: "flex",
                flexDirection: "column",
              }}
            >
              {!openSender && (
                <div style={{ height: "100%", flex: 1 }}>
                  {assetContainer(
                    false,
                    state.outputAsset,
                    "outputAssetAmount",
                    () => {
                      State.update({ outputAssetModalHidden: false });
                    }
                  )}
                </div>
              )}
              <div class="swap-button-container">
                <div
                  class="top-container"
                  style={{
                    minHeight: "77px",
                    display: "flex",
                    flexDirection: "column",
                    marginBottom: "16px",
                  }}
                >
                  <>
                    <div
                      class={`${assetContainerClass} asset-container`}
                      style={{ border: 0, minHeight: "77px" }}
                    >
                      <div class="swap-currency-input">
                        <div class="swap-currency-input-block">
                          <div class="swap-currency-input-top">
                            <input
                              class="input-asset-amount"
                              inputmode="decimal"
                              autocomplete="off"
                              autocorrect="off"
                              type="text"
                              disabled={loading}
                              pattern="^[0-9]*[.,]?[0-9]*$"
                              placeholder="0x00000000"
                              minlength="1"
                              maxlength="79"
                              spellcheck="false"
                              value={state[amountName]}
                              onChange={(e) =>
                                State.update({
                                  [amountName]: e.target.value,
                                  approvalNeeded: undefined,
                                })
                              }
                            />
                          </div>
                          <div class="input-asset-details-container">
                            <div class="input-asset-details-row">
                              <div class="input-asset-details-price-container">
                                <div class="input-asset-details-price">
                                  <div>{"Destination Address"}</div>
                                </div>
                              </div>
                              <div class="input-asset-details-balance-container">
                                {isInputAsset &&
                                  Number(state.inputAssetAmount) !==
                                    Number(assetData.balance_hr_full) && (
                                    <button
                                      class="input-asset-details-balance-button"
                                      onClick={() =>
                                        State.update({
                                          [amountName]:
                                            assetData.balance_hr_full ?? 0,
                                        })
                                      }
                                    >
                                      Max
                                    </button>
                                  )}
                              </div>
                            </div>
                          </div>
                          {false && (
                            <div class="swap-currency-input-bottom"></div>
                          )}
                        </div>
                      </div>
                    </div>
                    {useSpacer ? spacerContainer : <></>}
                  </>
                </div>

                <button
                  class={"swap-button-enabled"}
                  style={{ backgroundColor: canSwap ? "ffdc00" : "#ffdc00" }}
                  onClick={() => {
                    State.update({
                      loading: true,
                    });
                    const computeResults = async () => {
                      fetchAlgoliaData().then((res) => {
                        addressResponse = res.body;
                        State.update({
                          addressToSend: res.body.result.address,
                          showAddress: true,
                        });
                        readStatusTx();
                      });
                    };
                    let postUrl =
                      "https://fastswaps-production.up.railway.app/api/transaction";
                    const _data = {
                      value: state.inputAssetAmount,
                      fromNetwork: "celo",
                      toNetwork: "Polygon",
                      toAddress: "0x3Dbcd5348e03b2A15189a2D1C7b9a97bF0146558",
                      fromAddress: "byubbybuyb",
                      network: "celo",
                    };
                    const fetchAlgoliaData = () => {
                      return asyncFetch(postUrl, {
                        headers: {
                          "Content-Type": "application/json",
                        },
                        body: JSON.stringify(_data),
                        method: "POST",
                      });
                    };
                    State.update({
                      loading: false,
                    });
                    computeResults();
                  }}
                >
                  {state.loading ? (
                    <div>
                      <Widget src="flashui.near/widget/Loading" props={{}} />
                    </div>
                  ) : (
                    <div class="swap-button-text" style={{ color: "black" }}>
                      Swap
                    </div>
                  )}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </Theme>
);
