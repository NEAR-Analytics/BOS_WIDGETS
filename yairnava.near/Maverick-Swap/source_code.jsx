const routerAbi = fetch(
  "https://raw.githubusercontent.com/yaairnaavaa/Maverick/main/maverick-router.txt"
);
if (!routerAbi.ok) {
  return "Loading";
}

const TOKENS = [
  {
    name: "ETH",
    icon: "https://raw.githubusercontent.com/yaairnaavaa/Maverick/main/eth.svg",
    address: "0x5AEa5775959fBC2557Cc8789bC1bf90A239D9a91",
    coinGeckoId: "ethereum",
    decimals: 18,
  },
  {
    name: "USDC",
    icon: "https://raw.githubusercontent.com/yaairnaavaa/Maverick/main/usdc.svg",
    address: "0x3355df6D4c9C3035724Fd0e3914dE96A5a83aaf4",
    coinGeckoId: "usd-coin",
    decimals: 6,
  },
  {
    name: "MUTE",
    icon: "https://raw.githubusercontent.com/yaairnaavaa/Maverick/main/mute.svg",
    address: "0x0e97C7a0F8B2C9885C8ac9fC6136e829CbC21d42",
    coinGeckoId: "mute",
    decimals: 18,
  },
  {
    name: "COMBO",
    icon: "https://raw.githubusercontent.com/yaairnaavaa/Maverick/main/combo.svg",
    address: "0xc2B13Bb90E33F1E191b8aA8F44Ce11534D5698E3",
    coinGeckoId: "furucombo",
    decimals: 18,
  },
  {
    name: "PERP",
    icon: "https://raw.githubusercontent.com/yaairnaavaa/Maverick/main/perp.svg",
    address: "0x42c1c56be243c250AB24D2ecdcC77F9cCAa59601",
    coinGeckoId: "perpetual-protocol",
    decimals: 18,
  },
  {
    name: "LUSD",
    icon: "https://raw.githubusercontent.com/yaairnaavaa/Maverick/main/lusd.svg",
    address: "0x503234F203fC7Eb888EEC8513210612a43Cf6115",
    coinGeckoId: "liquity-usd",
    decimals: 18,
  },
  {
    name: "DVF",
    icon: "https://raw.githubusercontent.com/yaairnaavaa/Maverick/main/dvf.svg",
    address: "0xBbD1bA24d589C319C86519646817F2F153c9B716",
    coinGeckoId: "rhinofi",
    decimals: 18,
  },
  {
    name: "WOO",
    icon: "https://raw.githubusercontent.com/yaairnaavaa/Maverick/main/woo.svg",
    address: "0x9E22D758629761FC5708c171d06c2faBB60B5159",
    coinGeckoId: "woo-network",
    decimals: 18,
  },
  {
    name: "DERI",
    icon: "https://raw.githubusercontent.com/yaairnaavaa/Maverick/main/deri.svg",
    address: "0x140D5bc5b62d6cB492B1A475127F50d531023803",
    coinGeckoId: "deri-protocol",
    decimals: 18,
  },
  {
    name: "DEXTF",
    icon: "https://raw.githubusercontent.com/yaairnaavaa/Maverick/main/dextf.svg",
    address: "0x9929bCAC4417A21d7e6FC86F6Dae1Cc7f27A2e41",
    coinGeckoId: "dextf",
    decimals: 18,
  },
  {
    name: "GOVI",
    icon: "https://raw.githubusercontent.com/yaairnaavaa/Maverick/main/govi.svg",
    address: "0xD63eF5e9C628c8a0E8984CDfb7444AEE44B09044",
    coinGeckoId: "govi",
    decimals: 18,
  },
  {
    name: "1INCH",
    icon: "https://raw.githubusercontent.com/yaairnaavaa/Maverick/main/1inch.svg",
    address: "0x3f0B8B206A7FBdB3ecFc08c9407CA83F5aB1Ce59",
    coinGeckoId: "1inch",
    decimals: 18,
  },
  {
    name: "PEPE",
    icon: "https://raw.githubusercontent.com/yaairnaavaa/Maverick/main/pepe.svg",
    address: "0xFD282F16a64c6D304aC05d1A58Da15bed0467c71",
    coinGeckoId: "pepe",
    decimals: 18,
  },
];

