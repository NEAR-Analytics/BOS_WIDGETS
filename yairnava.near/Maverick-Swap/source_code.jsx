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
    name: "CBUSD",
    icon: "https://raw.githubusercontent.com/yaairnaavaa/Maverick/main/busd.png",
    address: "0x2039bb4116B4EFc145Ec4f0e2eA75012D6C0f181",
    coinGeckoId: "binance-usd",
    decimals: 6,
  },
  {
    name: "MAV",
    icon: "https://raw.githubusercontent.com/yaairnaavaa/Maverick/main/mav.png",
    address: "0x787c09494Ec8Bcb24DcAf8659E7d5D69979eE508",
    coinGeckoId: "maverick-protocol",
    decimals: 6,
  },
  {
    name: "LUSD",
    icon: "https://raw.githubusercontent.com/yaairnaavaa/Maverick/main/lusd.svg",
    address: "0x503234F203fC7Eb888EEC8513210612a43Cf6115",
    coinGeckoId: "liquity-usd",
    decimals: 18,
  },
  {
    name: "RETH",
    icon: "https://raw.githubusercontent.com/yaairnaavaa/Maverick/main/reth.png",
    address: "0x32Fd44bB869620C0EF993754c8a00Be67C464806",
    coinGeckoId: "rocket-pool-eth",
    decimals: 6,
  },
  {
    name: "CBETH",
    icon: "https://raw.githubusercontent.com/yaairnaavaa/Maverick/main/cbeth.png",
    address: "0x75Af292c1c9a37b3EA2E6041168B4E48875b9ED5",
    coinGeckoId: "coinbase-wrapped-staked-eth",
    decimals: 6,
  },
  {
    name: "USD+",
    icon: "https://raw.githubusercontent.com/yaairnaavaa/Maverick/main/usd+.png",
    address: "0x8E86e46278518EFc1C5CEd245cBA2C7e3ef11557",
    coinGeckoId: "usd",
    decimals: 6,
  },
  {
    name: "GRAI",
    icon: "https://raw.githubusercontent.com/yaairnaavaa/Maverick/main/grai.png",
    address: "0x5FC44E95eaa48F9eB84Be17bd3aC66B6A82Af709",
    coinGeckoId: "grai",
    decimals: 6,
  },
  {
    name: "FRAX",
    icon: "https://raw.githubusercontent.com/yaairnaavaa/Maverick/main/frax.png",
    address: "0xb4C1544cb4163f4C2ECa1aE9Ce999F63892d912A",
    coinGeckoId: "frax",
    decimals: 6,
  },
  {
    name: "WETH",
    icon: "https://raw.githubusercontent.com/yaairnaavaa/Maverick/main/weth.png",
    address: "0x3355df6D4c9C3035724Fd0e3914dE96A5a83aaf4",
    coinGeckoId: "usd-coin",
    decimals: 6,
  },
];

