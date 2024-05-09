const StyledRow = styled.div`
  margin-bottom: 10px;
`;
const StyledRowHeader = styled.div`
  border: 1px solid #373a53;
  height: 84px;
  display: flex;
  align-items: center;
  background-color: #262836;
  padding-left: 22px;
  padding-right: 24px;
  border-radius: 16px;
  cursor: pointer;
`;
const StyledRowItem = styled.div`
  height: 100%;
  display: flex;
  align-items: center;
  color: #fff;
`;
const StyledExpand = styled.div`
  cursor: pointer;
  transform-origin: center;
  transform: rotate(-90deg);
  transition: 0.3s;
`;
const StyledAssets = styled.div`
  display: flex;
  gap: 5px;
  align-items: center;
`;
const StyledAssetIcon = styled.img`
  width: 20px;
  height: 20px;
`;

const {
  columns,
  data,
  borrowLimit,
  curChain,
  addAction,
  toast,
  chainId,
  nativeCurrency,
  dexConfig,
  onSuccess,
  account,
  prices,
  onClickRow,
} = props;

console.log("===data", data);
return (
  <StyledRow
    onClick={() => {
      onClickRow(data);
    }}
  >
    <StyledRowHeader>
      {columns.map((column) => (
        <StyledRowItem key={column.key} style={{ width: column.width }}>
          {column.key === "asset" && (
            <Widget
              src="bluebiu.near/widget/Lending.CompoundV3.Bridge.Asset"
              props={{
                icon: data.baseToken.icon,
                symbol: data.baseToken.symbol,
                curChain,
              }}
            />
          )}
          {column.key === "utilization" && (
            <Widget
              src="bluebiu.near/widget/Lending.CompoundV3.Bridge.Utilization"
              props={{
                value: Big(data.utilization).toFixed(2),
              }}
            />
          )}
          {column.key === "earnApr" && (
            <>
              {Big(data.supplyApr || 0)
                .add(data.supplyCompRewardApr || 0)
                .mul(100)
                .toFixed(2)}{" "}
              %
            </>
          )}
          {column.key === "borrowApr" && (
            <>
              {Big(data.borrowApr || 0)
                .minus(data.borrowCompRewardApr || 0)
                .mul(100)
                .toFixed(2)}
              %
            </>
          )}
          {column.type === "price" && (
            <Widget
              src="bluebiu.near/widget/Lending.CompoundV3.Bridge.UsdPrice"
              props={{
                price: data[column.key],
              }}
            />
          )}
          {column.key === "collateralAssets" && (
            <StyledAssets>
              <div>{data.collateralAssets.length}</div>
              {data.collateralAssets?.map((asset, i) => (
                <StyledAssetIcon
                  src={asset.icon}
                  key={asset.address}
                  style={{ marginLeft: i > 0 ? "-6px" : "0px" }}
                />
              ))}
            </StyledAssets>
          )}
          {column.key === "handler" && (
            <StyledExpand>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="11"
                height="8"
                viewBox="0 0 11 8"
                fill="none"
              >
                <path
                  d="M5.94103 7.02391C5.5407 7.52432 4.77961 7.52432 4.37929 7.02391L0.459914 2.1247C-0.0638966 1.46993 0.402276 0.499999 1.24078 0.499999L9.07953 0.5C9.91804 0.5 10.3842 1.46993 9.8604 2.12469L5.94103 7.02391Z"
                  fill="#979ABE"
                />
              </svg>
            </StyledExpand>
          )}
        </StyledRowItem>
      ))}
    </StyledRowHeader>
  </StyledRow>
);
