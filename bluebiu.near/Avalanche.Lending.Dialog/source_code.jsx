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
  background-color: #273046;
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
  margin-left: 8px;
  font-size: 16px;
  font-weight: 400;
  color: #fff;
  &.supply-color {
    color: var(--supply-color);
  }
  &.borrow-color {
    color: var(--borrow-color);
  }
`;
const CloseIcon = styled.div`
  color: #979abe;
`;
const AssetWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 20px;
`;
const Token = styled.div`
  display: flex;
  flex-shrink: 0;
`;
const TokenLogo = styled.img`
  width: 22px;
  height: 22px;
  border-radius: 50%;
  margin-right: 4px;
`;
const TokenSymbol = styled.div`
  font-size: 16px;
  color: #fff;
  font-weight: 400;
`;
const InputWrapper = styled.div`
  height: 55px;
  border-radius: 10px;
  background-color: rgba(22, 24, 38, 0.5);
  display: flex;
  align-items: center;
  margin-top: 20px;
  padding: 0px 10px;
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
    color: #979abe;
  }
`;
const InputBalance = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: 12px;
  font-weight: 400;
  color: #979abe;
  margin-top: 4px;
  margin-bottom: 10px;
`;
const BalanceValue = styled.div``;
const BalanceWrapper = styled.div`
  text-align: right;
  cursor: pointer;
`;
const Balance = styled.span`
  font-weight: 400;
  text-decoration: underline;
