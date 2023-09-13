State.init({ text: null });

console.log(state);

return (
  <>
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
        {state.facingBack ? (
          <>
          <QRCodeReader
            facingMode={"rear"}
            onScan={(data) => {
              if (!state?.text) State.update({ text: data?.text });
            }}
            style={{ width: 300, height: 250 }}
          />
          <p>back camera</p>
          </>
        ) : (
          <QRCodeReader
            facingMode={"front"}
            onScan={(data) => {
              if (!state?.text) State.update({ text: data?.text });
            }}
            style={{ width: 300, height: 250 }}
          />
        )}

        <p>QR Code Result : {state.text ?? "Result Placeholder Text"}</p>
      </div>
    </div>
    <Widget
      src="nui.sking.near/widget/Input.Checkbox"
      props={{
        label: "Facing Back Camera",
        checked: state.facingBack,
        onChange: () => State.update({ facingBack: !state.facingBack }),
      }}
    />
  </>
);
