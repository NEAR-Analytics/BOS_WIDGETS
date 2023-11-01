const ownerId = "nearcon23.near";
const receiverId = props.receiverId || context.receiverId || "nearcon23.near";
const prefix = props.prefix || "/mobile";

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
  color: #000000;
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

const { secretkey } = props;

const storedSecretKey = Storage.get(
  "newPrivateKey",
  `${ownerId}/widget/Ticket.Page`
)
  ? Storage.get("newPrivateKey", `${ownerId}/widget/Ticket.Page`)
  : Storage.get("newPrivateKey", `${ownerId}/widget/RegisterMobile.Index`);

const [qrPayload, setQrPayload] = useState("");

const fetchData = () => {
  const key = secretkey ? secretkey : storedSecretKey;
  asyncFetch(`${baseUrl}/api/v1/accounts/auth/${key}`).then(({ body }) => {
    console.log(body);
    if (
      !!Storage.get(
        "newPrivateKey",
        `${ownerId}/widget/RegisterMobile.Index`
      ) === false
    ) {
      State.update({
        redirectToHome: "redirect",
      });
    }
    State.update({
      userData: body,
    });

    setQrPayload(
      `https://${rootUrl}/${ownerId}/widget/Mobile.Home.Send?receiverId=${body?.nearconId}`
    );
  });
};

useEffect(() => {
  fetchData();
}, [secretkey, storedSecretKey]);

const SVG_CONTENT_TYPE = "image/svg+xml";

const imageToBase64 = (data, type) => {
  const buff = Buffer.from(data);
  return `data:${type};base64,` + buff.toString("base64");
};

const srcData = `
<html>
<body>
  <div id="qrcode" style="display:flex; justify-content:center;"></div>
  <script src="https://cdn.jsdelivr.net/npm/easyqrcodejs@4.5.0/dist/easy.qrcode.min.js"></script>
  <script type="text/javascript">
    new QRCode(document.getElementById("qrcode"), {
    text: "${qrPayload}",
    width: 290,
    height: 290,
    colorDark: "#000000",
    colorLight: "#ffffff",
    correctLevel: QRCode.CorrectLevel.H, // L, M, Q, H

    // backgroundImage: "https://nearpad-images.s3.amazonaws.com/nearcon_small.png",
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
  <Container>
    <Content>
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
            <span style={{ color: "gray" }}>Receive</span>{" "}
            <span style={{ fontWeight: 600 }}>NCON</span>
          </p>
          {!!state?.userData?.nearconId && (
            <p>{`@${state?.userData?.nearconId}`}</p>
          )}
          <div style={{ width: "fit-content", margin: "auto" }}>
            <iframe
              srcDoc={srcData}
              onMessage={(data) => {
                console.log(data);
                State.update({ qrCodeData: data });
              }}
              style={{
                width: 340,
                height: 350,
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
            />
          </div>
        </div>
        <a style={{ width: "100%" }} href={`/mobile`}>
          <SubmitButton>Home</SubmitButton>
        </a>
      </div>
    </Content>
  </Container>
);
