const ownerId = "nearcon23.near";
const prefix = props.prefix || "/mobile";

const receiverId = props.receiverId || context.receiverId;
const amount = props.amount || context.amount || 0.0;

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
  background-color: #000000;

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
          display: "flex",
          position: "absolute",
          justifyContnet: "center",
          alignItems: "center",
        }}
      >
        <Widget src={`${ownerId}/widget/Icons.NearLogo`} />
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
        <div
          style={{
            flex: 1,
            height: "100%",
            width: "100%",
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <svg
            width="161"
            height="161"
            viewBox="0 0 161 161"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <rect
              x="0.5"
              y="0.5"
              width="160"
              height="160"
              rx="80"
              fill="#00EC97"
            />
            <path
              d="M120.657 48.4254L68.0159 103.418C66.517 104.984 64.0393 105.058 62.4495 103.585L38.9581 81.8146C37.8156 80.7558 36.0892 80.6378 34.8133 81.5313C33.2778 82.6066 32.9421 84.7418 34.0736 86.2364L62.8321 124.221C64.0884 125.88 66.5736 125.905 67.8633 124.272L124.86 52.0813C125.78 50.9153 125.625 49.2323 124.506 48.2545C123.384 47.273 121.688 47.3483 120.657 48.4254Z"
              fill="white"
            />
          </svg>
          <H1>{amount}</H1>
          <H4 style={{ fontSize: 25, marginTop: -10 }}>NCON</H4>
          <p style={{ color: "#868682", textAlign: "center" }}>
            Sent to
            <br />
            <span style={{ color: "white" }}>{receiverId}</span>
            {/*.nearcon23*/}
          </p>
        </div>

        <Link
          style={{ width: "100%" }}
          to={`${prefix}/${ownerId}/widget/Mobile.Home`}
        >
          <SubmitButton>Home</SubmitButton>
        </Link>
      </div>
    </Content>
  </Container>
);
