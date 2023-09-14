const NETWORKS = [
  {
    name: NETWORK_MANTLE,
    chainId: 5000,
    dex: "Agni",
    icon: "https://assets.coingecko.com/markets/images/1199/small/agni.png",
  },
  {
    name: NETWORK_MANTLE,
    chainId: 5000,
    dex: "FusionX V3",
    icon: "https://ipfs.near.social/ipfs/bafkreifiphkr4bvatimqrz2lty4fgygb2awpvbcsri2bny23w47dactnly",
  },
  {
    name: NETWORK_MANTLE,
    chainId: 5000,
    dex: "iZiSwap",
    icon: "https://ipfs.near.social/ipfs/bafkreifsgwu2zd6y2n5alekr5qgdhzoivlkl5wujtq3z7gnm5pw4jy7sgi",
  },
  {
    name: NETWORK_MANTLE,
    chainId: 5000,
    dex: "Ammos Finance",
    icon: "https://ipfs.near.social/ipfs/bafkreicwvufboezdhcjnvmwmy5ctbd7d4zimdivuaawn5g3bs2hxb567ra",
  },
];

const NETWORK_NEAR = "NEAR";
const NETWORK_ETH = "ETH";
const NETWORK_ZKSYNC = "ZKSYNC";
const NETWORK_ZKEVM = "ZKEVM";
const NETWORK_AURORA = "AURORA";
const NETWORK_POLYGON = "POLYGON";
const NETWORK_MANTLE = "MANTLE";

const FORCED_NETWORK = NETWORK_MANTLE;
const FORCED_CHAIN_ID = 5000;
const DEFAULT_DEX = "Agni";

const isEVM = [
  NETWORK_ETH,
  NETWORK_ZKSYNC,
  NETWORK_ZKEVM,
  NETWORK_AURORA,
  NETWORK_POLYGON,
  NETWORK_MANTLE,
].includes(state.network);

const sender = Ethers.send("eth_requestAccounts", [])[0];

if (sender) {
  Ethers.provider()
    .getNetwork()
    .then(({ chainId }) => {
      State.update({ selectedChainId: chainId });
    });
}

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
});

const reload = () => {
  State.update({
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
  });
};

const refReferralId = props.refReferralId ?? "ukraine";
const forceNetwork = props.forceNetwork ?? FORCED_NETWORK;

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

if (state.sender && state.network === NETWORK_MANTLE) {
  console.log("Check RPC");
  // load weth balance to check rpc availability
  const wethAbiUrl =
    "https://gist.githubusercontent.com/zavodil/40945d102e2b76d2cf364c4930ab562a/raw/6d156ead258b88a1df0f14f8b44ba7f074825345/weth.json";

  const wethAbi = fetch(wethAbiUrl);
  if (!wethAbi.ok) {
    return "";
  }

  const iface = new ethers.utils.Interface(wethAbi.body);

  const encodedRequest = iface.encodeFunctionData("balanceOf", [state.sender]);

  const weth = "0xdEAddEaDdeadDEadDEADDEAddEADDEAddead1111";

  Ethers.provider()
    .call({
      to: weth,
      data: encodedRequest,
    })
    .then((rawBalance) => {
      console.log("rawBalance", rawBalance);
      const receiverBalanceHex = iface.decodeFunctionResult(
        "balanceOf",
        rawBalance
      );

      const balance = Big(receiverBalanceHex.toString())
        .div(Big(10).pow(18))
        .toFixed(2)
        .replace(/\d(?=(\d{3})+\.)/g, "$&,");

      console.log("balance", balance);
    })
    .catch((ex) => {
      State.update({ rpcError: true });
      console.log("exception", ex);
    });
}

// REUSABLE UI ELEMEETS

const assetContainer = (
  isInputAsset,
  assetData,
  amountName,
  assetNameOnClick
) => {
  const useSpacer = !!isInputAsset;

  if (!assetData) {
    return useSpacer ? (
      <div
        style={{
          height: "100%",
          background: "#2d2f30",
          color: "white",
          flex: "1",
          display: "flex",

          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <div style={{ margin: "0 auto" }}>
          <Widget src="zavodil.near/widget/spinner" loading={loadingBlock} />
        </div>
      </div>
    ) : null;
  }

  const assetContainerClass = useSpacer
    ? "asset-container-top"
    : "asset-container-bottom";
  return (
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
                    <small class="input-asset-token-ticker">
                      {assetData.metadata.symbol}
                    </small>
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
      isEVM
    ) {
      const ifaceErc20 = new ethers.utils.Interface(state.erc20Abi);

      const encodedTokenAllowancesData = ifaceErc20.encodeFunctionData(
        "allowance",
        [getEVMAccountId(), state.routerContract]
      );

      if (
        state.network === NETWORK_MANTLE &&
        state.inputAssetTokenId === "0xdeaddeaddeaddeaddeaddeaddeaddeaddead0000"
      ) {
        // MNT always approved
        return false;
      }

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
              approvalNeeded: new Big(tokenAllowance).toFixed(0) == "0",
            });
          }
        });
    } else {
      State.update({ approvalNeeded: false });
    }
  }
};

