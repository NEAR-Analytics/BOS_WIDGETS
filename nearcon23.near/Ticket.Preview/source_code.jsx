const ownerId = "nearcon23.near";

const HeaderStyle = styled.div`
   background: url("https://ipfs.near.social/ipfs/bafkreigmwev6i2ivgz5ampkihov2ub7yenn7hohs34erheclixz2dopwru");
  background-repeat: no-repeat;
  background-size: cover;
  height: 64px;
  display: flex;
  margin-top:-12px;
  align-items: flex-end;
  padding:15px;
  p {
    margin-bottom: 0px;
    font-size:22px;
    font-weight: 700;
    color: black;
  }
`;


const Body = styled.div`
  min-height: 100vh;
  text-align: center;
  justify-content: center;
  padding-top:20px;
  p {
    text-align:center;
  }
`;
const Container = styled.div`
  background:url("https://ipfs.near.social/ipfs/bafkreiadf32sz4riwsk6gwxrts7qqldhjae7jkgvl5gbhzngj4ekur2iuq");
   background-repeat: no-repeat;
  background-attachment: fixed;
  background-size: cover;
`;
const NavLink = styled.div`
  * {
      color: #000000;
  }
`;

const [tikcetData, setTicketData] = useState(null);
const { privateKey } = props;

const fetchTicketData = () => {
  const apiURL = `https://21mqgszhf3.execute-api.us-east-1.amazonaws.com/testnet/api/v1/accounts/${privateKey}/validate`;
  const { body } = fetch(apiURL);
  setTicketData(body.user);
};

if (privateKey) {
  fetchTicketData();
}

return (
  <Container>
    <Widget
      props={{
        nearconId: state.userData.nearconId,
        cid: state.userData.cid,
      }}
      src={`${ownerId}/widget/Navbar`}
    />
    <HeaderStyle>
      <div
        style={{
          display: "flex",
          alignItems: "center",
          width: "100%",
          justifyContent: "space-between",
        }}
      >
        <p>Admin</p>

        <NavLink>
          <Link to="/mobile">
            <Widget
              src={`${ownerId}/widget/Inputs.Toggle2`}
              props={{ rightLabel: "Home", value: true }}
            />
          </Link>
        </NavLink>
      </div>
    </HeaderStyle>
    <Body>
      <div
        style={{
          textAlign: "center",
          display: "flex",
          margin: "auto",
          width: "fit-content",
          gap: 8,
        }}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="40"
          height="35"
          viewBox="0 0 40 35"
          fill="none"
        >
          <path
            d="M37.7671 1.08347L15.4366 24.4116C14.592 25.2939 13.1957 25.3357 12.2998 24.5055L2.55461 15.4743C2.06219 15.018 1.3181 14.9672 0.768182 15.3522C0.106375 15.8157 -0.0382998 16.736 0.44939 17.3801L12.5154 33.3171C13.2234 34.2522 14.6238 34.2664 15.3506 33.3459L39.5785 2.65917C39.9752 2.15663 39.9083 1.43127 39.4263 1.0098C38.9425 0.586766 38.2115 0.619226 37.7671 1.08347Z"
            fill="white"
          />
        </svg>

        <p style={{ color: "#DCDCF9", fontSize: 30 }}>Valid Ticket</p>
      </div>
      <p
        style={{
          color: "#9797FF",
          fontWeight: "400",
          fontFamily: "Mona Sans",
          marginTop: -10,
        }}
      >
        Please show the QR code to an event organizer
      </p>
      <div
        style={{
          marginTop: 100,
          minHeight: 250,
          color: "white",
          justifyContent: "center",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",

          position: "relative",
        }}
      >
        <img
          style={{ width: "min(90%, 350px)", position: "absolute" }}
          src="https://ipfs.near.social/ipfs/bafkreihqgi6mrfuje32swbbmhxlybwtguo4oyjjeher6jcw25m6pwxxqji"
        />
        <div
          style={{
            zIndex: 10,
            // marginTop: -275,

            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            flexDirection: "column",
          }}
        >
          <p style={{ color: "black", fontWeight: "500", marginBottom: -5 }}>
            Name
          </p>
          <p
            style={{
              color: "black",
              fontWeight: "700",
              fontSize: 25,
              textAlign: "center",
              width: "15ch",
              wordWrap: "break-word",
            }}
          >
            {tikcetData.name}
          </p>
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              flexDirection: "column",
            }}
          >
            <p style={{ color: "black", fontWeight: "500", marginBottom: -5 }}>
              Email
            </p>
            <p
              style={{
                color: "black",
                fontWeight: "700",
                fontSize: 25,
                width: "15ch",
                wordWrap: "break-word",
              }}
            >
              {tikcetData.email}
            </p>
          </div>
        </div>
      </div>
      {!state.success && (
        <>
          <Link
            to={`/ticket?secretKey=${privateKey}&contractId=ncon23.keypom.testnet`}
          >
            <button
              style={{
                marginTop: 190,
                backgroundColor: "#00EC97",
                borderWidth: 0,
                padding: 10,
                fontWeight: "600",
                color: "black",
                borderRadius: 100,
                width: "90%",
              }}
              onClick={() => confirmId()}
            >
              Get QR Code
            </button>
          </Link>

          <Link to="/">
            <button
              style={{
                marginTop: 20,
                backgroundColor: "#000",
                borderWidth: 0,
                borderRadius: 50,
                width: "90%",
                padding: 12,
                fontWeight: "600",
              }}
            >
              Home
            </button>
          </Link>
        </>
      )}
    </Body>
  </Container>
);
