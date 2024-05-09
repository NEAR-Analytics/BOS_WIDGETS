const { assets } = props;
if (!assets?.length) return "";

const data = assets
  .filter((record) => Big(record.userSupply || 0).gt(0))
  .map((record) => {
    return {
      logo: record.logo,
      name: record.symbol.slice(1),
      apy: record.supplyApy,
      userSupply: record.userSupply,
      userSupply_value: Big(record.userSupply)
        .mul(record.underlyingPrice)
        .toString(),
      isCollateral: record.userMerberShip,
      address: record.address,
    };
  });

return data.length ? (
  <Widget
    src="bluebiu.near/widget/0vix.LendingTable"
    props={{
      title: "Your Supplied",
      columns: [
        {
          type: "name",
          width: "20%",
          name: "Asset",
        },
        { key: "apy", width: "15%", name: "Supply APY" },
        {
          type: "total",
          key: "userSupply",
          width: "20%",
          name: "Your Supplied",
        },
        { type: "collateral", width: "20%", name: "Collateral" },
        { type: "button", width: "25%" },
      ],
      data: data,
      buttons: [
        {
          text: "Withdraw",
        },
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