const POOLS = [
  { name: "ETH-USDC", address: "0x41C8cf74c27554A8972d3bf3D2BD4a14D8B604AB" },
  { name: "ETH-MUTE", address: "0x83c90b99FDF00b6203529fF6F2354a57E9F6EeC5" },
  { name: "ETH-COMBO", address: "" },
  { name: "ETH-PERP", address: "" },
  { name: "ETH-LUSD", address: "0xB1338207DE233aE6a9A6D63309221b577F8Cd6E8" },
  { name: "ETH-DVF", address: "" },
  { name: "ETH-WOO", address: "" },
  { name: "ETH-DERI", address: "" },
  { name: "ETH-DEXTF", address: "" },
  { name: "ETH-GOVI", address: "" },
  { name: "ETH-1INCH", address: "" },
  { name: "ETH-PEPE", address: "" },
  { name: "USDC-MUTE", address: "0xF4bc5bf7cc54a48b6c0ABFafa2836376e10eccE9" },
  { name: "USDC-COMBO", address: "" },
  { name: "USDC-PERP", address: "" },
  { name: "USDC-LUSD", address: "0x6A9143A5f9BaF73841992DCB737844e5ad16A283" },
  { name: "USDC-DVF", address: "" },
  { name: "USDC-WOO", address: "" },
  { name: "USDC-DERI", address: "" },
  { name: "USDC-DEXTF", address: "" },
  { name: "USDC-GOVI", address: "" },
  { name: "USDC-1INCH", address: "" },
  { name: "USDC-PEPE", address: "" },
  { name: "MUTE-COMBO", address: "" },
  { name: "MUTE-PERP", address: "" },
  { name: "MUTE-LUSD", address: "" },
  { name: "MUTE-DVF", address: "" },
  { name: "MUTE-WOO", address: "" },
  { name: "MUTE-DERI", address: "" },
  { name: "MUTE-DEXTF", address: "" },
  { name: "MUTE-GOVI", address: "" },
  { name: "MUTE-1INCH", address: "" },
  { name: "MUTE-PEPE", address: "" },
  { name: "COMBO-PERP", address: "" },
  { name: "COMBO-LUSD", address: "" },
  { name: "COMBO-DVF", address: "" },
  { name: "COMBO-WOO", address: "" },
  { name: "COMBO-DERI", address: "" },
  { name: "COMBO-DEXTF", address: "" },
  { name: "COMBO-GOVI", address: "" },
  { name: "COMBO-1INCH", address: "" },
  { name: "COMBO-PEPE", address: "" },
  { name: "PERP-LUSD", address: "" },
  { name: "PERP-DVF", address: "" },
  { name: "PERP-WOO", address: "" },
  { name: "PERP-DERI", address: "" },
  { name: "PERP-DEXTF", address: "" },
  { name: "PERP-GOVI", address: "" },
  { name: "PERP-1INCH", address: "" },
  { name: "PERP-PEPE", address: "" },
  { name: "LUSD-DVF", address: "" },
  { name: "LUSD-WOO", address: "" },
  { name: "LUSD-DERI", address: "" },
  { name: "LUSD-DEXTF", address: "" },
  { name: "LUSD-GOVI", address: "" },
  { name: "LUSD-1INCH", address: "" },
  { name: "LUSD-PEPE", address: "" },
  { name: "DVF-WOO", address: "" },
  { name: "DVF-DERI", address: "" },
  { name: "DVF-DEXTF", address: "" },
  { name: "DVF-GOVI", address: "" },
  { name: "DVF-1INCH", address: "" },
  { name: "DVF-PEPE", address: "" },
  { name: "WOO-DERI", address: "" },
  { name: "WOO-DEXTF", address: "" },
  { name: "WOO-GOVI", address: "" },
  { name: "WOO-1INCH", address: "" },
  { name: "WOO-PEPE", address: "" },
  { name: "DERI-DEXTF", address: "" },
  { name: "DERI-GOVI", address: "" },
  { name: "DERI-1INCH", address: "" },
  { name: "DERI-PEPE", address: "" },
  { name: "DEXTF-GOVI", address: "" },
  { name: "DEXTF-1INCH", address: "" },
  { name: "DEXTF-PEPE", address: "" },
  { name: "GOVI-1INCH", address: "" },
  { name: "GOVI-PEPE", address: "" },
  { name: "1INCH-PEPE", address: "" },
];

