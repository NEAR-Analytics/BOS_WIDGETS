const NETWORKS = [
  {
    name: "NEAR",
    chainId: undefined,
    icon: "https://assets.coingecko.com/coins/images/10365/small/near.jpg",
    dex: "Ref Finance",
  },
  {
    name: "ETH",
    chainId: 1,
    icon: "https://assets.coingecko.com/coins/images/279/small/ethereum.png",
    dex: "Uniswap",
  },
  {
    name: "ZKSYNC",
    chainId: 324,
    icon: "https://lite.zksync.io/images/logo-no-letters.svg",
    dex: "SyncSwap",
  },
  {
    name: "ZKEVM",
    chainId: 1101,
    dex: "QuickSwap",
    icon: "https://assets-global.website-files.com/6364e65656ab107e465325d2/642235057dbc06788f6c45c1_polygon-zkevm-logo.png",
  },
  {
    name: "ZKEVM",
    chainId: 1101,
    dex: "Balancer",
    icon: "https://assets-global.website-files.com/6364e65656ab107e465325d2/642235057dbc06788f6c45c1_polygon-zkevm-logo.png",
  },
  {
    name: "ZKEVM",
    chainId: 1101,
    dex: "Pancake Swap",
    icon: "https://repository-images.githubusercontent.com/440462673/6872d684-f7ed-463c-9a5c-76542eddbcc4",
  },
  {
    name: "AURORA",
    chainId: 1313161554,
    icon: "https://assets.coingecko.com/coins/images/20582/small/aurora.jpeg",
    dex: "TriSolaris",
  },
  {
    name: "POLYGON",
    chainId: 137,
    icon: "https://assets.coingecko.com/coins/images/4713/small/matic-token-icon.png",
    dex: "Balancer",
  },
];

const NETWORK_NEAR = "NEAR";
const NETWORK_ETH = "ETH";
const NETWORK_ZKSYNC = "ZKSYNC";
const NETWORK_ZKEVM = "ZKEVM";
const NETWORK_AURORA = "AURORA";
const NETWORK_POLYGON = "POLYGON";

const sender = Ethers.send("eth_requestAccounts", [])[0];

if (sender) {
  Ethers.provider()
    .getNetwork()
    .then(({ chainId }) => {
      State.update({ selectedChainId: chainId });
    });
}

State.init({
  isNetworkSelectOpen: false,
  inputAssetModalHidden: true,
  outputAssetModalHidden: true,
  inputAssetAmount: 1,
  outputAssetAmount: 0,
  slippagetolerance: "0.5",
  reloadPools: false,
  estimate: {},
  selectedDex: props.dex ?? "Pancake Swap",
  loadRes: (value) => {
    console.log("loadRes", value);
    if (value.estimate === "NaN") value.estimate = 0;
    State.update({
      estimate: value,
      outputAssetAmount: value === null ? "" : value.estimate,
    });
  },
});

const refReferralId = props.refReferralId ?? "ukraine";
const forceNetwork = props.forceNetwork;

