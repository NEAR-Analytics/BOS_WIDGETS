const Theme = state.theme;
return (
  <Theme>
    <div class="text-center mt-1">
      <div class="MainContainer" style={{ width: "490px", height: "500px" }}>
        {state.isZkSync ? (
          !state.poolSelected ? (
            <>
              <div>
                <div
                  class="SendContainer"
                  style={{ margin: "auto", width: "460px" }}
                ></div>
                <div class="FeesContainer">
                  <div class="Line" />
                </div>
              </div>
            </>
          ) : !state.isLiquidityRemoved ? (
            <>
              <div>
                <div
                  class="SendContainer"
                  style={{ margin: "auto", width: "460px" }}
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
                  style={{ margin: "auto", width: "460px", height: "320px" }}
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
                            {getFeeWidthFormat(state.poolSelected.pool.fee)} Fee
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
                  style={{ margin: "auto", width: "460px" }}
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
                              <div class={"ConfirmTextDisabled"}>Connfirm</div>
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
        )}
      </div>
    </div>
  </Theme>
);
