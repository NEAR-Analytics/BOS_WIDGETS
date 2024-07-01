
const {
  // defaultPair,
  // pair,
  data,
  toast,
  prices,
  curChain,
  refetch,
  addresses,
  proxyAddress,
  addAction,
  defaultDex,
  userPositions,
  ICON_VAULT_MAP
} = props;
const UnKnownSvgContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  background: #FFF;
  border-radius: 50%;
  width: 26px;
  height: 26px;
  overflow: hidden;
  svg {
    min-width: 24px;
    min-height: 24px;
  }
`
const UnKnownSvg = (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="12" r="10"></circle>
    <path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3"></path>
    <path d="M12 17h.01"></path>
  </svg>
)
const STEER_PERIPHERY_ADDRESS_MAPPING = {
  169: '0xD90c8970708FfdFC403bdb56636621e3E9CCe921',
  1088: '0x806c2240793b3738000fcb62C66BF462764B903F',
  81457: '0xdca3251Ebe8f85458E8d95813bCb816460e4bef1'
}
const STEER_PERIPHERY_ADDRESS = STEER_PERIPHERY_ADDRESS_MAPPING[curChain.chain_id]
const {
  StyledFont,
  StyledFlex,
  Row,
  Column,
  DetailWrapper,
  FilterButtonList,
  FilterButton,
  InputWrapList,
  InputWrap,
  Input,
  InputSuffix,
  StyledImageList,
  PriceWrap,
  TotalPrice,
  BalancePrice,
  StyledButtonList,
  StyledButton,
} = VM.require('bluebiu.near/widget/Liquidity.Handler.Styles')

const defaultDeposit = props.tab === "deposit" || !props.tab;

// const curPositionUSD = userPositions[data.vaultAddress]?.balanceUSD;
const sender = Ethers.send("eth_requestAccounts", [])[0];
State.init({
  isDeposit: defaultDeposit,
  lpBalance: "",
  balances: {

  },
  amount0: "",
  amount1: "",
  lpAmount: "",
  isError: false,
  isLoading: false,
  isToken0Approved: true,
  isToken1Approved: true,
  isToken0Approving: false,
  isToken1Approving: false,
  loadingMsg: "",
  isPostTx: false,
  showPairs: false,
});
const sourceBalances = {
}
const {
  isDeposit,
  balances,
  amount0,
  amount1,
  isLoading,
  isError,
  isToken0Approved,
  isToken1Approved,
  isToken0Approving,
  isToken1Approving,
  loadingMsg,
  lpBalance,
  lpAmount,
  isPostTx,
} = state;
const detailLoading = Object.keys(balances).length < 2 || lpBalance === ""
const { token0, token1, decimals0, decimals1, id, poolAddress, liquidity } = data || defaultPair;

const vaultAddress = addresses[id];

const updateLPBalance = () => {
  const abi = ["function balanceOf(address) view returns (uint256)"];
  const contract = new ethers.Contract(
    ethers.utils.getAddress(vaultAddress),
    abi,
    Ethers.provider()
  );
  contract.balanceOf(sender).then((balanceBig) => {
    const adjustedBalance = ethers.utils.formatUnits(balanceBig, 18);
    State.update({
      lpBalance: adjustedBalance,
    });
  });
};
const updateBalance = (token) => {
  const { address, decimals, symbol } = token;
  if (symbol === "ETH") {
    Ethers.provider()
      .getBalance(sender)
      .then((balanceBig) => {
        const adjustedBalance = ethers.utils.formatEther(balanceBig);
        sourceBalances[symbol] = adjustedBalance
        State.update({
          balances: sourceBalances,
        });
      }).catch(error => console.log("error: ", error));
  } else {
    const erc20Abi = ["function balanceOf(address) view returns (uint256)"];
    const tokenContract = new ethers.Contract(
      address,
      erc20Abi,
      Ethers.provider()
    );
    tokenContract
      .balanceOf(sender)
      .then((balanceBig) => {
        const adjustedBalance = Big(
          ethers.utils.formatUnits(balanceBig, decimals)
        ).toFixed();
        sourceBalances[symbol] = adjustedBalance
        State.update({
          balances: sourceBalances,
        })
      })
      .catch(error => console.log("error: ", error));
  }
};

const handleCheckApproval = (symbol, amount, decimals) => {
  const wei = ethers.utils.parseUnits(
    Big(amount).toFixed(decimals),
    decimals
  );
  const abi = [
    "function allowance(address, address) external view returns (uint256)",
  ];

  const contract = new ethers.Contract(
    addresses[symbol],
    abi,
    Ethers.provider()
  );

  return new Promise((resolve) => {
    contract
      .allowance(sender, ethers.utils.getAddress(STEER_PERIPHERY_ADDRESS))
      .then((allowance) => {
        const approved = !new Big(allowance.toString()).lt(wei)
        State.update({
          [symbol === token0 ? 'isToken0Approved' : 'isToken1Approved']: approved,
        });
        resolve(approved)
      })
      .catch((e) => console.log(e));
  })

}
const checkApproval = (amount, otherAmount, symbol, callback) => {
  const otherSymbol = symbol === token0 ? token1 : token0
  const decimals = symbol === token0 ? decimals0 : decimals1
  const otherDecimals = symbol === token0 ? decimals1 : decimals0
  const promiseArray = [
    handleCheckApproval(symbol, amount, decimals),
    handleCheckApproval(otherSymbol, otherAmount, otherDecimals)
  ]
  Promise.all(promiseArray).then(result => {
    const [firstApproved, secondApproved] = result
    if (callback) {
      if (firstApproved && secondApproved) {
        symbol === token0 ? callback(amount, otherAmount) : callback(otherAmount, amount)
      } else {
        toast?.dismiss(state.toastId);
        State.update({
          isLoading: false
        })
      }
    }
  })
};
const changeMode = (isDeposit) => {
  State.update({ isDeposit });
};

const handleMax = (isToken0) => {
  if (isToken0) handleTokenChange(balances[token0], token0);
  else handleTokenChange(balances[token1], token1);
};

const handleTokenChange = (amount, symbol, callback) => {
  State.update({
    [symbol === token0 ? 'amount0' : 'amount1']: amount
  })
  if (Number(amount) === 0) {
    State.update({
      [symbol === token0 ? 'amount1' : 'amount0']: "",
      isToken0Approved: true,
      isToken1Approved: true
    })
    return;
  }
  State.update({
    isLoading: true,
    isError: false,
    loadingMsg: "Computing deposit amount..."
  })
  const abi = [
    "function getTotalAmounts() external view returns (uint256 total0, uint256 total1)"
  ];
  const contract = new ethers.Contract(
    ethers.utils.getAddress(vaultAddress),
    abi,
    Ethers.provider()
  );
  contract
    .getTotalAmounts()
    .then((response) => {
      const total0 = ethers.utils.formatUnits(response[0], decimals0)
      const total1 = ethers.utils.formatUnits(response[1], decimals1)
      console.log('=response', response, '=total0', total0, '=total1', total1)
      const otherAmount = Big((symbol === token0 ?
        Big(amount).times(total1).div(total0) :
        Big(amount).times(total0).div(total1))).toFixed()

      State.update({
        [symbol === token0 ? 'amount1' : 'amount0']: otherAmount,
        isLoading: callback ? true : false,
        focusedSymbol: symbol,
      })
      // if (callback) {
      //   symbol === token0 ? callback(amount, otherAmount) : callback(otherAmount, amount)
      // } else {
      //   checkApproval(amount, otherAmount, symbol);
      // }
      checkApproval(amount, otherAmount, symbol, callback);
    })
    .catch((error) => {
      console.log("error: ", error)
      State.update({
        isLoading: true,
        isError: true,
        loadingMsg: "Something went wrong. Please try again."
      })
      State.update({
        [symbol === token0 ? 'amount1' : 'amount0']: 0
      })
    });
};
const handleGetUnderlyingAssets = (amount) => {
  const abi = [
    {
      "inputs": [
        {
          "internalType": "uint256",
          "name": "_shares",
          "type": "uint256"
        }
      ],
      "name": "getUnderlyingAssets",
      "outputs": [
        {
          "internalType": "uint256",
          "name": "totalX",
          "type": "uint256"
        },
        {
          "internalType": "uint256",
          "name": "totalY",
          "type": "uint256"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    }
  ];

  try {
    const contract = new ethers.Contract(
      ethers.utils.getAddress(poolAddress),
      abi,
      Ethers.provider().getSigner()
    );
    contract
      .getUnderlyingAssets(Big(amount)
        .mul(Big(10).pow(18))
        .toFixed(0))
      .then(result => {
        const amountX = Number(ethers.utils.formatUnits(result[0], decimals0)).toFixed(5)
        const amountY = Number(ethers.utils.formatUnits(result[1], decimals1)).toFixed(5)
        State.update({
          amountX,
          amountY
        })
      })
  } catch (error) {
    console.log(error)
  }

}
const handleLPChange = (amount) => {
  State.update({
    lpAmount: amount,
  });
};

const handleApprove = (isToken0) => {
  const _token = isToken0 ? token0 : token1;
  const payload = isToken0
    ? { isToken0Approving: true }
    : { isToken1Approving: true };

  const amount = isToken0
    ? Big(amount0).toFixed(decimals0)
    : Big(amount1).toFixed(decimals1);

  const toastId = toast?.loading({
    title: `Approve ${amount} ${_token}`,
  });

  State.update({
    ...payload,
    isLoading: true,
    loadingMsg: `Approving ${_token}...`,
  });

  const tokenWei = ethers.utils.parseUnits(
    amount,
    isToken0 ? decimals0 : decimals1
  );

  const abi = ["function approve(address, uint) public"];

  const contract = new ethers.Contract(
    addresses[_token],
    abi,
    Ethers.provider().getSigner()
  );

  contract
    .approve(ethers.utils.getAddress(STEER_PERIPHERY_ADDRESS), tokenWei)
    .then((tx) => tx.wait())
    .then((receipt) => {
      const payload = isToken0
        ? { isToken0Approved: true, isToken0Approving: false }
        : { isToken1Approved: true, isToken1Approving: false };

      State.update({ ...payload, isLoading: false, loadingMsg: "" });
      toast?.dismiss(toastId);
      toast?.success({
        title: "Approve Successfully!",
        text: `Approve ${amount} ${_token}`,
        tx: receipt.transactionHash,
        chainId: props.chainId,
      });
    })
    .catch((error) => {
      State.update({
        isError: true,
        isLoading: false,
        loadingMsg: error,
        isToken0Approving: false,
        isToken1Approving: false,
      });
      toast?.dismiss(toastId);
      toast?.fail({
        title: "Approve Failed!",
        text: error?.message?.includes("user rejected transaction")
          ? "User rejected transaction"
          : `Approve ${amount} ${_token}`,
      });
    });
};
const handleDeposit = () => {
  const toastId = toast?.loading({
    title: `Depositing...`,
  });
  State.update({
    isLoading: true,
    isError: false,
    loadingMsg: "Depositing...",
  });

  handleTokenChange(
    state.focusedSymbol === token0 ? amount0 : amount1,
    state.focusedSymbol === token0 ? token0 : token1,
    (amount, otherAmount) => {
      const amount0Desired = Big(amount)
        .mul(Big(10).pow(decimals0))
        .toFixed(0);
      const amount1Desired = Big(otherAmount)
        .mul(Big(10).pow(decimals1))
        .toFixed(0);
      const abi = [{
        "inputs": [
          {
            "internalType": "address",
            "name": "vaultAddress",
            "type": "address"
          },
          {
            "internalType": "uint256",
            "name": "amount0Desired",
            "type": "uint256"
          },
          {
            "internalType": "uint256",
            "name": "amount1Desired",
            "type": "uint256"
          },
          {
            "internalType": "uint256",
            "name": "amount0Min",
            "type": "uint256"
          },
          {
            "internalType": "uint256",
            "name": "amount1Min",
            "type": "uint256"
          },
          {
            "internalType": "address",
            "name": "to",
            "type": "address"
          }
        ],
        "name": "deposit",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
      }];
      const contract = new ethers.Contract(
        ethers.utils.getAddress(STEER_PERIPHERY_ADDRESS),
        abi,
        Ethers.provider().getSigner()
      );
      contract
        .deposit(vaultAddress, amount0Desired, amount1Desired, 0, 0, sender)
        .then((tx) => {
          return tx.wait();
        })
        .then((receipt) => {
          const { status, transactionHash } = receipt;
          addAction?.({
            type: "Liquidity",
            action: "Deposit",
            token0,
            token1,
            amount: amount0,
            template: defaultDex,
            status: status,
            add: 1,
            transactionHash,
            chain_id: props.chainId,
            extra_data: JSON.stringify({
              action: "Deposit",
              amount0,
              amount1,
            })
          });

          State.update({
            isLoading: false,
            isPostTx: true,
          });

          setTimeout(() => State.update({ isPostTx: false }), 10_000);

          if (refetch) refetch();

          toast?.dismiss(toastId);
          toast?.success({
            title: "Deposit Successfully!",
          });
        })
        .catch((error) => {
          State.update({
            isError: true,
            isLoading: false,
            loadingMsg: error,
          });
          toast?.dismiss(toastId);
          toast?.fail({
            title: "Deposit Failed!",
            text: error?.message?.includes("user rejected transaction")
              ? "User rejected transaction"
              : "",
          });
        });
    })
};

const handleWithdraw = () => {
  const toastId = toast?.loading({
    title: `Withdrawing...`,
  });
  State.update({
    isLoading: true,
    isError: false,
    loadingMsg: "Withdrawing...",
  });
  const shares = Big(lpAmount)
    .mul(Big(10).pow(18))
    .toFixed(0)

  const abi = [{
    "inputs": [
      {
        "internalType": "uint256",
        "name": "shares",
        "type": "uint256"
      },
      {
        "internalType": "uint256",
        "name": "amount0Min",
        "type": "uint256"
      },
      {
        "internalType": "uint256",
        "name": "amount1Min",
        "type": "uint256"
      },
      {
        "internalType": "address",
        "name": "to",
        "type": "address"
      }
    ],
    "name": "withdraw",
    "outputs": [
      {
        "internalType": "uint256",
        "name": "amount0",
        "type": "uint256"
      },
      {
        "internalType": "uint256",
        "name": "amount1",
        "type": "uint256"
      }
    ],
    "stateMutability": "nonpayable",
    "type": "function"
  }];

  const contract = new ethers.Contract(
    ethers.utils.getAddress(addresses[data.id]),
    abi,
    Ethers.provider().getSigner()
  );
  contract
    .withdraw(shares, 0, 0, sender)
    .then((tx) => {
      return tx.wait();
    })
    .then((receipt) => {
      State.update({
        isLoading: false,
        isPostTx: true,
      });

      const { status, transactionHash } = receipt;

      addAction?.({
        type: "Liquidity",
        action: "Withdraw",
        token0,
        token1,
        amount: lpAmount,
        template: defaultDex,
        status: status,
        add: 0,
        transactionHash,
        chain_id: state.chainId,
      });

      setTimeout(() => State.update({ isPostTx: false }), 10_000);

      if (refetch) refetch();

      toast?.dismiss(toastId);
      toast?.success({
        title: "Withdraw Successfully!",
      });
    })
    .catch((error) => {
      console.log('===error', error)
      State.update({
        isError: true,
        isLoading: false,
        loadingMsg: error,
      });
      toast?.dismiss(toastId);
      toast?.fail({
        title: "Withdraw Failed!",
        text: error?.message?.includes("user rejected transaction")
          ? "User rejected transaction"
          : "",
      });
    });
};

const tokensPrice = prices;

const isInSufficient =
  Number(amount0) > Number(balances[token0]) ||
  Number(amount1) > Number(balances[token1]);

const isWithdrawInsufficient = Number(lpAmount) > Number(lpBalance);

const balance0 =
  !amount0 || !tokensPrice?.[token0]
    ? "-"
    : parseFloat(Big(amount0).times(tokensPrice[token0]).toFixed(4));

const balance1 =
  !amount1 || !tokensPrice?.[token1]
    ? "-"
    : parseFloat(Big(amount1).times(tokensPrice[token1]).toFixed(4));


const balanceLp =
  !lpAmount || !lpBalance || !liquidity
    ? "-"
    : parseFloat(
      Big(lpAmount)
        .div(lpBalance)
        .times(liquidity)
        .toFixed(4)
    );

const onUpdateLpPercent = (percent) => {
  State.update({
    lpPercent: percent,
  });
};

const onChangeSlider = (percent) => {
  console.log("percent: ", percent);
  const newLpValue = Big(percent)
    .div(100)
    .times(lpBalance || 0)
    .toFixed(6);

  handleLPChange(newLpValue);
};

useEffect(() => {
  if (!sender || !token0 || !token1) return;
  [
    { symbol: token0, address: addresses[token0], decimals: decimals0 },
    { symbol: token1, address: addresses[token1], decimals: decimals1 },
  ].map(updateBalance);

  updateLPBalance();
}, [sender, token0, token1]);

useEffect(() => {
  if (amount0) {
    handleTokenChange(amount0, token0);
  }
}, [data]);

return (
  <DetailWrapper>
    <FilterButtonList>
      <FilterButton className={isDeposit ? 'isActive' : ''} onClick={() => changeMode(true)}>Deposit</FilterButton>
      <FilterButton className={!isDeposit ? 'isActive' : ''} onClick={() => changeMode(false)}>Withdraw</FilterButton>
    </FilterButtonList>
    {
      detailLoading ? (
        <div style={{ padding: "30px 0 45px" }}>
          <Widget
            props={{
              color: "#999"
            }}
            src="bluebiu.near/widget/Liquidity.Bridge.Loading"
          />
        </div>
      ) : (
        <>
          {
            isDeposit ? <>
              <Row className="price-input">
                <Column>
                  <InputWrap className={Number(amount0) > Number(balances[token0]) ? "inSufficient" : ""}>
                    <Input value={amount0} type="number" onChange={(e) => handleTokenChange(e.target.value, token0)} />
                    <InputSuffix>
                      {
                        ICON_VAULT_MAP[token0] ? (
                          <img src={ICON_VAULT_MAP[token0]} alt={token0} />
                        ) : (
                          <UnKnownSvgContainer>
                            {UnKnownSvg}
                          </UnKnownSvgContainer>
                        )
                      }
                      <span>{token0}</span>
                    </InputSuffix>
                  </InputWrap>
                  <PriceWrap>
                    <TotalPrice>${balance0}</TotalPrice>
                    <BalancePrice>Balance:<span onClick={() => handleMax(true)}>{Big(balances[token0] ?? 0).toFixed(6)}</span> {token0}</BalancePrice>
                  </PriceWrap>
                </Column>
                <Column>
                  <InputWrap className={Number(amount1) > Number(balances[token1]) ? "inSufficient" : ""}>
                    <Input value={amount1} type="number" onChange={(e) => handleTokenChange(e.target.value, token1)} />
                    <InputSuffix>
                      {
                        ICON_VAULT_MAP[token1] ? (
                          <img src={ICON_VAULT_MAP[token1]} alt={token1} />
                        ) : (
                          <UnKnownSvgContainer>
                            {UnKnownSvg}
                          </UnKnownSvgContainer>
                        )
                      }
                      <span>{token1}</span>
                    </InputSuffix>
                  </InputWrap>
                  <PriceWrap>
                    <TotalPrice>${balance1}</TotalPrice>
                    <BalancePrice>Balance:<span onClick={() => handleMax(false)}>{Big(balances[token1] ?? 0).toFixed(6)}</span> {token1}</BalancePrice>
                  </PriceWrap>
                </Column>
              </Row>
              <StyledButtonList>
                {isInSufficient && <StyledButton disabled>InSufficient Balance</StyledButton>}
                {
                  !isInSufficient &&
                  (isToken0Approved &&
                    isToken1Approved &&
                    !isToken0Approving &&
                    !isToken1Approving ? (

                    <StyledButton disabled={isLoading || !amount0 || !amount1} onClick={handleDeposit}>
                      {
                        isLoading ? (
                          <Widget src="bluebiu.near/widget/Liquidity.Bridge.Loading" />
                        ) : (
                          "Deposit"
                        )
                      }
                    </StyledButton>
                  ) : (
                    <>
                      <StyledButton disabled={isToken0Approved || isToken0Approving} onClick={() => handleApprove(true)}>{
                        isToken0Approving ? (
                          <Widget src="bluebiu.near/widget/Liquidity.Bridge.Loading" />
                        ) : (
                          <>
                            {isToken0Approved ? "Approved" : "Approve"} {token0}
                          </>
                        )}
                      </StyledButton>
                      <StyledButton disabled={isToken1Approved || isToken1Approving} onClick={() => handleApprove(false)}>{
                        isToken1Approving ? (
                          <Widget src="bluebiu.near/widget/Liquidity.Bridge.Loading" />
                        ) : (
                          <>
                            {isToken1Approved ? "Approved" : "Approve"} {token1}
                          </>
                        )}
                      </StyledButton>
                    </>
                  ))
                }
              </StyledButtonList>
            </> : <>
              <Row className="price-input">
                <Column>
                  <InputWrap>
                    <Input value={lpAmount} type="number" onChange={(e) => {
                      handleLPChange(e.target.value);

                      const value = e.target.value;

                      if (!value) {
                        onUpdateLpPercent(0);
                      }

                      if (value && Big(value).gt(0)) {
                        const newSliderPercent = Big(value || 0)
                          .div(Big(lpBalance).gt(0) ? lpBalance : 1)
                          .times(100)
                          .toFixed(0);
                        onUpdateLpPercent(newSliderPercent);
                      }
                    }} />

                    <InputSuffix>
                      <StyledImageList>
                        {
                          ICON_VAULT_MAP[token0] ? (
                            <img src={ICON_VAULT_MAP[token0]} alt={token0} />
                          ) : (
                            <UnKnownSvgContainer>
                              {UnKnownSvg}
                            </UnKnownSvgContainer>
                          )
                        }
                        {
                          ICON_VAULT_MAP[token1] ? (
                            <img src={ICON_VAULT_MAP[token1]} alt={token1} style={{ marginLeft: -6 }} />
                          ) : (
                            <UnKnownSvgContainer style={{ marginLeft: -6 }}>
                              {UnKnownSvg}
                            </UnKnownSvgContainer>
                          )
                        }
                      </StyledImageList>
                      <span>{token0}/{token1}</span>
                    </InputSuffix>
                  </InputWrap>
                  <PriceWrap>
                    <TotalPrice>${balanceLp}</TotalPrice>
                    <BalancePrice>Balance: <span
                      onClick={() => {
                        const newSliderPercent = Big(lpBalance || 0)
                          .div(Big(lpBalance).gt(0) ? lpBalance : 1)
                          .times(100)
                          .toFixed(0);

                        onUpdateLpPercent(newSliderPercent);

                        handleLPChange(lpBalance);
                      }}
                      className="v"
                    >
                      {lpBalance}
                    </span></BalancePrice>
                  </PriceWrap>
                </Column>
              </Row>
              <StyledButtonList>
                <StyledButton
                  disabled={isWithdrawInsufficient || isLoading || !lpAmount}
                  onClick={handleWithdraw}
                >
                  {isLoading ? (
                    <Widget src="bluebiu.near/widget/Liquidity.Bridge.Loading" />
                  ) : (
                    <>
                      {isWithdrawInsufficient ? "InSufficient Balance" : "Withdraw"}
                    </>
                  )}
                </StyledButton>

              </StyledButtonList>
            </>
          }
        </>
      )
    }
  </DetailWrapper>
)