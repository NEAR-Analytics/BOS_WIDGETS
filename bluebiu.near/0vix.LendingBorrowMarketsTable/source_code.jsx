const { assets, accountLiquidity } = props;
if (!assets?.length) return "";
const data = assets.map((record) => {
  return {
    logo: record.logo,
    name: record.symbol.slice(1),
    apy: record.borrowApy,
    totalBorrow: record.totalBorrows,
    totalBorrow_value: Big(record.totalBorrows)
      .mul(record.underlyingPrice)
      .toString(),
    liquidity: record.liquidity,
    liquidity_value: Big(record.liquidity)
      .mul(record.underlyingPrice)
      .toString(),
    address: record.address,
  };
});
return data.length ? (
  <Widget
    src="bluebiu.near/widget/0vix.LendingTable"
    props={{
      title: "Borrow Markets",
      columns: [
        {
          type: "name",
          width: "20%",
          name: "Asset",
        },
        { key: "apy", width: "20%", name: "Borrow APY" },
        {
          type: "total",
          key: "totalBorrow",
          width: "20%",
          name: "Total Borrowed",
        },
        {
          type: "total",
          key: "liquidity",
          width: "20%",
          name: "Liquidity",
        },
        { type: "button", width: "20%" },
      ],
      data: data,
      buttons: [
        {
          text: "Borrow",
          isPrimary: true,
        },
      ],
      onButtonClick: props.onTableButtonClick,
    }}
  />
) : (
  ""
);
