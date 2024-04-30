const {
  dexConfig,
  config,
  data,
  onRequestClose,
  onActionSuccess,
  chainId,
  depositETHGas,
  depositERC20Gas,
  formatHealthFactor,
  calcHealthFactor,
  theme,
  addAction,
  prices,
} = props;

if (!data) {
  return <div />;
}

const MIN_ETH_GAS_FEE = 0.001;
const ROUND_DOWN = 0;
function isValid(a) {
  if (!a) return false;
  if (isNaN(Number(a))) return false;
  if (a === "") return false;
  return true;
}

const {
  symbol,
  balance,

  supplyAPY,
  usageAsCollateralEnabled,
  decimals,
  underlyingAsset,
  name: tokenName,
  healthFactor,
  supportPermit,
  LEVERAGE,
  LTV,
} = data;
console.log("loopModal---", data);
const WithdrawContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
`;

const TokenTexture = styled.div`
  font-size: 20px;
  font-weight: bold;
  color: white;
`;

const TokenWrapper = styled.div`
  display: flex;
  img {
    margin-right: 4px;
  }
`;

const GrayTexture = styled.div`
  font-size: 12px;
  font-weight: 500;
  color: #7c7c86;
`;

const PurpleTexture = styled.div`
  font-size: 14px;
  font-weight: 500;
  color: #8a8db9;
`;

const GreenTexture = styled.div`
  font-size: 14px;
  font-weight: bold;
  color: rgb(178, 232, 16);
`;

const RedTexture = styled.div`
  font-size: 14px;
  font-weight: bold;
  color: red;
`;

const WhiteTexture = styled.div`
  font-size: 14px;
  font-weight: bold;
  color: white;
`;
const TransactionOverviewContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
`;

const Input = styled.input`
  background: transparent;
  border: none;
  outline: none;

  font-size: 20px;
  font-weight: bold;
  color: white;
  flex: 1;
  width: 160px;

  &[type="number"]::-webkit-outer-spin-button,
  &[type="number"]::-webkit-inner-spin-button {
    -webkit-appearance: none;
    margin: 0;
  }
  &[type="number"] {
    -moz-appearance: textfield;
  }
`;

const Max = styled.span`
  color: #8247e5;
  cursor: pointer;
`;

State.init({
  amount: "",
  amountInUSD: "0.00",
  loading: false,
  newHealthFactor: "-",
  gas: "-",

  needApprove: false,
  pointsRewards: "1.65",
  leverage: 1.1,
});

function updateGas() {
  if (symbol === config.nativeCurrency.symbol) {
    depositETHGas().then((value) => {
      State.update({ gas: value });
    });
  } else {
    depositERC20Gas().then((value) => {
      State.update({ gas: value });
    });
  }
}

updateGas();

function getNonce(tokenAddress, userAddress) {
  const token = new ethers.Contract(
    tokenAddress,
    config.erc20Abi.body,
    Ethers.provider().getSigner()
  );

  return token.nonces(userAddress).then((nonce) => nonce.toNumber());
}

/**
 *
 * @param {string} user user address
 * @param {string} reserve AAVE reserve address (token to supply)
 * @param {string} tokenName token name
 * @param {string} amount token amount in full decimals
 * @param {number} deadline unix timestamp in SECONDS
 * @returns raw signature string will could be used in supplyWithPermit
 */
function signERC20Approval(user, reserve, tokenName, amount, deadline) {
  return getNonce(reserve, user).then((nonce) => {
    const typeData = {
      types: {
        EIP712Domain: [
          { name: "name", type: "string" },
          { name: "version", type: "string" },
          { name: "chainId", type: "uint256" },
          { name: "verifyingContract", type: "address" },
        ],
        Permit: [
          { name: "owner", type: "address" },
          { name: "spender", type: "address" },
          { name: "value", type: "uint256" },
          { name: "nonce", type: "uint256" },
          { name: "deadline", type: "uint256" },
        ],
      },
      primaryType: "Permit",
      domain: {
        name: tokenName,
        version: "1",
        chainId,
        verifyingContract: reserve,
      },
      message: {
        owner: user,
        spender: config.aavePoolV3Address,
        value: amount,
        nonce,
        deadline,
      },
    };

    const dataToSign = JSON.stringify(typeData);

    return Ethers.provider().send("eth_signTypedData_v4", [user, dataToSign]);
  });
}

