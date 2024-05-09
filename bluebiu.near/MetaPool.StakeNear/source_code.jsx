const {
  chain,
  stnearPrice,
  stnearPriceUsd,
  nearUsdPrice,
  token,
  lpToken,
  contractId,
  contractData,
  network,
} = props;

const Button = styled.div`
  font-size: 14px;
  font-weight: 500;
  color: rgba(51, 44, 75, 1);
  background-color: #c7ff18;
  border-radius: 6px;
  width: 80px;
  height: 36px;
  line-height: 36px;
  text-align: center;
  flex-shrink: 0;
  margin-left: 10px;
  cursor: pointer;
`;
const StakeWrapper = styled.div`
  @media (max-width: 768px) {
    padding: 0px 20px 20px;
  }
`;
const StakeNear = styled.div`
  @media (max-width: 768px) {
    padding-top: 20px;
  }
`;
const CollectWalletTips = styled.div`
  display: flex;
  background-color: rgba(199, 255, 24, 0.2);
  height: 39px;
  border-radius: 8px;
  padding: 0px 20px;
  align-items: center;
`;
const ButtonLabel = styled.div`
  font-size: 16px;
  font-weight: 600;
  color: #fff;
  padding-left: 10px;
  .sp {
    color: #c7ff18;
  }
`;

const nearAccount = context.accountId;

State.init({
  stakeType: 0, // 0 for stake, 1 for fastunstake, 2 for delayed stake
  stakable: false,
  amount: "",
  balanceLoading: false,
  amountOut: "",
  isUpdateAccountInfo: true,
});

const utils = {
  formatGetValue: (amount) => {
    if (!amount || parseFloat(amount) <= 0 || !stnearPriceUsd) return 0;
    if (state.stakeType === 0) {
      return (amount / stnearPrice).toFixed(5);
    }
    if (state.stakeType === 1) {
      return Big(amount * stnearPrice)
        .mul(0.997)
        .toFixed(5);
    }
    if (state.stakeType === 2) {
      return (amount * stnearPrice).toFixed(5);
    }
  },
  formatWithdrawalsTime: () => {
    return "";
    // September 22nd, 06:17
  },
};

const getBalance = () => {
  if (!nearAccount) return;
  asyncFetch(network, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      jsonrpc: "2.0",
      id: "dontcare",
      method: "query",
      params: {
        request_type: "view_account",
        finality: "final",
        account_id: nearAccount,
      },
    }),
  })
    .then((res) => {
      const amount = res.body.result.amount;
      const balance = amount
        ? Big(ethers.utils.formatUnits(amount, 24)).toFixed(4, 0)
        : "0";
      if (
        Big(balance)
          .sub(state.balance || 0)
          .abs()
          .gt(0.5)
      ) {
        State.update({
          balanceLoading: false,
          balance,
        });
      } else {
        setTimeout(() => {
          getBalance();
        }, 500);
      }
    })
    .catch((err) => {
      State.update({
        balanceLoading: false,
        balance: "0",
      });
    });
};

const renderButton = () => {
  if (!nearAccount) {
    return (
      <CollectWalletTips>
        <svg
          width="20px"
          height="20px"
          viewBox="0 0 20 20"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="icon"
        >
          <path
            d="M10 2.94047e-06C15.5137 3.42249e-06 20 4.48558 20 10C20 15.5137 15.5137 20 10 20C4.48558 20 -3.42256e-06 15.5144 -2.94047e-06 10C-2.45838e-06 4.48558 4.48558 2.45838e-06 10 2.94047e-06ZM10 18.5651C14.7231 18.5651 18.5651 14.7231 18.5651 10C18.5651 5.27766 14.7231 1.43493 10 1.43493C5.27766 1.43493 1.43492 5.27694 1.43492 10C1.43492 14.7231 5.27766 18.5651 10 18.5651ZM11.0762 14.6635C11.0762 14.3781 10.9628 14.1044 10.761 13.9025C10.5592 13.7007 10.2854 13.5873 10 13.5873C9.71457 13.5873 9.44084 13.7007 9.23901 13.9025C9.03719 14.1044 8.9238 14.3781 8.9238 14.6635C8.9238 14.9489 9.03719 15.2227 9.23901 15.4245C9.44084 15.6263 9.71457 15.7397 10 15.7397C10.2854 15.7397 10.5592 15.6263 10.761 15.4245C10.9628 15.2227 11.0762 14.9489 11.0762 14.6635ZM10 4.2603C10.396 4.2603 10.7175 4.581 10.7175 4.97776L10.7175 11.4349C10.7175 11.831 10.396 12.1524 10 12.1524C9.60396 12.1524 9.28254 11.831 9.28254 11.4349L9.28254 4.97776C9.28254 4.581 9.60396 4.2603 10 4.2603Z"
            fill="#C7FF18"
          />
        </svg>
        <ButtonLabel>
          Click top right button to{" "}
          <span className="sp">Connect Near Wallet</span>
        </ButtonLabel>
      </CollectWalletTips>
    );
  }
  return (
    <Widget
      src="bluebiu.near/widget/MetaPool.StakeNearButton"
      props={{
        disabled: !state.stakable,
        amount: state.amount,
        amountOut: state.amountOut,
        lpToken,
        stakedBalance: state.stakedBalance,
        stakeType: state.stakeType,
        contractId,
        stnearPriceUsd,
        onSuccess: () => {
          if (state.stakeType === 0) {
            getBalance();
            return;
          }
          State.update({
            amount: "",
            errorTips: "",
            amountOut: "",
            isUpdateAccountInfo: true,
          });
        },
      }}
    />
  );
};

