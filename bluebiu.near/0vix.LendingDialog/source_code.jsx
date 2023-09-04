const Dialog = styled.div`
  position: fixed;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
  display: none;
  &.display {
    display: block;
  }
`;
const Overlay = styled.div`
  width: 100%;
  height: 100%;
  background-color: rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(10px);
  position: absolute;
  z-index: 8000;
  display: flex;
  justify-content: center;
  align-items: center;
  @media (max-width: 640px) {
    align-items: flex-end;
  }
`;
const Content = styled.div`
  background-color: #25273a;
  border-radius: 16px;
  width: 396px;
  @media (max-width: 640px) {
    width: 100%;
    border-radius: 16px 16px 0px 0px;
  }
`;
const Header = styled.div`
  display: flex;
  justify-content: space-between;
`;
const Title = styled.div`
  font-size: 16px;
  font-weight: 500;
  color: #fff;
`;
const Apy = styled.span`
  color: #8b71c2;
  margin-left: 8px;
`;
const CloseIcon = styled.div`
  color: #7c7f96;
`;
const InputWrapper = styled.div`
  background-color: rgba(0, 0, 0, 0.3);
  border-radius: 10px;
  height: 56px;
  display: flex;
  align-items: center;
  padding: 0px 16px;
  margin-top: 20px;
`;
const Input = styled.input`
  font-size: 18px;
  color: #fff;
  font-weight: 500;
  background-color: transparent;
  outline: none;
  border: none;
  height: 22px;
  vertical-align: bottom;
  flex-grow: 1;

  &::placeholder {
    color: #7c7f96;
  }
`;
const TokenWrapper = styled.div`
  display: flex;
  flex-shrink: 0;
`;
const TokenLogo = styled.img`
  width: 22px;
  height: 22px;
  border-radius: 50%;
  margin-right: 8px;
`;
const TokenSymbol = styled.div`
  font-size: 18px;
  color: #fff;
  font-weight: 500;
`;
const InputBalance = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;
const InputMax = styled.div`
  color: #7c7f96;
  font-size: 14px;
  font-weight: 400;
  text-decoration: underline;
  cursor: pointer;
`;
const BalanceWrapper = styled.div`
  text-align: right;
  color: #7c7f96;
  font-size: 14px;
  font-weight: 400;
  margin-top: 10px;
  cursor: pointer;
`;
const Balance = styled.span`
  font-weight: 400;
`;
const Split = styled.div`
  width: 100%;
  height: 1px;
  background-color: #332c4b;
`;
const Row = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 10px 0px;
  font-size: 16px;
  font-weight: 400;
`;
const Label = styled.div`
  color: #7c7f96;
`;
const Value = styled.div`
  color: #fff;
  text-align: right;
`;
const CollateralTips = styled.div`
  background-color: rgba(121, 79, 221, 0.25);
  border-radius: 12px;
  padding: 10px;
  line-height: 16.8px;
  font-size: 14px;
  font-weight: 400;
  color: #fff;
  margin-top: 10px;
  margin-bottom: 20px;
  display: flex;
  .icon {
    margin-right: 4px;
    flex-shrink: 0;
  }
`;
const ApproveTips = styled.div`
  background-color: rgba(121, 79, 221, 0.25);
  border-radius: 24px;
  padding: 0px 10px;
  line-height: 28px;
  font-size: 14px;
  font-weight: 400;
  color: #fff;
  margin-top: 10px;
  margin-bottom: 10px;
  display: flex;
  align-items: center;
  .icon {
    margin-right: 4px;
    flex-shrink: 0;
    margin-top: -1px;
  }
`;
const TopBox = styled.div`
  padding: 30px 30px 10px;
`;
const Box = styled.div`
  padding: 10px 30px 30px;
`;
const ValuesWrapper = styled.div`
  display: flex;
  .mx_5 {
    margin: 0px 5px;
  }
