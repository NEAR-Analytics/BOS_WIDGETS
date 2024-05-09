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
    return (amount / stnearPriceUsd).toFixed(5);
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
      <Widget
        src="bluebiu.near/widget/MetaPool.ConnectButton"
        props={{ isNear: true }}
      />
    );
  }
  return (
    <Widget
      src="bluebiu.near/widget/MetaPool.StakeNearButton"
      props={{
        disabled: !state.stakable,
        amount: state.amount,
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
              isNear: true,
              onAmountChange: (amount) => {
                const balance = state.stakeType
                  ? state.stakedBalance
                  : state.balance;
                State.update({
                  amount: amount,
                  stakable:
                    Number(amount) &&
                    !isNaN(Number(balance)) &&
                    Big(balance).gt(amount) &&
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
