
const [isScannerOpen, setIsScannerOpen] = useState(false);
const [buttonText, setButtonText] = useState(
  props.buttontext || "Scan QR Code"
);

const startScanning = () => {
  setIsScannerOpen(true);
  setButtonText("cancle Scanning");
};
const cancleScanning = () => {
  setIsScannerOpen(false);
  setButtonText("Scan again");
};

const handleScanning = () => {
  isScannerOpen ? cancleScanning() : startScanning();
};

return (
  <>
    {isScannerOpen && (
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
              audio: false,
              video: { facingMode: "environment" },
            }}
            onScan={(data) => {
              // if (!state?.scannedText){
              State.update({ scannedText: data?.text });
              state?.scannedText && cancleScanning();
              // }
            }}
            style={{ width: 300, height: 250 }}
          />
        </div>
      </div>
    )}
    <button onClick={() => handleScanning()}>{buttonText}</button>
    {state.scannedText && console.log(state)}
  </>
);
