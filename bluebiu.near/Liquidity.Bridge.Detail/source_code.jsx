
const {
  // defaultPair,
  // pair,
  data,
  addresses,
  // proxyAddress,
  ICON_VAULT_MAP
} = props;

const proxyAddress = "0xFc13Ebe7FEB9595D70195E9168aA7F3acE153621"
const Row = styled.div`
  display: flex;
  flex-direction: row;
  &.price-input {
    width: 500px;
    margin: 0 auto 20px;
    align-items: center;
    justify-content: center;
    gap: 14px;
  }
`
const Column = styled.div`
  display: flex;
  flex-direction: column;
  flex: 1;
`
const Wrapper = styled.div`
  
`
const FilterButtonList = styled.div`
  margin-bottom: 20px;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  border-top: 1px solid #373A53;
  border-bottom: 1px solid #373A53;
`
const FilterButton = styled.div`
  cursor: pointer;
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 250px;
  height: 48px;
  border-left: 1px solid #373A53;
  border-right: 1px solid #373A53;
  color: #979ABE;
  font-family: Gantari;
  font-size: 16px;
  font-style: normal;
  font-weight: 400;
  &:first-of-type {
    border-right: none;
  }
  &.isActive {
    color: #FFF;
    &:after {
      content: "";
      position: absolute;
      left: 0;
      width: 100%;
      bottom: -2px;
      height: 5px;
      flex-shrink: 0;
      background: #1362E4;
    }
  }
`
const InputWrapList = styled.div`
  margin-bottom: 20px;
  display: flex;
  align-items: center;
  justify-content: center;
`
const InputWrap = styled.div`
  position: relative;
  /* width: 243px; */
  height: 46px;
  /* flex-shrink: 0;
  fill: #1B1E27;
  stroke-width: 1px;
  stroke: #33364B; */
  background: #33364B;
  border-radius: 12px;
  input::-webkit-inner-spin-button {
    -webkit-appearance: none !important;
  }
  
  input::-webkit-outer-spin-button{
    -webkit-appearance: none !important;
  }
  input[type="number"]{
    -moz-appearance: textfield;
  }

`
const Input = styled.input`
  border: none;
  outline: none;
  background: transparent;
  margin: 0;
  width: 100%;
  height: 100%;
  color: #FFF;
  font-family: Gantari;
  font-size: 13px;
  font-style: normal;
  font-weight: 400;
  padding: 0 80px 0 10px;
`
const InputSuffix = styled.div`
  position: absolute;
  top: 13px;
  right: 12px;
  display: flex;
  align-items: center;
  gap: 6px;
  span {
    color: #FFF;
    text-align: right;
    font-family: Gantari;
    font-size: 14px;
    font-style: normal;
    font-weight: 500;
    line-height: normal;
  }

`
const StyledImageList = styled.div`
  display: flex;
  align-items: center;
`
const PriceWrap = styled.div`
  margin-top: 6px;
  display: flex;
  align-items: center;
  justify-content: space-between;
`
const TotalPrice = styled.span`
  color: #979ABE;
  font-family: Gantari;
  font-size: 12px;
  opacity: 0.3;
`
const BalancePrice = styled.div`
  display: flex;
  align-items: center;
  gap: 4px;
  color: #979ABE;
  text-align: right;
  font-family: Gantari;
  font-size: 12px;
  font-style: normal;
  font-weight: 400;
  line-height: normal;
  span {
    color: #FFF;
    text-decoration-line: underline;
  }
`

const StyledButtonList = styled.div`
  width: 500px;
  margin: 0 auto 20px;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 14px;
`
const StyledButton = styled.button`
  outline: none;
  border: none;
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  height: 46px;
  border-radius: 8px;
  background: #FFF;
  color: #1E2028;
  font-family: Gantari;
  font-size: 16px;
  font-weight: 500;
  &[disabled] {
    opacity: 0.5;
    cursor: not-allowed;
  }
`

const StyledLoading = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  animation: rotate 1.5s linear  infinite;
  @keyframes rotate {
    0% {
      transform: rotate(0deg);
    }
    100% {
      transform: rotate(360deg);
    }
  }