const POOLS = [
  { name: "ETH-USDC", address: "0x41c8cf74c27554a8972d3bf3d2bd4a14d8b604ab" },
  { name: "ETH-CBUSD", address: "0x3Ae63FB198652E294B8DE4C2EF659D95D5ff28BE" },
  { name: "ETH-MAV", address: "0x4D47167e66e86d1a1083f52136832d4f1eF5809A" },
  { name: "ETH-LUSD", address: "0xB1338207DE233aE6a9A6D63309221b577F8Cd6E8" },
  { name: "ETH-RETH", address: "0x07e1F845819D7CABc03684fdb4Bf99D5cd2B2964" },
  { name: "ETH-CBETH", address: "0x23e8d6269717C567e4A2E9680491C8c65B67Ad0d" },
  { name: "ETH-USD+", address: "0x15461e7D0d6061e082b2c9B641634BB096527679" },
  { name: "ETH-GRAI", address: "" },
  { name: "ETH-FRAX", address: "" },
  { name: "USDC-CBUSD", address: "0x88D29317A355d8586bd0D98E8745ec3171d68F56" },
  { name: "USDC-MAV", address: "0x74E398c79eb7a653b432f6313edF776C8d930142" },
  { name: "USDC-LUSD", address: "0x6A9143A5f9BaF73841992DCB737844e5ad16A283" },
  { name: "USDC-RETH", address: "" },
  { name: "USDC-CBETH", address: "" },
  { name: "USDC-USD+", address: "0xaCA5d8805D6f160Eb46E273e28169DDBF703eCdc" },
  { name: "USDC-GRAI", address: "" },
  { name: "USDC-FRAX", address: "0x4e1852cf46b24940412e13C358B4f19eC92b9eaE" },
  { name: "CBUSD-MAV", address: "0x9f4A993b3120e52044810F1c91088a5630a8bF63" },
  { name: "CBUSD-LUSD", address: "" },
  { name: "CBUSD-RETH", address: "" },
  { name: "CBUSD-CBETH", address: "" },
  { name: "CBUSD-USD+", address: "" },
  { name: "CBUSD-GRAI", address: "" },
  { name: "CBUSD-FRAX", address: "" },
  { name: "MAV-LUSD", address: "" },
  { name: "MAV-RETH", address: "" },
  { name: "MAV-CBETH", address: "" },
  { name: "MAV-USD+", address: "" },
  { name: "MAV-GRAI", address: "" },
  { name: "MAV-FRAX", address: "" },
  { name: "LUSD-RETH", address: "" },
  { name: "LUSD-CBETH", address: "" },
  { name: "LUSD-USD+", address: "" },
  { name: "LUSD-GRAI", address: "0x28f57e5c2823183280CC9B3B45d746A2943111C3" },
  { name: "LUSD-FRAX", address: "" },
  { name: "RETH-CBETH", address: "" },
  { name: "RETH-USD+", address: "" },
  { name: "RETH-GRAI", address: "" },
  { name: "RETH-FRAX", address: "" },
  { name: "CBETH-USD+", address: "" },
  { name: "CBETH-GRAI", address: "" },
  { name: "CBETH-FRAX", address: "" },
  { name: "USD+-GRAI", address: "" },
  { name: "USD+-FRAX", address: "" },
  { name: "GRAI-FRAX", address: "" },
];

State.init({
  isZkSync: false,
  poolSelected: null,
  tokenSendSelected: null,
  tokenRecieveSelected: null,
  amountInput: null,
  amountRecieve: 0,
  rate: 0,
  routerContract: "0x39E098A153Ad69834a9Dac32f0FCa92066aD03f4",
  onApproving: false,
});

const switchNetwork = () => {
  let chainId = 324;
  Ethers.provider()
    .getNetwork()
    .then((res) => {
      console.log(res.chainId);
      if (res.chainId == chainId) {
        State.update({ isZkSync: true });
      }
    });
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
        State.update({
          onApproving: true,
        });
        setTimeout(() => {
          State.update({
            onApproving: false,
            approvalNeeded: false,
          });
        }, 10000);
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
    State.update({ poolSelected: pool.address });
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
    pool: state.poolSelected,
    recipient: state.sender,
    deadline: 1e13,
    amountIn: amountIn,
    amountOutMinimum: 0,
    sqrtPriceLimitD18: 0,
  };
  console.log(paramsv2);
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
        {state.isZkSync ? (
          <>
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
                      value={
                        state.tokenSendSelected
                          ? state.tokenSendSelected.name
                          : "default"
                      }
                      onChange={handleSendSelect}
                    >
                      <option
                        value="default"
                        disabled={state.tokenSendSelected}
                      >
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
                    onChange={(e) =>
                      State.update({ amountInput: e.target.value })
                    }
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
                    <div class="TokenInsufficientBalance">
                      Insufficient Balance
                    </div>
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
                    <img
                      class="TokenImg"
                      src={state.tokenRecieveSelected.icon}
                    />
                  ) : null}

                  <div class="TokenNameSection">
                    <div class="TokenAction">{"->"} RECEIVE</div>
                    <select
                      class="TokenNameSelect"
                      value={
                        state.tokenRecieveSelected
                          ? state.tokenRecieveSelected.name
                          : "default"
                      }
                      onChange={handleRecieveSelect}
                    >
                      <option
                        value="default"
                        disabled={state.tokenRecieveSelected}
                      >
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
                    ? `1 ${state.tokenSendSelected.name} ≈ ${state.rate.toFixed(
                        6
                      )}
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
          </>
        ) : (
          state.sender && (
            <span class="text-white">
              To proceed, please switch to the
              <br />
              zkSync Era Network using your wallet.
            </span>
          )
        )}
        <div class="ConfirmContainer">
          {!state.onApproving ? (
            state.sender && state.isZkSync ? (
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
            )
          ) : (
            <div class={"ConfirmButtonDisabled"}>
              <div class={"ConfirmTextDisabled"}>
                {`${state.tokenSendSelected.name} it's being approved...`}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  </Theme>
);
