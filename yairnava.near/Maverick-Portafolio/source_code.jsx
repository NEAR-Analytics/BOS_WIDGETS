const routerAbi = fetch(
  "https://raw.githubusercontent.com/yaairnaavaa/Maverick/main/maverick-router.txt"
);

const positionAbi = fetch(
  "https://raw.githubusercontent.com/yaairnaavaa/Maverick/main/maverick-position.txt"
);

if (!routerAbi.ok || !positionAbi.ok) {
  return "Loading";
}

State.init({
  isZkSync: false,
  routerContract: "0x39E098A153Ad69834a9Dac32f0FCa92066aD03f4",
  positionContract: "0xFd54762D435A490405DDa0fBc92b7168934e8525",
  portfolio: null,
  poolSelected: null,
  isLiquidityRemoved: false,
  binsToRemove: [],
  showSelectBinsModal: false,
  countBinsToRemove: 0,
  tokenAToWithdraw: 0,
  tokenBToWithdraw: 0,
  allChecked: false,
  balanceNFT: 0,
  onApprovingNFT: false,
  onRemovingLiquidity: false,
});

const getNetwork = () => {
  let chainId = 324;
  Ethers.provider()
    .getNetwork()
    .then((res) => {
      if (res.chainId == chainId) {
        getUserData();
        State.update({ isZkSync: true });
      } else {
        switchNetwork(324);
      }
    });
};

const switchNetwork = (chainId) => {
  Ethers.provider().send("wallet_switchEthereumChain", [
    { chainId: `0x${chainId.toString(16)}` },
  ]);
};

if (state.sender === undefined) {
  const accounts = Ethers.send("eth_requestAccounts", []);
  if (accounts.length) {
    State.update({ sender: accounts[0] });
    getNetwork();
  }
}

const getRecipient = () => {
  return (
    state.sender.substring(0, 5) +
    "..." +
    state.sender.substring(state.sender.length - 4, state.sender.length)
  ).toUpperCase();
};

const formatNumber = (n) => {
  if (n >= 1000000) {
    return "$" + (n / 1000000).toFixed(2) + "m";
  } else if (n >= 1000) {
    return "$" + (n / 1000).toFixed(2) + "k";
  } else {
    return "$" + n.toFixed(2);
  }
};

const formatNumberToken = (n) => {
  let result;

  if (n == 0) {
    return 0;
  }

  if (n >= 1000000) {
    result = (n / 1000000).toFixed(2);
  } else if (n >= 1000) {
    result = (n / 1000).toFixed(2);
  } else {
    result = n.toFixed(2);
  }

  if (parseFloat(result) < 0.01) {
    return "<0.01";
  }

  return result;
};

const getUserData = () => {
  asyncFetch(`https://api.mav.xyz/api/v3/user/${state.sender}/324`)
    .catch((err) => {
      console.log(err);
    })
    .then((res) => {
      console.log(res.body.user);

      State.update({ portfolio: res.body.user });
    });
};

const binsFormat = () => {
  return {
    tokenId: data[0],
    image: data[1],
    name: data[2],
    happiness: data[3].toNumber(),
    hunger: data[4].toNumber(),
    sleep: data[5].toNumber(),
    currentActivity: data[6],
    isHungry: data[7],
    isSleepy: data[8],
    isBored: data[9],
  };
};

const getModeImg = (k) => {
  if (k == 0) {
    return "https://raw.githubusercontent.com/yaairnaavaa/Maverick/main/ModeStatic.gif";
  }
  if (k == 1) {
    return "https://raw.githubusercontent.com/yaairnaavaa/Maverick/main/ModeRight.gif";
  }
  if (k == 2) {
    return "https://raw.githubusercontent.com/yaairnaavaa/Maverick/main/ModeLeft.gif";
  }
  if (k == 3) {
    return "https://raw.githubusercontent.com/yaairnaavaa/Maverick/main/ModeBoth.gif";
  }
};

const getMode = (k) => {
  if (k == 0) {
    return "Static";
  }
  if (k == 1) {
    return "Right";
  }
  if (k == 2) {
    return "Left";
  }
  if (k == 3) {
    return "Both";
  }
};

const getFeeWidthFormat = (n) => {
  var format = (n * 100).toFixed(2);
  return format + "%";
};