`;
const Row = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 10px 0px;
  font-size: 16px;
  font-weight: 400;
  &.justfiy-start {
    justify-content: flex-start;
    gap: 10px;
  }
`;
const Label = styled.div`
  color: #979abe;
`;
const Value = styled.div`
  color: #fff;
  text-align: right;
  &.range {
    text-decoration: line-through;
  }
`;
const Tips = styled.div`
  height: 28px;
  border-radius: 6px;
  background-color: var(--switch-color);
  display: flex;
  align-items: center;
  color: #fff;
  padding: 0px 20px;
  margin-top: 10px;
  .icon {
    margin-right: 4px;
    flex-shrink: 0;
    margin-top: -1px;
  }
`;
const ValuesWrapper = styled.div`
  display: flex;
  align-items: center;
  .mx_5 {
    margin: 0px 5px;
  }
`;
const CollateralToken = styled.div`
  font-size: 16px;
  font-weight: 400;
  color: #fff;
  display: flex;
  gap: 4px;
  padding-top: 20px;
`;
const AssetLabel = styled.div`
  font-size: 16px;
  font-weight: 400;
  color: #979abe;
`;
const Dapp = styled.div`
  padding: 0px 6px;
  height: 26px;
  border-radius: 6px;
  background-color: rgba(151, 154, 190, 0.2);
  gap: 6px;
  display: flex;
  align-items: center;
  padding: 10px;
`;
const DappIcon = styled.img`
  width: 14px;
  height: 14px;
  border-radius: 50%;
`;
const DappName = styled.div`
  font-size: 14px;
  font-weight: 400;
  color: #fff;
`;
const TokenSelect = styled.div`
  display: flex;
  align-items: center;
  gap: 6px;
  color: #fff;
`;
const TopBox = styled.div`
  padding: 30px 20px 10px;
  border-bottom: 1px dashed #454967;

  &.none-border {
    border-bottom: none;
  }
`;
const BottomBox = styled.div`
  padding: 10px 20px 20px;
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

const { display, data, onClose, onSuccess, onMessage } = props;
if (!data) return "";
const actionText = data.actionText;
const isSupply = ["Deposit", "Withdraw"].includes(actionText);
const isBorrow = ["Repay", "Borrow"].includes(actionText);
const isForCollateral = !isSupply && !isBorrow;
const account = Ethers.send("eth_requestAccounts", [])[0];
const tokenSymbol = data.underlyingToken.symbol;
State.init({
  amount: "",
  processValue: 0,
});

const formatBorrowLimit = (digits, round) => {
  return Big(data.totalCollateralUsd)
    .minus(data.userTotalBorrowUsd)
    .toFixed(digits || 2, round || 1);
};

console.log("data: ", data);

const formatBalance = () => {
  if (state.balanceLoading) return "Loading";
  if (!state.balance) return "-";
  if (Big(state.balance).eq(0)) return "0";
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
    : Big(0);
  const params = {
    amount: amount,
    processValue: precent.gt(100) ? 100 : precent.toNumber(),
  };
  let isOverSize = false;
  const value = Big(amount).mul(data.underlyingPrice);
  if (isSupply) {
    if (actionText === "Withdraw") {
      params.borrowLimit = Big(data.totalCollateralUsd)
        .minus(data.userTotalBorrowUsd)
        .minus(value)
        .toFixed(2);
    }
    if (actionText === "Deposit") {
      params.borrowLimit = Big(data.totalCollateralUsd)
        .plus(value.mul(data.loanToValue / 100))
        .toFixed(2);
    }
  }
  if (isBorrow) {
    if (actionText === "Borrow") {
      params.borrowBalance = value.plus(data.userTotalBorrowUsd).toFixed(2);
      isOverSize = value.gt(
        Big(data.totalCollateralUsd).minus(data.userTotalBorrowUsd)
      );
    }
    if (actionText === "Repay") {
      params.borrowBalance = Big(data.userTotalBorrowUsd).minus(value);
      params.borrowLimit = Big(data.totalCollateralUsd)
        .minus(data.userTotalBorrowUsd)
        .add(value)
        .toFixed(2);
      isOverSize = value.gt(data.userTotalBorrowUsd);
    }
  }
  params.isBigerThanBalance = Big(amount).gt(state.balance);
  params.buttonClickable = !isOverSize && !params.isBigerThanBalance;
  params.isOverSize = isOverSize;
  params.isEmpty = false;
  State.update(params);
};

const getBalance = () => {
  const isUnderlying = ["Deposit", "Repay"].includes(actionText);
  State.update({
    balanceLoading: true,
  });
  if (
    isUnderlying &&
    (data.underlyingToken.address === "native" ||
      data.underlyingToken.description === "native")
  ) {
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
  if (isUnderlying) {
    const TokenContract = new ethers.Contract(
      data.underlyingToken.address,
      ERC20_ABI,
      Ethers.provider().getSigner()
    );
    TokenContract.balanceOf(account).then((rawBalance) => {
      const _rawBalance = ethers.utils.formatUnits(
        rawBalance._hex,
        data.underlyingToken.decimals
      );
      State.update({
        balance: _rawBalance,
        balanceLoading: false,
      });
    });
    return;
  }
  if (actionText === "Withdraw") {
    State.update({
      balance: data.userSupply,
      balanceLoading: false,
    });
    return;
  }
  if (actionText === "Borrow") {
    const borrowAvailable = Big(data.totalCollateralUsd)
      .minus(data.userTotalBorrowUsd)
      .div(data.underlyingPrice || 1);
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
if (Storage.privateGet("prevAddress") !== data.address && display) {
  let borromLimit = "";
  let _borrowLimit = Big(data.totalCollateralUsd).minus(
    data.userTotalBorrowUsd
  );
  let buttonClickable = false;
  if (actionText === "Enable as Collateral") {
    borromLimit = _borrowLimit.add(
      Big(data.loanToValue / 100).mul(data.userSupply || 0)
    );
    buttonClickable = true;
  }
  if (actionText === "Disable as Collateral") {
    borromLimit = _borrowLimit.minus(
      Big(data.loanToValue / 100).mul(data.userSupply || 0)
    );
    buttonClickable = !borromLimit.lt(data.userTotalBorrowUsd);
  }
  State.update({
    borrowLimit: borromLimit
      ? !borromLimit.gt(0)
        ? "0.00"
        : borromLimit.toFixed(2)
      : "",
    amount: "",
    buttonClickable,
    processValue: 0,
    borrowBalance: "",
  });
  getBalance();
  Storage.privateSet("prevAddress", data.address);
}

return (
  <Dialog className={display ? "display" : ""}>
    <Overlay>
      <Content>
        <TopBox className={isForCollateral && "none-border"}>
          <Header>
            <Title>
              <span>
                {isForCollateral ? "Collateral" : actionText}{" "}
                {!isForCollateral && tokenSymbol}
              </span>
              {!isForCollateral && (
                <Apy className={isSupply ? "supply-color" : "borrow-color"}>
                  APY {isSupply ? data.supplyApy : data.borrowApy}
                </Apy>
              )}
            </Title>
            <CloseIcon>
              <Widget
                src="bluebiu.near/widget/Arbitrum.Swap.CloseIcon"
                props={{ onClose: handleClose, size: 18 }}
              />
            </CloseIcon>
          </Header>
          {isForCollateral && (
            <CollateralToken>
              {actionText === "Disable as Collateral"
                ? "Disabling"
                : "Enabling"}
              <Token>
                <TokenLogo src={data.icon} />
                <TokenSymbol>{tokenSymbol}</TokenSymbol>
              </Token>
              as Collateral
            </CollateralToken>
          )}
          {!isForCollateral && (
            <>
              <AssetWrapper>
                <AssetLabel>Asset from</AssetLabel>
                <Dapp>
                  <DappIcon src={data.dappIcon} />
                  <DappName>{data.dappName}</DappName>
                </Dapp>
              </AssetWrapper>
              <InputWrapper>
                <Input
                  value={state.amount}
                  onChange={(ev) => {
                    handleAmountChange(ev.target.value);
                  }}
                  placeholder="0.0"
                />
                <TokenSelect>
                  <TokenSymbol>{tokenSymbol}</TokenSymbol>
                </TokenSelect>
              </InputWrapper>
              <InputBalance>
                <BalanceValue>
                  ≈ $
                  {state.amount
                    ? Big(state.amount).mul(data.underlyingPrice).toFixed(2)
                    : "-"}
                </BalanceValue>
                <BalanceWrapper
                  onClick={() => {
                    if (state.balanceLoading || isNaN(state.balance)) return;
                    const amount = Big(state.balance).toFixed(4, 0);
                    handleAmountChange(amount);
                    State.update({
                      amount: parseFloat(amount).toString(),
                    });
                  }}
                >
                  Available
                  <Balance>{formatBalance()}</Balance>
                </BalanceWrapper>
              </InputBalance>
              {isSupply && (
                <Widget
                  src="bluebiu.near/widget/Avalanche.Lending.Process"
                  props={{
                    value: state.processValue,
                    onChange: (value) => {
                      const amount = Big(state.balance)
                        .mul(value / 100)
                        .toFixed(4, 0);
                      State.update({
                        processValue: value,
                        amount,
                      });
                      handleAmountChange(amount);
                    },
                  }}
                />
              )}
            </>
          )}
        </TopBox>
        <BottomBox>
          {actionText === "Deposit" && (
            <>
              <Row>
                <Label>Collateral factor</Label>
                <Value>{Number(data.loanToValue).toFixed(0)} %</Value>
              </Row>

              {/* <Row>
                <Label>Use as Collateral</Label>
                <Value>
                  <Widget
                    src="bluebiu.near/widget/Avalanche.Lending.Switch"
                    props={{
                      disabled: true,
                      active: data.userMerberShip,
                    }}
                  />
                </Value>
              </Row> */}
            </>
          )}
          <Row className={isForCollateral && "justfiy-start"}>
            <Label>Borrow Limit</Label>
            <ValuesWrapper>
              <Value className={!!state.borrowLimit && "range"}>
                ${formatBorrowLimit(2)}
              </Value>
              {!!state.borrowLimit && (
                <>
                  <div className="mx_5">
                    <Widget
                      src="bluebiu.near/widget/0vix.LendingArrowIcon"
                      props={{ color: "#979ABE" }}
                      className="mx_5"
                    />
                  </div>
                  <Value>${state.borrowLimit}</Value>
                </>
              )}
            </ValuesWrapper>
          </Row>
          {actionText === "Repay" && (
            <Row>
              <Label>Remaining Debt</Label>
              <ValuesWrapper>
                <Value className={!!state.borrowBalance && "range"}>
                  ${Big(data.userTotalBorrowUsd).toFixed(2)}
                </Value>
                {!!(isBorrow && state.borrowBalance) && (
                  <>
                    <div className="mx_5">
                      <Widget
                        src="bluebiu.near/widget/0vix.LendingArrowIcon"
                        props={{ color: "#979ABE" }}
                        className="mx_5"
                      />
                    </div>
                    <Value>${Big(state.borrowBalance).toFixed(2)}</Value>
                  </>
                )}
              </ValuesWrapper>
            </Row>
          )}
          {/* {!!state.isOverSize && (
            <Tips style={{ marginBottom: 0 }}>
              <div className="icon">
                <Widget src="bluebiu.near/widget/0vix.LendingInfoIcon" />
              </div>
              Amount must be &lt;= 99% borrow limit.
            </Tips>
          )}
          {!!state.isEmpty && (
            <Tips style={{ marginBottom: 0 }}>
              <div className="icon">
                <Widget src="bluebiu.near/widget/0vix.LendingInfoIcon" />
              </div>
              Amount must be &gt;0
            </Tips>
          )}
          {!!state.isBigerThanBalance && (
            <Tips style={{ marginBottom: 0 }}>
              <div className="icon">
                <Widget src="bluebiu.near/widget/0vix.LendingInfoIcon" />
              </div>
              Amount must be &lt;= balance
            </Tips>
          )} */}
          <Widget
            src="bluebiu.near/widget/Avalanche.Lending.DialogButton"
            props={{
              disabled: !state.buttonClickable,
              actionText,
              amount: state.amount,
              data: data,
              onSuccess: () => {
                handleClose();
                onSuccess?.();
              },
              onMessage: onMessage,
            }}
          />
        </BottomBox>
      </Content>
    </Overlay>
  </Dialog>
);