if (!state.balance) {
  getBalance();
}

return (
  <StakeNear>
    <Widget
      src="bluebiu.near/widget/MetaPool.StakeNearAccountInfo"
      props={{
        contractId,
        isUpdate: state.isUpdateAccountInfo,
        account: nearAccount,
        onLoad: (data) => {
          if (
            data.stakedBalance &&
            Big(data.stakedBalance)
              .sub(state.stakedBalance || 0)
              .abs()
              .gt(0.5)
          ) {
            State.update({
              isUpdateAccountInfo: false,
              ...data,
            });
          }
        },
      }}
    />
    <Widget
      src="bluebiu.near/widget/MetaPool.Switcher"
      props={{
        type: state.stakeType,
        onChange: (stakeType) => {
          State.update({
            stakeType,
            amount: "",
            amountOut: "",
            isUpdateAccountInfo: !!stakeType,
            errorTips: "",
          });
        },
      }}
    />
    <StakeWrapper>
      {false ? (
        <div className="mt_20">
          <Widget
            src="bluebiu.near/widget/MetaPool.Alert"
            props={{
              text: (
                <span>
                  The promotional launch period is a great opportunity to earn
                  up to {nearApy}% APY, but keep in mind that your tokens will
                  be locked until{" "}
                  <span className="fw_700">
                    {utils.formatWithdrawalsTime()}
                  </span>
                  . After that, you'll be able to unstake them and withdraw your
                  earnings.
                </span>
              ),
            }}
          />
        </div>
      ) : (
        <>
          {state.stakeType === 2 && (
            <div className="mt_20">
              <Widget
                src="bluebiu.near/widget/MetaPool.Alert"
                props={{
                  text: `Delayed unstake takes up to 6 days to complete.`,
                  button: (
                    <Button
                      onClick={() => {
                        State.update({
                          stakeType: 1,
                          amount: "",
                          amountOut: "",
                          errorTips: "",
                        });
                      }}
                    >
                      Try fast
                    </Button>
                  ),
                }}
              />
            </div>
          )}
          <Widget
            src="bluebiu.near/widget/MetaPool.StakeInput"
            props={{
              stakeType: state.stakeType,
              price: nearUsdPrice || 0,
              amount: state.amount,
              errorTips: state.errorTips,
              balance: state.stakeType ? state.stakedBalance : state.balance,
              balanceLoading: state.balanceLoading,
              token,
              lpToken,
              onAmountChange: (amount, errorTips) => {
                const balance = state.stakeType
                  ? state.stakedBalance
                  : state.balance;
                State.update({
                  amount,
                  errorTips,
                  stakable:
                    Number(amount) &&
                    !isNaN(Number(balance)) &&
                    !Big(balance).lt(amount) &&
                    !Big(amount).lt(1),
                  amountOut: utils.formatGetValue(amount),
                });
              },
            }}
          />
          <Widget
            src="bluebiu.near/widget/MetaPool.StakeResult"
            props={{
              chain,
              lpToken,
              token,
              stakeType: state.stakeType,
              value: state.amountOut,
              stnearPrice,
            }}
          />
          {state.stakeType === 1 && (
            <div className="mt_20">
              <Widget
                src="bluebiu.near/widget/MetaPool.Alert"
                props={{
                  text: `Fee is 0.3%`,
                }}
              />
            </div>
          )}
          {state.stakeType === 2 && !!Number(state.amount) && (
            <div className="mt_20">
              <Widget
                src="bluebiu.near/widget/MetaPool.Alert"
                props={{
                  text: `Funds will be available in approximately 2 days 0 hours.
                    You will NOT receive rewards during that period.`,
                }}
              />
            </div>
          )}
          <div className="mt_20">{renderButton()}</div>
        </>
      )}
    </StakeWrapper>
  </StakeNear>
);
