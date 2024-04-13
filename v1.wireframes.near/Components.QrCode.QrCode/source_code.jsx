/* -------------------------------------------------------------------------- */
/*
 __        ___           __                               
 \ \      / (_)_ __ ___ / _|_ __ __ _ _ __ ___   ___  ___ 
  \ \ /\ / /| | '__/ _ \ |_| '__/ _` | '_ ` _ \ / _ \/ __|
   \ V  V / | | | |  __/  _| | | (_| | | | | | |  __/\__ \
    \_/\_/  |_|_|  \___|_| |_|  \__,_|_| |_| |_|\___||___/

  =========================================================
  * Wireframes - v1.0.0
  =========================================================
  * Product Page: https://wireframes.design
  =========================================================
  * The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

                                                                                 */
/* -------------------------------------------------------------------------- */

const SVG_CONTENT_TYPE = "image/svg+xml";

const imageToBase64 = (data, type) => {
  const buff = Buffer.from(data);
  return `data:${type};base64,` + buff.toString("base64");
};
const qrWidth = props.style.qrWidth ?? "340";
const qrHeight = props.style.qrHeight ?? "350";

const width = props.style.width ?? 290;
const height = props.style.height ?? 290;
const colorDark = props.style.colorDark ?? "#000000";
const colorLight = props.style.colorLight ?? "#ffffff";
const logoBackgroundTransparent = props.logoBackgroundTransparent ?? true;
const logoWidth = props.logoWidth ?? "150";
const logoHeight = props.logoHeight ?? "150";
const qrPayload = props.qrPayload ?? "";

initState({ qrCodeData: "" });

const srcData = `
<html>
<body>
  <div id="qrcode" style="display:flex; justify-content:center;"></div>
  <script src="https://cdn.jsdelivr.net/npm/easyqrcodejs@4.5.0/dist/easy.qrcode.min.js"></script>
  <script type="text/javascript">
    new QRCode(document.getElementById("qrcode"), {
        text: '${qrPayload}',
        width: ${width},
        height: ${height},
        colorDark: '${colorDark}',
        colorLight: '${colorLight}',
        correctLevel: QRCode.CorrectLevel.H, // L, M, Q, H
        logoBackgroundTransparent: ${logoBackgroundTransparent},
        logoWidth: ${logoWidth}, 
        logoHeight: ${logoHeight},
        
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
        State.update({ qrCodeData: qrCodeData });
      }}
      style={{
        width: "340px",
        height: "350px",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    />
  </div>
);
