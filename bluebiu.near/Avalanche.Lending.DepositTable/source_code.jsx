return (
  <Widget
    src="bluebiu.near/widget/Avalanche.Lending.YoursTable"
    props={{
      columns: [
        {
          type: "name",
          width: "25%",
          name: "Deposit Asset",
        },
        { key: "apy", width: "18%", name: "APY" },
        { type: "collateral", width: "17%", name: "Collateral" },
        {
          type: "total",
          key: "balance",
          width: "20%",
          name: "Balance",
        },
        { type: "button", width: "20%" },
      ],
      data: props.data,
      buttons: [
        {
          text: "Withdraw",
          loading: state.loading,
        },
      ],
      onButtonClick: props.onButtonClick,
      emptyTips: "You supplied assets will appear here",
    }}
  />
);