`;
const ERC20_ABI = [
  {
    constant: true,
    inputs: [
      {
        name: "_owner",
        type: "address",
      },
    ],
    name: "balanceOf",
    outputs: [
      {
        name: "balance",
        type: "uint256",
      },
    ],
    payable: false,
    stateMutability: "view",
    type: "function",
  },
];

const {
  display,
  data,
  accountLiquidity,
  userTotalBorrowUsd,
  onClose,
  onSuccess,
  onMessage,
} = props;
if (!data) return "";

const actionText = data.actionText;
const marketData = data.record;
const isSupply = ["Supply", "Withdraw"].includes(actionText);
const isBorrow = ["Repay", "Borrow"].includes(actionText);
const isCollateral = !isSupply && !isBorrow;
const account = Ethers.send("eth_requestAccounts", [])[0];
const tokenSymbol = marketData.symbol.slice(1).toUpperCase();

State.init({
  amount: "",
  processValue: 0,
});

const formatBorrowLimit = (digits) => {
  return Big(userTotalBorrowUsd)
    .plus(accountLiquidity)
    .toFixed(digits || 2);
};
const formatBorrowLimitUsed = () => {
  const borrowLimit = formatBorrowLimit(10);
  if (Big(borrowLimit).eq(0)) return "0.00";
  return Big(userTotalBorrowUsd).div(borrowLimit).mul(100).toFixed(2);
};
const formatBalance = () => {
  if (state.balanceLoading) return "Loading";
  if (!state.balance) return "-";
  if (state.balance === "0") return "0";
  if (Big(state.balance).lt(0.0001)) return "<0.0001";
  return Big(state.balance).toFixed(4, 0);
};

const handleAmountChange = (amount) => {
  if (isNaN(Number(amount))) return;
  const isZero = Big(amount || 0).eq(0);
  if (isZero) {
    State.update({
      amount,
      buttonClickable: false,
      borrowLimit: "",
      borrowLimitUsed: "",
      borrowBalance: "",
      isEmpty: Number(amount) === 0 && amount !== "",
      isOverSize: false,
      isBigerThanBalance: false,
    });
    return;
  }
  const precent = !Big(state.balance || 0).eq(0)
    ? Big(amount).div(state.balance).mul(100)
    : 0;

  const params = {
    amount: amount,
    processValue: precent.gt(100) ? 100 : precent.toNumber(),
  };
  let _borrowLimitUsed;
  if (isSupply) {
    if (actionText === "Withdraw") {
      params.borrowLimit = Big(formatBorrowLimit(10))
        .minus(Big(amount).mul(marketData.underlyingPrice))
        .toFixed(2);
    }
    if (actionText === "Supply") {
      params.borrowLimit = Big(formatBorrowLimit(10))
        .plus(
          Big(amount)
            .mul(marketData.underlyingPrice)
            .mul(marketData.loanToValue)
            .div(100)
        )
        .toFixed(2);
    }
    _borrowLimitUsed = Big(params.borrowLimit).eq(0)
      ? 0
      : Big(userTotalBorrowUsd).div(params.borrowLimit).mul(100);
  }
  if (isBorrow) {
    if (actionText === "Borrow") {
      params.borrowBalance = Big(amount)
        .mul(marketData.underlyingPrice)
        .plus(userTotalBorrowUsd)
        .toFixed(2);
    }
    if (actionText === "Repay") {
      const _borrowBalance = Big(userTotalBorrowUsd).minus(
        Big(amount).mul(marketData.underlyingPrice)
      );
      params.borrowBalance = _borrowBalance.gt(0)
        ? _borrowBalance.toFixed(2)
        : 0;
    }
    const borromLimit = formatBorrowLimit(6);
    _borrowLimitUsed = params.borrowBalance
      ? Big(params.borrowBalance)
          .div(borromLimit || 1)
          .mul(100)
      : 0;
  }
  params.borrowLimitUsed = _borrowLimitUsed.gt(100)
    ? ">100"
    : _borrowLimitUsed.lt(0)
    ? "infinity"
    : _borrowLimitUsed.eq(0)
    ? ""
    : _borrowLimitUsed.toFixed(2);

  const isOverSize = ["Withdraw", "Borrow"].includes(actionText)
    ? params.borrowLimitUsed === "infinity" || params.borrowLimitUsed === ">100"
    : false;
  params.isBigerThanBalance = Big(amount).gt(state.balance);
  params.buttonClickable = !isOverSize && !params.isBigerThanBalance;
  params.isOverSize = isOverSize
    ? true
    : Big(params.borrowLimitUsed || 0).gt(99);
  params.isEmpty = false;
  State.update(params);
};

const getBalance = () => {
  const isUnderlying = ["Supply", "Repay"].includes(actionText);
  State.update({
    balanceLoading: true,
  });
  if (isUnderlying && marketData.underlyingToken.address === "native") {
    Ethers.provider()
      .getBalance(account)
      .then((rawBalance) => {
        State.update({
          balance: ethers.utils.formatUnits(rawBalance._hex, 18),
          balanceLoading: false,
        });
      });
    return;
  }
  if (isUnderlying || actionText === "Withdraw") {
    const TokenContract = new ethers.Contract(
      isUnderlying ? marketData.underlyingToken.address : marketData.address,
      ERC20_ABI,
      Ethers.provider().getSigner()
    );
    TokenContract.balanceOf(account).then((rawBalance) => {
      const _rawBalance = ethers.utils.formatUnits(
        rawBalance._hex,
        isUnderlying ? marketData.underlyingToken.decimals : marketData.decimals
      );
      const _balance = isUnderlying
        ? _rawBalance
        : Big(marketData.exchangeRateStored).mul(_rawBalance).toString();

      State.update({
        balance: _balance,
        balanceLoading: false,
      });
    });
    return;
  }
  if (actionText === "Borrow") {
    const borrowLimit = formatBorrowLimit(5);
    const borrowAvailable = Big(borrowLimit)
      .minus(userTotalBorrowUsd)
      .div(marketData.underlyingPrice || 1);
    State.update({
      balance: Big(borrowAvailable).toString(),
      balanceLoading: false,
    });
    return;
  }
};
const handleClose = () => {
  onClose?.();
  Storage.privateSet("prevAddress", "");
};
if (Storage.privateGet("prevAddress") !== marketData.address && display) {
  State.update({
    borrowLimit: "",
    borrowLimitUsed: "",
    borrowBalance: "",
    amount: "",
    buttonClickable: false,
    processValue: 0,
  });
  getBalance();
  Storage.privateSet("prevAddress", marketData.address);
}

return (
  <Dialog className={display ? "display" : ""}>
    <Overlay>
      <Content>
        <TopBox>
          <Header>
            <Title>
              <span>
                {isCollateral ? actionText : actionText.toUpperCase()}{" "}
                {!isCollateral && tokenSymbol}
              </span>
              {!isCollateral && (
                <Apy>
                  {isSupply ? marketData.supplyApy : marketData.borrowApy} APY
                </Apy>
              )}
            </Title>
            <CloseIcon>
              <Widget
                src="bluebiu.near/widget/Base.BaseCloseIcon"
                props={{ onClose: handleClose, size: 18 }}
              />
            </CloseIcon>
          </Header>
          {!isCollateral && (
            <>
              <InputWrapper>
                <Input
                  value={state.amount}
                  onChange={(ev) => {
                    handleAmountChange(ev.target.value);
                  }}
                  placeholder="0.0"
                />
                <TokenWrapper>
                  <TokenLogo src={marketData.logo} />
                  <TokenSymbol>{tokenSymbol}</TokenSymbol>
                </TokenWrapper>
              </InputWrapper>
              <InputBalance>
                <InputMax
                  onClick={() => {
                    if (state.balanceLoading || isNaN(state.balance)) return;
                    if (actionText === "Repay") {
                      const amount = Big(state.balance).toFixed(4, 0);
                      handleAmountChange(amount);
                      return;
                    }
                    if (actionText === "Borrow") {
                      const borrowLimit = formatBorrowLimit(5);
                      handleAmountChange(
                        Big(borrowLimit)
                          .mul(0.7)
                          .minus(userTotalBorrowUsd)
                          .div(marketData.underlyingPrice || 1)
                          .toFixed(4)
                      );
                      return;
                    }
                  }}
                >
                  {actionText === "Borrow"
                    ? "Safe Max"
                    : actionText === "Repay"
                    ? "Max"
                    : ""}
                </InputMax>
                <BalanceWrapper
                  onClick={() => {
                    if (
                      state.balanceLoading ||
                      isNaN(state.balance) ||
                      actionText === "Repay"
                    )
                      return;
                    const amount = Big(state.balance).toFixed(4);
                    handleAmountChange(amount);
                    State.update({
                      amount,
                    });
                  }}
                >
                  {["Withdraw", "Borrow"].includes(actionText)
                    ? "Available"
                    : actionText === "Supply"
                    ? "Balance"
                    : "Wallet Balance"}
                  :{" "}
                  <Balance
                    style={{
                      textDecoration:
                        actionText === "Repay" ? "none" : "underline",
                    }}
                  >
                    {formatBalance()}
                  </Balance>
                </BalanceWrapper>
              </InputBalance>
              <Widget
                src="bluebiu.near/widget/0vix.LendingProgress"
                props={{
                  value: state.processValue,
                  onChange: (value) => {
                    const amount = Big(state.balance)
                      .mul(value / 100)
                      .toFixed(4);
                    State.update({
                      processValue: value,
                      amount,
                    });
                    handleAmountChange(amount);
                  },
                }}
              />
            </>
          )}
        </TopBox>
        {!isCollateral && <Split />}
        <Box>
          {isCollateral && (
            <CollateralTips>
              <div className="icon">
                <Widget src="bluebiu.near/widget/0vix.LendingInfoIcon" />
              </div>
              This assets is required to support your borrowed assets. Either
              repay borrowed assets, or supply another asset as collateral.
            </CollateralTips>
          )}
          {!isCollateral && actionText !== "Repay" && (
            <Row>
              <Label>{isSupply ? "Supply" : "Borrow"} APY</Label>
              <Value>
                {isSupply ? marketData.supplyApy : marketData.borrowApy}
              </Value>
            </Row>
          )}
          {actionText === "Repay" && (
            <Row>
              <Label>Your Borrowed</Label>
              <Value>{Big(marketData.userBorrow).toFixed(3)}</Value>
            </Row>
          )}
          {(isSupply || isCollateral) && (
            <Row>
              <Label>Borrow Limit</Label>
              <ValuesWrapper>
                <Value>${formatBorrowLimit(2)}</Value>
                {isSupply && !!state.borrowLimit && (
                  <>
                    <div className="mx_5">
                      <Widget
                        src="bluebiu.near/widget/0vix.LendingArrowIcon"
                        props={{ color: "#8B71C2" }}
                        className="mx_5"
                      />
                    </div>
                    <Value>${state.borrowLimit}</Value>
                  </>
                )}
              </ValuesWrapper>
            </Row>
          )}
          {isBorrow && (
            <Row>
              <Label>Borrow Balance</Label>
              <ValuesWrapper>
                <Value>${Big(userTotalBorrowUsd).toFixed(2)}</Value>
                {!!(isBorrow && state.borrowBalance) && (
                  <>
                    <div className="mx_5">
                      <Widget
                        src="bluebiu.near/widget/0vix.LendingArrowIcon"
                        props={{ color: "#8B71C2" }}
                        className="mx_5"
                      />
                    </div>
                    <Value>${state.borrowBalance}</Value>
                  </>
                )}
              </ValuesWrapper>
            </Row>
          )}
          <Row>
            <Label>Borrow Limit Used</Label>
            <ValuesWrapper>
              <Value>{formatBorrowLimitUsed()}%</Value>
              {!isCollateral && !!state.borrowLimitUsed && (
                <>
                  <div className="mx_5">
                    <Widget
                      src="bluebiu.near/widget/0vix.LendingArrowIcon"
                      props={{ color: "#8B71C2" }}
                    />
                  </div>
                  <Value>{state.borrowLimitUsed}%</Value>
                </>
              )}
            </ValuesWrapper>
          </Row>
          {!isCollateral && (
            <>
              <Row>
                <Label>
                  {isSupply ? "Loan-To-Value" : "Liquidation Threshold"}
                </Label>
                <Value>{Big(marketData.loanToValue || 0).toFixed(0)}%</Value>
              </Row>
              <Row>
                <Label>% of Supply Borrowed</Label>
                <Value>
                  {Big(marketData.totalSupply).eq(0)
                    ? "-"
                    : Big(marketData.totalBorrows)
                        .div(marketData.totalSupply)
                        .mul(100)
                        .toFixed(2)}
                  %
                </Value>
              </Row>
            </>
          )}
          {!!state.isOverSize && (
            <ApproveTips style={{ marginBottom: 0 }}>
              <div className="icon">
                <Widget src="bluebiu.near/widget/0vix.LendingInfoIcon" />
              </div>
              Amount must be &lt;= 99% borrow limit.
            </ApproveTips>
          )}
          {!!state.isEmpty && (
            <ApproveTips style={{ marginBottom: 0 }}>
              <div className="icon">
                <Widget src="bluebiu.near/widget/0vix.LendingInfoIcon" />
              </div>
              Amount must be &gt;0
            </ApproveTips>
          )}
          {!!state.isBigerThanBalance && (
            <ApproveTips style={{ marginBottom: 0 }}>
              <div className="icon">
                <Widget src="bluebiu.near/widget/0vix.LendingInfoIcon" />
              </div>
              Amount must be &lt;= balance
            </ApproveTips>
          )}
          <Widget
            src="bluebiu.near/widget/0vix.LendingDialogButton"
            props={{
              disabled: !state.buttonClickable,
              actionText,
              amount: state.amount,
              market: marketData,
              unitrollerAddress: props.unitrollerAddress,
              onSuccess: () => {
                handleClose();
                onSuccess?.();
              },
              onMessage: onMessage,
            }}
          />
        </Box>
      </Content>
    </Overlay>
  </Dialog>
);