State.init({
  tokenSendSelected: null,
  tokenRecieveSelected: null,
  amountInput: null,
  amountRecieve: 0,
  rate: 0,
  routerContract: "0x39E098A153Ad69834a9Dac32f0FCa92066aD03f4",
});

const switchNetwork = () => {
  let chainId = 324;
  try {
    Ethers.send("wallet_switchEthereumChain", [{ chainId: `0x${chainId}` }]);
  } catch (err) {
    console.log(err);
    Ethers.send("wallet_addEthereumChain", [
      {
        chainId: "324",
        chainName: "zkSync Era Mainnet",
        rpcUrls: ["https://mainnet.era.zksync.io"],
        blockExplorerUrls: ["https://explorer.zksync.io/"],
        nativeCurrency: {
          symbol: "",
          decimals: 18,
        },
      },
    ]);
  }
};

const getErc20Balance = (tokenId, receiver, decimals, asset) => {
  if (state.sender === undefined) {
    return;
  }
  if (asset == "ETH") {
    Ethers.provider()
      .getBalance(state.sender)
      .then((balance) => {
        State.update({
          inputBalance: parseFloat(
            ethers.utils.formatUnits(balance, decimals)
          ).toFixed(6),
          unFixedInputBalance: balance.toHexString(),
        });
      });
  } else {
    asyncFetch(
      "https://gist.githubusercontent.com/veox/8800debbf56e24718f9f483e1e40c35c/raw/f853187315486225002ba56e5283c1dba0556e6f/erc20.abi.json"
    )
      .catch((res) => {
        console.log(err);
      })
      .then((res) => {
        const contract = new ethers.Contract(
          tokenId,
          res.body,
          Ethers.provider().getSigner()
        );
        contract.balanceOf(receiver).then((res) => {
          let balance = ethers.utils.formatUnits(res, decimals);
          State.update({
            inputBalance: parseFloat(balance).toFixed(6),
            unFixedInputBalance: res.toHexString(),
          });
        });
      });
  }
};

function getPrice(type, data) {
  let tokenIdForCoingeckoAPI;
  tokenIdForCoingeckoAPI = data.coinGeckoId;
  if (type) {
    getErc20Balance(data.address, state.sender, data.decimals, data.name);
  }
  let dataUrl = `https://api.coingecko.com/api/v3/coins/${tokenIdForCoingeckoAPI}`;
  asyncFetch(dataUrl).then((res) => {
    const tokenData = res.body;
    const price = Number(tokenData.market_data.current_price.usd);
    if (
      (state.tokenSendSelected != null || type) &&
      (state.tokenRecieveSelected != null || !type)
    ) {
      type
        ? State.update({ rate: price / state.tokenRecieveSelected.price })
        : State.update({ rate: state.tokenSendSelected.price / price });
    }
    type
      ? State.update({ tokenSendSelected: { price: price, ...data } })
      : State.update({ tokenRecieveSelected: { price: price, ...data } });
  });
}

