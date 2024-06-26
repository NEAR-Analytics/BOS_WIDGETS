/**
 * @interface Props
 * @param {string} [value] - The data value to be encoded as a QR code (e.g., a URL, text, etc.).
 * @param {number} [width] - The width of the QR code component.
 * @param {number} [height] - The height of the QR code component.
 */






const QrCode = (props) => {
  const srcData = `
    <html>
    <body>
      <div id="qrcode" style="display: flex; flex-direction: column; justify-content: center; align-items: center;"></div>
    
      <script src="https://cdn.jsdelivr.net/npm/easyqrcodejs@4.5.0/dist/easy.qrcode.min.js"></script>
      <script type="text/javascript">
        new QRCode(document.getElementById("qrcode"), {
        text: "${props.value}",
        width: ${props.width},
        height: ${props.height},
        colorDark: "#000000",
        colorLight: "#ffffff",
        correctLevel: QRCode.CorrectLevel.H, // L, M, Q, H
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
        style={{
          width: 320,
          minWidth: 320,
          height: 320,
          minHeight: 320,
          marginTop: 30,
        }}
      />
    </div>
  );
};
export default QrCode;
