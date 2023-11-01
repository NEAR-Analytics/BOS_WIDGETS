const ownerId = "nearcon23.near";
const baseUrl =
  "https://gqqkd7l7mk.execute-api.us-east-1.amazonaws.com/mainnet";

const HeaderStyle = styled.div`
  height: 64px;
  display: flex;
  align-items: flex-end;
  padding:15px;
  background: url("https://ipfs.near.social/ipfs/bafkreigmwev6i2ivgz5ampkihov2ub7yenn7hohs34erheclixz2dopwru");
  margin-top:-12px;
  background-repeat: no-repeat;
  background-size: cover;
  background-position:center;
  p {
    margin-bottom: 0px;
    font-size:22px;
    font-weight: 700;
    color: black;
  }
`;

const Body = styled.div`
  min-height: calc(100vh - 100px);
  position: relative;
  text-align: center;
  justify-content: center;
  padding-top: 20px;
  p {
    text-align:center;
  }
`;

const Container = styled.div`
  background:url("https://ipfs.near.social/ipfs/bafkreiadf32sz4riwsk6gwxrts7qqldhjae7jkgvl5gbhzngj4ekur2iuq");
  background-repeat: no-repeat;
  background-attachment: fixed;
  background-size: cover;
  margin:auto;
  width:100%;
  padding-bottom: 15px;
  max-width:600px;
`;
const NavLink = styled.div`
  * {
      color: #000000;
  }
`;

const { secretkey } = props;
const storedSecretKey = Storage.get(
  "newPrivateKey",
  `${ownerId}/widget/Ticket.Page`
)
  ? Storage.get("newPrivateKey", `${ownerId}/widget/Ticket.Page`)
  : Storage.get("newPrivateKey", `${ownerId}/widget/RegisterMobile.Index`);

const fetchData = () => {
  const key = secretkey || storedSecretKey;

  asyncFetch(`${baseUrl}/api/v1/accounts/auth/${key}`).then(({ body }) => {
    if (!body?.isAdmin) {
      State.update({
        redirectToHome: "redirect",
      });
    }

    State.update({
      userData: body,
    });
  });
};

useEffect(() => {
  fetchData();
}, [secretkey, storedSecretKey]);

if (state.redirectToHome && state.userData && !state.userData.isAdmin) {
  console.log(state.userData);
  return <Redirect to="/mobile" />;
}

return state.userData ? (
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
        }}
      >
        <p style={{ color: "white", fontSize: 30 }}>Print their lanyard</p>
      </div>
      <p style={{ color: "#9797FF", fontWeight: "500", padding: 10 }}>
        Remind them to refresh their app.
        <br /> They should see this screen.
      </p>
      <div style={{ width: "fit-content", margin: "auto" }}>
        <img
          style={{ objectFit: "cover", width: "auto" }}
          src="https://ipfs.near.social/ipfs/bafkreiayhrhwmltsd3gzpsnhcrpmvarx4idnudi7ndbe5lvhjubbiux2ca"
        />
      </div>
      <Link
        style={{
          backgroundColor: "black",
          borderWidth: 0,
          padding: 10,
          fontWeight: "600",
          borderRadius: 100,
          display: "block",
          color: "white",
          marginLeft: "5%",
          width: "90%",
          marginTop: 40,
        }}
        to={`/${ownerId}/widget/Mobile.Home.Scan`}
      >
        Scan Ticket
      </Link>
    </Body>
  </Container>
) : (
  <></>
);
