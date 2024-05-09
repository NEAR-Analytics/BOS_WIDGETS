const StyledFlex = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: flex-start;
  gap: 0;
`;
const StyledInput = styled.input`
  background-color: transparent;
  font-size: 16px;
  color: #fff;
  flex-grow: 1;
`;
const StyledFont = styled.div`
  color: #fff;
  font-family: Gantari;
  font-size: 16px;
  font-style: normal;
  font-weight: 400;
  line-height: normal;
  white-space: normal;
`;
const StyledDialog = styled.div`
  position: fixed;
  left: 0;
  top: 0;
  right: 0;
  bottom: 0;
  display: flex;
  align-items: center;
  justify-content: center;
`;
const StyledMasker = styled.div`
  position: absolute;
  left: 0;
  top: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.5);
  z-index: 99;
`;
const StyledDialogMain = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  position: relative;
  padding: 20px;
  width: 418px;
  border-radius: 16px;
  border: 1px solid #373a53;
  background: #2e3142;
  z-index: 999;
  & > div {
    width: 100%;
  }
`;
const StyledClose = styled.div`
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
`;
const StyledBalanceWrapper = styled.div`
  height: 80px;
  background: #1b1e27;
  border: 1px solid #33364b;
  border-radius: 8px;
  padding: 16px 14px 13px 12px;
`;
const StyledButton = styled.button`
  flex: 1;
  height: 48px;
  border-radius: 8px;
  text-align: center;
  line-height: 48px;
  color: #fff;
  font-family: Gantari;
  font-size: 16px;
  font-style: normal;
  font-weight: 500;
  &:hover {
    opacity: 0.8;
  }
`;
const {
  asset,
  type,
  collaterValue,
  borrowCapacity,
  availableToBorrow,
  cometAddress,
  borrowApr,
  supplyApr,
  account,
  toast,
  onAmountChange,
  onAddAction,
  onClose,
} = props;

useEffect(() => {
  clearTimeout(Storage.privateGet("timer"));
  const timer = setTimeout(() => {
    onAmountChange({
      amount: state.amount || 0,
      type,
      cb: (res) => {
        State.update({ ...res });
      },
    });
    if (!state.amount || asset.isNative) {
      State.update({ isApproved: true });
      return;
    }
    state?.checkAllowance(state.amount, (isApproved) => {
      State.update({ isApproved });
    });
  }, 500);
  Storage.privateSet("timer", timer);
}, [state.amount]);

