const Yours = styled.div`
  display: flex;
  gap: 20px;
`;
const YoursTableWrapper = styled.div`
  background-color: rgba(53, 55, 73, 0.2);
  border-radius: 6px;
  width: 50%;
`;
const Title = styled.div`
  padding: 20px;
  border-bottom: 1px solid #292c42;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;
const Label = styled.div`
  font-size: 14px;
  font-weight: 400;
  color: #7c7f96;
  &.yours-table-title {
    color: var(--yours-table-title);
  }
`;
const Value = styled.div`
  font-size: 18px;
  font-weight: 700;
  margin-top: 4px;
  color: #fff;
  &.supply-color {
    color: var(--supply-color);
  }
  &.borrow-color {
    color: var(--borrow-color);
  }
`;
const Right = styled.div`
  text-align: right;
`;

const {
  dexConfig,
  account,
  multicall,
  multicallAddress,
  tvl,
  deposits,
  tokenBal,
} = props;

return (
  <>
    {/* <Yours>
      <YoursTableWrapper>
        <Title>
          <div>
            <Label className="yours-table-title">You Deposit</Label>
            <Value className="supply-color">
              <Widget
                src="bluebiu.near/widget/Avalanche.Lending.Total"
                props={{
                  total: state.userTotalSupplyUsd,
                  digit: 2,
                  unit: "$",
                }}
              />
            </Value>
          </div>
          <Right>
            <Label>Net APY</Label>
            <Value>{currentDapp === "All" ? "-" : state.netApy}%</Value>
          </Right>
        </Title>
        <Widget
          src="bluebiu.near/widget/Avalanche.Lending.DepositTable"
          props={{
            data: state.supplies || [],
            onButtonClick: props.onButtonClick,
          }}
        />
      </YoursTableWrapper>
      <YoursTableWrapper>
        <Title>
          <div>
            <Label className="yours-table-title">Borrow</Label>
            <Value className="borrow-color">
              <Widget
                src="bluebiu.near/widget/Avalanche.Lending.Total"
                props={{
                  total: state.userTotalBorrowUsd,
                  digit: 2,
                  unit: "$",
                }}
              />
            </Value>
          </div>
          <Right>
            <Label>Your Borrow Limit</Label>
            <Value>{state.userBorrowLimit}%</Value>
          </Right>
        </Title>
        <Widget
          src="bluebiu.near/widget/Avalanche.Lending.BorrowTable"
          props={{
            data: state.borrows || [],
            onButtonClick: props.onButtonClick,
          }}
        />
      </YoursTableWrapper>
    </Yours> */}
    <Widget
      src="bluebiu.near/widget/Lending.LiquityPools"
      props={{
        ...props,
        markets: state.markets,
        tvl: tvl,
        deposits: deposits,
        tokenBal: tokenBal,
      }}
    />
  </>
);
