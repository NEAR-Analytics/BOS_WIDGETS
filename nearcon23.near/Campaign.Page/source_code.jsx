const ownerId = "nearcon23.near";
const apiUrl =
  "https://gqqkd7l7mk.execute-api.us-east-1.amazonaws.com/mainnet/api/v1";

const Container = styled.div`
  height: 100%;

  display: flex;
  flex-direction: column;
  background-color: #00ec97;
`;
const Content = styled.div`
  padding: 20px;

  display: flex;
  flex-direction: column;

  justify-content: center;
  align-items: center;
  
  flex: 1;
  position: relative;
`;
const Button = styled.button`
  margin: 20px;

  background-color: #000000;
  color: #FFFFFF;

  height: 48px;
  border-radius: 24px;
  border: none;

  font-familly: Mona Sans;

  font-size: 18px;
  font-weight: 600;
  width: calc(100% - 40px);

  display: flex;
  justify-content: center;
  align-items: center;
`;
const storedSecretKey = Storage.get(
  "newPrivateKey",
  `${ownerId}/widget/Ticket.Page`
)
  ? Storage.get("newPrivateKey", `${ownerId}/widget/Ticket.Page`)
  : Storage.get("newPrivateKey", `${ownerId}/widget/RegisterMobile.Index`);

const [loading, setLoading] = useState(false);
const [campaign, setCampaign] = useState({});

const [redirectToMobile, setRedirectToMobile] = useState(false);

const [status, setStatus] = useState("");

const handleClaim = () => {
  console.log("-----", campaign.amount, campaign._id, storedSecretKey);

  setLoading(true);
  asyncFetch(
    `${apiUrl}/campaigns/claim/${campaign._id}/${campaign.amount}/${storedSecretKey}`,
    {
      method: "POST",
      body: JSON.stringify({
        amount: campaign.amount,
        campaignId: campaign._id,
      }),
    }
  )
    .then((res) => {
      console.log("===>", res);

      if (res.status === 200) {
        setStatus("success");
      } else {
        setStatus("failed");
      }
      setLoading(true);

      return setRedirectToMobile(true);
    })
    .catch((err) => {
      setStatus("failed");
      console.log("getData error : ", err);
      setLoading(true);
    });
};

const getData = () => {
  asyncFetch(`${apiUrl}/campaigns/${props.campaignId}`)
    .then((res) => {
      setCampaign(res.body);
    })
    .catch((err) => {
      console.log("getData error : ", err);
    });
};

useEffect(() => {
  getData();
}, [props.campaignId]);

return (
  <Container>
    <Widget
      props={{
        nearconId: state.userData.nearconId,
        cid: state.userData.cid,
      }}
      src={`${ownerId}/widget/Navbar`}
    />

    {status === "success" ? (
      <Widget
        src={`${ownerId}/widget/Campaign.Success`}
        props={{
          amount: campaign.amount,
        }}
      />
    ) : status === "failed" ? (
      <Widget
        src={`${ownerId}/widget/Campaign.Failed`}
        props={{
          label: campaign?.name,
        }}
      />
    ) : (
      <>
        <Container>
          <svg
            width="347"
            height="460"
            viewBox="0 0 347 460"
            fill="none"
            style={{
              position: "absolute",
              zIndex: 1,

              top: 200,
            }}
          >
            <g>
              <path
                d="M305.155 46.2263C246.264 -14.7871 149.151 -15.4025 89.4891 44.3802C87.2305 46.6434 85.0886 48.9777 83.0025 51.3426C80.9165 48.9777 78.7748 46.6434 76.5162 44.3802C16.8544 -15.4025 -80.2593 -14.7871 -139.15 46.2263C-196.797 105.953 -194.213 201.672 -135.577 260.427L49.8701 446.249C68.1671 464.583 97.833 464.583 116.13 446.249L301.577 260.427C360.213 201.672 362.797 105.953 305.15 46.2263H305.155Z"
                fill="#00fba2"
              />
            </g>
          </svg>

          <Content>
            <p
              style={{
                color: "#096D50",

                fontFamily: "Mona Sans",
                fontSize: 16,
                fontWeight: 700,

                margin: "32px 0 8px 0",
                zIndex: 3,

                position: "absolute",
                top: 1,
              }}
            >
              CODE FOUND
            </p>

            <div
              style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                position: "relative",
                height: 162,
                width: 162,
                zIndex: 13,
              }}
            >
              <svg
                width="162"
                height="162"
                viewBox="0 0 162 162"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                style={{
                  position: "absolute",
                  zIndex: 1,
                }}
              >
                <circle
                  cx="81"
                  cy="81"
                  r="80.5"
                  fill="#096D50"
                  stroke="#00EC97"
                  fill="#000000"
                  stroke="#000000"
                />
              </svg>

              <h1
                style={{
                  color: "#FFFFFF",
                  zIndex: 5,
                  margin: 0,

                  fontSize: 72,
                  fontWeight: 900,
                  fontFamily: "FK Grotesk",
                  lineHeight: "100%",
                }}
              >
                ?
              </h1>
            </div>

            <h1
              style={{
                color: "#000000",
                fontFamily: "FK Grotesk",
                fontSize: 42,
                fontWeight: 400,

                margin: "32px 0 8px 0",
                zIndex: 12,
              }}
            >
              Congrats!
            </h1>
            <h5
              style={{
                color: "#000000",
                fontFamily: "FK Grotesk",
                fontSize: 20,
                fontStyle: "normal",
                fontWeight: 400,
                marginBottom: 32,
                zIndex: 12,
              }}
            >
              You found some NCON
            </h5>

            <Button
              style={{
                minHeight: 48,

                zIndex: 12,
              }}
              onClick={() => handleClaim()}
            >
              {loading ? (
                <div class="spinner-border text-light" role="status">
                  <span class="visually-hidden">Loading...</span>
                </div>
              ) : (
                "Reveal & Claim"
              )}
            </Button>
          </Content>
        </Container>
      </>
    )}
  </Container>
);
