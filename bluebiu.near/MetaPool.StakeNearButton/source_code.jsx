const StakeButton = styled.button`
  background-color: #c7ff18;
  width: 100%;
  height: 60px;
  border-radius: 8px;
  color: #000;
  font-size: 18px;
  font-weight: 500;
  border: none;
  transition: 0.5s;

  &:disabled {
    opacity: 0.5;
  }
  @media (max-width: 768px) {
    height: 40px;
    font-size: 16px;
  }
`;

const {
  disabled,
  amount,
  amountOut,
  lpToken,
  stakeType,
  stakedBalance,
  contractId,
  stnearPriceUsd,
  onSuccess,
} = props;

const accountId = context.accountId;
State.init({
  loading: false,
});

const stakeNear = () => {
  State.update({
    loading: true,
  });
  try {
    const txs = [
      {
        contractName: contractId,
        methodName: "deposit_and_stake",
        deposit: ethers.utils.parseUnits(amount, 24).toString(),
        args: {},
      },
    ];
    if (Big(stakedBalance || 0).eq(0)) {
      txs.push({
        contractName: contractId,
        methodName: "ft_balance_of",
        args: {
          account_id: accountId,
        },
      });
    }
    Near.call(txs);
    onSuccess?.();
  } finally {
    State.update({
      loading: false,
    });
  }
};
const unstakeNearFastly = () => {
  State.update({
    loading: true,
  });
  Near.call([
    {
      contractName: contractId,
      methodName: "liquid_unstake",
      deposit: 0,
      args: {
        st_near_to_burn: Big(amount).mul(Big(10).pow(24)).toFixed(0),
        min_expected_near: Big(amountOut).mul(Big(10).pow(24)).toFixed(0),
      },
    },
  ]);

  onSuccess?.();
  State.update({
    loading: false,
  });
};
const unstakeNearDelay = () => {
  State.update({
    loading: true,
  });
  Near.call([
    {
      contractName: contractId,
      methodName: "unstake",
      args: {
        amount: Big(ethers.utils.parseUnits(amount, 24)).toFixed(0),
      },
    },
  ]);
  State.update({
    loading: false,
  });
};

const handleClick = () => {
  if (stakeType === 0) {
    stakeNear();
    return;
  }
  if (stakeType === 1) {
    unstakeNearFastly();
    return;
  }
  if (stakeType === 2) {
    unstakeNearDelay();
    return;
  }
};

return (
  <>
    <StakeButton disabled={disabled} onClick={handleClick}>
      {state.loading ? "Wait..." : stakeType ? "Unstake" : "Stake Now"}
    </StakeButton>
  </>
);
