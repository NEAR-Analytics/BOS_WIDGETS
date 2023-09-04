const { assets } = props;
if (!assets?.length) return "";

const data = assets
  .filter((record) => Big(record.userBorrow || 0).gt(0))
  .map((record) => {
    return {
      logo: record.logo,
      name: record.symbol.slice(1),
      apy: record.borrowApy,
      userBorrow: record.userBorrow,
      userBorrow_value: Big(record.userBorrow)
        .mul(record.underlyingPrice)
        .toString(),
      address: record.address,
    };
  });

return data.length ? (
  <Widget
    src="bluebiu.near/widget/0vix.LendingTable"
    props={{
      title: "Your Borrows",
      columns: [
        {
          type: "name",
          width: "20%",
          name: "Asset",
        },
        { key: "apy", width: "20%", name: "Borrow APY" },
        {
          type: "total",
          key: "userBorrow",
          width: "40%",
          name: "Your Borrowed",
        },
        { type: "button", width: "20%" },
      ],
      data: data,
      buttons: [
        {
          text: "Repay",
        },
      ],
      onButtonClick: props.onTableButtonClick,
    }}
  />
) : (
  ""
);
