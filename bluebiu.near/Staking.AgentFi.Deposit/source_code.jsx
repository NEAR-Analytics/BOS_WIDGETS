const StyledContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: stretch;
  height: 100%;
`;
const StyledFormItem = styled.div`
  border-bottom: 1px solid #373A53;
  padding-bottom: 18px;
  padding-top: 18px;

  &.inline {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }

  &:first-child {
    padding-top: 0;
  }
`;
const StyledFormItemTitle = styled.div`
  font-size: 14px;
  font-weight: 400;
  line-height: 17px;
  color: #979ABE;
`;
const StyledFormItemBody = styled.div`
  margin-top: 8px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 20px;
`;
const StyledFormItemFoot = styled.div`
  margin-top: 8px;
  display: flex;
  justify-content: space-between;
  font-size: 12px;
  font-weight: 400;
  line-height: 14.4px;
  color: rgba(151, 154, 190, 1);
`;
const StyledInput = styled.input`
  flex: 1;
  width: 0;
  color: #fff;
  font-size: 20px;
  font-weight: 500;
  border: none;
  height: 24px;
  outline: none;
  background-color: transparent;
  padding: 0;

  &:focus {
    color: #fff;
    background-color: transparent;
    border-color: transparent;
    outline: none;
    box-shadow: none;
  }
`;
const StyledList = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: stretch;
  gap: 8px;
  margin-top: 8px;
`;
const StyledListItem = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  font-size: 14px;

  .label {
    color: #979ABE;
  }

  .value {
    color: #fff;
  }
`;
const StyledContent = styled.div`
  flex: 1;
`;
const StyledButton = styled.button`
  background: var(--switch-color);
  color: var(--button-text-color);

  display: block;
  width: 100%;
  font-size: 16px;
  font-weight: 600;
  height: 56px;
  line-height: 56px;
  border-radius: 6px;
  cursor: pointer;
  transition: 0.5s;
  margin-top: auto;
  text-align: center;

  &:hover {
    opacity: 0.8;
  }

  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }
`;
const StyledFullSelect = styled.div`
  width: 100%;

  > div {
    width: 100%;

    > div[type="button"] {
      width: 100%;
    }
  }
`;
const StyledTips = styled.div`
  color: rgb(151, 154, 190);
  font-size: 14px;
  font-style: normal;
  font-weight: 400;
  line-height: normal;
  margin-bottom: 16px;

  &.full {
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
  }
`;
const StyledWithdrawTips = styled.div`
  width: 240px;
  text-align: center;
  margin: 0 auto;

  .value {
    color: var(--switch-color);
    font-size: 18px;
  }

  .title {
    border-bottom: 1px solid #373A53;
    font-size: 18px;
    color: rgb(151, 154, 190);
    padding: 8px 0;
  }

  .assets {
    margin-top: 8px;
  }

  .head-wd {
    border-bottom: 1px solid #373A53;

    .col-wd {
      color: rgb(151, 154, 190);
    }
  }

  .row-wd {
    display: flex;
    justify-content: space-between;
    align-items: center;
    gap: 8px;
    flex-wrap: nowrap;
  }

  .col-wd {
    flex-shrink: 0;
    flex-basis: 33.33%;
    color: #fff;
    font-size: 14px;
    text-align: left;
    padding: 8px 0;
  }

  .body-wd {
  }