const manage = (p) => {
  console.log(p);
  State.update({ poolSelected: p, binsToRemove: p.bins, nftId: p.nftId });
  getApprovedNFT();
};

const remove = () => {
  State.update({ isLiquidityRemoved: true });
};

const back = () => {
  State.update({
    poolSelected: null,
    binsToRemove: [],
    nftId: null,
    balanceNFT: 0,
  });
};

const backToDetail = () => {
  State.update({
    isLiquidityRemoved: false,
    showSelectBinsModal: false,
    countBinsToRemove: 0,
    binsToRemove: state.poolSelected.bins,
    tokenAToWithdraw: 0,
    tokenBToWithdraw: 0,
    allChecked: false,
  });
};

const selectBins = () => {
  State.update({ showSelectBinsModal: true });
};

const closeModal = () => {
  State.update({ showSelectBinsModal: false });
};

const setBins = (btr, checked) => {
  const countBinsToRemove = btr.filter((b) => b.selected);
  const { sumReserveA, sumReserveB } = countBinsToRemove.reduce(
    (accumulator, currentValue) => ({
      sumReserveA: accumulator.sumReserveA + currentValue.reserveA,
      sumReserveB: accumulator.sumReserveB + currentValue.reserveB,
    }),
    { sumReserveA: 0, sumReserveB: 0 }
  );
  State.update({
    binsToRemove: btr,
    showSelectBinsModal: false,
    countBinsToRemove: countBinsToRemove.length,
    tokenAToWithdraw: sumReserveA,
    tokenBToWithdraw: sumReserveB,
    allChecked: checked,
  });
};

const toFixedString = (n, d) => {
  let stringNumber = n.toString();
  let positionDecimalPoint = stringNumber.indexOf(".");
  let truncatedNumber = stringNumber.substring(0, positionDecimalPoint + d + 1);
  return truncatedNumber;
};

const getApprovedNFT = () => {
  const position = new ethers.Contract(
    state.positionContract,
    positionAbi.body,
    Ethers.provider().getSigner()
  );

  try {
    position.balanceOf(state.sender).then((res) => {
      console.log("balanceNFT: " + res.toNumber());
      State.update({ balanceNFT: res.toNumber() });
    });
  } catch (err) {
    console.log(err);
  }
};

const approveNFT = () => {
  const position = new ethers.Contract(
    state.positionContract,
    positionAbi.body,
    Ethers.provider().getSigner()
  );

  try {
    position.approve(state.routerContract, state.nftId).then((res) => {
      if (res) {
        State.update({
          onApprovingNFT: true,
        });
        setTimeout(() => {
          State.update({
            onApprovingNFT: false,
          });
          getApprovedNFT();
        }, 20000);
      }
    });
  } catch (err) {
    console.log(err);
  }
};

const refreshPoolData = () => {
  asyncFetch(`https://api.mav.xyz/api/v3/user/${state.sender}/324`)
    .catch((err) => {
      console.log(err);
    })
    .then((res) => {
      State.update({ portfolio: res.body.user });
    });
};

