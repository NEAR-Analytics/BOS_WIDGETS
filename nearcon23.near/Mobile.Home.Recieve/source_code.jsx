const ownerId = "nearcon23.near";
const receiverId = props.receiverId || context.receiverId || "nearcon23.near";
const amount = props.amount || context.amount || 0.0;

initState({ qrCodeData: "" });
const Container = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Content = styled.div`
  display: flex;
  flex-direction: column;
  position: relative;
  width: 100%;
  max-width: 700px;

  overflow: hidden;

  height: 100%;
  min-height: 836px;
  div {
    width: 100%;
  }
`;

const H1 = styled.h1`
  margin-top:40px;

  color: #00EC97;
  text-align: center;
  leading-trim: both;
  text-edge: cap;
  // font-family: FK Grotesk;
  font-size: 63px;
  font-style: normal;
  font-weight: 500;
  line-height: 1;
  letter-spacing: -1.89px;
`;

const H4 = styled.h4`
  color: #FFF;
  leading-trim: both;
  text-edge: cap;
  // font-family: FK Grotesk;
  font-size: 24px;
  font-weight: 400;
  line-height: 160%;
  letter-spacing: -0.72px;
`;
const SubmitButton = styled.button`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  padding: 0.5em 1.5em;
  margin-bottom: 20px;
  gap: 0.5em;
  background: #161615;
  border-radius: 50px;
  border: none;
  color: #ffffff;
  width: 100%;
  min-height: 48px;
  background: #00EC97;

  &.disabled {
    background: #717069 !important;
  }

  &:hover,
  &:focus,
  &:active {
    background: #161615;
    text-decoration: none;
    color: #ffffff;
  }
`;

const qrPayload = `https://jutsu.ai/${ownerId}/widget/Mobile.Home.Send?receiverId=${receiverId}`;
console.log(qrPayload);

const SVG_CONTENT_TYPE = "image/svg+xml";

const imageToBase64 = (data, type) => {
  const buff = Buffer.from(data);
  return `data:${type};base64,` + buff.toString("base64");
};

const qrCodeParams = {
  type: "svg",
  data: qrPayload,
  dotsOptions: { color: "#403E3E", type: "dots" },
  cornersSquareOptions: { type: "square" },
  qrOptions: { errorCorrectionLevel: "M" },
  backgroundOptions: { color: "#ffffff" },
};

const srcData = `
<html>
<div id="qrcode"></div>
<script src="https://cdnjs.cloudflare.com/ajax/libs/qrcodejs/1.0.0/qrcode.min.js"></script>
<script type="text/javascript">
var qrcode = new QRCode(document.getElementById("qrcode"), {
	text: "${qrPayload}",
	width: 290,
	height: 290,
	colorDark : "#000000",
	colorLight : "#ffffff",
	correctLevel : QRCode.CorrectLevel.H
});
</script>
</html>
`;

console.log(state);

return (
  <Container>
    <Content>
      <div style={{ zIndex: 2 }}>
        <Widget
          src={`${ownerId}/widget/Navbar`}
          // props={{ update, showSidebar, collapsible: state.collapsible }}
        />
      </div>
      <div
        style={{
          flex: 1,
          zIndex: 3,
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          alignItems: "center",

          margin: 20,
          width: "calc(100% - 40px)",
        }}
      >
        <div style={{ textAlign: "center" }}>
          <p style={{}}>
            <span style={{ color: "gray" }}>Receive</span> NCON
          </p>
          <div>
            <iframe
              srcDoc={srcData}
              onMessage={(data) => {
                console.log(data);
                State.update({ qrCodeData: data });
              }}
              style={{ width: 310, height: 310 }}
            />
          </div>
        </div>
        <Link
          style={{ width: "100%" }}
          to={`/nearcon23/home/${ownerId}/widget/Mobile.Home`}
        >
          <SubmitButton>Home</SubmitButton>
        </Link>
      </div>
    </Content>
  </Container>
);
