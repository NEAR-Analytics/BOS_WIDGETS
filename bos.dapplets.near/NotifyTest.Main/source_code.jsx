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
    type: "info",
    subject: "This Info",
    body: "Text Info",
  });
};

const handleWarnClick = () => {
  props.notify({
    type: "warning",
    subject: "This Warn",
    body: "Text Warning",
  });
};

const handleErrorClick = () => {
  props.notify({
    type: "error",
    subject: "This Err",
    body: "Text Error",
  });
};

const handleTxClick = () => {
  props.notify({
    type: "info",
    subject: "This Tx",
    body: "Text Tx",
    onClick: () => 123,
    actions: [
      {
        label: "OK",
        onClick: () => {
          console.log("OK");
        },
      },
      {
        label: "Cancel",
        onClick: () => {
          console.log("Cancel");
        },
      },
    ],
  });
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