const confirmRemove = () => {
  const router = new ethers.Contract(
    state.routerContract,
    routerAbi.body,
    Ethers.provider().getSigner()
  );

  console.log(state.poolSelected);
  let tuple = [];
  state.binsToRemove.forEach((elemento) => {
    if (elemento.selected) {
      const decimalsA = state.poolSelected.pool.tokenA.decimals;
      console.log(toFixedString(elemento.reserveA, decimalsA));
      const amountA = ethers.utils.parseUnits(
        toFixedString(elemento.reserveA, decimalsA),
        decimalsA
      );
      console.log(amountA);

      const decimalsB = state.poolSelected.pool.tokenB.decimals;
      const amountB = ethers.utils.parseUnits(
        toFixedString(elemento.reserveB, decimalsB),
        decimalsB
      );
      console.log(amountB);

      if (amountA > 0) {
        tuple.push({
          binId: elemento.binId,
          amount: amountA,
        });
      }

      if (amountB > 0) {
        tuple.push({
          binId: elemento.binId,
          amount: amountB,
        });
      }
    }
  });

  console.log(tuple);

  try {
    router
      .removeLiquidity(
        state.poolSelected.pool.id,
        state.sender,
        state.poolSelected.nftId,
        tuple,
        0,
        0,
        1e13
      )
      .then((res) => {
        if (res) {
          State.update({
            onRemovingLiquidity: true,
          });
          setTimeout(() => {
            State.update({
              onRemovingLiquidity: false,
            });
            getApprovedNFT();
          }, 20000);
        }
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
      <div class="MainContainer" style={{ width: "450px", height: "500px" }}>
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
        {state.sender ? (
          state.isZkSync ? (
            !state.poolSelected ? (
              <>
                <div>
                  <div
                    class="SendContainer"
                    style={{ margin: "auto", width: "420px" }}
                  >
                    <div class="row" style={{ color: "white", width: "100%" }}>
                      <div class="col-3" style={{ fontSize: "11px" }}>
                        <span style={{ fontWeight: "bold" }}>Your Rewards</span>{" "}
                        <br />
                        {state.portfolio
                          ? formatNumber(state.portfolio.rewards)
                          : 0}
                      </div>
                      <div class="col-3" style={{ fontSize: "11px" }}>
                        <span style={{ fontWeight: "bold" }}>
                          Your Earnings
                        </span>{" "}
                        <br />
                        {state.portfolio
                          ? formatNumber(state.portfolio.fees)
                          : 0}
                      </div>
                      <div class="col-3" style={{ fontSize: "11px" }}>
                        <span style={{ fontWeight: "bold" }}>Your Balance</span>{" "}
                        <br />
                        {state.portfolio
                          ? formatNumber(state.portfolio.tvl)
                          : 0}
                      </div>
                      <div
                        class="col-3"
                        style={{
                          fontSize: "12px",
                          display: "flex",
                          justifyContent: "end",
                        }}
                      >
                        <div
                          style={{
                            width: "110px",
                            display: "flex",
                            cursor: "pointer",
                            justifyContent: "center",
                            alignItems: "center",
                            gap: "8px",
                            borderRadius: "4px",
                            background: "rgb(141, 141, 253)",
                            height: "40px",
                          }}
                        >
                          <div class={"ConfirmText"}>Add Liquidity</div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div class="FeesContainer">
                    <div class="Line" />
                  </div>
                </div>
                <div
                  class="row"
                  style={{
                    marginInline: "0px",
                    width: "100%",
                    justifyContent: "start",
                    gap: "10px",
                    overflow: "auto",
                    flexWrap: "wrap",
                    marginLeft: "15px",
                  }}
                >
                  {state.portfolio &&
                    state.portfolio.positions.map((p, key) => {
                      return (
                        p.balance > 0 && (
                          <div class="col-6" style={{ width: "47%" }}>
                            <div
                              class="row"
                              style={{
                                color: "white",
                                background: "rgba(255, 255, 255, 0.1)",
                                borderRadius: "10px",
                              }}
                            >
                              <div class="col-12" style={{ fontSize: "12px" }}>
                                <div class="row mt-2">
                                  <div class="col-5">
                                    <img
                                      style={{ height: "25px" }}
                                      src={p.pool.tokenA.logoURI}
                                    />
                                    <img
                                      style={{ height: "25px" }}
                                      src={p.pool.tokenB.logoURI}
                                    />
                                  </div>
                                  <div
                                    class="col-7"
                                    style={{ fontSize: "5px" }}
                                  >
                                    <div
                                      style={{
                                        textAlign: "left",
                                        fontWeight: "bold",
                                        fontSize: "12px",
                                      }}
                                    >
                                      {p.pool.name}
                                    </div>
                                    <div class="row">
                                      <div
                                        class="col-4"
                                        style={{
                                          display: "flex",
                                          justifyContent: "right",
                                          alignItems: "center",
                                          gap: "2px",
                                          fontSize: "7px",
                                        }}
                                      >
                                        <img
                                          class="TokenImg"
                                          src="https://raw.githubusercontent.com/yaairnaavaa/Maverick/main/Fee.png"
                                          style={{
                                            width: "15px",
                                            height: "15px",
                                            filter: "invert(1)",
                                          }}
                                        />
                                        {getFeeWidthFormat(p.pool.fee)}
                                      </div>
                                      <div
                                        class="col-4"
                                        style={{
                                          display: "flex",
                                          justifyContent: "center",
                                          alignItems: "center",
                                          gap: "2px",
                                          fontSize: "7px",
                                        }}
                                      >
                                        <img
                                          class="TokenImg"
                                          src="https://raw.githubusercontent.com/yaairnaavaa/Maverick/main/Width.png"
                                          style={{
                                            width: "15px",
                                            height: "10px",
                                            filter: "invert(1)",
                                          }}
                                        />
                                        {getFeeWidthFormat(p.pool.width)}
                                      </div>
                                      <div
                                        class="col-4"
                                        style={{
                                          display: "flex",
                                          justifyContent: "center",
                                          alignItems: "center",
                                          gap: "2px",
                                          fontSize: "7px",
                                        }}
                                      >
                                        <img
                                          class="TokenImg"
                                          src="https://raw.githubusercontent.com/yaairnaavaa/Maverick/main/Mode.png"
                                          style={{
                                            width: "15px",
                                            height: "15px",
                                            filter: "invert(1)",
                                          }}
                                        />
                                        {getMode(p.kind)}
                                      </div>
                                    </div>
                                  </div>
                                </div>
                              </div>
                              <div
                                class="col-12 mt-2"
                                style={{ fontSize: "12px" }}
                              >
                                <img
                                  class="TokenImg"
                                  src={getModeImg(p.kind)}
                                  style={{
                                    width: "100%",
                                    height: "100%",
                                    borderRadius: "10px",
                                  }}
                                />
                              </div>
                              <div
                                class="col-12 mt-2"
                                style={{ fontSize: "12px" }}
                              >
                                <div class="row">
                                  <div
                                    class="col-6"
                                    style={{ fontWeight: "bold" }}
                                  >
                                    Balance
                                  </div>
                                  <div class="col-6">
                                    {formatNumber(p.balance)}
                                  </div>
                                  <div
                                    class="col-6"
                                    style={{ fontWeight: "bold" }}
                                  >
                                    Earnings
                                  </div>
                                  <div class="col-6">
                                    {formatNumber(p.fees)}
                                  </div>
                                </div>
                              </div>
                              <div
                                class="col-12 mt-2 mb-2"
                                style={{
                                  fontSize: "10px",
                                  display: "flex",
                                  justifyContent: "center",
                                }}
                              >
                                <div
                                  style={{
                                    width: "110px",
                                    display: "flex",
                                    cursor: "pointer",
                                    justifyContent: "center",
                                    alignItems: "center",
                                    gap: "8px",
                                    borderRadius: "4px",
                                    height: "40px",
                                    border: "1px solid #8D8DFD",
                                  }}
                                  onClick={() => manage(p)}
                                >
                                  <div class={"ConfirmText"}>Manage</div>
                                </div>
                              </div>
                            </div>
                          </div>
                        )
                      );
                    })}
                  {!state.portfolio && (
                    <p class="text-white">
                      You still do not have liquidity in any pool, if you have
                      already added liquidity you must wait for the changes to
                      be reflected
                    </p>
                  )}
                </div>
              </>
            ) : !state.isLiquidityRemoved ? (
              <>
                <div>
                  <div
                    class="SendContainer"
                    style={{ margin: "auto", width: "420px" }}
                  >
                    <div class="row" style={{ color: "white", width: "100%" }}>
                      <div class="col-12 titleSwap mb-2">Manage Liquidity</div>
                      <div
                        class="col-3"
                        style={{
                          fontSize: "12px",
                          display: "flex",
                          justifyContent: "start",
                        }}
                      >
                        <div
                          style={{
                            width: "110px",
                            display: "flex",
                            cursor: "pointer",
                            justifyContent: "center",
                            alignItems: "center",
                            gap: "8px",
                            borderRadius: "4px",
                            height: "30px",
                            border: "1px solid #8D8DFD",
                          }}
                          onClick={() => back()}
                        >
                          <div class={"ConfirmText"}>Back</div>
                        </div>
                      </div>
                      <div
                        class="col-3"
                        style={{
                          fontSize: "12px",
                          display: "flex",
                          justifyContent: "start",
                        }}
                      >
                        <div
                          style={{
                            width: "110px",
                            display: "flex",
                            cursor: "pointer",
                            justifyContent: "center",
                            alignItems: "center",
                            gap: "8px",
                            borderRadius: "4px",
                            background: "rgb(141, 141, 253)",
                            height: "30px",
                          }}
                          onClick={() => remove()}
                        >
                          <div class={"ConfirmText"}>Remove</div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div class="FeesContainer">
                    <div class="Line" />
                  </div>
                  <div
                    class="SendContainer"
                    style={{ margin: "auto", width: "420px", height: "320px" }}
                  >
                    <div class="row" style={{ color: "white" }}>
                      <div
                        class="col-5"
                        style={{ display: "flex", justifyContent: "end" }}
                      >
                        <img
                          class="TokenImg"
                          src={state.poolSelected.pool.tokenA.logoURI}
                        />
                        <img
                          class="TokenImg"
                          src={state.poolSelected.pool.tokenB.logoURI}
                        />
                      </div>
                      <div class="col-7" style={{ fontSize: "5px" }}>
                        <div
                          style={{
                            textAlign: "left",
                            fontWeight: "bold",
                            fontSize: "12px",
                          }}
                        >
                          {state.poolSelected.pool.name}
                        </div>
                        <div class="row">
                          <div
                            class="col-12"
                            style={{
                              display: "flex",
                              justifyContent: "start",
                              alignItems: "center",
                              gap: "2px",
                              fontSize: "7px",
                            }}
                          >
                            <div
                              style={{
                                background: "rgb(141, 141, 253)",
                                borderRadius: "10px",
                                paddingInline: "7px",
                                fontWeight: "bold",
                              }}
                            >
                              {getFeeWidthFormat(state.poolSelected.pool.fee)}{" "}
                              Fee
                            </div>
                            <div
                              style={{
                                background: "rgb(141, 141, 253)",
                                borderRadius: "10px",
                                paddingInline: "7px",
                                fontWeight: "bold",
                              }}
                            >
                              {getFeeWidthFormat(state.poolSelected.pool.width)}{" "}
                              Width
                            </div>
                            <div
                              style={{
                                background: "rgb(141, 141, 253)",
                                borderRadius: "10px",
                                paddingInline: "7px",
                                fontWeight: "bold",
                              }}
                            >
                              Mode {getMode(state.poolSelected.kind)}
                            </div>
                          </div>
                        </div>
                      </div>
                      <div class="col-12  mt-2" style={{ fontSize: "10px" }}>
                        <div class="row">
                          <div class="col-3 d-flex justify-content-center fw-bold">
                            {state.poolSelected.pool.tokenA.symbol} Balance
                          </div>
                          <div class="col-3 d-flex justify-content-center fw-bold">
                            {state.poolSelected.pool.tokenB.symbol} Balance
                          </div>
                          <div class="col-2 d-flex justify-content-center fw-bold">
                            TVL
                          </div>
                          <div class="col-2 d-flex justify-content-center fw-bold">
                            Volume
                          </div>
                          <div class="col-2 d-flex justify-content-center fw-bold">
                            Fees
                          </div>

                          <div class="col-3 d-flex justify-content-center">
                            {formatNumberToken(state.poolSelected.reserveA)}
                          </div>
                          <div class="col-3 d-flex justify-content-center">
                            {formatNumberToken(state.poolSelected.reserveB)}
                          </div>
                          <div class="col-2 d-flex justify-content-center">
                            {formatNumber(state.poolSelected.balance)}
                          </div>
                          <div class="col-2 d-flex justify-content-center">
                            {formatNumber(state.poolSelected.volume)}
                          </div>
                          <div class="col-2 d-flex justify-content-center">
                            {formatNumber(state.poolSelected.fees)}
                          </div>
                        </div>
                      </div>
                      <div class="col-12 mt-2" style={{ textAlign: "center" }}>
                        <img
                          class="TokenImg"
                          src={getModeImg(state.poolSelected.kind)}
                          style={{
                            width: "98%",
                            height: "98%",
                            borderRadius: "10px",
                          }}
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </>
            ) : (
              <>
                <div>
                  <div
                    class="SendContainer"
                    style={{ margin: "auto", width: "420px" }}
                  >
                    <div class="row" style={{ color: "white", width: "100%" }}>
                      <div class="col-12 titleSwap mb-2">Remove Liquidity</div>
                      <div
                        class="col-3"
                        style={{
                          fontSize: "12px",
                          display: "flex",
                          justifyContent: "start",
                        }}
                      >
                        <div
                          style={{
                            width: "110px",
                            display: "flex",
                            cursor: "pointer",
                            justifyContent: "center",
                            alignItems: "center",
                            gap: "8px",
                            borderRadius: "4px",
                            height: "30px",
                            border: "1px solid #8D8DFD",
                          }}
                          onClick={() => backToDetail()}
                        >
                          <div class={"ConfirmText"}>Back</div>
                        </div>
                      </div>
                      <div
                        class="col-5"
                        style={{
                          fontSize: "12px",
                          display: "flex",
                          justifyContent: "start",
                        }}
                      >
                        <div
                          style={{
                            width: "100%",
                            display: "flex",
                            cursor: "pointer",
                            justifyContent: "center",
                            alignItems: "center",
                            gap: "8px",
                            borderRadius: "4px",
                            height: "30px",
                            background: "#8D8DFD",
                          }}
                          onClick={() => selectBins()}
                        >
                          <div class={"ConfirmText"}>
                            {state.countBinsToRemove} Bins Select
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              width="24"
                              height="24"
                              viewBox="0 0 24 24"
                              id="arrow-drop-down"
                            >
                              <path fill="#8D8DFD" d="M0 0h24v24H0V0z"></path>
                              <path fill="white" d="M7 10l5 5 5-5H7z"></path>
                            </svg>
                          </div>
                        </div>
                        {state.showSelectBinsModal && (
                          <Widget
                            props={{
                              bins: state.binsToRemove,
                              tokens: {
                                tokenALogo:
                                  state.poolSelected.pool.tokenA.logoURI,
                                tokenBLogo:
                                  state.poolSelected.pool.tokenB.logoURI,
                              },
                              setBins,
                              closeModal,
                              allChecked: state.allChecked,
                            }}
                            src={"yairnava.near/widget/MultiSelectModal"}
                          />
                        )}
                      </div>
                    </div>
                  </div>
                  <div class="FeesContainer">
                    <div class="Line" />
                  </div>
                  <div
                    class="SendContainer"
                    style={{
                      margin: "auto",
                      width: "320px",
                      height: "320px",
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "start",
                    }}
                  >
                    <div
                      class="row"
                      style={{
                        color: "white",
                        fontSize: "12px",
                        width: "100%",
                        display: "flex",
                        justifyContent: "center",
                      }}
                    >
                      <div class="row mt-2">
                        <div class="col-6" style={{ textAlign: "left" }}>
                          <div class="row">
                            <div class="col-6">
                              <img
                                class="TokenImg"
                                style={{ marginRight: "10px" }}
                                src={state.poolSelected.pool.tokenA.logoURI}
                              />
                            </div>
                            <div class="col-6 p-0">
                              {state.poolSelected.pool.tokenA.symbol} Withdrawal
                            </div>
                          </div>
                        </div>
                        <div
                          class="col-6"
                          style={{
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "right",
                          }}
                        >
                          {state.tokenAToWithdraw == 0
                            ? 0
                            : state.tokenAToWithdraw.toFixed(10)}
                        </div>
                      </div>
                      <div class="row mt-2">
                        <div class="col-6" style={{ textAlign: "left" }}>
                          <div class="row">
                            <div class="col-6">
                              <img
                                class="TokenImg"
                                style={{ marginRight: "10px" }}
                                src={state.poolSelected.pool.tokenB.logoURI}
                              />
                            </div>
                            <div class="col-6 p-0">
                              {state.poolSelected.pool.tokenB.symbol} Withdrawal
                            </div>
                          </div>
                        </div>
                        <div
                          class="col-6"
                          style={{
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "right",
                          }}
                        >
                          {state.tokenBToWithdraw == 0
                            ? 0
                            : state.tokenBToWithdraw.toFixed(10)}
                        </div>
                      </div>
                      <div class="row mt-2">
                        <div class="col-6" style={{ textAlign: "left" }}>
                          <div class="row">
                            <div class="col-6">
                              <img
                                class="TokenImg"
                                src="https://raw.githubusercontent.com/yaairnaavaa/Maverick/main/Fee.png"
                                style={{
                                  width: "32px",
                                  height: "32px",
                                  filter: "invert(1)",
                                  marginRight: "10px",
                                }}
                              />
                            </div>
                            <div
                              class="col-6 p-0"
                              style={{ display: "flex", alignItems: "center" }}
                            >
                              Fee Tier
                            </div>
                          </div>
                        </div>
                        <div
                          class="col-6"
                          style={{
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "right",
                          }}
                        >
                          {getFeeWidthFormat(state.poolSelected.pool.fee)}
                        </div>
                      </div>
                      <div class="row mt-2">
                        <div class="col-6" style={{ textAlign: "left" }}>
                          <div class="row">
                            <div class="col-6">
                              <img
                                class="TokenImg"
                                src="https://raw.githubusercontent.com/yaairnaavaa/Maverick/main/Width.png"
                                style={{
                                  width: "32px",
                                  height: "32px",
                                  filter: "invert(1)",
                                  marginRight: "10px",
                                }}
                              />
                            </div>
                            <div
                              class="col-6 p-0"
                              style={{ display: "flex", alignItems: "center" }}
                            >
                              Width
                            </div>
                          </div>
                        </div>
                        <div
                          class="col-6"
                          style={{
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "right",
                          }}
                        >
                          {getFeeWidthFormat(state.poolSelected.pool.width)}
                        </div>
                      </div>
                      <div class="row mt-2">
                        <div class="col-6" style={{ textAlign: "left" }}>
                          <div class="row">
                            <div class="col-6">
                              <img
                                class="TokenImg"
                                src="https://raw.githubusercontent.com/yaairnaavaa/Maverick/main/Mode.png"
                                style={{
                                  width: "32px",
                                  height: "32px",
                                  filter: "invert(1)",
                                  marginRight: "10px",
                                }}
                              />
                            </div>
                            <div
                              class="col-6 p-0"
                              style={{ display: "flex", alignItems: "center" }}
                            >
                              Mode
                            </div>
                          </div>
                        </div>
                        <div
                          class="col-6"
                          style={{
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "right",
                          }}
                        >
                          {getMode(state.poolSelected.kind)}
                        </div>
                      </div>
                      <div class="row mt-2">
                        <div
                          class="col-12"
                          style={{
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                          }}
                        >
                          <>
                            {state.countBinsToRemove > 0 ? (
                              state.balanceNFT > 0 ? (
                                <div
                                  style={{
                                    width: "110px",
                                    display: "flex",
                                    cursor: "pointer",
                                    justifyContent: "center",
                                    alignItems: "center",
                                    gap: "8px",
                                    borderRadius: "4px",
                                    background: "rgb(141, 141, 253)",
                                    height: "30px",
                                  }}
                                  onClick={() => confirmRemove()}
                                >
                                  <div class={"ConfirmText"}>Connfirm</div>
                                </div>
                              ) : !state.onApprovingNFT ? (
                                <div
                                  style={{
                                    width: "110px",
                                    display: "flex",
                                    cursor: "pointer",
                                    justifyContent: "center",
                                    alignItems: "center",
                                    gap: "8px",
                                    borderRadius: "4px",
                                    background: "rgb(141, 141, 253)",
                                    height: "30px",
                                  }}
                                  onClick={() => approveNFT()}
                                >
                                  <div class={"ConfirmText"}>Approve NFT</div>
                                </div>
                              ) : (
                                <div
                                  style={{
                                    width: "190px",
                                    display: "flex",
                                    justifyContent: "center",
                                    alignItems: "center",
                                    gap: "8px",
                                    borderRadius: "4px",
                                    height: "30px",
                                    border: "1px solid #8D8DFD",
                                  }}
                                >
                                  <div
                                    class={"ConfirmText"}
                                  >{`NFT it's being approved...`}</div>
                                </div>
                              )
                            ) : (
                              <div
                                style={{
                                  width: "110px",
                                  display: "flex",
                                  cursor: "pointer",
                                  justifyContent: "center",
                                  alignItems: "center",
                                  gap: "8px",
                                  borderRadius: "4px",
                                  background: "rgba(255, 255, 255, 0.1)",
                                  height: "30px",
                                }}
                              >
                                <div class={"ConfirmTextDisabled"}>
                                  Connfirm
                                </div>
                              </div>
                            )}
                          </>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </>
            )
          ) : (
            state.sender && (
              <span class="text-white">
                To proceed, please switch to the
                <br />
                <div
                  class="networkNameContainer"
                  onClick={() => switchNetwork(324)}
                >
                  <span class="networkName">zkSync Era Network</span>
                </div>
                using your wallet.
              </span>
            )
          )
        ) : (
          <div>
            <Web3Connect
              className="ConfirmButton ConfirmText"
              connectLabel="Connect Wallet"
            />
          </div>
        )}
      </div>
    </div>
  </Theme>
);
