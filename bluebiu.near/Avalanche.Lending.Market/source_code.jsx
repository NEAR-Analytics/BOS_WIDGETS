const Market = styled.div`
  width: 100%;
`;
const MarketTableHeader = styled.div`
  display: flex;
  align-items: center;
  font-size: 14px;
  font-weight: 500;
  gap: 4px;
  padding-left: 20px;
`;
const Item = styled.div`
  display: flex;
  height: 38px;
  gap: 6px;
  align-items: center;
  justify-content: center;
  color: #fff;
  flex-grow: 1;
  &.td {
    height: 52px;
  }
  &.asset {
    width: 20%;
    color: #7c7f96;
    justify-content: left;
    flex-grow: 0;
  }
  &.w_50 {
    width: 50%;
  }
  &.w_33 {
    width: 33.33333333%;
  }
`;
const MergeItems = styled.div`
  display: flex;
  align-items: center;
  border-radius: 6px;
  &.supply {
    width: 32%;
  }
  &.header-supply {
    background-color: var(--supply-bg-color);
  }
  &.body-supply {
    cursor: pointer;
    &:hover {
      background-color: var(--supply-bg-color);
    }
  }
  &.borrow {
    width: 48%;
  }
  &.header-borrow {
    background-color: var(--borrow-bg-color);
  }
  &.body-borrow {
    cursor: pointer;
    &:hover {
      background-color: var(--borrow-bg-color);
    }
  }
`;
const ArrowIconWrapper = styled.div`
  opacity: 0.3;
  cursor: pointer;
  transform: rotate(90deg);
  &.active {
    opacity: 1;
  }
`;
const Row = styled.div`
  margin-top: 4px;
  display: flex;
  align-items: center;
  font-size: 14px;
  font-weight: 500;
  gap: 4px;
  background-color: rgba(53, 55, 73, 0.2);
  border-radius: 6px;
  padding-left: 20px;
`;

State.init({
  sortKey: "supplyApy",
});

const { currentDapp, markets, dapps, onButtonClick } = props;

const formatData = (sortKey) => {
  const marketsToList = Object.values(markets);
  const data = marketsToList
    .filter((market) => currentDapp === "All" || market.dapp === currentDapp)
    .map((market) => {
      const dapp = dapps[market.dapp];
      return {
        icon: market.icon,
        symbol: market.underlyingToken.symbol,
        dappIcon: dapp.dappIcon,
        dappName: dapp.dappName,
        totalSupply: Big(market.totalSupply)
          .mul(market.underlyingPrice)
          .toString(),
        supplyApy: market.supplyApy,
        totalBorrows: Big(market.totalBorrows)
          .mul(market.underlyingPrice)
          .toString(),
        borrowApy: market.borrowApy,
        liquidity: Big(market.liquidity).mul(market.underlyingPrice).toString(),
        address: market.address,
      };
    });
  data.sort((a, b) => parseInt(b[sortKey]) - parseInt(a[sortKey]));
  State.update({ data });
};

const prevMarketTimestamp = Storage.privateGet("prevMarketTimestampMarket");

if (prevMarketTimestamp !== props.timestamp) {
  if (markets) {
    formatData(state.sortKey);
    Storage.privateSet("prevMarketTimestampMarket", props.timestamp);
  }
}

return (
  <Market>
    <MarketTableHeader>
      <Item className="asset">Asset</Item>
      <MergeItems className="supply header-supply">
        <Item className="w_50">Deposit</Item>
        <Item className="w_50">
          Deposit APY
          <ArrowIconWrapper
            className={state.sortKey === "supplyApy" && "active"}
            onClick={() => {
              State.update({
                sortKey: "supplyApy",
              });
              formateData("supplyApy");
            }}
          >
            <Widget
              src="bluebiu.near/widget/0vix.LendingArrowIcon"
              props={{ color: "#fff" }}
            />
          </ArrowIconWrapper>
        </Item>
      </MergeItems>
      <MergeItems className="borrow header-borrow">
        <Item className="w_33">Borrowed</Item>
        <Item className="w_33">
          Borrow APY
          <ArrowIconWrapper
            className={state.sortKey === "borrowApy" && "active"}
            onClick={() => {
              State.update({
                sortKey: "borrowApy",
              });
              formateData("borrowApy");
            }}
          >
            <Widget
              src="bluebiu.near/widget/0vix.LendingArrowIcon"
              props={{ color: "#fff" }}
            />
          </ArrowIconWrapper>
        </Item>
        <Item className="w_33">
          Market Size
          <ArrowIconWrapper
            className={state.sortKey === "liquidity" && "active"}
            onClick={() => {
              State.update({
                sortKey: "liquidity",
              });
              formateData("liquidity");
            }}
          >
            <Widget
              src="bluebiu.near/widget/0vix.LendingArrowIcon"
              props={{ color: "#fff" }}
            />
          </ArrowIconWrapper>
        </Item>
      </MergeItems>
    </MarketTableHeader>
    {(state.data || []).map((market) => (
      <Row key={market.address}>
        <Item className="td asset">
          <Widget
            src="bluebiu.near/widget/Avalanche.Lending.Asset"
            props={{
              icon: market.icon,
              symbol: market.symbol,
              dappIcon: market.dappIcon,
              dappName: market.dappName,
            }}
          />
        </Item>
        <MergeItems
          className="supply body-supply"
          onClick={() => {
            onButtonClick(market.address, "Deposit");
          }}
        >
          <Item className="td w_50">
            <Widget
              src="bluebiu.near/widget/Avalanche.Lending.Total"
              props={{
                total: market.totalSupply,
                digit: 2,
                unit: "$",
              }}
            />
          </Item>
          <Item className="td w_50">{market.supplyApy}</Item>
        </MergeItems>
        <MergeItems
          className="borrow body-borrow"
          onClick={() => {
            onButtonClick(market.address, "Borrow");
          }}
        >
          <Item className="td w_33">
            <Widget
              src="bluebiu.near/widget/Avalanche.Lending.Total"
              props={{
                total: market.totalBorrows,
                digit: 2,
                unit: "$",
              }}
            />
          </Item>
          <Item className="td w_33">{market.borrowApy}</Item>
          <Item className="td w_33">
            <Widget
              src="bluebiu.near/widget/Avalanche.Lending.Total"
              props={{
                total: market.liquidity,
                digit: 2,
                unit: "$",
              }}
            />
          </Item>
        </MergeItems>
      </Row>
    ))}
  </Market>
);
