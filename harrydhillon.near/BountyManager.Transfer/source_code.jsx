return (
  <div style={{ padding: 10 }}>
    <p style={{ textAlign: "center", fontSize: 30, fontWeight: "500" }}>
      Wrap <span style={{ fontSize: 20, fontWeight: "500" }}>X</span> Transfer
    </p>
    <div
      style={{
        width: 350,
        margin: "auto",
      }}
    >
      <div style={{ marginBottom: 30 }}>
        <Widget
          src="near/widget/Select"
          props={{
            label: "Token",
            options: [
              { text: "USDC", value: "usdc" },
              { text: "Ethereum", value: "ethereum" },
            ],
          }}
        />
      </div>
      <div style={{ marginBottom: 30 }}>
        <Widget
          props={{
            label: "Amount",
            type: "number",
            placeholder: "Enter Amount",
            value: state.value,
            onChange: (e) => State.update({ value: e }),
          }}
          src="harrydhillon.near/widget/Inputs.TextNumber"
        />
      </div>
      <div style={{ marginBottom: 30 }}>
        <Widget
          src="a_liutiev.near/widget/Inputs.Text"
          props={{
            label: "Grant Recepient",
            type: "number",
            placeholder: "Account",
            value: state.value,
            onChange: (e) => State.update({ value: e }),
          }}
        />
      </div>
      <div style={{ display: "flex", justifyContent: "space-between" }}>
        <button>Copy JSON</button>
        <button>Wrap + Transfer</button>
      </div>
    </div>
  </div>
);
