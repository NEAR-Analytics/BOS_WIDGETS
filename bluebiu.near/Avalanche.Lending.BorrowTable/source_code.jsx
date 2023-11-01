return (
  <Widget
    src="bluebiu.near/widget/Avalanche.Lending.YoursTable"
    props={{
      columns: [
        {
          type: "name",
          width: "30%",
          name: "Borrowed Asset",
        },
        { type: "apy", width: "30%", name: "APY/Accrued" },
        {
          type: "total",
          key: "borrowed",
          width: "20%",
          name: "Borrowed",
        },
        { type: "button", width: "20%" },
      ],
      data: props.data,
      buttons: [
        {
          text: "Repay",
        },
      ],
      type: "borrow",
      onButtonClick: props.onButtonClick,
      emptyTips: "You borrowed assets will appear here",
    }}
  />
);