/**
 *
 * @param {string} user user address
 * @param {string} reserve AAVE reserve address (token to supply)
 * @param {string} amount token amount in full decimals
 * @param {number} deadline unix timestamp in SECONDS
 * @param {string} rawSig signature from signERC20Approval
 * @returns txn object
 */
function supplyWithPermit(user, reserve, amount, deadline, rawSig) {
  const sig = ethers.utils.splitSignature(rawSig);
  const pool = new ethers.Contract(
    config.aavePoolV3Address,
    config.aavePoolV3ABI.body,
    Ethers.provider().getSigner()
  );
  return pool[
    "supplyWithPermit(address,uint256,address,uint16,uint256,uint8,bytes32,bytes32)"
  ](reserve, amount, user, 0, deadline, sig.v, sig.r, sig.s);
}

function depositPacETH(amount) {
  State.update({
    loading: true,
  });
  return Ethers.provider()
    .getSigner()
    .getAddress()
    .then((address) => {
      const wrappedTokenGateway = new ethers.Contract(
        config.wrappedTokenGatewayV3Address,
        config.wrappedTokenGatewayV3ABI.body,
        Ethers.provider().getSigner()
      );
      return wrappedTokenGateway.depositETH(
        config.aavePoolV3Address,
        address,
        0,
        {
          value: amount,
        }
      );
    })
    .then((tx) => {
      tx.wait()
        .then((res) => {
          const { status, transactionHash } = res;
          if (status === 1) {
            formatAddAction(
              Big(amount).div(Big(10).pow(decimals)).toFixed(8),
              status,
              transactionHash
            );
            onActionSuccess({
              msg: `You supplied ${Big(amount)
                .div(Big(10).pow(decimals))
                .toFixed(8)} ${symbol}`,
              callback: () => {
                onRequestClose();
                State.update({
                  loading: false,
                });
              },
            });
            console.log("tx succeeded", res);
          } else {
            console.log("tx failed", res);
            State.update({
              loading: false,
            });
          }
        })
        .catch(() => State.update({ loading: false }));
    })
    .catch(() => State.update({ loading: false }));
}

function depositFromApproval(amount) {
  const tokenAddress = underlyingAsset;
  const pool = new ethers.Contract(
    config.aavePoolV3Address,
    [
      {
        inputs: [
          { internalType: "address", name: "asset", type: "address" },
          { internalType: "uint256", name: "amount", type: "uint256" },
          { internalType: "address", name: "onBehalfOf", type: "address" },
          { internalType: "uint16", name: "referralCode", type: "uint16" },
        ],
        name: "supply",
        outputs: [],
        stateMutability: "nonpayable",
        type: "function",
      },
    ],
    Ethers.provider().getSigner()
  );

  return Ethers.provider()
    .getSigner()
    .getAddress()
    .then((userAddress) => {
      return pool["supply(address,uint256,address,uint16)"](
        tokenAddress,
        amount,
        userAddress,
        0
      );
    });
}

function formatAddAction(_amount, status, transactionHash) {
  addAction?.({
    type: "Lending",
    action: "Loop",
    token: {
      symbol,
    },
    amount: _amount,
    template: dexConfig.name,
    add: false,
    status,
    transactionHash,
  });
}
function approve(amount) {
  const tokenAddress = underlyingAsset;
  const token = new ethers.Contract(
    tokenAddress,
    config.erc20Abi.body,
    Ethers.provider().getSigner()
  );
  return token["approve(address,uint256)"](config.aavePoolV3Address, amount);
}

