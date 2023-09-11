const accountId = context.accountId;

if (context.loading) {
  return "Loading";
}

if (!accountId) {
  return "Please sign into your NEAR wallet to access this widget";
}

function QRCodeGenerator() {
  let text = "";
  let qrCodeURL = accountId;

  const generateQRCode = async () => {
    try {
      const response = await fetch(
        `https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=${qrCodeURL}`
      );
      if (response.ok) {
        qrCodeURL = response.url;
      } else {
        console.error("Failed to generate QR code");
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <div>
      <input
        type="text"
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="Enter text for QR code"
      />
      <button onClick={generateQRCode}>Generate QR Code</button>
      {qrCodeURL && <img src={qrCodeURL} alt="QR Code" />}
    </div>
  );
}

return (
  <>
    <div
      style={{ height: "auto", margin: "0 auto", maxWidth: 64, width: "100%" }}
    >
      <QRCodeGenerator />
    </div>
  </>
);
