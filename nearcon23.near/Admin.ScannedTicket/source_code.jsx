const ownerId = "nearcon23.near";
const apiUrl = "https://gqqkd7l7mk.execute-api.us-east-1.amazonaws.com/mainnet/api/v1";

const Container = styled.div`
  background:url("https://ipfs.near.social/ipfs/bafkreiadf32sz4riwsk6gwxrts7qqldhjae7jkgvl5gbhzngj4ekur2iuq");
   background-repeat: no-repeat;
  background-attachment: fixed;
  background-size: cover;

  max-height: 100svh;
  height: 100%;
  overflow: hidden;
`;
const Body = styled.div`
  display: flex;
  text-align: center;

  height: calc(100% - 120px);
  // height: 100%;
  flex: 1;
  flex-direction: column;
  overflow: auto;
  position: relative;

  p {
    text-align:center;
  }
`;

/*
const Container = styled.div`  
  max-height: 100svh;
  height: 100%;
`;
const Content = styled.div`
  height: calc(100% - 105px);
  flex: 1;
  flex-direction: column;
  overflow: auto;
  position: relative;
`;
*/

const HeaderStyle = styled.div`
 height: 64px;
  display: flex;
  align-items: flex-end;
  padding:15px;
  background: url("https://ipfs.near.social/ipfs/bafkreigmwev6i2ivgz5ampkihov2ub7yenn7hohs34erheclixz2dopwru");
  
  // margin-top:-15px;

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

const NavLink = styled.div`
  * {
      color: #000000;
  }
  a:hover {
    text-decoration:none;
  }
`;

const styles = {
  linkItem: {
    backgroundColor: "#161615",
    fontWeight: 500,
    width: "max(90%, 100vw - 40px)",
    height: 50,
    borderRadius: 50,
    // padding: 10,
    // position: "absolute",
    // left: "5%",
    bottom: "50px",
    paddingTop: 14,
    color: "white",
    textDecoration: "none",
  },
};

const { secretkey } = props;

const storedSecretKey = Storage.get(
  "newPrivateKey",
  `${ownerId}/widget/Ticket.Page`
)
  ? Storage.get("newPrivateKey", `${ownerId}/widget/Ticket.Page`)
  : Storage.get("newPrivateKey", `${ownerId}/widget/RegisterMobile.Index`);

const fetchData = () => {
  const key = secretkey ? secretkey : storedSecretKey;
  asyncFetch(
    `${apiUrl}/accounts/auth/${key}`
  ).then(({ body }) => {
    if (!!storedSecretKey === false) {
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

return (
  <>
    {props.error && (
      <div
        style={{
          position: "fixed",
          zIndex: 10,
          width: "100%",
          backgroundColor: "#ff7966",
          color: "#FFFFFF",
          borderRadius: 0,
          border: "none",
          textAlign: "center",

          display: "flex",
          justifyContent: "center",
          alignItems: "flex-start",
          gap: 4,
        }}
        class="alert alert-danger"
        role="alert"
      >
        <svg
          width="24"
          height="24"
          style={{
            minHeight: 24,
            minWidth: 24,
          }}
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M12 1.875C9.99747 1.875 8.0399 2.46882 6.37486 3.58137C4.70981 4.69392 3.41206 6.27523 2.64572 8.12533C1.87939 9.97543 1.67888 12.0112 2.06955 13.9753C2.46023 15.9393 3.42454 17.7435 4.84055 19.1595C6.25656 20.5755 8.06066 21.5398 10.0247 21.9305C11.9888 22.3211 14.0246 22.1206 15.8747 21.3543C17.7248 20.5879 19.3061 19.2902 20.4186 17.6251C21.5312 15.9601 22.125 14.0025 22.125 12C22.122 9.3156 21.0543 6.74199 19.1562 4.84383C17.258 2.94567 14.6844 1.87798 12 1.875ZM12 19.875C10.4425 19.875 8.91993 19.4131 7.62489 18.5478C6.32985 17.6825 5.32049 16.4526 4.72445 15.0136C4.12841 13.5747 3.97246 11.9913 4.27632 10.4637C4.58018 8.93606 5.3302 7.53287 6.43154 6.43153C7.53288 5.3302 8.93607 4.58017 10.4637 4.27632C11.9913 3.97246 13.5747 4.12841 15.0136 4.72445C16.4526 5.32049 17.6825 6.32985 18.5478 7.62488C19.4131 8.91992 19.875 10.4425 19.875 12C19.8728 14.0879 19.0424 16.0896 17.566 17.566C16.0896 19.0424 14.0879 19.8728 12 19.875ZM10.875 12.375V7.5C10.875 7.20163 10.9935 6.91548 11.2045 6.7045C11.4155 6.49353 11.7016 6.375 12 6.375C12.2984 6.375 12.5845 6.49353 12.7955 6.7045C13.0065 6.91548 13.125 7.20163 13.125 7.5V12.375C13.125 12.6734 13.0065 12.9595 12.7955 13.1705C12.5845 13.3815 12.2984 13.5 12 13.5C11.7016 13.5 11.4155 13.3815 11.2045 13.1705C10.9935 12.9595 10.875 12.6734 10.875 12.375ZM13.5 16.125C13.5 16.4217 13.412 16.7117 13.2472 16.9584C13.0824 17.205 12.8481 17.3973 12.574 17.5108C12.2999 17.6244 11.9983 17.6541 11.7074 17.5962C11.4164 17.5383 11.1491 17.3954 10.9393 17.1857C10.7296 16.9759 10.5867 16.7086 10.5288 16.4176C10.4709 16.1267 10.5007 15.8251 10.6142 15.551C10.7277 15.2769 10.92 15.0426 11.1666 14.8778C11.4133 14.713 11.7033 14.625 12 14.625C12.3978 14.625 12.7794 14.783 13.0607 15.0643C13.342 15.3456 13.5 15.7272 13.5 16.125Z"
            fill="#FFD9D8"
          />
        </svg>
        We need access to your camera to scan. Try refreshing the page and try
        again.
      </div>
    )}

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
                props={{
                  rightLabel: "Home",
                  value: true,
                  onChange: () => {
                    props?.closeScannedTicket?.();
                  },
                }}
              />
            </Link>
          </NavLink>
        </div>
      </HeaderStyle>

      <Body>
        <div
          style={{
            width: "100%",
            margin: "auto",

            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <p
            style={{
              fontSize: 30,
              color: "#DCDCF9",
              fontWeight: "500",
            }}
          >
            Put on <br />a friendly
            <br /> face :D
          </p>
          <p style={{ color: "#9797FF" }}>It’s Go Time baby! </p>
        </div>

        <div
          style={{
            width: "100%",
            margin: "auto",

            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: 16,
            paddingBottom: 32,
          }}
        >
          {state.userData?.isSuper && (
            <>
              <Link
                style={styles.linkItem}
                to={`/super?secretKey=${secretkey || storedSecretKey}`}
              >
                Manage Users
              </Link>

              <Link
                style={styles.linkItem}
                to={`/admin/campaigns?secretKey=${
                  secretkey || storedSecretKey
                }`}
              >
                Manage Campaigns
              </Link>

              <Link
                style={styles.linkItem}
                to={`/${ownerId}/widget/Mobile.Home.Alerts.New`}
              >
                Send an Alert
              </Link>
            </>
          )}

          <Link
            style={styles.linkItem}
            to={`/${ownerId}/widget/Mobile.Home.Scan`}
          >
            Scan Tickets
          </Link>
        </div>
      </Body>
    </Container>
  </>
);
