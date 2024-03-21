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
    text-decoration: underline;
    color: var(--white);
    cursor: pointer;
  }
`;
const StakeBtnWrap = styled.div`
  display: flex;
  column-gap: 14px;
`;
const ChainBtnWrap = styled.div`
  margin-top: 16px;
  display: flex;
`;

const ApproveABI = [
  {
    constant: false,
    inputs: [
      {
        name: "_spender",
        type: "address",
      },
      {
        name: "_value",
        type: "uint256",
      },
    ],
    name: "approve",
    outputs: [
      {
        name: "",
        type: "bool",
      },
    ],
    payable: false,
    stateMutability: "nonpayable",
    type: "function",
  },
];

const { data, account, TOKENS, toast, addAction } = props;

// curToken: token address
const { poolType, tokenAddress: curToken, tokenAddress, StakingAddress } = data;

State.init({
  allowance: 0,
  curTokenBal: 0,
  needApprove: false,
  isApproving: false,
  isApproved: false,
  canStake: false,
  isStaking: false,
  inputValue: "",
});

function handleApprove(tokenAddress, spender) {
  State.update({
    isApproving: true,
  });
  const TokenContract = new ethers.Contract(
    tokenAddress,
    ApproveABI,
    Ethers.provider().getSigner()
  );
  console.info("to approve: ", state.inputValue, TOKENS[curToken].decimals);

  TokenContract.approve(
    spender,
    ethers.utils.parseUnits(state.inputValue, TOKENS[curToken].decimals)
  )
    .then((tx) => {
      tx.wait()
        .then((res) => {
          const { status, transactionHash } = res;
          console.info("approve_tx_res:", res);
          State.update({
            isApproved: status === 1,
            isApproving: false,
          });
          if (status === 1) {
            toast.success?.({
              title: "Transaction Successful!",
              text: `transactionHash ${transactionHash}`,
            });
          } else {
            toast.fail?.({
              title: "Transaction Failed!",
              text: `transactionHash ${transactionHash}`,
            });
          }
        })
        .finally(() => {
          State.update({
            isApproving: false,
          });
        });
    })
    .catch((err) => {
      State.update({
        isApproving: false,
      });
      console.info("approve_error: ", err);
    });
}

useEffect(() => {
  if (!state.inputValue) {
    // input none
    State.update({
      needApprove: false,
      canStake: false,
    });
    return false;
  }
  if (Big(state.allowance).lt(Big(state.inputValue || 0))) {
    State.update({
      canStake: false,
      isApproved: false,
      needApprove: true,
    });
  } else {
    if (Big(state.inputValue || 0).gt(0)) {
      State.update({
        canStake: true,
        needApprove: false,
      });
    }
  }
}, [state.inputValue, state.allowance, curToken]);

useEffect(() => {
  if (state.isApproved && Big(state.inputValue || 0).gt(0)) {
    State.update({
      canStake: true,
    });
  } else {
    State.update({
      canStake: false,
    });
  }
}, [state.isApproved]);

const handleInputChange = (e) => {
  State.update({
    inputValue: e.target.value,
  });
};

function handleStake() {
  if (poolType === "Locking") {
    handleLocking();
  }
  if (poolType === "MasterChief") {
    handleMasterChief();
  }
}

function handleMasterChief() {
  State.update({
    isStaking: true,
  });
  const MasterChiefContract = new ethers.Contract(
    StakingAddress,
    [
      {
        type: "function",
        stateMutability: "nonpayable",
        outputs: [],
        name: "deposit",
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
  const _amount = ethers.BigNumber.from(
    ethers.utils.parseUnits(state.inputValue, TOKENS[curToken].decimals)
  );
  MasterChiefContract.deposit(
    "0x31cfdA26D5841d92333D8F9B3acbd5efEedb39c1",
    _amount,
    {
      gasLimit: 1173642,
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
            addAction?.({
              type: "Staking",
              action: "Stake",
              token: TOKENS[curToken],
              amount: state.inputValue,
              template: "Athena Finance",
              add: false,
              status,
              transactionHash,
            });
          } else {
            toast.fail?.({
              title: "Transaction Failed!",
              text: `transactionHash ${transactionHash}`,
            });
          }
        })
        .catch((error) => {
          console.info("tx_error: ", error);
          toast.fail?.({
            title: "Transaction Failed!",
            text: `${error.message}`,
          });
        })
        .finally(() => {
          State.update({
            isStaking: false,
          });
        });
    })
    .catch((err) => {
      console.info("LockingContract_error:", err);
      State.update({
        isStaking: false,
      });
    });
}

function handleLocking() {
  State.update({
    isStaking: true,
  });
  const LockingContract = new ethers.Contract(
    StakingAddress,
    [
      {
        type: "function",
        stateMutability: "nonpayable",
        outputs: [],
        name: "deposit",
        inputs: [
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
  const _amount = ethers.BigNumber.from(
    ethers.utils.parseUnits(state.inputValue, TOKENS[curToken].decimals)
  );
  LockingContract.deposit(_amount, {
    gasLimit: 1173642,
  })
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
            addAction?.({
              type: "Staking",
              action: "Stake",
              token: TOKENS[curToken],
              amount: state.inputValue,
              template: "Athena Finance",
              add: false,
              status,
              transactionHash,
            });
          } else {
            toast.fail?.({
              title: "Transaction Failed!",
              text: `transactionHash ${transactionHash}`,
            });
          }
        })
        .catch((error) => {
          console.info("tx_error: ", error);
          toast.fail?.({
            title: "Transaction Failed!",
            text: `${error.message}`,
          });
        })
        .finally(() => {
          State.update({
            isStaking: false,
          });
        });
    })
    .catch((err) => {
      console.info("LockingContract_error:", err);
      State.update({
        isStaking: false,
      });
    });
}

function updateAllowance(allowanceRaw) {
  const allowAmount = ethers.utils.formatUnits(
    allowanceRaw,
    TOKENS[curToken].decimals
  );

  State.update({
    allowance: allowAmount,
  });
}
function updateTokenBalance(bal) {
  State.update({
    curTokenBal: bal,
  });
}

function fillBalance() {
  State.update({
    inputValue: state.curTokenBal,
  });
}

return (
  <StakePanel>
    <Widget
      src="dapdapbos.near/widget/Utils.Allowance"
      props={{
        tokenAddress: curToken,
        owner: account,
        spender: StakingAddress,
        updateAllowance,
      }}
    />
    <Widget
      src="dapdapbos.near/widget/Utils.GetTokenBalance"
      props={{
        tokenAddress: curToken,
        owner: account,
        updateTokenBalance,
      }}
    />
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
        {/* {TOKENS[curToken].symbol} */}
      </div>
    </div>

    <AmountList>
      <span></span>
      <span onClick={fillBalance}>
        Balance:{" "}
        <span className="amount-white">
          {Number(state.curTokenBal).toFixed(2)}
        </span>
        {/* {TOKENS[curToken].symbol} */}
      </span>
    </AmountList>
    <StakeBtnWrap>
      <Widget
        src="dapdapbos.near/widget/UI.Button"
        props={{
          text: "Approve",
          type: "green",
          style: { flex: 1 },
          disabled: !state.needApprove || state.isApproved,
          loading: state.isApproving,
          onClick: () => {
            handleApprove(curToken, StakingAddress);
          },
        }}
      />
      <Widget
        src="dapdapbos.near/widget/UI.Button"
        props={{
          text: "Stake",
          type: "green",
          style: { flex: 1 },
          disabled: !state.canStake,
          loading: state.isStaking,
          onClick: handleStake,
        }}
      />
    </StakeBtnWrap>
  </StakePanel>
);
