const { contractId, secretKey } = props;
const ownerId = "nearcon23.near";
const baseUrl = "https://nearcon.app";

// const qrPayload = `https://keypom.xyz/nearcon/${contractId}:${secretKey}`;

const qrPayload = `${baseUrl}/${ownerId}/widget/Ticket.Preview?privateKey=${secretKey}`;

const SVG_CONTENT_TYPE = "image/svg+xml";

const imageToBase64 = (data, type) => {
  const buff = Buffer.from(data);
  return `data:${type};base64,` + buff.toString("base64");
};

const srcData = `
<html>
<body>
  <div id="qrcode" style="display: flex; flex-direction: column; justify-content: center; align-items: center;"></div>

  <script src="https://cdn.jsdelivr.net/npm/easyqrcodejs@4.5.0/dist/easy.qrcode.min.js"></script>
  <script type="text/javascript">
    new QRCode(document.getElementById("qrcode"), {
    text: "${qrPayload}",
    width: 290,
    height: 290,
    colorDark: "#000000",
    colorLight: "#ffffff",
    correctLevel: QRCode.CorrectLevel.H, // L, M, Q, H

    //  backgroundImage: "https://nearpad-images.s3.amazonaws.com/nearcon_small.png",
    logo: "https://nearpad-images.s3.amazonaws.com/nearcon_small.png",
    logoBackgroundTransparent: true,
    logoWidth: 150, 
    logoHeight: 150,


    dotScale: .6,
    dotScaleTiming: .6,
    dotScaleA:.6,
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
        State.update({ qrCodeData: data });
      }}
      style={{
        width: 320,
        minWidth: 320,
        height: 320,
        minHeight: 320,
      }}
    />
  </div>
);