// function update() {
//   if (supportPermit) {
//     return;
//   }
//   if (
//     !isValid(state.amount) ||
//     !isValid(state.allowanceAmount) ||
//     Number(state.allowanceAmount) < Number(state.amount) ||
//     Number(state.amount) === 0
//   ) {
//     State.update({ needApprove: true });
//   } else {
//     State.update({ needApprove: false });
//   }
// }

// update();

function depositErc20(amount) {
  State.update({
    loading: true,
  });
  const deadline = Math.floor(Date.now() / 1000 + 3600); // after an hour

  Ethers.provider()
    .getSigner()
    .getAddress()
    .then((userAddress) => {
      if (!supportPermit) {
        depositFromApproval(amount)
          .then((tx) => {
            tx.wait()
              .then((res) => {
                const { status, transactionHash } = res;
                if (status === 1) {
                  formatAddAction(
                    Big(amount).div(Big(10).pow(decimals)).toFixed(8),
                    status,
                    transactionHash
                  );
                  onActionSuccess({
                    msg: `You supplied ${Big(amount)
                      .div(Big(10).pow(decimals))
                      .toFixed(8)} ${symbol}`,
                    callback: () => {
                      onRequestClose();
                      State.update({
                        loading: false,
                      });
                    },
                  });
                  console.log("tx succeeded", res);
                } else {
                  State.update({
                    loading: false,
                  });
                  console.log("tx failed", res);
                }
              })
              .catch(() => State.update({ loading: false }));
          })
          .catch(() => State.update({ loading: false }));
      } else {
        const token = underlyingAsset;
        signERC20Approval(userAddress, token, tokenName, amount, deadline)
          .then((rawSig) => {
            return supplyWithPermit(
              userAddress,
              token,
              amount,
              deadline,
              rawSig
            );
          })
          .then((tx) => {
            tx.wait()
              .then((res) => {
                const { status, transactionHash } = res;
                console.log("SUCCESS--", status, transactionHash);
                if (status === 1) {
                  formatAddAction(
                    Big(amount).div(Big(10).pow(decimals)).toFixed(8),
                    status,
                    transactionHash
                  );
                  onActionSuccess({
                    msg: `You supplied ${Big(amount)
                      .div(Big(10).pow(decimals))
                      .toFixed(8)} ${symbol}`,
                    callback: () => {
                      onRequestClose();
                      State.update({
                        loading: false,
                      });
                    },
                  });
                  console.log("tx succeeded", res);
                } else {
                  State.update({
                    loading: false,
                  });
                  console.log("tx failed", res);
                }
              })
              .catch(() => State.update({ loading: false }));
          })
          .catch(() => State.update({ loading: false }));
      }
    })
    .catch(() => State.update({ loading: false }));
}

const maxValue =
  symbol === config.nativeCurrency.symbol
    ? Big(balance).minus(MIN_ETH_GAS_FEE).toFixed(decimals)
    : Big(balance).toFixed(decimals);

function debounce(fn, wait) {
  let timer = state.timer;
  return () => {
    if (timer) clearTimeout(timer);
    timer = setTimeout(() => {
      fn();
    }, wait);
    State.update({ timer });
  };
}

const updateNewHealthFactor = debounce(() => {
  State.update({ newHealthFactor: "-" });
  const newHealthFactor = formatHealthFactor(
    calcHealthFactor("SUPPLY", symbol, state.amount)
  );
  console.log(
    "supply updateNewHealthFactor",
    symbol,
    state.amount,
    newHealthFactor
  );
  State.update({ newHealthFactor });
}, 1000);

const disabled =
  !state.amount || !isValid(state.amount) || Number(state.amount) === 0;

