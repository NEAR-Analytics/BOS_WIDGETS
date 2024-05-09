const { assets } = props;
if (!assets?.length) return "";

const data = assets.map((record) => {
  return {
    logo: record.logo,
    name: record.symbol.slice(1),
    apy: record.supplyApy,
    totalSupply: record.totalSupply,
    totalSupply_value: Big(record.totalSupply)
      .mul(record.underlyingPrice)
      .toString(),
    loanToValue: Number(record.loanToValue).toFixed(2) + "%",
    balance: record.userUnderlyingBalance,
    balance_value: Big(record.userUnderlyingBalance)
      .mul(record.underlyingPrice)
      .toString(),
    address: record.address,
  };
});
return data.length ? (
  <Widget
    src="bluebiu.near/widget/0vix.LendingTable"
    props={{
      title: "Supply Markets",
      columns: [
        {
          type: "name",
          width: "20%",
          name: "Asset",
        },
        { key: "apy", width: "15%", name: "Supply APY" },
        {
          type: "total",
          key: "totalSupply",
          width: "20%",
          name: "Total Supplied",
        },
        { key: "loanToValue", width: "15%", name: "Loan-To-Value" },
        { type: "total", key: "balance", name: "Wallet Balance", width: "15%" },
        { type: "button", width: "15%" },
      ],
      data: data,
      buttons: [
        {
          text: "Supply",
          isPrimary: true,
        },
      ],
      onButtonClick: props.onTableButtonClick,
    }}
  />
) : (
  ""
);