if (isEVM) {
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

const selectedChainId = state.selectedChainId ?? 0;
const selectedDex = state.selectedDex;

const switchNetwork = (chainId, dex) => {
  console.log("switchNetwork", chainId, dex);
  Ethers.provider().send("wallet_switchEthereumChain", [
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

const loadingBlock = "";

const assetsList = state.assets
  ? state.assets.map((tokenId) => (
      <Widget
        src="zavodil.near/widget/TokenBalance2"
        loading={loadingBlock}
        props={{
          tokenId: tokenId,
          coinGeckoTokenId: state.coinGeckoTokenIds[tokenId],
          network: state.network,
          hideZeroBalance: true,
          fractionDigits: 4,
          coingeckoNetworkHandle: state.coingeckoNetworkHandle,
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
      onClick={() => {
        if (
          network.chainId !== state.selectedChainId ||
          state.selectedDex !== network.dex
        ) {
          switchNetwork(Number(network.chainId), network.dex ?? "");
        } else {
          State.update({ isNetworkSelectOpen: false });
        }
      }}
    >
      <img style={{ width: "16px" }} src={network.icon} />
      <span>
        {network.name} {network.dex}
      </span>
    </li>
  );
});

// OUTPUT

if (state.rpcError) {
  return (
    <Theme>
      <div class="swap-main-container pt-5">
        <div style={{ fontSize: "1.1rem" }}>
          It looks like the RPC is not responsive at the moment
        </div>
        <div class="swap-button-container">
          <button
            class={"swap-button-enabled swap-button-text p-2"}
            onClick={() => {
              reload();
            }}
          >
            Click to refresh
          </button>
        </div>
      </div>
    </Theme>
  );
}

console.log("forceNetwork !== state.network", forceNetwork, state.network);
if (forceNetwork && state.network && forceNetwork !== state.network) {
  return (
    <Theme>
      <div class="swap-main-container pt-5">
        {state.sender && (
          <div class="swap-button-container">
            <button
              onClick={() => switchNetwork(FORCED_CHAIN_ID, DEFAULT_DEX)}
              class="swap-button-enabled swap-button-text p-2"
            >
              To proceed, kindly switch to {forceNetwork}
            </button>
          </div>
        )}

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
    <div id="rr"></div>
    <Widget
      src="zavodil.near/widget/DexData2.2"
      loading={loadingBlock}
      props={{
        onLoad: onDexDataLoad,
        NETWORK_NEAR,
        NETWORK_ETH,
        NETWORK_ZKSYNC,
        NETWORK_ZKEVM,
        NETWORK_AURORA,
        NETWORK_POLYGON,
        NETWORK_MANTLE,
        forceReload: state.forceReload ?? false,
        DEX: state.selectedDex,
      }}
    />
    {state.network && state.inputAsset && state.inputAssetTokenId && (
      <Widget
        src="zavodil.near/widget/AssetListModal2"
        loading={loadingBlock}
        props={{
          hidden: state.inputAssetModalHidden ?? true,
          network: state.network,
          assets: state.assets,
          coinGeckoTokenIds: state.coinGeckoTokenIds,
          selectedAssets: [state.inputAssetTokenId],
          coingeckoNetworkHandle: state.coingeckoNetworkHandle,
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
        src="zavodil.near/widget/AssetListModal2"
        loading={loadingBlock}
        props={{
          hidden: state.outputAssetModalHidden ?? true,
          assets: state.assets,
          coinGeckoTokenIds: state.coinGeckoTokenIds,
          network: state.network,
          selectedAssets: [state.outputAssetTokenId],
          coingeckoNetworkHandle: state.coingeckoNetworkHandle,
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
        src="zavodil.near/widget/TokenData2"
        loading={loadingBlock}
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
          coingeckoNetworkHandle: state.coingeckoNetworkHandle,
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
        src="zavodil.near/widget/TokenData2"
        loading={loadingBlock}
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
          coingeckoNetworkHandle: state.coingeckoNetworkHandle,
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
          loading={loadingBlock}
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
            loading={loadingBlock}
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
    {state.network === NETWORK_MANTLE &&
      state.selectedDex == "Agni" &&
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
            src="zavodil.near/widget/mantle-getEstimate"
            loading={loadingBlock}
            props={{
              loadRes: state.loadRes,
              tokenIn: state.inputAssetTokenId,
              tokenOut: state.outputAssetTokenId,
              tokenOutDecimals: state.outputAsset.metadata.decimals,
              quoterContractId: state.quoterContract,
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
    {state.network === NETWORK_MANTLE &&
      ["FusionX V3", "Ammos Finance"].includes(state.selectedDex) &&
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
            src="zavodil.near/widget/ammos-getEstimate"
            loading={loadingBlock}
            props={{
              loadRes: state.loadRes,
              tokenIn: state.inputAssetTokenId,
              tokenOut: state.outputAssetTokenId,
              tokenOutDecimals: state.outputAsset.metadata.decimals,
              quoterContractId: state.quoterContract,
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
    {state.network === NETWORK_MANTLE &&
      state.selectedDex == "iZiSwap" &&
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
            src="zavodil.near/widget/iziSwap-getEstimate"
            loading={loadingBlock}
            props={{
              loadRes: state.loadRes,
              tokenIn: state.inputAssetTokenId,
              tokenOut: state.outputAssetTokenId,
              tokenInDecimals: state.inputAsset.metadata.decimals,
              tokenOutDecimals: state.outputAsset.metadata.decimals,
              quoterContractId: state.quoterContract,
              amountIn: state.inputAssetAmount.toString(),
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
            loading={loadingBlock}
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
            loading={loadingBlock}
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
                  {state.isNetworkSelectOpen && (
                    <NetworkList>
                      <div
                        style={{
                          position: "absolute",
                          top: "5px",
                          right: "10px",
                          color: "lightgrey",
                        }}
                        onClick={() =>
                          State.update({ isNetworkSelectOpen: false })
                        }
                      >
                        X
                      </div>
                      <ul>{networksDropDown}</ul>
                    </NetworkList>
                  )}
                </div>
              </ContainerNetwork>
            )}
            <div
              style={{
                display: "flex",
                paddingLeft: "10px",
                minHeight: "20px",
              }}
            >
              {assetsList}
            </div>
            <div
              class="top-container"
              style={{
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
              <div style={{ height: "100%", flex: 1 }}>
                {assetContainer(
                  fasle,
                  state.outputAsset,
                  "outputAssetAmount",
                  () => {
                    State.update({ outputAssetModalHidden: false });
                  }
                )}
                {!!state.outputAssetAmount &&
                  state.outputAsset &&
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
                                  <div
                                    class="swap-price-details-rate"
                                    style={{ fontSize: "10px" }}
                                  >
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
                                    style={{ fontSize: "10px" }}
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
                        Ethers.provider()
                          .getFeeData()
                          .then((data) => {
                            state.callTokenApproval(
                              state,
                              () => {
                                onCallTxComple();
                                tokenInApprovaleNeededCheck();
                              },
                              Big(data.gasPrice).toFixed(0) /*"120"*/,
                              100000
                            );
                          });
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
                        } else if (state.network === NETWORK_MANTLE) {
                          const WMNT =
                            "0x78c1b0c915c4faa5fffa6cabf0219da63d7f4cb8";
                          const MNT =
                            "0xdeaddeaddeaddeaddeaddeaddeaddeaddead0000";

                          if (
                            state.inputAssetTokenId === MNT &&
                            state.estimate.path[0] === WMNT
                          ) {
                            state.estimate.path[0] = MNT;
                          }

                          if (
                            state.inputAssetTokenId === MNT &&
                            state.estimate.path[
                              state.estimate.path.length - 1
                            ] === WMNT
                          ) {
                            state.estimate.path[
                              state.estimate.path.length - 1
                            ] = MNT;
                          }

                          const amountOutMinimum =
                            state.estimate.estimate * 0.995;

                          Ethers.provider()
                            .getFeeData()
                            .then((data) => {
                              state.callTx(
                                state,
                                onCallTxComple,
                                Big(data.gasPrice)
                                  .div(Big(10).pow(9))
                                  .toFixed(10) /*"120"*/,
                                undefined,
                                undefined,
                                state.estimate.path,
                                expandToken(
                                  amountOutMinimum,
                                  state.outputAsset.metadata.decimals
                                ).toFixed(0)
                              );
                            });

                          /*
                          state.callTx(
                            state,
                            onCallTxComple,
                            undefined,
                            undefined,
                            undefined,
                            state.estimate.path
                          );*/
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