const changeValue = (value) => {
  if (Number(value) > Number(maxValue)) {
    value = maxValue;
  }
  if (Number(value) < 0) {
    value = "0";
  }
  if (isValid(value)) {
    const amountInUSD = Big(value).mul(prices[symbol]).toFixed(2, ROUND_DOWN);
    State.update({
      amountInUSD,
    });

    updateNewHealthFactor();
  } else {
    State.update({
      amountInUSD: "0.00",
      newHealthFactor: "-",
    });
  }
  State.update({ amount: value });
};

const onSliderChange = (_value) => {
  State.update({
    leverage: _value,
    pointsRewards: (_value[0] * 1.5).toFixed(2),
  });
};

function getAccount() {
  return Ethers.provider()
    .getSigner()
    .getAddress()
    .then((userAddress) => {
      return userAddress;
    })
    .catch((err) => {
      console.log("catch_getAccount:", err);
    });
}
function getTokenAllowance(userAddress) {
  return new ethers.Contract(
    underlyingAsset,
    config.erc20Abi.body,
    Ethers.provider().getSigner()
  )
    .allowance(userAddress, config.LoopDelegateeAddress)
    .then((_allowance) => {
      console.log(
        "tokenAllowance--",
        _allowance?.toString(),
        decimals,
        Number(amount),
        Number(allowanceAmount) < Number(amount)
      );
      if (!_allowance) return false;
      const allowanceAmount = _allowance;

      if (Number(allowanceAmount) < Number(amount)) {
        new ethers.Contract(
          data.underlyingAsset,
          config.erc20Abi.body,
          Ethers.provider().getSigner()
        )
          .approve(config.LoopDelegateeAddress, amount)
          .then((tx) => {
            tx.wait()
              .then((res) => {
                const { status } = res;
                if (status === 1) {
                  console.log("approve succeeded", res);
                  return true;
                } else {
                  console.log("approve failed", res);
                  State.update({
                    loading: false,
                  });
                }
              })
              .catch(() => State.update({ loading: false }));
          })
          .catch(() => State.update({ loading: false }));
      } else {
        return true;
      }
    });
}

function loop(userAddress) {
  new ethers.Contract(
    data.variableDebtTokenAddress,
    [
      {
        inputs: [
          {
            internalType: "address",
            name: "fromUser",
            type: "address",
          },
          { internalType: "address", name: "toUser", type: "address" },
        ],
        name: "borrowAllowance",
        outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
        stateMutability: "view",
        type: "function",
      },
    ],
    Ethers.provider().getSigner()
  )
    .borrowAllowance(userAddress, config.LoopDelegateeAddress)
    .then((_debtAllowance) => {
      const _borrowAmount = Big(state.leverage)
        .times(Big(state.amount))
        .minus(Big(state.amount))
        .toString();
      const borrowAmount = ethers.utils.parseUnits(_borrowAmount, decimals);
      console.log("borrowAmount--", borrowAmount.toString());
      console.log(
        "debtAllowance--",
        _debtAllowance,
        _debtAllowance.toString(),
        Big(_debtAllowance).lt(Big(borrowAmount))
      );
      if (!_debtAllowance) return false;

      if (Big(_debtAllowance).lt(Big(borrowAmount))) {
        new ethers.Contract(
          data.variableDebtTokenAddress,
          [
            {
              inputs: [
                {
                  internalType: "address",
                  name: "delegatee",
                  type: "address",
                },
                {
                  internalType: "uint256",
                  name: "amount",
                  type: "uint256",
                },
              ],
              name: "approveDelegation",
              outputs: [],
              stateMutability: "nonpayable",
              type: "function",
            },
          ],
          Ethers.provider().getSigner()
        )
          .approveDelegation(config.LoopDelegateeAddress, borrowAmount)
          .then((tx) => {
            tx.wait()
              .then((res) => {
                const { status } = res;
                if (status === 1) {
                  console.log("approveDelegation succeeded", res);
                  return { step2: true, borrowAmount };
                } else {
                  console.log("approveDelegation failed", res);
                  State.update({
                    loading: false,
                  });
                }
              })
              .catch(() => State.update({ loading: false }));
          });
      } else {
        return { step2: true, borrowAmount };
      }
    })
    .then(({ step2, borrowAmount }) => {
      if (!step2) return;

      new ethers.Contract(
        config.LoopDelegateeAddress,
        [
          {
            inputs: [
              { internalType: "address", name: "asset", type: "address" },
              {
                internalType: "uint256",
                name: "cashAmount",
                type: "uint256",
              },
              {
                internalType: "uint256",
                name: "borrowAmount",
                type: "uint256",
              },
            ],
            name: "leverageDeposit",
            outputs: [],
            stateMutability: "payable",
            type: "function",
          },
        ],
        Ethers.provider().getSigner()
      )
        .leverageDeposit(
          data.underlyingAsset,
          ethers.utils.parseUnits(state.amount, decimals),
          borrowAmount,
          {
            gasLimit: 4000000,
          }
        )
        .then((tx) => {
          tx.wait()
            .then((res) => {
              console.log("loop_res--", res);
              const { status } = res;
              if (status === 1) {
                formatAddAction(
                  Number(state.amount).toFixed(6),
                  status,
                  transactionHash
                );
                onActionSuccess({
                  msg: `You looped ${Number(state.amount).toFixed(
                    6
                  )} ${symbol}`,
                  callback: () => {
                    onRequestClose();
                    State.update({
                      loading: false,
                    });
                  },
                });
                console.log("loop succeeded", res);
                State.update({
                  loading: false,
                });
              } else {
                console.log("loop failed", res);
                State.update({
                  loading: false,
                });
              }
            })
            .catch(() => State.update({ loading: false }));
        });
    });
}

