State.init({ text: null });

return (
  <div
    style={{
      width: 350,
      height: 350,
      backgroundColor: "lightgray",
      padding: 10,
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      borderRadius: 10,
    }}
  >
    <div>
      <QRCodeReader
        constraints={{
          facingMode: "environment",
        }}
        onScan={(data) => {
          if (!state?.text) State.update({ text: data?.text });
        }}
        style={{ width: 300, height: 250 }}
      />
      <p>QR Code Result : {state.text ?? "Result Placeholder Text"}</p>
    </div>
  </div>
);
