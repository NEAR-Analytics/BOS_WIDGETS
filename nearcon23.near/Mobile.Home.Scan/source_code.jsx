const ownerId = "nearcon23.near";
const prefix = props.prefix || "/mobile";

const [facingMode, setFacingMode] = useState("environment");

const [cameraError, setCameraError] = useState(false);

const [responce, setResponce] = useState("");
const [validScan, setValidScan] = useState({
  privateKey: null,
  contract: null,
  receiverId: null,
  campaignId: null,
});

const toggleFacingMode = () => {
  setFacingMode((prevMode) =>
    prevMode === "environment" ? "user" : "environment"
  );
};

function extractReceiverId(url) {
  const regex = /receiverId=([^&]+)/;
  const match = url.match(regex);

  if (match && match[1]) {
    return match[1];
  } else {
    return null; // Return null if receiverId is not found in the URL
  }
}

const Button = styled.button`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  padding: 10px 20px;
  gap: 0.5em;
  border: 1px solid #00ec97;
  border-radius: 50px;
  background: #00ec97;
  color: #11181c;
  font-style: normal;
  font-weight: 600;
  font-size: 18px;
  text-align: center;
  white-space: nowrap;
  transition: all 0.3s ease-in-out;

  width:100%;

  &:hover,
  &:focus,
  &:active {
    text-decoration: none;
    background: #11181c;
    border: 1px solid #11181c;
    color: #fff;
  }
`;

const Button2 = styled.button`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  padding: 10px 20px;
  gap: 0.5em;
  border: 1px solid #00ec97;
  border-radius: 50px;
  background: #FFFFFF;
  color: #000000;
  font-style: normal;
  font-weight: 600;
  font-size: 18px;
  text-align: center;
  white-space: nowrap;
  transition: all 0.3s ease-in-out;

  width:100%;
  flex: 2;
  border: none;

  &:hover,
  &:focus,
  &:active {
    text-decoration: none;
    background: #11181c;
    border: 1px solid #11181c;
    color: #FFFFFF;
  }
`;

// console.log(validScan);

if (validScan?.campaignId !== null) {
  return <Redirect to={`/campaigns?campaignId=${validScan?.campaignId}`} />;
}

if (validScan.receiverId) {
  return (
    <Widget
      src={`${ownerId}/widget/Mobile.Home.Send`}
      props={{ receiverId: validScan.receiverId }}
    />
  );
}

return validScan?.privateKey !== null ? (
  <>
    <Widget
      props={{
        privateKey: validScan.privateKey,
        contract: validScan.contract,
        backToHome: () => {
          setValidScan({
            privateKey: null,
            contract: null,
            receiverId: null,
            campaignId: null,
          });
        },
      }}
      src={`${ownerId}/widget/Admin.ScanPage`}
    />
  </>
) : cameraError ? (
  <Widget
    props={{
      error: cameraError,
    }}
    src={`${ownerId}/widget/Admin.ScannedTicket`}
  />
) : (
  <div
    style={{
      backgroundColor: "#22FFFF",
      display: "flex",
      flexDirection: "column",
      justifyContent: "flex-start",
      alignItems: "center",
      flex: 1,
      width: "100%",
      height: "100dvh",
      position: "relative",
    }}
  >
    <div
      style={{
        position: "absolute",
        bottom: 50,
        zIndex: 100,
        display: "flex",
        gap: "10px",
      }}
    >
      <a
        style={{
          borderRadius: 20,
          height: 40,
          // width: 40,
          color: props.theme.textColor3,
          backgroundColor: props.theme.textColor,
          border: "none",

          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          gap: 8,
          padding: "0 16px",
        }}
        href={`/mobile`}
      >
        Back
      </a>
      <button
        style={{
          borderRadius: 20,
          height: 40,
          // width: 40,
          color: props.theme.textColor3,
          backgroundColor: props.theme.textColor,
          border: "none",

          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          gap: 8,
          padding: "0 16px",
        }}
        onClick={() => toggleFacingMode()}
      >
        <i class="bi bi-arrow-repeat"></i>
        <p style={{ margin: 0 }}>Change Camera</p>
      </button>
    </div>

    {responce && (
      <div
        style={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          zIndex: 102,

          backgroundColor: "#fff",
          padding: 16,
          borderRadius: 8,

          width: "100%",
          maxWidth: 450,
        }}
      >
        <h5 style={{ color: theme.textColor3 }}>Send to</h5>
        <h2 style={{ wordWrap: "break-word" }}>{responce}</h2>

        <div
          style={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "space-between",
            gap: 16,
            marginTop: 24,
          }}
        >
          <Button2 onClick={() => setResponce("")}>Scan again</Button2>

          <Link
            style={{ flex: 3, width: "100%" }}
            to={`/nearcon23/home/${ownerId}/widget/Mobile.Home.Send?receiverId=${responce}`}
          >
            <Button>Continue</Button>
          </Link>
        </div>
      </div>
    )}

    <div
      key={facingMode}
      style={{
        width: "100%",
        height: "100%",
        flex: 1,
        backgroundColor: "#0b111d",
      }}
    >
      <QRCodeReader2
        scanDelay={750}
        constraints={{
          facingMode: facingMode,
        }}
        onResult={(result, error) => {
          console.log(result, error);
          if (result) {
            if (result?.text?.includes("receiverId")) {
              const receiverId = result?.text?.split("=")?.[1];
              setValidScan({ ...validScan, receiverId });
            } else if (result?.text?.includes("campaignId")) {
              const campaignId = result?.text?.split("=")?.[1];
              setValidScan({ ...validScan, campaignId });
            } else if (result?.text?.includes("privateKey")) {
              const url = result.text;

              const privateKey = url.split("privateKey=")[1];

              // console.log("privateKey : ", privateKey);
              setValidScan({ ...validScan, contract: "", privateKey });

              // const parameterIndex = url.indexOf("secretKey" + "=");

              // if (parameterIndex === -1) {
              //   return null; // Parameter not found
              // }
              // var value = url.slice(parameterIndex + "secretKey".length + 1);

              // console.log("result.text : ", value);

              // function splitAtFirstColon(str) {
              //   const index = str.indexOf(":");
              //   if (index === -1) return [str];

              //   return [str.slice(0, index), str.slice(index + 1)];
              // }

              // const apiURL = result.text;
              // if (!!result) {
              //   const replaceLink = apiURL.replace(
              //     "https://keypom.xyz/nearcon/",
              //     ""
              //   );
              //   const [contract, privateKey] = splitAtFirstColon(replaceLink);
              //   setValidScan({ contract, privateKey });
              // }
            }
          }

          if (
            error?.name === "NotAllowedError" ||
            error?.cameraError?.name === "NotAllowedError"
          ) {
            setCameraError(error);
          }
        }}
        containerStyle={{
          width: "100%",
          height: "100%",
        }}
        videoContainerStyle={{
          width: "100%",
          height: "100%",
        }}
        videoStyle={{
          width: "100%",
          height: "100%",
          objectFit: "cover",
        }}
      />
    </div>
  </div>
);