function handleLoop() {
  State.update({
    loading: true,
  });

  if (data.symbol === "ETH") {
    getAccount().then((userAddress) => {
      loop(userAddress);
    });
  } else {
    getAccount().then((userAddress) => {
      getTokenAllowance(userAddress)
        .then((step1) => {
          if (!step1) return;
          loop(userAddress);
        })
        .catch((err) => {
          console.log("handleLoop_error:", err);
        });
    });
  }
}

return (
  <Widget
    src={`${config.ownerId}/widget/AAVE.Modal.BaseModal`}
    props={{
      title: `Loop ${symbol}`,
      onRequestClose: onRequestClose,
      children: (
        <WithdrawContainer>
          <Widget
            src={`${config.ownerId}/widget/AAVE.Modal.RoundedCard`}
            props={{
              title: "Amount",
              config,
              children: (
                <>
                  <Widget
                    src={`${config.ownerId}/widget/AAVE.Modal.FlexBetween`}
                    props={{
                      left: (
                        <TokenTexture>
                          <Input
                            type="number"
                            value={state.amount}
                            onChange={(e) => {
                              changeValue(e.target.value);
                            }}
                            placeholder="0"
                          />
                        </TokenTexture>
                      ),
                      right: (
                        <TokenWrapper>
                          <img width={26} height={26} src={data?.icon} />
                          <TokenTexture>{symbol}</TokenTexture>
                        </TokenWrapper>
                      ),
                    }}
                  />
                  <Widget
                    src={`${config.ownerId}/widget/AAVE.Modal.FlexBetween`}
                    props={{
                      left: <GrayTexture>${state.amountInUSD}</GrayTexture>,
                      right: (
                        <GrayTexture>
                          Wallet Balance:{" "}
                          {isValid(balance) && balance !== "-"
                            ? Big(balance).toFixed(7)
                            : balance}
                          <Max
                            onClick={() => {
                              changeValue(maxValue);
                            }}
                          >
                            MAX
                          </Max>
                        </GrayTexture>
                      ),
                    }}
                  />
                </>
              ),
            }}
          />
          <Widget
            src={`${config.ownerId}/widget/AAVE.Modal.RoundedCard`}
            props={{
              title: "Transaction Overview",
              config,
              children: (
                <TransactionOverviewContainer>
                  <Widget
                    src={`${config.ownerId}/widget/Utils.Slider`}
                    props={{
                      ...data,
                      onSliderChange,
                    }}
                  />
                  <Widget
                    src={`${config.ownerId}/widget/AAVE.Modal.FlexBetween`}
                    props={{
                      left: <PurpleTexture>LTV</PurpleTexture>,
                      right: (
                        <WhiteTexture>
                          {(Number(data.LTV) * 100).toFixed()}%
                        </WhiteTexture>
                      ),
                    }}
                  />
                  <Widget
                    src={`${config.ownerId}/widget/AAVE.Modal.FlexBetween`}
                    props={{
                      left: <PurpleTexture>Health Factor</PurpleTexture>,
                      right: (
                        <div style={{ textAlign: "right" }}>
                          <GreenTexture>
                            {formatHealthFactor(healthFactor)}

                            <img
                              src={`${config.ipfsPrefix}/bafkreiesqu5jyvifklt2tfrdhv6g4h6dubm2z4z4dbydjd6if3bdnitg7q`}
                              width={16}
                              height={16}
                            />
                            {state.newHealthFactor}
                          </GreenTexture>
                          {/* <WhiteTexture>
                            Liquidation at &lt; {config.FIXED_LIQUIDATION_VALUE}
                          </WhiteTexture> */}
                        </div>
                      ),
                    }}
                  />
                  {/* <Widget
                    src={`${config.ownerId}/widget/AAVE.Modal.FlexBetween`}
                    props={{
                      left: <PurpleTexture>APY</PurpleTexture>,
                      right: (
                        <WhiteTexture>
                          {(Number(supplyAPY) * 100).toFixed(2)}%
                        </WhiteTexture>
                      ),
                    }}
                  /> */}
                  <Widget
                    src={`${config.ownerId}/widget/AAVE.Modal.FlexBetween`}
                    props={{
                      left: <PurpleTexture>Points Rewards</PurpleTexture>,
                      right: (
                        <GreenTexture>{`${state.pointsRewards} x`}</GreenTexture>
                      ),
                    }}
                  />

                  <Widget
                    src={`${config.ownerId}/widget/AAVE.Modal.FlexBetween`}
                    props={{
                      left: <PurpleTexture>Flash loan fee</PurpleTexture>,
                      right: (
                        <GreenTexture>
                          0.01% (${" "}
                          {`${Big(state.amount || 0)
                            .times(Big(state.leverage))
                            .minus(Big(state.amount || 0))
                            .times(0.000001)
                            .toFixed(6)} `}
                          )
                        </GreenTexture>
                      ),
                    }}
                  />
                </TransactionOverviewContainer>
              ),
            }}
          />
          {/* <Widget
            src={`${config.ownerId}/widget/AAVE.GasEstimation`}
            props={{ gas: state.gas, config }}
          /> */}

          <Widget
            src={`${config.ownerId}/widget/AAVE.PrimaryButton`}
            props={{
              config,
              theme,
              loading: state.loading,
              children: `Loop`,
              disabled,
              onClick: handleLoop,
            }}
          />

          {/* {!state.needApprove && (
            <Widget
              src={`${config.ownerId}/widget/AAVE.PrimaryButton`}
              props={{
                config,
                theme,
                children: `Loop ${symbol}`,
                loading: state.loading,
                disabled,
                onClick: () => {
                  const amount = Big(state.amount)
                    .mul(Big(10).pow(decimals))
                    .toFixed(0);
                  if (symbol === config.nativeCurrency.symbol) {
                    depositPacETH(amount);
                  } else {
                    // supply common
                    depositErc20(amount);
                  }
                },
              }}
            />
          )} */}
        </WithdrawContainer>
      ),
      config,
    }}
  />
);