`


const AccessKey = Storage.get(
  "AccessKey",
  "guessme.near/widget/ZKEVMWarmUp.add-to-quest-card"
);

const iconCircle = (
  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16" fill="none">
    <path d="M8 15C11.866 15 15 11.866 15 8C15 4.13401 11.866 1 8 1C4.13401 1 1 4.13401 1 8" stroke="#1E2028" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
  </svg>

)
const defaultDeposit = props.tab === "deposit" || !props.tab;

State.init({
  isDeposit: defaultDeposit,
  lpBalance: "",
  balances: [],
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

const getFromDepositAmount = (depositAmount, tokenDecimal) => {
  let a = new Big(depositAmount[0].toString());
  let b = new Big(depositAmount[1].toString());

  if (a.eq(0) && b.eq(0)) return "0";

  let diff;
  let midpoint;
  if (a.gt(b)) {
    diff = a.minus(b);
    midpoint = diff.div(new Big(2)).plus(b);
  } else {
    diff = b.minus(a);
    midpoint = diff.div(new Big(2)).plus(a);
  }

  for (let i = tokenDecimal; i > 0; i--) {
    const midpointFixed = midpoint
      .div(new Big(10).pow(tokenDecimal))
      .toFixed(i);
    if (
      a.div(Big(10).pow(tokenDecimal)).lte(midpointFixed) &&
      b.div(Big(10).pow(tokenDecimal)).gte(midpointFixed)
    ) {
      return midpointFixed;
    }
  }

  return "0";
};

const sender = Ethers.send("eth_requestAccounts", [])[0];
if (!sender) return <Web3Connect connectLabel="Connect with Web3" />;
const { token0, token1, decimals0, decimals1, id } = data || defaultPair;

const hypeAddress = addresses[id];

const updateLPBalance = () => {
  const abi = ["function balanceOf(address) view returns (uint256)"];
  const vaultContract = new ethers.Contract(
    hypeAddress,
    abi,
    Ethers.provider()
  );
  vaultContract.balanceOf(sender).then((balanceBig) => {
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
        State.update({
          balances: {
            ...state.balances,
            [symbol]: adjustedBalance,
          },
        });
      });
  } else {
    const erc20Abi = ["function balanceOf(address) view returns (uint256)"];
    const tokenContract = new ethers.Contract(
      address,
      erc20Abi,
      Ethers.provider()
    );
    tokenContract.balanceOf(sender).then((balanceBig) => {
      const adjustedBalance = Big(
        ethers.utils.formatUnits(balanceBig, decimals)
      ).toString();
      State.update({
        balances: {
          ...state.balances,
          [symbol]: adjustedBalance,
        },
      });
    });
  }
};

useEffect(() => {
  if (!sender || !token0 || !token1) return;
  [
    { symbol: token0, address: addresses[token0], decimals: decimals0 },
    { symbol: token1, address: addresses[token1], decimals: decimals1 },
  ].map(updateBalance);

  updateLPBalance();
}, [sender, token0, token1]);

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

const checkApproval = (token0Amount, token1Amount) => {
  const token0Wei = ethers.utils.parseUnits(
    Big(token0Amount).toFixed(decimals0),
    decimals0
  );
  const token1Wei = ethers.utils.parseUnits(
    Big(token1Amount).toFixed(decimals1),
    decimals1
  );

  const abi = [
    "function allowance(address, address) external view returns (uint256)",
  ];

  const token0Contract = new ethers.Contract(
    addresses[token0],
    abi,
    Ethers.provider()
  );

  token0Contract
    .allowance(sender, hypeAddress)
    .then((allowance0) => {
      State.update({
        isToken0Approved: !new Big(allowance0.toString()).lt(token0Wei),
      });
    })
    .catch((e) => console.log(e));

  const token1Contract = new ethers.Contract(
    addresses[token1],
    abi,
    Ethers.provider()
  );

  token1Contract
    .allowance(sender, hypeAddress)
    .then((allowance1) => {
      State.update({
        isToken1Approved: !new Big(allowance1.toString()).lt(token1Wei),
      });
    })
    .catch((e) => console.log(e));
};
const changeMode = (isDeposit) => {
  State.update({ isDeposit });
};

const handleMax = (isToken0) => {
  if (isToken0) handleToken0Change(balances[token0]);
  else handleToken1Change(balances[token1]);
};
const handleToken0Change = (amount) => {
  State.update({ amount0: amount });

  if (Number(amount) === 0) {
    State.update({
      amount1: "",
      isToken0Approved: true,
      isToken1Approved: true,
    });
    return;
  }

  State.update({
    isLoading: true,
    isError: false,
    loadingMsg: "Computing deposit amount...",
  });
  const token0Wei = ethers.utils.parseUnits(
    Big(amount).toFixed(decimals0),
    decimals0
  );

  const proxyAbi = [
    "function getDepositAmount(address, address, uint256) public view returns (uint256, uint256)",
  ];
  const proxyContract = new ethers.Contract(
    proxyAddress,
    proxyAbi,
    Ethers.provider()
  );
  console.log(hypeAddress, addresses[token0], token0Wei);
  proxyContract
    .getDepositAmount(hypeAddress, addresses[token0], token0Wei)
    .then((depositAmount) => {
      console.log("depositAmount", depositAmount);
      const amount1 = getFromDepositAmount(depositAmount, decimals1);

      State.update({ amount1 });
      State.update({ isLoading: false });
      checkApproval(amount, amount1);
    })
    .catch((e) => {
      State.update({
        isLoading: true,
        isError: true,
        amount1: 0,
        loadingMsg: "Something went wrong. Please try again.",
      });
    });
};

const handleToken1Change = (amount) => {
  State.update({ amount1: amount });

  if (Number(amount) === 0) {
    State.update({
      amount0: "",
      isToken0Approved: true,
      isToken1Approved: true,
    });
    return;
  }

  State.update({
    isLoading: true,
    isError: false,
    loadingMsg: "Computing deposit amount...",
  });
  const token1Wei = ethers.utils.parseUnits(
    Big(amount).toFixed(decimals1),
    decimals1
  );

  const proxyAbi = [
    "function getDepositAmount(address, address, uint256) public view returns (uint256, uint256)",
  ];
  const proxyContract = new ethers.Contract(
    proxyAddress,
    proxyAbi,
    Ethers.provider()
  );

  proxyContract
    .getDepositAmount(hypeAddress, addresses[token1], token1Wei)
    .then((depositAmount) => {
      const amount0 = getFromDepositAmount(depositAmount, decimals0);
      State.update({ amount0 });
      State.update({ isLoading: false });
      checkApproval(amount0, amount);
    })
    .catch((e) => {
      State.update({
        isLoading: true,
        isError: true,
        amount0: 0,
        loadingMsg: "Something went wrong. Please try again.",
      });
    });
};

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

  const toastId = props.toast?.loading({
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

  const tokenContract = new ethers.Contract(
    addresses[_token],
    abi,
    Ethers.provider().getSigner()
  );

  tokenContract
    .approve(hypeAddress, tokenWei)
    .then((tx) => tx.wait())
    .then((receipt) => {
      const payload = isToken0
        ? { isToken0Approved: true, isToken0Approving: false }
        : { isToken1Approved: true, isToken1Approving: false };

      State.update({ ...payload, isLoading: false, loadingMsg: "" });
      props.toast?.dismiss(toastId);
      props.toast?.success({
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
      props.toast?.dismiss(toastId);
      props.toast?.fail({
        title: "Approve Failed!",
        text: error?.message?.includes("user rejected transaction")
          ? "User rejected transaction"
          : `Approve ${amount} ${_token}`,
      });
    });
};
const handleDeposit = () => {
  const toastId = props.toast?.loading({
    title: `Depositing...`,
  });
  State.update({
    isLoading: true,
    isError: false,
    loadingMsg: "Depositing...",
  });

  const token0Wei = ethers.utils.parseUnits(
    Big(amount0).toFixed(decimals0),
    decimals0
  );
  const token1Wei = ethers.utils.parseUnits(
    Big(amount1).toFixed(decimals1),
    decimals1
  );

  const proxyAbi = [
    "function deposit(uint256, uint256,address,address,uint256[4] memory)  external returns (uint256)",
  ];

  const proxyContract = new ethers.Contract(
    proxyAddress,
    proxyAbi,
    Ethers.provider().getSigner()
  );
  proxyContract
    .deposit(token0Wei, token1Wei, sender, hypeAddress, [0, 0, 0, 0])
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
        template: "Gamma",
        status: status,
        add: can_add_action,
        transactionHash,
        chain_id: props.chainId,
      });

      State.update({
        isLoading: false,
        isPostTx: true,
      });

      setTimeout(() => State.update({ isPostTx: false }), 10_000);

      const { refetch } = props;
      if (refetch) refetch();

      props.toast?.dismiss(toastId);
      props.toast?.success({
        title: "Deposit Successfully!",
      });
    })
    .catch((error) => {
      State.update({
        isError: true,
        isLoading: false,
        loadingMsg: error,
      });
      props.toast?.dismiss(toastId);
      props.toast?.fail({
        title: "Deposit Failed!",
        text: error?.message?.includes("user rejected transaction")
          ? "User rejected transaction"
          : "",
      });
    });
};

const handleWithdraw = () => {
  const toastId = props.toast?.loading({
    title: `Withdrawing...`,
  });
  State.update({
    isLoading: true,
    isError: false,
    loadingMsg: "Withdrawing...",
  });

  const lpWeiAmount = ethers.utils.parseUnits(Big(lpAmount).toFixed(18), 18);
  const abi = [
    "function withdraw(uint256, address, address,uint256[4] memory) external returns (uint256, uint256)",
  ];

  const hypeContract = new ethers.Contract(
    hypeAddress,
    abi,
    Ethers.provider().getSigner()
  );

  hypeContract
    .withdraw(lpWeiAmount, sender, sender, [0, 0, 0, 0])
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
        template: "Gamma",
        status: status,
        add: can_add_action,
        transactionHash,
        chain_id: state.chainId,
      });

      setTimeout(() => State.update({ isPostTx: false }), 10_000);

      const { refetch } = props;
      if (refetch) refetch();

      props.toast?.dismiss(toastId);
      props.toast?.success({
        title: "Withdraw Successfully!",
      });
    })
    .catch((error) => {
      State.update({
        isError: true,
        isLoading: false,
        loadingMsg: error,
      });
      props.toast?.dismiss(toastId);
      props.toast?.fail({
        title: "Withdraw Failed!",
        text: error?.message?.includes("user rejected transaction")
          ? "User rejected transaction"
          : "",
      });
    });
};

const DELAY = 1000 * 60 * 5;
const timer = Storage.privateGet("priceTimer");
function getPrice() {
  asyncFetch("/dapdap/get-token-price-by-dapdap", {
    Authorization: AccessKey,
  })
    .then((res) => {
      const data = JSON.parse(res.body);
      data.native = data.aurora;
      delete data.aurora;
      Storage.privateSet("tokensPrice", data);
      setTimeout(getPrice, DELAY);
    })
    .catch((err) => {
      setTimeout(getPrice, DELAY);
    });
}
if (!Storage.privateGet("priceTimer")) {
  getPrice();
  Storage.privateSet("priceTimer", 1);
}

const tokensPrice = Storage.privateGet("tokensPrice");

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
  !lpAmount || !lpBalance || !curPositionUSD
    ? "-"
    : parseFloat(
      Big(lpAmount)
        .div(Big(lpBalance).gt(0) ? lpBalance : 1)
        .times(curPositionUSD)
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
    .toFixed();

  handleLPChange(newLpValue);
};

useEffect(() => {
  if (amount0) {
    handleToken0Change(amount0);
  }
}, [data]);

return (
  <Wrapper>
    <FilterButtonList>
      <FilterButton className={isDeposit ? 'isActive' : ''} onClick={() => changeMode(true)}>Deposit</FilterButton>
      <FilterButton className={!isDeposit ? 'isActive' : ''} onClick={() => changeMode(false)}>Withdraw</FilterButton>
    </FilterButtonList>
    {
      isDeposit ? <>
        <Row className="price-input">
          <Column>
            <InputWrap>
              <Input value={amount0} type="number" onChange={(e) => handleToken0Change(e.target.value)} />
              <InputSuffix>
                <img src={ICON_VAULT_MAP[token0]} alt={token0} />
                <span>{token0}</span>
              </InputSuffix>
            </InputWrap>
            <PriceWrap>
              <TotalPrice>${balance0}</TotalPrice>
              <BalancePrice>Balance:<span>{balances[token0]}</span> {token0}</BalancePrice>
            </PriceWrap>
          </Column>
          <Column>
            <InputWrap>
              <Input value={amount1} type="number" onChange={(e) => handleToken1Change(e.target.value)} />
              <InputSuffix>
                <img src={ICON_VAULT_MAP[token1]} alt={token1} />
                <span>{token1}</span>
              </InputSuffix>
            </InputWrap>
            <PriceWrap>
              <TotalPrice>${balance1}</TotalPrice>
              <BalancePrice>Balance:<span>{balances[token1]}</span> {token1}</BalancePrice>
            </PriceWrap>
          </Column>
        </Row>
        <StyledButtonList>
          {/* <StyledButton><StyledLoading>{iconCircle}</StyledLoading></StyledButton> */}
          {isInSufficient && <StyledButton disabled>InSufficient Balance</StyledButton>}
          {
            !isInSufficient &&
            (isToken0Approved &&
              isToken1Approved &&
              !isToken0Approving &&
              !isToken1Approving ? (

              <StyledButton disabled={isLoading || !amount0 || !amount1}>
                {
                  isLoading ? (
                    <StyledLoading>{iconCircle}</StyledLoading>
                  ) : (
                    "Deposit"
                  )
                }
              </StyledButton>
            ) : (
              <>
                <StyledButton disabled={isToken0Approved || isToken0Approving} onClick={() => handleApprove(true)}>{
                  isToken0Approving ? (
                    <StyledLoading>{iconCircle}</StyledLoading>
                  ) : (
                    <>
                      {isToken0Approved ? "Approved" : "Approve"} {token0}
                    </>
                  )}
                </StyledButton>
                <StyledButton disabled={isToken1Approved || isToken1Approving} onClick={() => handleApprove(false)}>{
                  isToken1Approving ? (
                    <StyledLoading>{iconCircle}</StyledLoading>
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
                  <img src={ICON_VAULT_MAP[token0]} alt={token0} />
                  <img src={ICON_VAULT_MAP[token1]} alt={token1} style={{ marginLeft: -6 }} />
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
              <StyledLoading>{iconCircle}</StyledLoading>
            ) : (
              <>
                {isWithdrawInsufficient ? "InSufficient Balance" : "Withdraw"}
              </>
            )}
          </StyledButton>
        </StyledButtonList>
      </>
    }

  </Wrapper>
)