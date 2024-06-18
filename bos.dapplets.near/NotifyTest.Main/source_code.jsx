const { onClick } = props;

const Button = styled.button`
  display: flex;
  color: #5b7083;
  font-family: sans-serif;
  font-size: 10px;
  font-weight: 500;
  line-height: 15px;
  text-align: left;
  border: 1px solid #5b7083;
  border-radius:10px;
  background: none;
  gap: 6px;

  &:hover {
    color: #4e5459;
  }

  &:active {
    color: #2d3031;
  }
`;

const handleInfoClick = () => {
  props.notify({
    subject: "This Info",
    body: "Text Info",

    type: "info",
  });
};
const handleWarnClick = () => {
  props.notify({
    subject: "This Warn",
    body: "Text Warning",

    type: "warning",
  });
};
const handleErrorClick = () => {
  props.notify({
    subject: "This Err",
    body: "Text Error",

    type: "error",
  });
};

const handleTxClick = () => {
  props.notify({
    subject: "This Tx",
    body: "Text Tx",
    actions: [
      {
        label: "OK",
        onClick: () => alert(accountId),
      },
      {
        label: "Cancel",
        onClick: () => console.log("Cancel"),
      },
    ],
    type: "info",
  });

  //   Near.call(
  //     TIPPING_CONTRACT_NAME,
  //     "sendTips",
  //     {
  //       accountGId: accountId,
  //       itemId: itemGlobalId,
  //     },
  //     "50000000000000",
  //     total
  //   );
};

return (
  <div
    style={{
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      gap: "10px",
    }}
  >
    <Button onClick={() => handleInfoClick()}>
      <div style={{ color: "#384BFF" }}>INFO</div>
    </Button>
    <Button onClick={() => handleWarnClick()}>
      <div style={{ color: "#D0911A" }}>WARN</div>
    </Button>
    <Button onClick={() => handleErrorClick()}>
      <div style={{ color: "#DB504A" }}>ERR</div>
    </Button>
    <Button onClick={() => handleTxClick()}>
      <div style={{ color: "#DB504A" }}>Send TX</div>
    </Button>
  </div>
);