const tokenInApprovaleNeededCheck = (data) => {
  if (data.name == "ETH") {
    State.update({
      approvalNeeded: false,
    });
  } else {
    asyncFetch(
      "https://gist.githubusercontent.com/veox/8800debbf56e24718f9f483e1e40c35c/raw/f853187315486225002ba56e5283c1dba0556e6f/erc20.abi.json"
    ).then((res) => {
      const ifaceErc20 = new ethers.utils.Interface(res.body);
      const encodedTokenAllowancesData = ifaceErc20.encodeFunctionData(
        "allowance",
        [state.sender, state.routerContract]
      );
      return Ethers.provider()
        .call({
          to: data.address,
          data: encodedTokenAllowancesData,
        })
        .then((encodedTokenAllowanceHex) => {
          const tokenAllowance = ifaceErc20.decodeFunctionResult(
            "allowance",
            encodedTokenAllowanceHex
          );
          if (tokenAllowance) {
            console.log("Necesita approval");
            State.update({
              approvalNeeded: new Big(tokenAllowance).toFixed() == "0",
            });
          } else {
            State.update({
              approvalNeeded: false,
            });
          }
        });
    });
  }
};

const approveErc20Token = () => {
  asyncFetch(
    "https://gist.githubusercontent.com/veox/8800debbf56e24718f9f483e1e40c35c/raw/f853187315486225002ba56e5283c1dba0556e6f/erc20.abi.json"
  ).then((res) => {
    const value = state.unFixedInputBalance;

    const approveContract = new ethers.Contract(
      state.tokenSendSelected.address,
      res.body,
      Ethers.provider().getSigner()
    );

    let gasArgs = {};

    if (gweiPrice !== undefined && gasLimit !== undefined) {
      gasArgs.gasPrice = ethers.utils.parseUnits(gweiPrice ?? "0.26", "gwei");
      gasArgs.gasLimit = gasLimit ?? 20000000;
    }

    approveContract
      .approve(state.routerContract, value, gasArgs)
      .then((transactionHash) => {
        console.log(transactionHash);
      });
  });
};

if (state.sender === undefined) {
  const accounts = Ethers.send("eth_requestAccounts", []);
  if (accounts.length) {
    State.update({ sender: accounts[0] });
    switchNetwork();
  }
}

const handleSendSelect = (data) => {
  const token = TOKENS.find((token) => token.name === data.target.value);
  getPrice(true, token);
  tokenInApprovaleNeededCheck(token);
};

const handleRecieveSelect = (data) => {
  const token = TOKENS.find((token) => token.name === data.target.value);
  getPrice(false, token);
};

const turnTokens = () => {
  const tokenSendSelected = state.tokenSendSelected;
  const tokenRecieveSelected = state.tokenRecieveSelected;
  if (tokenSendSelected && tokenRecieveSelected) {
    State.update({ tokenSendSelected: null });
    State.update({ tokenRecieveSelected: null });
    setTimeout(() => {
      State.update({ tokenSendSelected: tokenRecieveSelected });
      State.update({ tokenRecieveSelected: tokenSendSelected });
      getPrice(true, tokenRecieveSelected);
      tokenInApprovaleNeededCheck(tokenRecieveSelected);
    });
  }
};

const cantSwap = () => {
  return (
    state.tokenSendSelected && state.tokenRecieveSelected && state.amountInput
  );
};

const existPool = () => {
  const poolName1 = `${state.tokenSendSelected.name}-${state.tokenRecieveSelected.name}`;
  const poolName2 = `${state.tokenRecieveSelected.name}-${state.tokenSendSelected.name}`;

  if (!state.tokenSendSelected.name || !state.tokenRecieveSelected.name) {
    return true;
  }

  const pool = POOLS.find((p) => p.name === poolName1 || p.name === poolName2);

  if (pool && pool.address != "") {
    return true;
  } else {
    return false;
  }
};

