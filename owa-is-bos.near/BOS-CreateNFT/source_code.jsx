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
        {state.isZkSync ? (
          <>
            <div class="row" style={{ color: "white", width: "100%" }}>
              <div
                class="col-4"
                style={{
                  display: "flex",
                  justifyContent: "end",
                }}
              >
                <div
                  class="step"
                  style={{
                    background:
                      state.step >= 1 ? "#6400FF" : "rgba(255, 255, 255, 0.1)",
                  }}
                >
                  {state.step <= 1 ? (
                    1
                  ) : (
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="20"
                      height="20"
                      viewBox="0 0 20 20"
                      fill="none"
                    >
                      <path
                        d="M1.25 9.375L7.875 16L18.125 4.5"
                        stroke="#FFFFFF"
                        stroke-width="2"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                      />
                    </svg>
                  )}
                </div>
              </div>
              <div class="col-1">-</div>
              <div
                class="col-2"
                style={{
                  display: "flex",
                  justifyContent: "center",
                }}
              >
                <div
                  class="step"
                  style={{
                    background:
                      state.step >= 2 ? "#6400FF" : "rgba(255, 255, 255, 0.1)",
                  }}
                >
                  {state.step <= 2 ? (
                    2
                  ) : (
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="20"
                      height="20"
                      viewBox="0 0 20 20"
                      fill="none"
                    >
                      <path
                        d="M1.25 9.375L7.875 16L18.125 4.5"
                        stroke="#FFFFFF"
                        stroke-width="2"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                      />
                    </svg>
                  )}
                </div>
              </div>
              <div class="col-1">-</div>
              <div
                class="col-4"
                style={{
                  display: "flex",
                  justifyContent: "start",
                }}
              >
                <div
                  class="step"
                  style={{
                    background:
                      state.step >= 3 ? "#6400FF" : "rgba(255, 255, 255, 0.1)",
                  }}
                >
                  {state.step <= 3 ? (
                    3
                  ) : (
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="20"
                      height="20"
                      viewBox="0 0 20 20"
                      fill="none"
                    >
                      <path
                        d="M1.25 9.375L7.875 16L18.125 4.5"
                        stroke="#FFFFFF"
                        stroke-width="2"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                      />
                    </svg>
                  )}
                </div>
              </div>
            </div>
            {state.step == 1 && state.poolList.length == 0 && (
              <div class="titleStep">Loading data...</div>
            )}
            {state.step == 1 && state.poolList.length > 0 && (
              <div>
                <div class="titleStep">Select Pool</div>
                <br />
                <div
                  class="SelectPoolContainer"
                  style={{ margin: "auto", width: "300px" }}
                >
                  <div class="TokenSection">
                    {state.poolSelected ? (
                      <img
                        class="TokenImg"
                        src={state.poolSelected.tokenA.logoURI}
                      />
                    ) : null}
                    {state.poolSelected ? (
                      <img
                        class="TokenImg"
                        src={state.poolSelected.tokenB.logoURI}
                      />
                    ) : null}
                    <div class="TokenNameSection">
                      <div class="TokenAction">Pool {"->"}</div>
                      <select
                        class="TokenNameSelect"
                        value={
                          state.poolSelected
                            ? state.poolSelected.name
                            : "default"
                        }
                        onChange={handlePoolSelect}
                      >
                        <option value="default" disabled={state.poolSelected}>
                          Select Pool
                        </option>
                        {state.poolList.map((p) => {
                          return <option value={p.name}>{p.name}</option>;
                        })}
                      </select>
                    </div>
                  </div>
                </div>
                <br />
                <div class="LineContainer">
                  <div class="Line" />
                </div>
                <div class="titleStep">Select Pool Options</div>
                <br />
                <div
                  class="SelectPoolOptions"
                  style={{ margin: "auto", width: "460px", height: "111px" }}
                >
                  <div class="row">
                    <div class="col-7">
                      <div class="TokenNameSection">
                        <div class="selectedFeeWidth">
                          <div
                            style={{
                              width: "100%",
                              display: "flex",
                              justifyContent: "start",
                            }}
                          >
                            {state.selectedPoolOptions && (
                              <span class="FeeWidth">
                                {getFeeWidthFormat(
                                  state.selectedPoolOptions.fee
                                ) + " Fee"}
                              </span>
                            )}
                            {state.selectedPoolOptions && (
                              <span class="FeeWidth">
                                {getFeeWidthFormat(
                                  state.selectedPoolOptions.width
                                ) + " Width"}
                              </span>
                            )}
                          </div>
                          <div
                            style={{
                              display: "flex",
                              justifyContent: "end",
                            }}
                          >
                            <span
                              class="EditButton"
                              onClick={() => showPoolOptionsModal()}
                            >
                              Edit
                            </span>
                            {state.showSelectPoolOptionModal && (
                              <Widget
                                props={{
                                  poolOptions: state.poolOptions,
                                  poolOptionsSelected:
                                    state.selectedPoolOptions,
                                  setPoolOption,
                                  closeModal,
                                }}
                                src={
                                  "owa-is-bos.near/widget/Maverick-LP-OptionsModal"
                                }
                              />
                            )}
                          </div>
                        </div>
                      </div>
                    </div>
                    <div class="col-5">
                      <div class="row" style={{ color: "white" }}>
                        <div class="col-6 PoolOptionDetails">
                          {state.selectedPoolOptions
                            ? state.selectedPoolOptions.tokenA.symbol +
                              " Balance"
                            : ""}
                        </div>
                        <div class="col-6 PoolOptionDetails">
                          {state.selectedPoolOptions
                            ? state.selectedPoolOptions.tokenB.symbol +
                              " Balance"
                            : ""}
                        </div>
                        <div class="col-6" style={{ fontSize: "12px" }}>
                          {state.selectedPoolOptions
                            ? formatNumberBalanceToken(
                                state.selectedPoolOptions.tokenABalance
                              )
                            : ""}
                        </div>
                        <div class="col-6" style={{ fontSize: "12px" }}>
                          {state.selectedPoolOptions
                            ? formatNumberBalanceToken(
                                state.selectedPoolOptions.tokenBBalance
                              )
                            : ""}
                        </div>
                      </div>
                    </div>
                    <div class="col-12">
                      <div class="row" style={{ color: "white" }}>
                        <div class="col-4 PoolOptionDetails">TVL</div>
                        <div class="col-4 PoolOptionDetails">Vol. 24h</div>
                        <div class="col-4 PoolOptionDetails">Fees 24h</div>
                        <div class="col-4" style={{ fontSize: "10px" }}>
                          {state.selectedPoolOptions
                            ? formatNumber(state.selectedPoolOptions.tvl.amount)
                            : ""}
                        </div>
                        <div class="col-4" style={{ fontSize: "10px" }}>
                          {state.selectedPoolOptions
                            ? formatNumber(
                                state.selectedPoolOptions.volume.amount
                              )
                            : ""}
                        </div>
                        <div class="col-4" style={{ fontSize: "10px" }}>
                          {state.selectedPoolOptions
                            ? formatNumber(state.selectedPoolOptions.feeVolume)
                            : ""}
                        </div>
                        <div class="col-4" style={{ fontSize: "10px" }}>
                          {state.selectedPoolOptions ? (
                            <span
                              style={{
                                color:
                                  state.selectedPoolOptions.tvlChange < 0
                                    ? "rgba(255, 255, 255, 0.5)"
                                    : "rgb(38, 189, 0)",
                              }}
                            >
                              {state.selectedPoolOptions.tvlChange < 0
                                ? "↓"
                                : state.selectedPoolOptions.tvlChange == 0
                                ? ""
                                : "↑"}
                              {formatAPR(state.selectedPoolOptions.tvlChange)}
                            </span>
                          ) : (
                            ""
                          )}
                        </div>
                        <div class="col-4" style={{ fontSize: "10px" }}>
                          {state.selectedPoolOptions ? (
                            <span
                              style={{
                                color:
                                  state.selectedPoolOptions.volumeChange < 0
                                    ? "rgba(255, 255, 255, 0.5)"
                                    : "rgb(38, 189, 0)",
                              }}
                            >
                              {state.selectedPoolOptions.volumeChange < 0
                                ? "↓"
                                : state.selectedPoolOptions.volumeChange == 0
                                ? ""
                                : "↑"}
                              {formatAPR(
                                state.selectedPoolOptions.volumeChange
                              )}
                            </span>
                          ) : (
                            ""
                          )}
                        </div>
                        <div class="col-4" style={{ fontSize: "10px" }}>
                          {state.selectedPoolOptions ? (
                            <span
                              style={{
                                color:
                                  state.selectedPoolOptions.feeChange < 0
                                    ? "rgba(255, 255, 255, 0.5)"
                                    : "rgb(38, 189, 0)",
                              }}
                            >
                              {state.selectedPoolOptions.feeChange < 0
                                ? "↓"
                                : state.selectedPoolOptions.feeChange == 0
                                ? ""
                                : "↑"}
                              {formatAPR(state.selectedPoolOptions.feeChange)}
                            </span>
                          ) : (
                            ""
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}
            {state.step == 2 && (
              <div>
                <div class="titleStep">Select Mode</div>
                <br />
                <div class="SelectModeContainer">
                  <div
                    class="row"
                    style={{
                      width: "100%",
                      height: "100px",
                      display: "flex",
                      margin: "0",
                    }}
                  >
                    <div class="col-6">
                      <p
                        style={{
                          textAlign: "justify",
                          color: "white",
                          fontSize: "13px",
                        }}
                      >
                        {state.poolModeSelected.description}
                      </p>
                    </div>
                    <div class="col-6">
                      <div class="SelectModeSelect">
                        <div class="TokenSection">
                          <div class="TokenNameSection">
                            <div class="TokenAction">Pool Mode {"->"}</div>
                            <select
                              class="TokenNameSelect"
                              value={
                                state.poolModeSelected
                                  ? state.poolModeSelected.name
                                  : "default"
                              }
                              onChange={handlePoolModeSelect}
                            >
                              <option
                                value="default"
                                disabled={state.poolModeSelected}
                              >
                                Select Mode
                              </option>
                              {POOLSMODE.map((m) => {
                                return <option>{m.name}</option>;
                              })}
                            </select>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div style={{ overflow: "hidden" }}>
                  {state.poolModeSelected && (
                    <img
                      src={state.poolModeSelected.img}
                      class="PoolModeImg"
                    ></img>
                  )}
                </div>
              </div>
            )}
          </>
        ) : state.sender ? (
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
        ) : (
          <div>
            <Web3Connect
              className="LoginButton ConfirmText"
              connectLabel="Connect Wallet"
            />
          </div>
        )}
      </div>
    </div>
  </Theme>
);
