const { contractId, secretKey } = props;

const qrPayload = `https://keypom.xyz/nearcon/${contractId}:${secretKey}`;

const SVG_CONTENT_TYPE = "image/svg+xml";

const imageToBase64 = (data, type) => {
  const buff = Buffer.from(data);
  return `data:${type};base64,` + buff.toString("base64");
};

const srcData = `
<html>
<body>
  <div id="qrcode"></div>
  <script src="https://cdn.jsdelivr.net/npm/easyqrcodejs@4.5.0/dist/easy.qrcode.min.js"></script>
  <script type="text/javascript">
    new QRCode(document.getElementById("qrcode"), {
    text: "${qrPayload}",
  width: 290,
      height: 290,
      colorDark: "#000000",
      colorLight: "#ffffff",
      correctLevel: QRCode.CorrectLevel.H, // L, M, Q, H

      logo: "https://nearcon.app/favicon.png",
});

   </script> 
</body>
</html>
`;

return (
  <div>
    <iframe
      srcDoc={srcData}
      onMessage={(data) => {
        console.log(data);
        State.update({ qrCodeData: data });
      }}
      style={{ width: 320, height: 320 }}
    />
  </div>
);