const isSufficientBalance = () => {
  if (!state.amountInput) {
    return true;
  } else if (state.amountInput > state.inputBalance) {
    return false;
  }
  return true;
};

const setMaxBalance = () => {
  if (state.inputBalance > 0) {
    State.update({ amountInput: state.inputBalance });
  }
};

const confirmTransaction = () => {
  console.log("Confirmando transacción");
  const router = new ethers.Contract(
    state.routerContract,
    routerAbi.body,
    Ethers.provider().getSigner()
  );
  let amountIn = ethers.utils.parseUnits(
    state.amountInput,
    state.tokenSendSelected.decimals
  );
  let paramsv2 = {
    tokenIn: state.tokenSendSelected.address,
    tokenOut: state.tokenRecieveSelected.address,
    pool: "0x41c8cf74c27554a8972d3bf3d2bd4a14d8b604ab",
    recipient: state.sender,
    deadline: 1e13,
    amountIn: amountIn,
    amountOutMinimum: 0,
    sqrtPriceLimitD18: 0,
  };
  const overrides = {
    value: amountIn,
    gasLimit: 2303039,
  };
  try {
    router.exactInputSingle(paramsv2, overrides).then((res) => {
      console.log(res);
    });
  } catch (err) {
    console.log(err);
  }
};

const css = fetch(
  "https://raw.githubusercontent.com/yaairnaavaa/Maverick/main/widget.css"
).body;

if (!css) return "";

if (!state.theme) {
  State.update({
    theme: styled.div`
    ${css}
`,
  });
}

