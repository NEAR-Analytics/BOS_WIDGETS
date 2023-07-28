const TOKENS = [
  {
    name: "ETH",
    icon: "https://firebasestorage.googleapis.com/v0/b/token-library.appspot.com/o/eth.svg?alt=media&token=1985e3d8-3aa7-4d04-8839-565d4c341615",
    address: "0x000000000000000000000000000000000000800A",
    coinGeckoId: "ethereum",
    decimals: 18,
  },
  {
    name: "USDC",
    icon: "https://firebasestorage.googleapis.com/v0/b/token-library.appspot.com/o/usdc.svg?alt=media&token=1985e3d8-3aa7-4d04-8839-565d4c341615",
    address: "0x3355df6D4c9C3035724Fd0e3914dE96A5a83aaf4",
    coinGeckoId: "usd-coin",
    decimals: 6,
  },
  {
    name: "MUTE",
    icon: "https://firebasestorage.googleapis.com/v0/b/token-library.appspot.com/o/mute.svg?alt=media&token=91b36efd-93fe-4e05-86dd-b97890f5f137",
    address: "0x0e97C7a0F8B2C9885C8ac9fC6136e829CbC21d42",
    coinGeckoId: "mute",
    decimals: 18,
  },
  {
    name: "COMBO",
    icon: "https://firebasestorage.googleapis.com/v0/b/token-library.appspot.com/o/combo.svg?alt=media&token=beb166a2-a1bf-4935-9a7f-60219174feec",
    address: "0xc2B13Bb90E33F1E191b8aA8F44Ce11534D5698E3",
    coinGeckoId: "furucombo",
    decimals: 18,
  },
  {
    name: "PERP",
    icon: "https://firebasestorage.googleapis.com/v0/b/token-library.appspot.com/o/perp.svg?alt=media&token=03fa3dd9-123d-4a42-9885-6ae8e982a596",
    address: "0x42c1c56be243c250AB24D2ecdcC77F9cCAa59601",
    coinGeckoId: "perpetual-protocol",
    decimals: 18,
  },
  {
    name: "LUSD",
    icon: "https://firebasestorage.googleapis.com/v0/b/token-library.appspot.com/o/lusd.svg?alt=media&token=0bafb7c1-d75a-4cc0-8d2c-a966ba5229ce",
    address: "0x503234F203fC7Eb888EEC8513210612a43Cf6115",
    coinGeckoId: "liquity-usd",
    decimals: 18,
  },
  {
    name: "DVF",
    icon: "https://firebasestorage.googleapis.com/v0/b/token-library.appspot.com/o/dvf.svg?alt=media&token=2b99f719-6730-4a6e-8e98-7eadb4222010",
    address: "0xBbD1bA24d589C319C86519646817F2F153c9B716",
    coinGeckoId: "rhinofi",
    decimals: 18,
  },
  {
    name: "WOO",
    icon: "https://firebasestorage.googleapis.com/v0/b/token-library.appspot.com/o/woo.svg?alt=media&token=e7e86642-a227-4bd5-8237-3e5c538146d6",
    address: "0x9E22D758629761FC5708c171d06c2faBB60B5159",
    coinGeckoId: "woo-network",
    decimals: 18,
  },
  {
    name: "DERI",
    icon: "https://firebasestorage.googleapis.com/v0/b/token-library.appspot.com/o/deri.svg?alt=media&token=f9373638-b7d7-4e5f-aeeb-52e0429d20d7",
    address: "0x140D5bc5b62d6cB492B1A475127F50d531023803",
    coinGeckoId: "deri-protocol",
    decimals: 18,
  },
  {
    name: "DEXTF",
    icon: "https://firebasestorage.googleapis.com/v0/b/token-library.appspot.com/o/dextf.svg?alt=media&token=1793cf4c-6933-42c0-a4a3-20ddbc7db753",
    address: "0x9929bCAC4417A21d7e6FC86F6Dae1Cc7f27A2e41",
    coinGeckoId: "dextf",
    decimals: 18,
  },
  {
    name: "GOVI",
    icon: "https://firebasestorage.googleapis.com/v0/b/token-library.appspot.com/o/govi.svg?alt=media&token=82358649-c6cb-4f3e-ba13-fbb70d1d801f",
    address: "0xD63eF5e9C628c8a0E8984CDfb7444AEE44B09044",
    coinGeckoId: "govi",
    decimals: 18,
  },
  {
    name: "1INCH",
    icon: "https://firebasestorage.googleapis.com/v0/b/token-library.appspot.com/o/1inch.svg?alt=media&token=4e354096-c9d5-4c7a-9da1-1ecfc715278f",
    address: "0x3f0B8B206A7FBdB3ecFc08c9407CA83F5aB1Ce59",
    coinGeckoId: "1inch",
    decimals: 18,
  },
  {
    name: "PEPE",
    icon: "https://firebasestorage.googleapis.com/v0/b/token-library.appspot.com/o/pepe.svg?alt=media&token=f0368359-659a-46bc-a7b9-c419f9150fcd",
    address: "0xFD282F16a64c6D304aC05d1A58Da15bed0467c71",
    coinGeckoId: "pepe",
    decimals: 18,
  },
];

