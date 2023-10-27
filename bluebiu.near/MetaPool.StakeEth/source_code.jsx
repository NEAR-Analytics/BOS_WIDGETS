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

const ABI = [
  {
    inputs: [
      {
        internalType: "address",
        name: "account",
        type: "address",
      },
    ],
    name: "balanceOf",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
];

const ethAccount = Ethers.send("eth_requestAccounts", [])[0];
const { chain, liquidAddress, mpethPrice, ethApy, token, lpToken, chainId } =
  props;
State.init({
  stakeType: 0, // 0 for stake, 1 for fastunstake, 2 for delayed stake
  stakable: false,
  amount: "",
  errorTips: "",
  withdrawalsStartTime: 0,
  balanceLoading: false,
  amountOut: "",
  updateStakeBalance: true,
});

// handle chainId for eth

if (
  chain === "ETH" &&
  state.chainId === undefined &&
  ethers !== undefined &&
  ethAccount
) {
  Ethers.provider()
    .getNetwork()
    .then((chainIdData) => {
      if (chainIdData?.chainId) {
        State.update({ chainId: chainIdData.chainId });
      }
    });
}

const fetchContractData = () => {
  const resp = fetch("https://eth-metapool.narwallets.com/metrics_front");
  if (!resp || !resp.body) return;
  const { stakingData, withdrawData } = resp.body;

  State.update({
    contractData: {
      stakingData: stakingData,
      withdrawalsStartTime:
        (withdrawData?.withdrawalsStartEpoch || 0) * 7 * 24 * 60 * 60 * 1000 +
        withdrawData?.startTimestamp * 1000,
    },
  });
};

const fetchEthPrice = () => {
  const resp = fetch(
    "https://api.coingecko.com/api/v3/simple/price?ids=ethereum&vs_currencies=usd"
  );
  const ethUsdPrice = resp?.body?.ethereum.usd;
  if (ethUsdPrice && !isNaN(ethUsdPrice)) {
    State.update({ ethUsdPrice: ethUsdPrice });
  }
};
const getBalance = () => {
  if (!ethAccount) return;
  Ethers.provider()
    .getBalance(ethAccount)
    .then((_balance) => {
      const balance = ethers.utils.formatEther(_balance._hex);
      State.update({
        balanceLoading: false,
        balance: Big(balance || 0)?.eq(0) ? "0" : Big(balance).toFixed(4, 0),
      });
    })
    .catch((err) => {
      State.update({
        balanceLoading: false,
        balance: "0",
      });
    });
};
const getStakedBalance = () => {
  if (!ethAccount) return;
  const Erc20Contract = new ethers.Contract(
    lpToken.address,
    ABI,
    Ethers.provider().getSigner()
  );
  Erc20Contract.balanceOf(ethAccount)
    .then((_balance) => {
      const balance = ethers.utils.formatEther(_balance._hex);
      State.update({
        balanceLoading: false,
        stakedBalance: Big(balance || 0)?.eq(0)
          ? "0"
          : Big(balance).toFixed(4, 0),
      });
    })
    .catch(() => {
      State.update({
        balanceLoading: false,
        stakedBalance: "0",
      });
    });
};
const getAmountOut = () => {
  const LiquidContract = new ethers.Contract(
    liquidAddress,
    [
      {
        inputs: [
          { internalType: "uint256", name: "_amountIn", type: "uint256" },
        ],
        name: "getAmountOut",
        outputs: [
          { internalType: "uint256", name: "amountOut", type: "uint256" },
          { internalType: "uint256", name: "feeAmount", type: "uint256" },
        ],
        stateMutability: "view",
        type: "function",
      },
    ],
    Ethers.provider().getSigner()
  );
  LiquidContract.getAmountOut(
    ethers.utils.parseEther(state.amount).toString()
  ).then((_amountOut) => {
    State.update({
      amountOut: Big(ethers.utils.formatEther(_amountOut[0]))
        .mul(0.995)
        .toFixed(5),
    });
  });
};
const getRedeemAmountOut = () => {
  const LiquidContract = new ethers.Contract(
    liquidAddress,
    [
      {
        inputs: [{ internalType: "uint256", name: "shares", type: "uint256" }],
        name: "previewRedeem",
        outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
        stateMutability: "view",
        type: "function",
      },
    ],
    Ethers.provider().getSigner()
  );
  LiquidContract.previewRedeem(
    ethers.utils.parseEther(state.amount).toString()
  ).then((_amountOut) => {
    State.update({
      amountOut: Big(ethers.utils.formatEther(_amountOut))
        .mul(0.995)
        .toFixed(5),
    });
  });
};

if (state.ethUsdPrice === undefined) {
  fetchEthPrice();
}
if (!state.contractData) {
  fetchContractData();
}
if (!state.balance) {
  getBalance();
}

const utils = {
  formatGetValue: (amount) => {
    if (!amount || parseFloat(amount) <= 0 || !mpethPrice) {
      State.update({
        amountOut: 0,
      });
      return;
    }
    if (state.stakeType === 0) {
      State.update({
        amountOut: (amount / mpethPrice).toFixed(5),
      });
      return;
    }
    if (state.stakeType === 1) {
      getAmountOut();
      return;
    }
    if (state.stakeType === 2) {
      getRedeemAmountOut();
    }
  },
  formatWithdrawalsTime: () => {
    if (!state.contractData.withdrawalsStartTime) return "";
    const monthsStr = [
      "January",
      "February",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
      "September",
      "October",
      "November",
      "December",
    ];
    const date = new Date(state.contractData.withdrawalsStartTime);
    const monthStr = monthsStr[date.getMonth()];
    const day = date.getDate();
    let dayStr = "";
    const molValue = day % 10;
    switch (molValue) {
      case 1:
        dayStr = day + "st";
        break;
      case 2:
        dayStr = day + "nd";
        break;
      case 3:
        dayStr = day + "rd";
        break;
      default:
        dayStr = day + "th";
    }
    const hour = date.getHours();
    const minute = date.getMinutes();
    return `${monthStr} ${dayStr}, ${hour < 10 ? "0" + hour : hour}:${
      minute < 10 ? "0" + minute : minute
    }`;
  },
};

const showTips = () => {
  if (state.stakeType === 0) return false;
  if (!state.stakedBalance) return true;
  if (
    [1, 2].includes(state.stakeType) &&
    state.contractData.withdrawalsStartTime &&
    state.contractData.withdrawalsStartTime > Date.now()
  )
    return true;
  return false;
};

const renderButton = () => {
  if (state.chainId !== chainId || !ethAccount) {
    return (
      <Widget
        src="bluebiu.near/widget/MetaPool.ConnectButton"
        props={{
          isWrongNetwork: state.chainId !== chainId,
          chainId: chainId,
          account: ethAccount,
          chainName: "Ethereum",
        }}
      />
    );
  }
  return (
    <Widget
      src="bluebiu.near/widget/MetaPool.StakeEthButton"
      props={{
        disabled: !state.stakable,
        amount: state.amount,
        ethAccount,
        lpToken,
        liquidAddress,
        stakeType: state.stakeType,
        minAmountOut: state.amountOut,
        onSuccess: () => {
          if (state.stakeType === 0) {
            getBalance();
          } else {
            getStakedBalance();
          }
          State.update({
            amount: "",
            errorTips: "",
            amountOut: "",
            updateStakeBalance: true,
          });
        },
      }}
    />
  );
};

return (
  <>
    <Widget
      src="bluebiu.near/widget/MetaPool.StakeEthDetails"
      props={{
        ethUsdPrice: state.ethUsdPrice,
        stakingData: state.contractData.stakingData,
        abi: ABI,
        address: lpToken.address,
      }}
    />
    <Widget
      src="bluebiu.near/widget/MetaPool.Switcher"
      props={{
        type: state.stakeType,
        onChange: (stakeType) => {
          if (stakeType === 0) {
            getBalance();
          } else {
            getStakedBalance();
          }
          State.update({
            stakeType,
            amount: "",
            errorTips: "",
            amountOut: "",
          });
        },
      }}
    />

    <StakeWrapper>
      {showTips() ? (
        <div className="mt_20">
          <Widget
            src="bluebiu.near/widget/MetaPool.Alert"
            props={{
              text: (
                <span>
                  The promotional launch period is a great opportunity to earn
                  up to {ethApy}% APY, but keep in mind that your tokens will be
                  locked until{" "}
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
                  text: `Delayed unstake takes up to 21 days to complete.`,
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
              price: state.ethUsdPrice,
              amount: state.amount,
              errorTips: state.errorTips,
              balance: state.stakeType ? state.stakedBalance : state.balance,
              balanceLoading: state.balanceLoading,
              stakeType: state.stakeType,
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
                    !Big(amount).lt(0.01),
                });
                utils.formatGetValue(amount);
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
            }}
          />
          {state.stakeType === 1 && (
            <div className="mt_20">
              <Widget
                src="bluebiu.near/widget/MetaPool.Alert"
                props={{
                  text: `Fee is 0%`,
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
  </>
);
