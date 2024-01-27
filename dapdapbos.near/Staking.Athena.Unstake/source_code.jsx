const StakePanel = styled.div`
  width: 510px;
  margin: 0 auto;
  /* reset input */
  .bos-input-number {
    background-color: var(--dark);
    color: var(--white);
    border: none;
    border-radius: 10px !important;
  }
  .input-group {
    column-gap: 5px;
  }
  .append-token {
    display: flex;
    align-items: center;
    gap: 6px;
    position: absolute;
    right: 12px;
    /* top: 4px; */
    height: 36px;
    z-index: 5;
  }

  .avatars {
    margin-right: 20px;
  }
`;
const AmountList = styled.div`
  display: flex;
  font-size: var(--fz12);
  color: var(--purple);
  justify-content: space-between;
  padding: 10px 0 16px;
  .amount-left {
  }
  .amount-right {
  }
  .amount-white {
    color: var(--white);
    text-decoration: underline;
  }
`;

const UnStakeBtnWrap = styled.div`
  display: flex;
  column-gap: 22px;
  align-items: center;
  .switch-wrap {
    display: flex;
    align-items: center;
    column-gap: 8px;
    color: var(--purple);
  }
`;

const ChainBtnWrap = styled.div`
  margin-top: 16px;
  display: flex;
`;

const { data, account, TOKENS, startUnlockIndex } = props;
const curToken = data.tokenAddress;
const {
  poolType,
  poolName,
  totalDeposit,
  unlocking,
  StakingAddress,
  stakedAmount,
} = data;

State.init({
  // isClaimRewards: false,
  inputValue: "",
  canUnstake: false,
  unstaking: false,
  stakedAmountShow: stakedAmount,
});

const handleInputChange = (e) => {
  State.update({
    inputValue: e.target.value,
  });
};

useEffect(() => {
  if (
    !isNaN(Number(state.inputValue)) &&
    Big(state.inputValue || 0).lt(stakedAmount || 0)
  ) {
    State.update({
      canUnstake: true,
    });
  } else {
    State.update({
      canUnstake: false,
    });
  }
}, [state.inputValue]);

function handleUnStake() {
  if (poolType === "Locking") {
    handleUnStakeLocking();
  }
  if (poolType === "MasterChief") {
    handleUnStakeMasterChief();
  }
}

function handleUnStakeLocking() {
  State.update({
    unstaking: true,
  });
  const UnstakeContract = new ethers.Contract(
    StakingAddress,
    [
      {
        type: "function",
        stateMutability: "nonpayable",
        outputs: [],
        name: "startUnlock",
        inputs: [
          {
            type: "uint256",
            name: "strategyIndex",
            internalType: "uint256",
          },
          {
            type: "uint256",
            name: "amount",
            internalType: "uint256",
          },
          {
            type: "uint256",
            name: "slotIndex",
            internalType: "uint256",
          },
        ],
      },
    ],
    Ethers.provider().getSigner()
  );

  UnstakeContract.startUnlock(
    0,
    ethers.utils.parseUnits(state.inputValue),
    startUnlockIndex,
    {
      gasLimit: 5000000,
    }
  )
    .then((tx) => {
      console.log("tx: ", tx);
      tx.wait()
        .then((res) => {
          const { status, transactionHash } = res;
          console.info("tx_res: ", res);
          if (status === 1) {
            toast.success?.({
              title: "Transaction Successful!",
              text: `transactionHash ${transactionHash}`,
            });
            updateStakedAmount();
          } else {
            toast.fail?.({
              title: "Transaction Failed!",
              text: `transactionHash ${transactionHash}`,
            });
          }
        })
        .finally(() => {
          State.update({
            unstaking: false,
          });
        });
    })
    .catch((err) => {
      State.update({
        unstaking: false,
      });
      console.log("handleUnStakeLocking_error:", err);
    });
}

function handleUnStakeMasterChief() {
  State.update({
    unstaking: true,
  });
  const UnstakeContract = new ethers.Contract(
    StakingAddress,
    [
      {
        type: "function",
        stateMutability: "nonpayable",
        outputs: [],
        name: "withdraw",
        inputs: [
          {
            type: "address",
            name: "_lp",
            internalType: "address",
          },
          {
            type: "uint256",
            name: "_amount",
            internalType: "uint256",
          },
        ],
      },
    ],
    Ethers.provider().getSigner()
  );
  UnstakeContract.withdraw(curToken, ethers.utils.parseUnits(state.inputValue))
    .then((tx) => {
      console.log("tx: ", tx);
      tx.wait()
        .then((res) => {
          const { status, transactionHash } = res;
          console.info("tx_res: ", res);
          if (status === 1) {
            toast.success?.({
              title: "Transaction Successful!",
              text: `transactionHash ${transactionHash}`,
            });
            updateStakedAmount();
          } else {
            toast.fail?.({
              title: "Transaction Failed!",
              text: `transactionHash ${transactionHash}`,
            });
          }
        })
        .finally(() => {
          State.update({
            unstaking: false,
          });
        });
    })
    .catch((err) => {
      State.update({
        unstaking: false,
      });
      console.log("handleUnStakeMasterChief_error:", err);
    });
}

function updateStakedAmount() {
  State.update({
    stakedAmountShow: state.stakedAmountShow - state.inputValue,
  });
}

return (
  <StakePanel>
    <div className="input-group">
      <input
        value={state.inputValue}
        type="number"
        className="form-control bos-input-number"
        placeholder="0.0"
        onChange={handleInputChange}
      />
      <div className="append-token">
        <Widget
          src="dapdapbos.near/widget/UI.Avatar"
          props={{ src: TOKENS[curToken].icon, size: 20 }}
        />
      </div>
    </div>
    <AmountList>
      <span></span>
      <span>
        Balance: <span className="amount-white">{state.stakedAmountShow}</span>
        {/* {TOKENS[curToken].symbol} */}
      </span>
    </AmountList>
    <UnStakeBtnWrap>
      <Widget
        src="dapdapbos.near/widget/UI.Button"
        props={{
          text: "Unstake",
          type: "green",
          style: { flex: 1 },
          loading: state.unstaking,
          disabled: !state.canUnstake,
          onClick: handleUnStake,
        }}
      />
    </UnStakeBtnWrap>
  </StakePanel>
);