`;

const DEPOSIT_POOL_ABI_MULTI = [
  {
    inputs: [
      {
        "components": [
          {
            "internalType": "address",
            "name": "to",
            "type": "address",
          },
          {
            "internalType": "uint256",
            "name": "value",
            "type": "uint256",
          },
          {
            "internalType": "bytes",
            "name": "data",
            "type": "bytes",
          },
          {
            "internalType": "uint8",
            "name": "operation",
            "type": "uint8",
          },
        ],
        "internalType": "struct BatchExecutor.Operation[]",
        "name": "operations",
        "type": "tuple[]",
      },
    ],
    name: "executeBatch",
    outputs: [
      {
        "internalType": "bytes[]",
        "name": "",
        "type": "bytes[]",
      },
    ],
    stateMutability: "payable",
    type: "function",
  },
  {
    inputs: [
      {
        name: "receiver",
        type: "address",
        internalType: "address",
      },
      {
        name: "sqrtPriceX96",
        type: "uint160",
        internalType: "uint160",
      },
      {
        name: "slippageLiquidity",
        type: "uint24",
        internalType: "uint24",
      },
    ],
    name: "moduleC_increaseLiquidityWithBalanceAndRefundTo",
    outputs: [
      {
        name: "liquidity",
        type: "uint128",
        internalType: "uint128",
      },
      {
        name: "amount0",
        type: "uint256",
        internalType: "uint256",
      },
      {
        name: "amount1",
        type: "uint256",
        internalType: "uint256",
      },
    ],
    stateMutability: "payable",
    type: "function",
  },
  {
    inputs: [
      { internalType: "bytes[]", name: "data", type: "bytes[]" }
    ],
    name: "multicall",
    outputs: [
      { internalType: "bytes[]", name: "results", type: "bytes[]" }
    ],
    stateMutability: "payable",
    type: "function",
  },
];
const TRANSFORM_TOKEN_ABI = [
  {
    inputs: [
      {
        name: "from",
        type: "address",
        internalType: "address",
      },
      {
        name: "to",
        type: "address",
        internalType: "address",
      },
      {
        name: "amount",
        type: "uint256",
        internalType: "uint256",
      },
    ],
    name: "transferFrom",
    outputs: [
      { internalType: "bytes", name: "returnData", type: "bytes" },
    ],
    stateMutability: "view",
    type: "function",
  },
];

const { parseUnits, formatUnits } = ethers.utils;

const {
  record,
  prices,
  dexConfig,
  getTokenBalance,
  currentStrategy,
  account,
  rootAgent,
  onSuccess,
  addAction,
  toast,
  chainId,
  handleApprove,
  balanceList,
  queryPoolInfo,
  tickToPrice,
} = props;

const { StakeTokens } = dexConfig;

const actionText = "Stake";

State.init({
  pending: false,

  //#region dex/clm
  currentEthToken: {},
  ethAmount: "",
  ethTokens: [],
  currentEthTokenBalance: 0,
  usdAmount: "",
  usdTokens: [],
  currentUsdToken: {},
  currentUsdTokenBalance: 0,
  //#endregion

  //#region Multipliooor
  stakeAmount: "",
  stakeTokens: [],
  stakeToken: {},
  stakeTokenBalance: 0,
  //#endregion

  //#region clm
  currentEth2UsdPrice: "",
  currentUsd2EthPrice: "",
  currentEthPer: 50,
  currentUsdPer: 50,
  //#endregion
});

const formatAddAction = (actionText, _amount, status, transactionHash, tokenSymbol) => {
  addAction?.({
    type: "Staking",
    action: actionText,
    token: {
      symbol: tokenSymbol,
    },
    amount: _amount,
    template: props.name,
    add: false,
    status,
    transactionHash,
  });
};

const queryUSDBTransform = () => {
  // query usdb fransform
  const iface = new ethers.utils.Interface(TRANSFORM_TOKEN_ABI);
  return iface.encodeFunctionData("transferFrom", [
    // from
    account,
    // to
    record.agentAddress,
    // amount
    ethers.BigNumber.from(Big(state.usdAmount).times(Big(10).pow(state.currentUsdToken.decimals)).toString()),
  ]);
};

const handleSubmit = () => {
  if (record.name === "Dex Balancer") {
    if (!state.ethAmount || !state.usdAmount) return;
    State.update({
      pending: true,
    });

    const data = queryUSDBTransform();

    // const params = [
    //   {
    //     to: record.agentAddress,
    //     value: parseUnits(state.ethAmount, state.currentEthToken.decimals),
    //     data: '0x',
    //     operation: 0,
    //   },
    //   {
    //     to: state.currentUsdToken.address,
    //     value: 0,
    //     data: data,
    //     operation: 0,
    //   },
    //   {
    //     to: record.agentAddress,
    //     value: 0,
    //     data: '0x7bb485dc',
    //     operation: 0,
    //   },
    // ];
    const params = [
      [
        record.agentAddress,
        // Big(state.ethAmount).times(Big(10).pow(state.currentEthToken.decimals)).toNumber(),
        parseUnits(state.ethAmount, state.currentEthToken.decimals),
        "0x",
        0,
      ],
      [
        state.currentUsdToken.address,
        0,
        data,
        0,
      ],
      [
        record.agentAddress,
        0,
        "0x7bb485dc",
        0,
      ],
    ];

    const approveList = [
      handleApprove(rootAgent.agentAddress, state.currentEthToken.address, state.ethAmount, state.currentEthToken.decimals),
      handleApprove(rootAgent.agentAddress, state.currentUsdToken.address, state.usdAmount, state.currentUsdToken.decimals),
    ];
    Promise.all(approveList).then((approveRes) => {
      if (approveRes.some((approved) => !approved)) {
        State.update({
          pending: false,
        });
        return;
      }

      const contract = new ethers.Contract(
        rootAgent.agentAddress,
        DEPOSIT_POOL_ABI_MULTI,
        Ethers.provider().getSigner(),
      );

      const getTx = (gas) => {
        const contractOption = {
          gasLimit: gas || 4000000,
          value: parseUnits(state.ethAmount, state.currentEthToken.decimals || 18),
        };
        contract.executeBatch(params, contractOption)
          .then((tx) => {
            tx.wait()
              .then((res) => {
                const { status, transactionHash } = res;
                State.update({
                  pending: false,
                });
                if (status !== 1) throw new Error("");
                onSuccess();
                formatAddAction(actionText, state.ethAmount, status, transactionHash, state.currentEthToken.value);
                toast?.success({
                  title: `${actionText} Successfully!`,
                  text: `${actionText} ${state.ethAmount} ${state.currentEthToken.value}`,
                  tx: transactionHash,
                  chainId,
                });
              })
              .catch((err) => {
                console.log("tx error: ", err);
                State.update({
                  pending: false,
                });
                toast?.fail({
                  title: `${actionText} Failed!`,
                  text: err?.message?.includes("user rejected transaction")
                    ? "User rejected transaction"
                    : ``,
                });
              });
          })
          .catch((err) => {
            console.log("contract fn error: ", err);
            State.update({
              pending: false,
            });
            toast?.fail({
              title: `${actionText} Failed!`,
              text: err?.message?.includes("user rejected transaction")
                ? "User rejected transaction"
                : ``,
            });
          });
      };

      const estimateGas = () => {
        contract.estimateGas.executeBatch(
          params,
          { value: parseUnits(state.ethAmount, state.currentEthToken.decimals || 18) },
        ).then((gas) => {
          getTx(gas);
        }).catch((err) => {
          console.log("get gas failed: ", err);
          getTx();
        });
      };

      estimateGas();
    });
    return;
  }
  if (record.name === "Multipliooor") {
    if (!state.stakeAmount || !rootAgent.agentAddress) return;
    State.update({
      pending: true,
    });

    // const params = [
    //   {
    //     to: rootAgent.agentAddress,
    //     value: parseUnits(state.stakeAmount, state.stakeToken.decimals),
    //     data: '0x',
    //     operation: 0,
    //   },
    //   {
    //     to: rootAgent.agentAddress,
    //     value: 0,
    //     data: '0x7bb485dc',
    //     operation: 0,
    //   },
    // ];
    const params = [
      [
        rootAgent.agentAddress,
        parseUnits(state.stakeAmount, state.stakeToken.decimals),
        "0x",
        0,
      ],
      [
        rootAgent.agentAddress,
        0,
        "0x7bb485dc",
        0,
      ],
    ];

    const contract = new ethers.Contract(
      rootAgent.agentAddress,
      DEPOSIT_POOL_ABI_MULTI,
      Ethers.provider().getSigner(),
    );

    const getTx = (gas) => {
      const contractOption = {
        gasLimit: gas || 4000000,
        value: parseUnits(state.stakeAmount, state.stakeToken.decimals || 18),
      };
      contract.executeBatch(params, contractOption)
        .then((tx) => {
          tx.wait()
            .then((res) => {
              const { status, transactionHash } = res;
              State.update({
                pending: false,
              });
              if (status !== 1) throw new Error("");
              onSuccess();
              formatAddAction(actionText, state.stakeAmount, status, transactionHash, state.stakeToken.value);
              toast?.success({
                title: `${actionText} Successfully!`,
                text: `${actionText} ${state.stakeAmount} ${state.stakeToken.value}`,
                tx: transactionHash,
                chainId,
              });
            })
            .catch((err) => {
              console.log("tx error: ", err);
              State.update({
                pending: false,
              });
              toast?.fail({
                title: `${actionText} Failed!`,
                text: err?.message?.includes("user rejected transaction")
                  ? "User rejected transaction"
                  : ``,
              });
            });
        })
        .catch((err) => {
          console.log("contract fn error: ", err);
          State.update({
            pending: false,
          });
          toast?.fail({
            title: `${actionText} Failed!`,
            text: err?.message?.includes("user rejected transaction")
              ? "User rejected transaction"
              : ``,
          });
        });
    };

    const estimateGas = () => {
      contract.estimateGas.executeBatch(
        params,
        { value: parseUnits(state.stakeAmount, state.stakeToken.decimals || 18) },
      ).then((gas) => {
        getTx(gas);
      }).catch((err) => {
        console.log("get gas failed: ", err);
        getTx();
      });
    };

    estimateGas();
    return;
  }
  if (record.name === "Concentrated Liquidity Manager") {
    if (!state.ethAmount || !state.usdAmount) return;
    State.update({
      pending: true,
    });

    const data = queryUSDBTransform();
    queryPoolInfo().then((poolRes) => {
      if (!poolRes) {
        State.update({
          pending: false,
        });
        toast?.fail({
          title: `${actionText} Failed!`,
          text: 'Query pool information failed!',
        });
        return;
      }
      const { sqrtPriceX96 } = poolRes;

      const approveList = [
        handleApprove(rootAgent.agentAddress, state.currentEthToken.address, state.ethAmount, state.currentEthToken.decimals),
        handleApprove(rootAgent.agentAddress, state.currentUsdToken.address, state.usdAmount, state.currentUsdToken.decimals),
      ];
      Promise.all(approveList).then((approveRes) => {
        if (approveRes.some((approved) => !approved)) {
          State.update({
            pending: false,
          });
          return;
        }

        const iface = new ethers.utils.Interface(DEPOSIT_POOL_ABI_MULTI);
        const multicallParams = [
          iface.encodeFunctionData(
            "executeBatch",
            [
              [
                {
                  to: state.currentUsdToken.address,
                  value: parseUnits('0', state.currentUsdToken.decimals),
                  data,
                  operation: 0
                }
              ]
            ]
          ),
          iface.encodeFunctionData(
            "moduleC_increaseLiquidityWithBalanceAndRefundTo",
            [
              account,
              sqrtPriceX96,
              1000000,
            ]
          )
        ];

        const multicallContract = new ethers.Contract(
          record.agentAddress,
          DEPOSIT_POOL_ABI_MULTI,
          Ethers.provider().getSigner()
        );

        const multicallOptions = {
          gasLimit: 5000000,
          value: parseUnits(state.ethAmount, state.currentEthToken.decimals || 18),
        };

        multicallContract
          .multicall(multicallParams, multicallOptions)
          .then((res) => {
            const { transactionHash } = res || {};
            State.update({
              pending: false,
            });
            onSuccess();
            formatAddAction(actionText, state.ethAmount, 1, transactionHash, state.currentEthToken.value);
            toast?.success({
              title: `${actionText} Successfully!`,
              text: `${actionText} ${state.ethAmount} ${state.currentEthToken.value}`,
              tx: transactionHash,
              chainId,
            });
          })
          .catch((err) => {
            console.log('Concentrated Liquidity Manager deposit faild, ', err);
            State.update({
              pending: false,
            });
            toast?.fail({
              title: `${actionText} Failed!`,
              text: err?.message?.includes("user rejected transaction")
                ? "User rejected transaction"
                : ``,
            });
          });
      });
    });
  }
};

//#region dex/clm
const handleUsdAmount = (ev) => {
  if (isNaN(Number(ev.target.value))) return;
  let amount = ev.target.value.replace(/\s+/g, "");

  if (!amount) {
    State.update({
      ethAmount: "",
      usdAmount: "",
    });
    return;
  }

  if (Big(amount || 0).gt(Big(state.currentUsdTokenBalance || 0))) {
    amount = Big(state.currentUsdTokenBalance || 0).toFixed(4, 0);
  }
  let calcEthAmount = Big(amount).times(prices[state.currentUsdToken.value]).div(prices[state.currentEthToken.value]).toFixed(state.currentEthToken.decimals, 0);
  if (record.name === "Concentrated Liquidity Manager") {
    if (Big(state.currentUsdPer).lte(0)) {
      calcEthAmount = Big(amount).times(prices[state.currentUsdToken.value]).times(Big(state.currentEthPer).div(100)).div(prices[state.currentEthToken.value]).toFixed(state.currentEthToken.decimals);
    } else {
      calcEthAmount = Big(amount).times(prices[state.currentUsdToken.value]).div(Big(state.currentUsdPer).div(100)).times(Big(state.currentEthPer).div(100)).div(prices[state.currentEthToken.value]).toFixed(state.currentEthToken.decimals);
    }
  }
  State.update({
    usdAmount: amount,
    ethAmount: calcEthAmount,
  });
};

const handleUsdToken = (option) => {
  if (option.value === state.currentUsdToken.value) return;
  State.update({
    currentUsdToken: option,
    usdAmount: "",
    ethAmount: "",
  });
  getTokenBalance(option).then((value) => {
    State.update({
      currentUsdTokenBalance: value,
    });
  });
  if (record.name === "Concentrated Liquidity Manager") {
    // query pool info
    queryPoolInfo().then((poolRes) => {
      if (!poolRes) {
        return;
      }
      const { tick } = poolRes;
      State.update({
        currentEth2UsdPrice: tickToPrice({ tick, token0: state.currentEthToken, token1: option }),
        currentUsd2EthPrice: tickToPrice({ tick, token0: option, token1: state.currentEthToken }),
      });
    });
  }
};

const handleUsdBalance = (value) => {
  // auto enter eth amount
  const updates = {
    usdAmount: Big(value).toFixed(4, 0),
  };
  updates.ethAmount = Big(updates.usdAmount).times(prices[state.currentUsdToken.value]).div(prices[state.currentEthToken.value]).toFixed(state.currentEthToken.decimals, 0);
  if (record.name === "Concentrated Liquidity Manager") {
    updates.ethAmount = Big(updates.usdAmount).times(prices[state.currentUsdToken.value]).div(Big(state.currentUsdPer).div(100)).times(Big(state.currentEthPer).div(100)).div(prices[state.currentEthToken.value]).toFixed(state.currentEthToken.decimals);
  }
  State.update(updates);
};

const handleEthAmount = (ev) => {
  if (isNaN(Number(ev.target.value))) return;
  let amount = ev.target.value.replace(/\s+/g, "");

  if (!amount) {
    State.update({
      ethAmount: "",
      usdAmount: "",
    });
    return;
  }

  if (Big(amount || 0).gt(Big(state.currentEthTokenBalance || 0))) {
    amount = Big(state.currentEthTokenBalance || 0).toFixed(4, 0);
  }
  let calcUsdAmount = Big(amount).times(prices[state.currentEthToken.value]).div(prices[state.currentUsdToken.value]).toFixed(state.currentUsdToken.decimals, 0);
  if (record.name === "Concentrated Liquidity Manager") {
    if (Big(state.currentEthPer).lte(0)) {
      calcUsdAmount = Big(amount).times(prices[state.currentEthToken.value]).times(Big(state.currentUsdPer).div(100)).div(prices[state.currentUsdToken.value]).toFixed(state.currentUsdToken.decimals);
    } else {
      calcUsdAmount = Big(amount).times(prices[state.currentEthToken.value]).div(Big(state.currentEthPer).div(100)).times(Big(state.currentUsdPer).div(100)).div(prices[state.currentUsdToken.value]).toFixed(state.currentUsdToken.decimals);
    }
  }
  State.update({
    ethAmount: amount,
    usdAmount: calcUsdAmount,
  });
};

const handleEthToken = (option) => {
  if (option.value === state.currentEthToken.value) return;
  State.update({
    currentEthToken: option,
    ethAmount: "",
  });
  getTokenBalance(option).then((value) => {
    State.update({
      currentEthTokenBalance: value,
    });
  });
  if (record.name === "Concentrated Liquidity Manager") {
    // query pool info
    queryPoolInfo().then((poolRes) => {
      if (!poolRes) {
        return;
      }
      const { tick } = poolRes;
      State.update({
        currentEth2UsdPrice: tickToPrice({ tick, token0: option, token1: state.currentUsdToken }),
        currentUsd2EthPrice: tickToPrice({ tick, token0: state.currentUsdToken, token1: option }),
      });
    });
  }
};

const handleEthBalance = (value) => {
  // auto enter usd amount
  const updates = {
    ethAmount: Big(value).toFixed(4, 0),
  };
  updates.usdAmount = Big(updates.ethAmount).times(prices[state.currentEthToken.value]).div(prices[state.currentUsdToken.value]).toFixed(state.currentUsdToken.decimals, 0);
  if (record.name === "Concentrated Liquidity Manager") {
    updates.usdAmount = Big(updates.ethAmount).times(prices[state.currentEthToken.value]).div(Big(state.currentEthPer).div(100)).times(Big(state.currentUsdPer).div(100)).div(prices[state.currentUsdToken.value]).toFixed(state.currentUsdToken.decimals);
  }
  State.update(updates);
};
//#endregion

//#region Multipliooor
const handleAmount = (ev) => {
  if (isNaN(Number(ev.target.value))) return;
  let amount = ev.target.value.replace(/\s+/g, "");

  if (Big(amount || 0).gt(Big(state.stakeTokenBalance || 0))) {
    amount = Big(state.stakeTokenBalance || 0).toFixed(4, 0);
  }
  State.update({
    stakeAmount: amount,
  });
};

const handleToken = (option) => {
  if (option.value === state.stakeToken.value) return;
  State.update({
    stakeToken: option,
    stakeAmount: "",
  });
  const currToken = StakeTokens.find((it) => it.symbol === option.value);
  currToken && getTokenBalance(currToken).then((value) => {
    State.update({
      stakeTokenBalance: value,
    });
  });
};

const handleBalance = (value) => {
  State.update({
    stakeAmount: Big(value).toFixed(4, 0),
  });
};
//#endregion

useEffect(() => {
  //#region dex/clm
  if (["Dex Balancer", "Concentrated Liquidity Manager"].includes(record.name)) {
    const _ethTokens = [];
    const _usdTokens = [];
    const EthStakeTokens = StakeTokens.filter((it) => ["ETH", "WETH"].includes(it.symbol));
    const UsdStakeTokens = StakeTokens.filter((it) => ["USDB"].includes(it.symbol));
    EthStakeTokens.forEach((it) => {
      _ethTokens.push({
        ...it,
        text: it.symbol,
        value: it.symbol,
        icons: [it.icon],
        address: it.address === "native" ? "0x0000000000000000000000000000000000000000" : it.address,
      });
    });
    UsdStakeTokens.forEach((it) => {
      _usdTokens.push({
        ...it,
        text: it.symbol,
        value: it.symbol,
        icons: [it.icon],
      });
    });
    State.update({
      ethTokens: _ethTokens,
      currentEthToken: _ethTokens[0],
      usdTokens: _usdTokens,
      currentUsdToken: _usdTokens[0],
    });
    getTokenBalance(EthStakeTokens[0]).then((value) => {
      State.update({
        currentEthTokenBalance: value,
      });
    });
    getTokenBalance(UsdStakeTokens[0]).then((value) => {
      State.update({
        currentUsdTokenBalance: value,
      });
    });
    // query pool info
    queryPoolInfo().then((poolRes) => {
      if (!poolRes) {
        return;
      }
      const { tick } = poolRes;
      State.update({
        currentEth2UsdPrice: tickToPrice({ tick, token0: _ethTokens[0], token1: _usdTokens[0] }),
        currentUsd2EthPrice: tickToPrice({ tick, token0: _usdTokens[0], token1: _ethTokens[0] }),
      });
    });
  }
  //#endregion

  //#region Multipliooor
  if (record.name === "Multipliooor") {
    const _stakeTokens = [];
    const eth = StakeTokens.find((it) => it.symbol === "ETH");
    eth && _stakeTokens.push({
      ...eth,
      text: eth.symbol,
      value: eth.symbol,
      icons: [eth.icon],
      address: "0x0000000000000000000000000000000000000000",
    });
    State.update({
      stakeMode: currentStrategy.meta.modeList[0],
      stakeTokens: _stakeTokens,
      stakeToken: _stakeTokens[0] || {},
    });
    getTokenBalance(StakeTokens[0]).then((value) => {
      State.update({
        stakeTokenBalance: value,
      });
    });
  }
  //#endregion
}, []);

useEffect(() => {
  //#region 'Concentrated Liquidity Manager'
  if (record.name === "Concentrated Liquidity Manager") {
    try {
      const weth = balanceList.find((it) => ["WETH", "ETH"].includes(it.symbol));
      const usdb = balanceList.find((it) => it.symbol === "USDB");
      const wethVal = Big(weth.balance).times(prices[weth.symbol]);
      const usdbVal = Big(usdb.balance).times(prices[usdb.symbol]);
      const total = wethVal.plus(usdbVal);
      if (total.lte(0)) {
        State.update({
          currentEthPer: 50,
          currentUsdPer: 50,
        });
        return;
      }
      const wethPer = wethVal.div(total).times(100).toString();
      const usdbPer = usdbVal.div(total).times(100).toString();
      State.update({
        currentEthPer: wethPer,
        currentUsdPer: usdbPer,
      });
    } catch (err) {
      console.log(err);
    }
  }
  //#endregion
}, [balanceList, prices]);

const {
  pending,

  //#region dex/clm
  ethAmount,
  currentEthToken,
  ethTokens,
  currentEthTokenBalance,
  usdAmount,
  usdTokens,
  currentUsdToken,
  currentUsdTokenBalance,
  //#endregion

  //#region Multipliooor
  stakeAmount,
  stakeTokens,
  stakeToken,
  stakeTokenBalance,
  //#endregion
} = state;

const renderButton = (disabled) => {
  return (
    <StyledButton
      disabled={pending || disabled}
      onClick={handleSubmit}
    >
      {pending ? (
        <Widget
          src="bluebiu.near/widget/0vix.LendingLoadingIcon"
          props={{
            size: 16,
          }}
        />
      ) : "DEPOSIT MORE ETH"}
    </StyledButton>
  );
};

const renderDeposit = () => {
  if (record.name === "Multipliooor") {
    return (
      <>
        <StyledContent>
          <StyledTips>
            If the remaining funds are low, deposit more funds to ensure the Blast Multiplier tasks are completed.
          </StyledTips>
          <StyledFormItem>
            <StyledFormItemTitle>
              Watch for our Discord announcements!
            </StyledFormItemTitle>
            <StyledFormItemBody>
              <StyledInput
                type="text"
                placeholder="0"
                value={stakeAmount}
                onChange={handleAmount}
              />
              <Widget
                src="bluebiu.near/widget/UI.Select.Index"
                props={{
                  options: stakeTokens,
                  value: stakeToken,
                  onChange: handleToken,
                }}
              />
            </StyledFormItemBody>
            <StyledFormItemFoot>
              <div className="prices">
                ${Big(stakeAmount || 0).times(Big(prices[stakeToken.value] || 1)).toFixed(2, 0)}
              </div>
              <div className="balance">
                Balance:
                <Widget
                  src="bluebiu.near/widget/Staking.Kelp.Balance"
                  props={{
                    value: stakeTokenBalance,
                    digit: 4,
                    onClick: handleBalance,
                    symbol: stakeToken.value,
                  }}
                />
              </div>
            </StyledFormItemFoot>
          </StyledFormItem>
        </StyledContent>
        {renderButton(!stakeAmount)}
      </>
    );
  }
  if (record.name === "Dex Balancer" || record.name === "Concentrated Liquidity Manager") {
    return (
      <>
        <StyledContent>
          {
            record.name === "Concentrated Liquidity Manager" ? (
              <>
                <StyledTips>
                  Due to price movement, your LP position is {Big(state.currentEthPer).toFixed(0)}% : {Big(state.currentUsdPer).toFixed(0)}%, WETH :
                  USDB.
                </StyledTips>
                <StyledTips>
                  Deposit more below at the same ratio.
                </StyledTips>
              </>
            ) : (
              <StyledTips>
                Add to your position
              </StyledTips>
            )
          }
          <StyledFormItem>
            <StyledFormItemBody>
              <StyledInput
                type="text"
                placeholder="0"
                value={ethAmount}
                onChange={handleEthAmount}
              />
              <Widget
                src="bluebiu.near/widget/UI.Select.Index"
                props={{
                  options: ethTokens,
                  value: currentEthToken,
                  onChange: handleEthToken,
                }}
              />
            </StyledFormItemBody>
            <StyledFormItemFoot>
              <div className="prices">
                ${Big(ethAmount || 0).times(Big(prices[currentEthToken.value] || 1)).toFixed(2, 0)}
              </div>
              <div className="balance">
                Balance:
                <Widget
                  src="bluebiu.near/widget/Staking.Kelp.Balance"
                  props={{
                    value: currentEthTokenBalance,
                    digit: 5,
                    onClick: handleEthBalance,
                    symbol: currentEthToken.value,
                  }}
                />
              </div>
            </StyledFormItemFoot>
            <StyledFormItemBody>
              <StyledInput
                type="text"
                placeholder="0"
                value={usdAmount}
                onChange={handleUsdAmount}
              />
              <Widget
                src="bluebiu.near/widget/UI.Select.Index"
                props={{
                  options: usdTokens,
                  value: currentUsdToken,
                  onChange: handleUsdToken,
                }}
              />
            </StyledFormItemBody>
            <StyledFormItemFoot>
              <div className="prices">
                ${Big(usdAmount || 0).times(Big(prices[currentUsdToken.value] || 1)).toFixed(2, 0)}
              </div>
              <div className="balance">
                Balance:
                <Widget
                  src="bluebiu.near/widget/Staking.Kelp.Balance"
                  props={{
                    value: currentUsdTokenBalance,
                    digit: 5,
                    onClick: handleUsdBalance,
                    symbol: currentUsdToken.value,
                  }}
                />
              </div>
            </StyledFormItemFoot>
          </StyledFormItem>
        </StyledContent>
        {renderButton(!ethAmount && !usdAmount)}
      </>
    );
  }
  return null;
};

return (
  <StyledContainer>
    {renderDeposit()}
  </StyledContainer>
);