return (
  <StyledDialog>
    <StyledMasker />
    <StyledDialogMain>
      <StyledFlex style={{ marginBottom: 24, justifyContent: "space-between" }}>
        <StyledFlex style={{ gap: 6 }}>
          <StyledFont
            style={{
              fontSize: 16,
              fontWeight: 700,
            }}
          >
            {type} {asset.symbol}
          </StyledFont>
          {type === "Supply" && (
            <StyledFont
              style={{
                fontSize: 16,
                fontWeight: 700,
                color: "#10FFB7",
              }}
            >
              {supplyApr}%
            </StyledFont>
          )}
          {["Borrow", "Repay"].includes(type) && (
            <StyledFont
              style={{
                fontSize: 16,
                fontWeight: 700,
                color: "#7945FF",
              }}
            >
              {borrowApr}%
            </StyledFont>
          )}
          {["Supply", "Borrow", "Repay"].includes(type) && (
            <StyledFont
              style={{
                fontSize: 14,
                color: "#979ABE",
              }}
            >
              Net APR
            </StyledFont>
          )}
        </StyledFlex>
        <StyledClose
          onClick={() => {
            onClose();
          }}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="12"
            height="12"
            viewBox="0 0 12 12"
            fill="none"
          >
            <path
              d="M7.73284 6.00004L11.7359 1.99701C12.0368 1.696 12.0882 1.2593 11.8507 1.0219L10.9779 0.14909C10.7404 -0.0884124 10.3043 -0.0363122 10.0028 0.264491L6.00013 4.26743L1.99719 0.264591C1.69619 -0.036712 1.25948 -0.0884125 1.02198 0.14939L0.149174 1.0223C-0.0882277 1.2594 -0.0368271 1.6961 0.264576 1.99711L4.26761 6.00004L0.264576 10.0033C-0.0363271 10.3041 -0.0884277 10.7405 0.149174 10.978L1.02198 11.8509C1.25948 12.0884 1.69619 12.0369 1.99719 11.736L6.00033 7.73276L10.0029 11.7354C10.3044 12.037 10.7405 12.0884 10.978 11.8509L11.8508 10.978C12.0882 10.7405 12.0368 10.3041 11.736 10.0029L7.73284 6.00004Z"
              fill="#979ABE"
            />
          </svg>
        </StyledClose>
      </StyledFlex>
      <StyledBalanceWrapper style={{ marginBottom: 24 }}>
        <StyledFlex
          style={{ marginBottom: 16, justifyContent: "space-between" }}
        >
          <StyledInput
            placeholder="0.00"
            value={state.amount || ""}
            onChange={(ev) => {
              if (isNaN(Number(ev.target.value))) return;
              if (Big(ev.target.value || 0).gt(asset.walletBalance)) return;
              State.update({
                amount: ev.target.value,
              });
            }}
          />
          <StyledFlex style={{ gap: 6 }}>
            {/* <StyledChain></StyledChain> */}
            <img src={asset.icon} style={{ width: 20, height: 20 }} />
            <StyledFont
              style={{
                fontSize: 14,
                fontWeight: 500,
              }}
            >
              {asset.symbol}
            </StyledFont>
          </StyledFlex>
        </StyledFlex>
        <StyledFlex style={{ justifyContent: "space-between" }}>
          <StyledFont
            style={{
              fontSize: 12,
              color: "#979ABE",
            }}
          >
            <Widget
              src="bluebiu.near/widget/Utils.FormatAmount"
              props={{
                amount: Big(state.amount || 0).mul(asset.price),
                prev: "$",
              }}
            />
          </StyledFont>
          <StyledFlex style={{ gap: 5 }}>
            <StyledFont
              style={{
                fontSize: 12,
                color: "#979ABE",
              }}
            >
              Balance:
            </StyledFont>
            <StyledFlex
              style={{ gap: "8px", cursor: "pointer" }}
              onClick={() => {
                const _balance = Big(asset.walletBalance || 0);
                const splits = _balance.toFixed(18).split(".");
                const _amount = _balance.lt(0.000001)
                  ? _balance.toFixed(splits[1].length)
                  : asset.walletBalance;
                State.update({
                  amount: _amount.replace(/\.?0+$/, ""),
                });
              }}
            >
              <StyledFont
                style={{
                  textDecoration: "underline",
                  color: "#FFF",
                  fontSize: 12,
                }}
              >
                <Widget
                  src="bluebiu.near/widget/Utils.FormatAmount"
                  props={{
                    amount: asset.walletBalance,
                  }}
                />
              </StyledFont>
              <StyledFont
                style={{
                  color: "#979ABE",
                  fontSize: 12,
                }}
              >
                {asset.symbol}
              </StyledFont>
            </StyledFlex>
          </StyledFlex>
        </StyledFlex>
      </StyledBalanceWrapper>
      {type !== "Supply" && (
        <StyledFlex
          style={{ marginBottom: 24, gap: 16, flexDirection: "column" }}
        >
          {["Collateral", "Withdraw"].includes(type) && (
            <StyledFlex
              style={{ width: "100%", justifyContent: "space-between" }}
            >
              <StyledFont
                style={{
                  color: "#979ABE",
                  fontSize: 14,
                }}
              >
                Collateral Value
              </StyledFont>
              <StyledFlex style={{ gap: "5px" }}>
                <StyledFont
                  style={{
                    textDecoration:
                      state.availableToBorrow !== undefined
                        ? "line-through"
                        : "inherit",
                    fontSize: 14,
                    color:
                      state.availableToBorrow !== undefined
                        ? "#979ABE"
                        : "#fff",
                  }}
                >
                  <Widget
                    src="bluebiu.near/widget/Utils.FormatAmount"
                    props={{
                      amount: collaterValue,
                      prev: "$",
                    }}
                  />
                </StyledFont>
                {state.collaterValue !== undefined && (
                  <>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="8"
                      height="10"
                      viewBox="0 0 8 10"
                      fill="none"
                    >
                      <path
                        d="M7.5 4.13397C8.16667 4.51887 8.16667 5.48113 7.5 5.86603L1.5 9.33013C0.833334 9.71503 -4.47338e-07 9.2339 -4.13689e-07 8.4641L-1.10848e-07 1.5359C-7.71986e-08 0.766098 0.833333 0.284973 1.5 0.669873L7.5 4.13397Z"
                        fill="#979ABE"
                      />
                    </svg>
                    <StyledFont
                      style={{
                        color: "#FFF",
                        fontSize: "14px",
                      }}
                    >
                      <Widget
                        src="bluebiu.near/widget/Utils.FormatAmount"
                        props={{
                          amount: state.collaterValue,
                          prev: "$",
                        }}
                      />
                    </StyledFont>
                  </>
                )}
              </StyledFlex>
            </StyledFlex>
          )}
          <StyledFlex
            style={{ width: "100%", justifyContent: "space-between" }}
          >
            <StyledFont
              style={{
                color: "#979ABE",
                fontSize: "14px",
              }}
            >
              Borrow Capacity
            </StyledFont>
            <StyledFlex style={{ gap: 5 }}>
              <StyledFont
                style={{
                  textDecoration:
                    state.borrowCapacity !== undefined
                      ? "line-through"
                      : "inherit",
                  fontSize: 14,
                  color:
                    state.borrowCapacity !== undefined ? "#979ABE" : "#fff",
                }}
              >
                <Widget
                  src="bluebiu.near/widget/Utils.FormatAmount"
                  props={{
                    amount: borrowCapacity,
                    prev: "$",
                  }}
                />
              </StyledFont>
              {state.borrowCapacity !== undefined && (
                <>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="8"
                    height="10"
                    viewBox="0 0 8 10"
                    fill="none"
                  >
                    <path
                      d="M7.5 4.13397C8.16667 4.51887 8.16667 5.48113 7.5 5.86603L1.5 9.33013C0.833334 9.71503 -4.47338e-07 9.2339 -4.13689e-07 8.4641L-1.10848e-07 1.5359C-7.71986e-08 0.766098 0.833333 0.284973 1.5 0.669873L7.5 4.13397Z"
                      fill="#979ABE"
                    />
                  </svg>
                  <StyledFont
                    style={{
                      fontSize: 14,
                    }}
                  >
                    <Widget
                      src="bluebiu.near/widget/Utils.FormatAmount"
                      props={{
                        amount: state.borrowCapacity,
                        prev: "$",
                      }}
                    />
                    {/* <span style={{ color: "#979ABE" }}>USDC</span> */}
                  </StyledFont>
                </>
              )}
            </StyledFlex>
          </StyledFlex>
          <StyledFlex
            style={{ width: "100%", justifyContent: "space-between" }}
          >
            <StyledFont
              style={{
                fontSize: 14,
                color: "#979ABE",
              }}
            >
              Available to Borrow
            </StyledFont>
            <StyledFlex style={{ gap: 5 }}>
              <StyledFont
                style={{
                  textDecoration:
                    state.availableToBorrow !== undefined
                      ? "line-through"
                      : "inherit",
                  fontSize: 14,
                  color:
                    state.availableToBorrow !== undefined ? "#979ABE" : "#fff",
                }}
              >
                <Widget
                  src="bluebiu.near/widget/Utils.FormatAmount"
                  props={{
                    amount: availableToBorrow,
                    prev: "$",
                  }}
                />
              </StyledFont>
              {state.availableToBorrow !== undefined && (
                <>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="8"
                    height="10"
                    viewBox="0 0 8 10"
                    fill="none"
                  >
                    <path
                      d="M7.5 4.13397C8.16667 4.51887 8.16667 5.48113 7.5 5.86603L1.5 9.33013C0.833334 9.71503 -4.47338e-07 9.2339 -4.13689e-07 8.4641L-1.10848e-07 1.5359C-7.71986e-08 0.766098 0.833333 0.284973 1.5 0.669873L7.5 4.13397Z"
                      fill="#979ABE"
                    />
                  </svg>
                  <StyledFont style={{ fontSize: 14 }}>
                    <Widget
                      src="bluebiu.near/widget/Utils.FormatAmount"
                      props={{
                        amount: state.availableToBorrow,
                        prev: "$",
                      }}
                    />
                    {/* <span style={{ color: "#979ABE" }}>USDC</span> */}
                  </StyledFont>
                </>
              )}
            </StyledFlex>
          </StyledFlex>
        </StyledFlex>
      )}
      {!asset.isNative && (
        <StyledFont
          style={{
            width: 382,
            marginBottom: 20,
            fontSize: 14,
            color: "#979ABE",
          }}
        >
          You need to approve Compound on the {asset.symbol} contract before you
          can use this asset. You only need to do this once.
        </StyledFont>
      )}
      <StyledFlex>
        <StyledButton
          disabled={!state.amount || state.loading}
          style={{
            backgroundColor: ["Borrow", "Repay"].includes(type)
              ? "#5D36C3"
              : "#00ad79",
          }}
          onClick={() => {
            if (!Big(state.amount || 0).gt(0)) return;
            if (!state.isApproved) {
              State.update({
                loading: true,
              });
              state.handleApprove(
                state.amount,
                () => {
                  State.update({
                    loading: false,
                    isApproved: true,
                  });
                  onAddAction({ amount: state.amount, type });
                },
                () => {
                  State.update({
                    loading: false,
                  });
                }
              );
            } else {
              onAddAction({ amount: state.amount, type });
            }
          }}
        >
          {state.loading ? (
            <Widget
              src="bluebiu.near/widget/0vix.LendingLoadingIcon"
              props={{
                size: 16,
              }}
            />
          ) : state.isApproved ? (
            "Add"
          ) : (
            "Approve & Add"
          )}
        </StyledButton>
      </StyledFlex>
    </StyledDialogMain>
    <Widget
      src="bluebiu.near/widget/Lending.CompoundV3.CheckAllowance"
      props={{
        account,
        spender: cometAddress,
        token: asset,
        amount: state.amount,
        toast,
        onLoad: (data) => {
          State.update({ ...data });
        },
      }}
    />
  </StyledDialog>
);