State.init({
  tokenSendSelected: null,
  tokenRecieveSelected: null,
  amountInput: null,
  amountRecieve: 0,
  rate: 0,
});

const switchNetwork = () => {
  console.log(Ethers.provider());
  let chainId = 324;
  try {
    console.log(Ethers.provider().getNetwork());
    Ethers.send("wallet_switchEthereumChain", [{ chainId: `0x${chainId}` }]);
    setTimeout(() => {
      console.log(Ethers.provider().getNetwork());
    }, "5000");
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
    console.log("ETH");
    Ethers.provider()
      .getBalance(state.sender)
      .then((balance) => {
        State.update({
          inputBalance: ethers.utils.formatUnits(balance, decimals),
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
          State.update({ inputBalance: balance });
        });
      });
  }
};

function getPrice(type, data) {
  let tokenIdForCoingeckoAPI;
  tokenIdForCoingeckoAPI = data.coinGeckoId;
  getErc20Balance(data.address, state.sender, data.decimals, data.name);
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
};

const handleRecieveSelect = (data) => {
  const token = TOKENS.find((token) => token.name === data.target.value);
  getPrice(false, token);
};

const cantSwap = () => {
  return (
    state.tokenSendSelected && state.tokenRecieveSelected && state.amountInput
  );
};

const isSufficientBalance = () => {
  if (!state.amountInput) {
    return true;
  } else if (state.amountInput > state.inputBalance) {
    return false;
  }
  return true;
};

const confirmTransaction = () => {
  console.log("Confirmando transacción");
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
                  select={state.tokenSendSelected}
                  onChange={handleSendSelect}
                >
                  {!state.tokenSendSelected ? (
                    <option>Select Token</option>
                  ) : null}
                  {TOKENS.map((token) => {
                    return (
                      <>
                        <option>{token.name}</option>
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
                {state.inputBalance != null
                  ? `Balance: ${parseFloat(state.inputBalance).toFixed(6)}`
                  : ""}
              </div>
              {!isSufficientBalance() ? (
                <div class="TokenInsufficientBalance">Insufficient Balance</div>
              ) : null}
            </div>
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
                  select={state.tokenRecieveSelected}
                  onChange={handleRecieveSelect}
                >
                  {!state.tokenRecieveSelected ? (
                    <option>Select Token</option>
                  ) : null}
                  {TOKENS.map((token) => {
                    return (
                      <>
                        <option>{token.name}</option>
                      </>
                    );
                  })}
                </select>
              </div>
            </div>
            <div class="TokenAmountSection">
              <div class="TokenAmount">
                {(state.amountInput * state.rate).toFixed(6)}
              </div>
              <div class="TokenAmountPreview">
                {state.rate != 0
                  ? `${(
                      state.amountInput * state.tokenSendSelected.price
                    ).toFixed(6)} USD`
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
                ? `1 ${state.tokenSendSelected.name} = ${state.rate.toFixed(6)}
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
            <div
              class={
                cantSwap() && isSufficientBalance()
                  ? "ConfirmButton"
                  : "ConfirmButtonDisabled"
              }
              onClick={async () => {
                confirmTransaction();
              }}
            >
              <div
                class={
                  cantSwap() && isSufficientBalance()
                    ? "ConfirmText"
                    : "ConfirmTextDisabled"
                }
              >
                {cantSwap()
                  ? isSufficientBalance()
                    ? "Confirm"
                    : "Insufficient Balance"
                  : "Select a Pair and Amount"}
              </div>
            </div>
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
