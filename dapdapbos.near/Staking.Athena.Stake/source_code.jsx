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

const AllowanceABI = [
  "function allowance(address owner, address spender) external view returns (uint256)",
];
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

const { data, chainId, account, TOKENS, CHAIN_ID, toast, switchChain } = props;

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

function getAllowance(tokenAddress, spender) {
  const TokenContract = new ethers.Contract(
    tokenAddress,
    AllowanceABI,
    Ethers.provider()
  );
  TokenContract.allowance(account, spender)
    .then((allowanceRaw) => {
      const allowAmount = ethers.utils.formatUnits(
        allowanceRaw._hex,
        TOKENS[curToken].decimals
      );
      console.info(`get ${tokenAddress} allowance:`, allowAmount);
      State.update({
        allowance: allowAmount,
      });
    })
    .catch((e) => {
      console.log("getAllowance_error", e);
    });
}

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
      console.info("approve_error: ", err);
    });
}

function getTokenBal(tokenAddress) {
  const erc20Abi = ["function balanceOf(address) view returns (uint256)"];
  const { decimals } = TOKENS[tokenAddress];
  const tokenContract = new ethers.Contract(
    tokenAddress,
    erc20Abi,
    Ethers.provider()
  );
  tokenContract
    .balanceOf(account)
    .then((balanceBig) => {
      // console.log(
      //   balanceBig,
      //   balanceBig.toString(),
      //   ethers.utils.formatUnits(balanceBig, decimals),
      //   Big(ethers.utils.formatUnits(balanceBig, decimals)).toFixed(2)
      // );
      const bal = Big(
        ethers.utils.formatUnits(balanceBig, decimals) || 0
      ).toFixed(2);
      State.update({
        curTokenBal: bal,
      });
    })
    .catch((err) => {
      console.info("getTokenBal_error:", err);
    });
}

useEffect(() => {
  getAllowance(curToken, StakingAddress);
  getTokenBal(curToken);
}, []);

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
      needApprove: true,
    });
  } else {
    State.update({
      canStake: true,
      needApprove: false,
    });
  }
}, [state.inputValue, state.allowance, curToken]);

useEffect(() => {
  if (state.isApproved) {
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

const renderExtra = () => {
  if (chainId !== CHAIN_ID) {
    return (
      <ChainBtnWrap>
        <Widget
          src="dapdapbos.near/widget/UI.Button"
          props={{
            text: "Switch to Metis",
            type: "green",
            style: { flex: 1 },
            onClick: switchChain,
          }}
        />
      </ChainBtnWrap>
    );
  }

  return (
    <>
      <AmountList>
        <span></span>
        <span>
          Balance: <span className="amount-white">{state.curTokenBal}</span>
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
    </>
  );
};

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
        {/* {TOKENS[curToken].symbol} */}
      </div>
    </div>
    {renderExtra()}
  </StakePanel>
);