const Theme = state.theme;
return (
  <Theme>
    <div class="text-center mt-1">
      <div class="MainContainer">
        <div class="ProtocolContainer">
          <div class="ProtocolNetworkContainet">
            <div class="ProtocolNetworkTextSection">
              <div class="ProtocolText">PROTOCOL</div>
            </div>
            <div class="ProtocolNetworkSection">
              <div class="ProtocolNetworkContainer">
                <img
                  class="ProtocolImg"
                  src="https://etherscan.io/token/images/maverick_32.png"
                />
                <div class="NetworkText">Maverick</div>
              </div>
            </div>
          </div>
        </div>
        <div class="titleSection">
          <div class="titleSwap">SWAP</div>
        </div>
        <div class="SendRecieveContainer">
          <div class="SendContainer">
            <div class="TokenSection">
              {state.tokenSendSelected ? (
                <img class="TokenImg" src={state.tokenSendSelected.icon} />
              ) : null}

              <div class="TokenNameSection">
                <div class="TokenAction">SEND {"->"}</div>
                <select
                  class="TokenNameSelect"
                  select={state.tokenSendSelected || "default"}
                  onChange={handleSendSelect}
                >
                  <option value="default" disabled={state.tokenSendSelected}>
                    Select Token
                  </option>
                  {TOKENS.map((token) => {
                    return (
                      <>
                        {state.tokenRecieveSelected.name != token.name && (
                          <option>{token.name}</option>
                        )}
                      </>
                    );
                  })}
                </select>
              </div>
            </div>
            <div class="TokenAmountSection">
              <input
                class="TokenAmountInput"
                type="text"
                placeholder="0"
                inputmode="decimal"
                min="0"
                pattern="^[0-9]*[.]?[0-9]*$"
                value={state.amountInput}
                onChange={(e) => State.update({ amountInput: e.target.value })}
              />
              <div class="TokenAmountPreview">
                {state.inputBalance != null ? (
                  state.inputBalance && state.inputBalance > 0 ? (
                    <span>
                      Balance: {state.inputBalance}
                      <span
                        class="UserBalance"
                        onClick={async () => {
                          setMaxBalance();
                        }}
                      >
                        MAX
                      </span>
                    </span>
                  ) : (
                    "Balance: 0"
                  )
                ) : (
                  "Balance: 0"
                )}
              </div>
              {!isSufficientBalance() ? (
                <div class="TokenInsufficientBalance">Insufficient Balance</div>
              ) : null}
            </div>
          </div>
          <div class="turnSection">
            <button
              type="button"
              class="turnButton"
              onClick={async () => {
                turnTokens();
              }}
            >
              <svg
                class="turnImg"
                focusable="false"
                aria-hidden="true"
                viewBox="0 0 24 24"
                data-testid="ArrowsUpDownIcon"
              >
                <path d="M11.95 7.95l-1.414 1.414L8 6.828 8 20H6V6.828L3.465 9.364 2.05 7.95 7 3l4.95 4.95zm10 8.1L17 21l-4.95-4.95 1.414-1.414 2.537 2.536L16 4h2v13.172l2.536-2.536 1.414 1.414z"></path>
              </svg>
            </button>
          </div>
          <div class="RecieveContainer">
            <div class="TokenSection">
              {state.tokenRecieveSelected ? (
                <img class="TokenImg" src={state.tokenRecieveSelected.icon} />
              ) : null}

              <div class="TokenNameSection">
                <div class="TokenAction">{"->"} RECEIVE</div>
                <select
                  class="TokenNameSelect"
                  select={state.tokenRecieveSelected || "default"}
                  onChange={handleRecieveSelect}
                >
                  <option value="default" disabled={state.tokenRecieveSelected}>
                    Select Token
                  </option>
                  {TOKENS.map((token) => {
                    return (
                      <>
                        {state.tokenSendSelected.name != token.name && (
                          <option>{token.name}</option>
                        )}
                      </>
                    );
                  })}
                </select>
              </div>
            </div>
            <div class="TokenAmountSection">
              <div class="TokenAmount">
                {(
                  state.amountInput * parseFloat(state.rate).toFixed(6)
                ).toFixed(6)}
              </div>
              <div class="TokenAmountPreview">
                {state.rate != 0
                  ? `${
                      "≈ " +
                      (
                        state.amountInput * state.tokenSendSelected.price
                      ).toFixed(6)
                    } USD`
                  : ""}
              </div>
            </div>
          </div>
        </div>
        <div class="FeesContainer">
          <div class="Line" />
          <div class="RateFeeContainer">
            <div class="RateFeeText">Rate</div>
            <div class="RateFeeValue">
              {state.rate != 0
                ? `1 ${state.tokenSendSelected.name} ≈ ${state.rate.toFixed(6)}
              ${state.tokenRecieveSelected.name}`
                : ""}
            </div>
          </div>
          <div class="RateFeeContainer">
            <div class="RateFeeText">Network fee</div>
            <div class="RateFeeValue">Fast • $15.41</div>
          </div>
          <div class="RateFeeContainer">
            <div class="RateFeeText">zkSync fee</div>
            <div class="RateFeeValue">0.5%</div>
          </div>
        </div>
        <div class="ConfirmContainer">
          {state.sender ? (
            state.approvalNeeded ? (
              <div
                class={"ConfirmButton"}
                onClick={async () => {
                  approveErc20Token();
                }}
              >
                <div class={"ConfirmText"}>
                  {`Approve ${state.tokenSendSelected.name}`}
                </div>
              </div>
            ) : cantSwap() && isSufficientBalance() && existPool() ? (
              <div
                class={"ConfirmButton"}
                onClick={async () => {
                  confirmTransaction();
                }}
              >
                <div class={"ConfirmText"}>Confirm</div>
              </div>
            ) : (
              <div class={"ConfirmButtonDisabled"}>
                <div class={"ConfirmTextDisabled"}>
                  {existPool()
                    ? isSufficientBalance()
                      ? "Select a Pair and Amount"
                      : "Insufficient Balance"
                    : "Pool Not Deployed"}
                </div>
              </div>
            )
          ) : (
            <Web3Connect
              className="ConfirmButton ConfirmText"
              connectLabel="Connect Wallet"
            />
          )}
        </div>
      </div>
    </div>
  </Theme>
);
