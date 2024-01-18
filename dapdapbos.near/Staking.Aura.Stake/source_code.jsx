const StakePanel = styled.div`
  width: 510px;
  margin: 0 auto;
  /* reset input */
  .form-control::placeholder {
    color: rgba(255, 255, 255, 0.2);
  }
  .bos-input-number {
    background-color: var(--dark);
    color: var(--white);
    border: none;
    border-radius: 10px !important;
  }
  .input-group {
    column-gap: 5px;
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
const BPT_TOKEN_ADDRESS = "0x7644fa5d0ea14fcf3e813fdf93ca9544f8567655";
const BoosterLiteWrapper = "0x98Ef32edd24e2c92525E59afc4475C1242a30184";
const BoosterLiteABI = [
  {
    inputs: [
      { internalType: "uint256", name: "_pid", type: "uint256" },
      { internalType: "uint256", name: "_amount", type: "uint256" },
      { internalType: "bool", name: "_stake", type: "bool" },
    ],
    name: "deposit",
    outputs: [{ internalType: "bool", name: "", type: "bool" }],
    stateMutability: "nonpayable",
    type: "function",
  },
];
const {
  data,
  chainId,
  account,
  TOKENS,
  CHAIN_ID,
  RewardPoolDepositWrapper,
  RewardPoolDepositABI,
  toast,
  switchChain,
  tokenIcons,
} = props;
State.init({
  allowance: 0,
  curToken: "", // token address
  curTokenBal: 0,
  curSymbol: "",
  needApprove: false,
  isApproving: false,
  isApproved: false,
  canStake: false,
  isStaking: false,
  inputValue: "",
  selectData: [],
});

useEffect(() => {
  const { tokenAssets } = data;

  if (tokenAssets) {
    const selectData = tokenAssets.map((item) =>
      TOKENS[item]
        ? {
            value: item,
            text: TOKENS[item].symbol,
            icons: [TOKENS[item].icon],
          }
        : null
    );
    const usefulSelect = selectData.filter((n) => n);

    usefulSelect.unshift({
      value: BPT_TOKEN_ADDRESS,
      text: "BPT",
      icons: tokenIcons,
    });

    State.update({
      selectData: usefulSelect,
    });
  }
}, [data]);
const getAllowance = (tokenAddress) => {
  const abi = [
    "function allowance(address owner, address spender) external view returns (uint256)",
  ];
  const TokenContract = new ethers.Contract(
    tokenAddress,
    abi,
    Ethers.provider()
  );
  TokenContract.allowance(account, RewardPoolDepositWrapper)
    .then((allowanceRaw) => {
      const allowAmount = ethers.utils.formatUnits(
        allowanceRaw._hex,
        TOKENS[state.curToken].decimals
      );
      console.info("get allow amount: ", allowAmount);
      State.update({
        allowance: allowAmount,
      });
    })
    .catch((e) => {
      console.log("TokenContracterr", e);
    });
};

const handleApprove = (tokenAddress) => {
  State.update({
    isApproving: true,
  });

  const TokenContract = new ethers.Contract(
    tokenAddress,
    [
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
    ],
    Ethers.provider().getSigner()
  );
  console.info("to approve: ", tokenAddress, TOKENS[tokenAddress].decimals);
  TokenContract.approve(
    RewardPoolDepositWrapper,
    ethers.utils.parseUnits(
      state.inputValue,
      TOKENS[state.curToken].decimals || 18
    )
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
      State.update({
        isApproving: false,
      });
    });
};

function getTokenBal() {
  const erc20Abi = ["function balanceOf(address) view returns (uint256)"];
  const { decimals } = TOKENS[state.curToken];
  const tokenContract = new ethers.Contract(
    state.curToken,
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
  // get token allowance when current token change
  if (!state.curToken) {
    // const defaultToken = data?.tokenAssets[0];
    const defaultToken = state.selectData[0].value;
    State.update({
      curToken: defaultToken,
      curSymbol: TOKENS[state.curToken].symbol,
    });
  } else {
    if (state.curToken === BPT_TOKEN_ADDRESS) {
      State.update({
        curTokenBal: data.bptAmount,
        curSymbol: "BPT",
      });
    } else {
      State.update({
        curSymbol: TOKENS[state.curToken].symbol,
      });
      getAllowance(state.curToken);
      getTokenBal();
    }
  }
}, [state.curToken]);

useEffect(() => {
  // console.info(
  //   "inputValue|allowance change:",
  //   state.inputValue,
  //   state.allowance,
  //   Big(state.allowance).lt(Big(state.inputValue || 0))
  // );

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
}, [state.inputValue, state.allowance, state.curToken]);

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
// amount: number | string | BN
// decimals: number | BN
const simpleToExactAmount = (amount, decimals) => {
  // Code is largely lifted from the guts of web3 toWei here:
  // https://github.com/ethjs/ethjs-unit/blob/master/src/index.js
  console.log("simpleToExactAmount: ", amount, decimals);
  let amountString = amount.toString();
  const decimalsBN = new BN(decimals);

  // if (decimalsBN.gt(100)) {
  //   console.info(`Invalid decimals amount`);
  // }

  const scale = new BN(10).pow(decimalsBN);
  const scaleString = scale.toString();

  // Is it negative?
  const negative = amountString.substring(0, 1) === "-";
  if (negative) {
    amountString = amountString.substring(1);
  }

  if (amountString === ".") {
    console.info(
      `Error converting number ${amountString} to precise unit, invalid value`
    );
  }

  // Split it into a whole and fractional part
  // eslint-disable-next-line prefer-const
  let [whole, fraction, ...rest] = amountString.split(".");
  if (rest.length > 0) {
    console.info(
      `Error converting number ${amountString} to precise unit, too many decimal points`
    );
  }

  if (!whole) {
    whole = "0";
  }
  if (!fraction) {
    fraction = "0";
  }

  if (fraction.length > scaleString.length - 1) {
    console.info(
      `Error converting number ${amountString} to precise unit, too many decimal places`
    );
  }

  while (fraction.length < scaleString.length - 1) {
    fraction += "0";
  }

  const wholeBN = new BN(whole);
  const fractionBN = new BN(fraction);
  let result = wholeBN.mul(scale).add(fractionBN);

  if (negative) {
    result = result.mul("-1");
  }

  return result;
};

function handleStakeBPT() {
  const { Aura_Pool_ID } = data;
  const BPTContract = new ethers.Contract(
    BoosterLiteWrapper,
    BoosterLiteABI,
    Ethers.provider().getSigner()
  );
  console.log(ethers.utils.parseUnits(state.inputValue), data, props);
  BPTContract.deposit(
    Aura_Pool_ID,
    ethers.utils.parseUnits(state.inputValue),
    true,
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
    .catch((error) => {
      State.update({
        isStaking: false,
      });
      console.log("Aura_Pool_ID_error:", error);
    });
}

function handleStake() {
  if (state.curToken === BPT_TOKEN_ADDRESS) {
    handleStakeBPT();
  } else {
    handleStakeToken();
  }
}
function handleStakeToken() {
  State.update({
    isStaking: true,
  });
  const RewardsContract = new ethers.Contract(
    RewardPoolDepositWrapper,
    RewardPoolDepositABI,
    Ethers.provider().getSigner()
  );

  const { Rewards_contract_address, Balancer_Pool_ID, tokenAssets } = data;

  const amountsIn = tokenAssets.map((token) =>
    state.curToken === token
      ? ethers.BigNumber.from(
          simpleToExactAmount(
            state.inputValue,
            TOKENS[state.curToken].decimals
          ).toString()
        )
      : 0
  );

  const userData = ethers.utils.defaultAbiCoder.encode(
    ["uint256", "uint256[]", "uint256"],
    [1, amountsIn, 0]
  );

  const params = {
    _rewardPoolAddress: Rewards_contract_address,
    _inputToken: state.curToken,
    _inputAmount: ethers.BigNumber.from(
      ethers.utils.parseUnits(state.inputValue, TOKENS[state.curToken].decimals)
    ),
    _balancerPoolId: Balancer_Pool_ID,
    _request: {
      assets: data.tokenAssets,
      maxAmountsIn: amountsIn,
      userData,
      fromInternalBalance: false,
    },
  };

  const {
    _rewardPoolAddress,
    _inputToken,
    _inputAmount,
    _balancerPoolId,
    _request,
  } = params;
  RewardsContract.depositSingle(
    _rewardPoolAddress,
    _inputToken,
    _inputAmount,
    _balancerPoolId,
    _request,
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
      console.info("RewardsContract_error:", err);
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
            text: "Switch to Gnosis",
            type: "primary",
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
          {state.curSymbol}
        </span>
      </AmountList>
      <StakeBtnWrap>
        <Widget
          src="dapdapbos.near/widget/UI.Button"
          props={{
            text: "Approve",
            type: "primary",
            style: { flex: 1 },
            disabled: !state.needApprove || state.isApproved,
            loading: state.isApproving,
            onClick: () => {
              handleApprove(state.curToken);
            },
          }}
        />
        <Widget
          src="dapdapbos.near/widget/UI.Button"
          props={{
            text: "Stake",
            type: "primary",
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
console.log("STAKE_STATE", state);
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
      <div className="input-group-append">
        <Widget
          src="dapdapbos.near/widget/UI.Select"
          props={{
            options: state.selectData,
            noLabel: true,
            value: state.selectData.find((obj) => obj.value === state.curToken),
            onChange: (option) => {
              State.update({
                curToken: option.value,
              });
            },
          }}
        />
      </div>
    </div>
    {renderExtra()}
  </StakePanel>
);