const getEVMAccountId = () => {
  if (ethers !== undefined) {
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

const themes = {
  light:
    "https://pluminite.mypinata.cloud/ipfs/QmfD6YngV7RzWse1EZdpy8HjyjS6Rp2BQVb5NzFjH7BxXL",
  dark: "https://pluminite.mypinata.cloud/ipfs/QmVLdPM2v8R5qxhshCbKSTNAwnxtVm8FD6bQznqiirAkMT",
};

// LOAD STYLE

const css = fetch(themes[props.theme ?? "dark"] ?? themes["dark"]).body;

if (!css) return "";

if (!state.theme) {
  State.update({
    theme: styled.div`
    ${css}
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
  if (!assetData) return;
  const useSpacer = !!isInputAsset;

  const assetContainerClass = useSpacer
    ? "asset-container-top"
    : "asset-container-bottom";
  return (
    <>
      <div
        class={`${assetContainerClass} asset-container`}
        style={{ border: 0 }}
      >
        <div class="swap-currency-input">
          <div class="swap-currency-input-block">
            <div class="swap-currency-input-top">
              <input
                class="input-asset-amount"
                nputmode="decimal"
                autocomplete="off"
                autocorrect="off"
                type="text"
                pattern="^[0-9]*[.,]?[0-9]*$"
                placeholder="0"
                minlength="1"
                maxlength="79"
                spellcheck="false"
                value={state[amountName]}
              />
              <button class="input-asset-token" onClick={assetNameOnClick}>
                <span class="input-asset-token-menu">
                  <div class="input-asset-token-name">
                    <div class="input-asset-token-icon">
                      {assetData.metadata.icon ? (
                        <img
                          alt={`${assetData.metadata.name} logo`}
                          src={assetData.metadata.icon}
                          class="input-asset-token-icon-img"
                        />
                      ) : (
                        <>Undefined</>
                      )}
                    </div>
                    <span class="input-asset-token-ticker">
                      {assetData.metadata.symbol}
                    </span>
                  </div>
                  <svg width="6" height="4" viewBox="0 0 6 4" fill="none">
                    <path
                      d="M4.99998 1L2.99999 3L1 1"
                      stroke="white"
                      stroke-width="1.21738"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                    ></path>
                  </svg>
                </span>
              </button>
            </div>
            <div class="input-asset-details-container">
              <div class="input-asset-details-row">
                <div class="input-asset-details-price-container">
                  <div class="input-asset-details-price">
                    <div>${assetData.price}</div>
                  </div>
                </div>
                <div class="input-asset-details-balance-container">
                  <div class="input-asset-details-balance-text">
                    Balance: {assetData.balance_hr}
                  </div>
                  {isInputAsset &&
                    Number(state.inputAssetAmount) !==
                      Number(assetData.balance_hr_full) && (
                      <button
                        class="input-asset-details-balance-button"
                        onClick={() =>
                          State.update({
                            [amountName]: assetData.balance_hr_full ?? 0,
                          })
                        }
                      >
                        Max
                      </button>
                    )}
                </div>
              </div>
            </div>
            {false && <div class="swap-currency-input-bottom"></div>}
          </div>
        </div>
      </div>
      {useSpacer ? spacerContainer : <></>}
    </>
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

const tokenInApprovaleNeededCheck = () => {
  if (state.approvalNeeded === undefined) {
    if (
      getEVMAccountId() &&
      state.erc20Abi !== undefined &&
      state.routerContract !== undefined &&
      [
        NETWORK_ETH,
        NETWORK_ZKSYNC,
        NETWORK_ZKEVM,
        NETWORK_AURORA,
        NETWORK_POLYGON,
      ].includes(state.network)
    ) {
      const ifaceErc20 = new ethers.utils.Interface(state.erc20Abi);

      const encodedTokenAllowancesData = ifaceErc20.encodeFunctionData(
        "allowance",
        [getEVMAccountId(), state.routerContract]
      );

      return Ethers.provider()
        .call({
          to: state.inputAssetTokenId,
          data: encodedTokenAllowancesData,
        })
        .then((encodedTokenAllowanceHex) => {
          const tokenAllowance = ifaceErc20.decodeFunctionResult(
            "allowance",
            encodedTokenAllowanceHex
          );

          if (tokenAllowance) {
            State.update({
              approvalNeeded: new Big(tokenAllowance).toFixed() == "0",
            });
          }
        });
    } else {
      State.update({ approvalNeeded: false });
    }
  }
};

if (
  [
    NETWORK_ZKSYNC,
    NETWORK_ZKEVM,
    NETWORK_ETH,
    NETWORK_AURORA,
    NETWORK_POLYGON,
  ].includes(state.network)
) {
  tokenInApprovaleNeededCheck();
}

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

const caretSvg = (
  <svg width="6" height="4" viewBox="0 0 6 4" fill="none">
    <path
      d="M4.99998 1L2.99999 3L1 1"
      stroke="white"
      stroke-width="1.21738"
      stroke-linecap="round"
      stroke-linejoin="round"
    />
  </svg>
);

const { isNetworkSelectOpen } = state;
const selectedChainId = state.selectedChainId ?? 0;
const selectedDex = state.selectedDex;

const switchNetwork = (chainId, dex) => {
  console.log("switchNetwork", chainId, dex);
  Ethers.send("wallet_switchEthereumChain", [
    { chainId: `0x${chainId.toString(16)}` },
  ]);
  State.update({
    selectedDex: dex,
    isNetworkSelectOpen: false,
    forceReload: true,
  });
  console.log("dex", dex);
};

const networkList = NETWORKS.map((network) => network.chainId); //  [1, 1101];

const openNetworkList = () => {
  State.update({ isNetworkSelectOpen: true, isTokenDialogOpen: false });
};

const getNetworkKey = (chainId, dex) => `${chainId ?? 0}_${dex ?? ""}`;

const networks = {};
NETWORKS.map(
  (network) =>
    (networks[getNetworkKey(network.chainId, network.dex)] = {
      chainId: network.chainId,
      name: network.name,
      icon: network.icon,
      dex: network.dex,
    })
);

const assetsList = state.assets
  ? state.assets.map((tokenId) => (
      <Widget
        src="zavodil.near/widget/TokenBalance"
        props={{
          tokenId: tokenId,
          coinGeckoTokenId: state.coinGeckoTokenIds[tokenId],
          network: state.network,
          hideZeroBalance: true,
          fractionDigits: 2,
        }}
      ></Widget>
    ))
  : "";

console.log("state", state.selectedDex, networks);

const getFromNetworkLabel = () => {
  if (!selectedDex && selectedChainId) {
    console.log("selectedDex is missing");
    let chainKeyDataArray = Object.keys(networks).filter(
      (chainKey) => networks[chainKey].chainId == selectedChainId
    );
    console.log("chainKeyDataArray", chainKeyDataArray);
    if (chainKeyDataArray.length) {
      selectedDex = networks[chainKeyDataArray[0]].dex;
    }
  }
  let network = networks[getNetworkKey(selectedChainId, selectedDex)];
  return network.icon ? (
    <>
      <img style={{ width: "16px" }} src={network.icon} />
      <span>
        {network.name} {network.dex}
      </span>
    </>
  ) : (
    <>Undefined</>
  );
};

const networksDropDown = Object.keys(networks).map((chainKey) => {
  let network = networks[chainKey];
  return (
    <li
      onClick={() => switchNetwork(Number(network.chainId), network.dex ?? "")}
    >
      <img style={{ width: "16px" }} src={network.icon} />
      <span>
        {network.name} {network.dex}
      </span>
    </li>
  );
});

// OUTPUT

if (forceNetwork && state.network && forceNetwork !== state.network) {
  return (
    <Theme>
      <div class="swap-main-container pt-5">
        To proceed, kindly switch to {forceNetwork}.
        {!state.sender && (
          <div class="swap-button-container">
            <Web3Connect
              className="swap-button-enabled swap-button-text p-2"
              connectLabel="Connect with Web3"
            />
          </div>
        )}
      </div>
    </Theme>
  );
}

console.log("selectedDex", state.selectedDex, selectedDex);
//const prevSelectedDex =

return (
  <Theme>
    <Widget
      src="zavodil.near/widget/DexData2.1"
      props={{
        onLoad: onDexDataLoad,
        NETWORK_NEAR,
        NETWORK_ETH,
        NETWORK_ZKSYNC,
        NETWORK_ZKEVM,
        NETWORK_AURORA,
        NETWORK_POLYGON,
        forceReload: state.forceReload ?? false,
        DEX: state.selectedDex,
      }}
    />

    {state.network && state.inputAsset && state.inputAssetTokenId && (
      <Widget
        src="zavodil.near/widget/AssetListModal"
        props={{
          hidden: state.inputAssetModalHidden ?? true,
          network: state.network,
          assets: state.assets,
          coinGeckoTokenIds: state.coinGeckoTokenIds,
          selectedAssets: [state.inputAssetTokenId],
          onClick: (tokenId) => {
            State.update({
              inputAssetModalHidden: true,
              inputAssetTokenId: tokenId,
              inputAsset: null,
              approvalNeeded: undefined,
            });
          },
          onClose: () => State.update({ inputAssetModalHidden: true }),
        }}
      />
    )}
    {state.network && state.outputAsset && state.outputAssetTokenId && (
      <Widget
        src="zavodil.near/widget/AssetListModal"
        props={{
          hidden: state.outputAssetModalHidden ?? true,
          assets: state.assets,
          coinGeckoTokenIds: state.coinGeckoTokenIds,
          network: state.network,
          selectedAssets: [state.outputAssetTokenId],
          onClick: (tokenId) => {
            State.update({
              outputAssetModalHidden: true,
              outputAssetTokenId: tokenId,
              outputAsset: null,
            });
          },
          onClose: () => State.update({ outputAssetModalHidden: true }),
        }}
      />
    )}
    {!state.inputAsset && state.network && state.inputAssetTokenId && (
      <Widget
        src="zavodil.near/widget/TokenData"
        props={{
          tokenId: state.inputAssetTokenId,
          coinGeckoTokenId: state?.coinGeckoTokenIds?.[state.inputAssetTokenId],
          network: state.network,
          NETWORK_NEAR,
          NETWORK_ETH,
          NETWORK_ZKSYNC,
          NETWORK_ZKEVM,
          NETWORK_AURORA,
          NETWORK_POLYGON,
          onLoad: (inputAsset) => {
            console.log("TokenData onLoad inputAsset", inputAsset);
            inputAsset.metadata.symbol =
              inputAsset.metadata.symbol.toUpperCase();
            State.update({ inputAsset });
          },
        }}
      />
    )}
    {!state.outputAsset && state.network && state.outputAssetTokenId && (
      <Widget
        src="zavodil.near/widget/TokenData"
        props={{
          tokenId: state.outputAssetTokenId,
          coinGeckoTokenId:
            state?.coinGeckoTokenIds?.[state.outputAssetTokenId],
          network: state.network,
          NETWORK_NEAR,
          NETWORK_ETH,
          NETWORK_ZKSYNC,
          NETWORK_ZKEVM,
          NETWORK_AURORA,
          NETWORK_POLYGON,
          onLoad: (outputAsset) => {
            console.log("TokenData onLoad outputAsset", outputAsset);
            outputAsset.metadata.symbol =
              outputAsset.metadata.symbol.toUpperCase();
            State.update({ outputAsset });
          },
        }}
      />
    )}

    {state.network === NETWORK_NEAR &&
      state.inputAsset &&
      state.outputAsset && (
        <Widget
          src="weige.near/widget/ref-swap-getEstimate"
          props={{
            loadRes: state.loadRes,
            tokenIn: getRefTokenObject(
              state.inputAssetTokenId,
              state.inputAsset
            ),
            tokenOut: getRefTokenObject(
              state.outputAssetTokenId,
              state.outputAsset
            ),
            amountIn: state.inputAssetAmount ?? 0,
            reloadPools: state.reloadPools,
            setReloadPools: (value) =>
              State.update({
                reloadPools: value,
              }),
          }}
        />
      )}

    {state.network === NETWORK_ZKEVM &&
      state.inputAssetTokenId &&
      state.outputAssetTokenId &&
      state.inputAssetTokenId !== state.outputAssetTokenId &&
      state.inputAssetAmount &&
      state.inputAsset &&
      state.inputAsset.metadata?.decimals &&
      state.outputAsset &&
      state.outputAsset.metadata?.decimals && (
        <>
          <Widget
            src="zavodil.near/widget/quickswap-v3-getEstimate"
            props={{
              loadRes: state.loadRes,
              tokenIn: state.inputAssetTokenId,
              tokenOut: state.outputAssetTokenId,
              tokenOutDecimals: state.outputAsset.metadata.decimals,
              amountIn: expandToken(
                state.inputAssetAmount,
                state.inputAsset.metadata.decimals
              ).toFixed(0),
              reloadPools: state.reloadPools,
              setReloadPools: (value) =>
                State.update({
                  reloadPools: value,
                }),
            }}
          />
        </>
      )}

    {state.network === NETWORK_ETH &&
      state.inputAssetTokenId &&
      state.outputAssetTokenId &&
      state.inputAssetTokenId !== state.outputAssetTokenId &&
      state.inputAssetAmount &&
      state.inputAsset &&
      state.inputAsset.metadata?.decimals &&
      state.outputAsset &&
      state.outputAsset.metadata?.decimals && (
        <>
          <Widget
            src="zavodil.near/widget/uni-v3-getEstimate"
            props={{
              loadRes: state.loadRes,
              tokenIn: state.inputAssetTokenId,
              tokenOut: state.outputAssetTokenId,
              tokenOutDecimals: state.outputAsset.metadata.decimals,
              amountIn: expandToken(
                state.inputAssetAmount,
                state.inputAsset.metadata.decimals
              ).toFixed(0),
              reloadPools: state.reloadPools,
              setReloadPools: (value) =>
                State.update({
                  reloadPools: value,
                }),
            }}
          />
        </>
      )}

    {state.network === NETWORK_POLYGON &&
      state.sender &&
      state.inputAssetTokenId &&
      state.outputAssetTokenId &&
      state.inputAssetTokenId !== state.outputAssetTokenId &&
      state.inputAssetAmount &&
      state.inputAsset &&
      state.inputAsset.metadata?.decimals &&
      state.outputAsset &&
      state.outputAsset.metadata?.decimals && (
        <>
          <Widget
            src="zavodil.near/widget/balancer-queryBatchSwap"
            props={{
              loadRes: state.loadRes,
              tokenIn: state.inputAssetTokenId,
              tokenOut: state.outputAssetTokenId,
              inputAsset: state.inputAsset,
              outputAsset: state.outputAsset,
              sender: state.sender,
              quoterContractId: state.routerContract,
              amountIn: expandToken(
                state.inputAssetAmount,
                state.inputAsset.metadata.decimals
              ).toFixed(0),
              reloadPools: state.reloadPools,
              setReloadPools: (value) =>
                State.update({
                  reloadPools: value,
                }),
            }}
          />
        </>
      )}

    {[NETWORK_ZKSYNC, NETWORK_AURORA].includes(state.network) &&
      state.inputAsset &&
      state.outputAsset &&
      state.inputAssetAmount &&
      state.outputAsset.price &&
      state.inputAsset.price &&
      state.loadRes({
        estimate: (
          (parseFloat(state.inputAssetAmount) *
            parseFloat(state.inputAsset.price)) /
          parseFloat(state.outputAsset.price)
        ).toFixed(18),
      })}

    <div class="swap-root">
      <div class="swap-main-container">
        <div class="swap-main-column">
          <div class="swap-page" style={{ border: "none", outline: "none" }}>
            {false && state.network && state.dexName && (
              <span class="swap-header">
                {state.dexName} ({state.network})
              </span>
            )}
            {/* DD*/}
            {state.network && state.dexName && (
              <ContainerNetwork>
                <div class="container-button">
                  <NetworkSelectorButton onClick={openNetworkList}>
                    {getFromNetworkLabel()}
                    {caretSvg}
                  </NetworkSelectorButton>
                  {isNetworkSelectOpen && (
                    <NetworkList>
                      <ul>{networksDropDown}</ul>
                    </NetworkList>
                  )}
                </div>
              </ContainerNetwork>
            )}
            <div style={{ display: "flex", paddingLeft: "5px" }}>
              {assetsList}
            </div>

            <div class="top-container">
              {assetContainer(
                true,
                state.inputAsset,
                "inputAssetAmount",
                () => {
                  State.update({ inputAssetModalHidden: false });
                }
              )}
            </div>
            <div class="bottom-container">
              <div>
                {assetContainer(
                  fasle,
                  state.outputAsset,
                  "outputAssetAmount",
                  () => {
                    State.update({ outputAssetModalHidden: false });
                  }
                )}
                {!!state.outputAssetAmount &&
                  state.inputAssetTokenId !== state.outputAssetTokenId && (
                    <div class="swap-price-container">
                      <div class="swap-price-block">
                        <div class="swap-price-grid">
                          <div class="swap-price-row">
                            <div class="swap-price-details-container">
                              <span>
                                <div class="swap-price-details-icon">
                                  <div>
                                    <svg
                                      xmlns="http://www.w3.org/2000/svg"
                                      width="12"
                                      height="12"
                                      viewBox="0 0 12 12"
                                      fill="none"
                                      stroke="#98A1C0"
                                      stroke-width="1"
                                      stroke-linecap="round"
                                      stroke-linejoin="round"
                                      class="swap-price-details-svg"
                                    >
                                      <circle cx="6" cy="6" r="5"></circle>
                                      <line x1="6" y1="8" x2="6" y2="6"></line>
                                      <line x1="6" y1="4" x2="6" y2="4"></line>
                                    </svg>
                                  </div>
                                </div>
                              </span>
                              <div class="swap-price-details-text">
                                <button class="swap-price-details-text-button">
                                  <div class="swap-price-details-rate">
                                    {Number(state.inputAssetAmount) === 0 ||
                                    Number(state.outputAssetAmount) === 0
                                      ? " "
                                      : `1 ${
                                          state.inputAsset.metadata.symbol
                                        } ≈ ${new Big(
                                          state.outputAssetAmount ?? 0
                                        )
                                          .div(state.inputAssetAmount ?? 1)
                                          .toFixed(4, 0)}
                                        ${state.outputAsset.metadata.symbol}`}
                                  </div>
                                  <div
                                    class="swap-price-details-price"
                                    style={{ fontSize: "8px" }}
                                  >
                                    {Number(state.inputAssetAmount) === 0 ||
                                    Number(state?.outputAsset?.price) === 0
                                      ? ""
                                      : `($${new Big(
                                          state.outputAssetAmount ?? 0
                                        )
                                          .div(state.inputAssetAmount ?? 1)
                                          .times(state?.outputAsset?.price ?? 1)
                                          .toFixed(4)})`}
                                  </div>
                                </button>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  )}
              </div>
              <div class="swap-button-container">
                {state.approvalNeeded === true && (
                  <button
                    class={"swap-button-enabled"}
                    onClick={() => {
                      if (
                        [NETWORK_ETH, NETWORK_POLYGON].includes(state.network)
                      ) {
                        state.callTokenApproval(state, () => {
                          onCallTxComple();
                          tokenInApprovaleNeededCheck();
                        });
                      } else {
                        state.callTokenApproval(
                          state,
                          () => {
                            onCallTxComple();
                            tokenInApprovaleNeededCheck();
                          },
                          undefined /* "120"*/,
                          undefined /* 100000 */
                        );
                      }
                    }}
                  >
                    <div class="swap-button-text">
                      Approve {state.inputAsset.metadata.symbol}
                    </div>
                  </button>
                )}
                {state.approvalNeeded !== true && (
                  <button
                    class={canSwap ? "swap-button-enabled" : "swap-button"}
                    onClick={() => {
                      if (canSwap) {
                        if (state.network === NETWORK_NEAR) {
                          state.callTx(state, onCallTxComple);
                        } else if (state.network === NETWORK_ZKSYNC) {
                          state.callTx(state, onCallTxComple);
                        } else if (
                          state.network === NETWORK_ZKEVM &&
                          state.estimate.path
                        ) {
                          console.log(
                            " state.estimate.path",
                            state.estimate.path
                          );
                          state.callTx(
                            state,
                            onCallTxComple,
                            "2.09",
                            300000,
                            "0",
                            state.estimate.path
                          );
                        } else if (state.network === NETWORK_ETH) {
                          state.callTx(state, onCallTxComple);
                        } else if (state.network === NETWORK_AURORA) {
                          state.callTx(state, onCallTxComple, "0.1", 700000);
                        } else if (state.network === NETWORK_POLYGON) {
                          state.callTx(state, onCallTxComple);
                        }
                      }
                    }}
                  >
                    <div class="swap-button-text">Swap</div>
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>
        <div class="pt-3 text-secondary opacity-50 text-center">
          <p>
            Supported networks:{" "}
            <ul>
              {NETWORKS.map((network, index) => {
                return network.chainId ? (
                  <>
                    <li
                      className="wrexlink"
                      title="Click to switch"
                      onClick={() => switchNetwork(network.chainId)}
                    >
                      &#8227; {network.name} ({network.dex})
                    </li>
                  </>
                ) : (
                  <li style={{ display: "inline" }}>&#8227; {network.name}</li>
                );
              })}
            </ul>
          </p>
          {currentAccountId && <p>Current account: {currentAccountId}</p>}

          {!state.sender && (
            <div class="d-flex justify-content-center">
              <Web3Connect
                className="swap-button-enabled swap-button-text p-2 swap-main-column text-center"
                connectLabel="Connect with Web3"
              />
            </div>
          )}
        </div>
      </div>
    </div>
  </Theme>
);
