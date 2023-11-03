const ownerId = "nearcon23.near";
const prefix = props.prefix || "";
const socketUrl =
  "wss://bva2os6ai2.execute-api.us-east-1.amazonaws.com/mainnet";
const baseUrl =
  "https://gqqkd7l7mk.execute-api.us-east-1.amazonaws.com/mainnet/api/v1";

const theme = props.theme;
const transactions = props?.transactions;
const userData = props.userData;

console.log("=============> ", transactions);


const [persona, setPersona] = useState("allTracks");

const Content = styled.div`
    display: flex;
    flex-direction: column;
    position: relative;
    width: 100%;
    height: 100%;
    min-height: 736px;
    div {
      width: 100%;
    }
`;

const Button = styled.a`
  border:none;
  background-color: transparent;
  display: flex;
  justify-content: center;
  align-items: center;
  color:black;
  flex-direction: column;
  gap: 8px;

  text-decoration: none;
  color: #000000;
`;

const ButtonIcon = styled.div`
  min-height: 56px;
  height: 56px;
  max-height: 56px;
  min-width: 56px;
  width: 56px;
  max-width: 56px;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 20px;
  background-color: black;
`;

const Alert = styled.div`
  width: 100%;
  border: 0.5px solid lightgray;
  padding: 20px;

  background-color: #dcdcf9;
  border-radius: 8px;
  margin-bottom: 16px;
`;

const AlertButton = styled.button`
    background-color: #BABAFC;
    border-width: 0px;
    color: #4D3BC2;
    font-size: 12px;
    font-weight: 600;
    padding: 10px;
    width: 100%;
    border-radius: 100px;
`;

const RedirectButton = styled.button`
    background-color: #00ec97;
    border-width: 0px;
    color: #000000;
    font-size: 16px;
    font-weight: 600;
    padding: 10px;
    height: 48px;
    width: 100%;
    border-radius: 100px;
`;

const [loading, setLoading] = useState(false);
const [notifications, setNotifications] = useState([]);
const [showTime, setShowTime] = useState(10);

useEffect(() => {
  const socket = new WebSocket(socketUrl);

  // Listen for messages from the WebSocket server
  socket.addEventListener("message", (event) => {
    const data = event?.data && JSON.parse(event?.data);
    console.log("Received message:", data);

    // Update notifications when a new notification is received
    setNotifications((prevNotifications) => [data, ...prevNotifications]);
  });

  // Clean up the WebSocket connection when the component is unmounted
  return () => {
    socket.close();
  };
}, []);

useEffect(() => {
  const notificationCheckInterval = setInterval(() => {
    const currentTime = new Date().getTime();
    setNotifications((prevNotifications) =>
      prevNotifications.filter(
        (notif) => currentTime - new Date(notif.createdAt).getTime() <= 20000
      )
    );
  }, 1000); // Check every second

  return () => clearInterval(notificationCheckInterval);
}, []);

function timeAgo(timestamp) {
  const currentDate = new Date();
  const previousDate = new Date(timestamp);

  const seconds = Math.floor((currentDate - previousDate) / 1000);

  const intervals = {
    year: seconds / (60 * 60 * 24 * 365),
    month: seconds / (60 * 60 * 24 * 30),
    week: seconds / (60 * 60 * 24 * 7),
    day: seconds / (60 * 60 * 24),
    hour: seconds / (60 * 60),
    minute: seconds / 60,
  };

  let result;
  for (const [unit, value] of Object.entries(intervals)) {
    if (value >= 1) {
      result =
        Math.floor(value) +
        " " +
        unit +
        (Math.floor(value) > 1 ? "s" : "") +
        " ago";
      break;
    }
  }

  return result || "Just now";
}

// const { secretkey } = props;

// const storedSecretKey = Storage.get(
//   "newPrivateKey",
//   `${ownerId}/widget/Ticket.Page`
// )
//   ? Storage.get("newPrivateKey", `${ownerId}/widget/Ticket.Page`)
//   : Storage.get("newPrivateKey", `${ownerId}/widget/RegisterMobile.Index`);

// const fetchData = () => {
//   setLoading(true);
//   const key = secretkey ? secretkey : storedSecretKey;
//   asyncFetch(`${baseUrl}/accounts/auth/${key}`).then(({ body }) => {
//     console.log(body);
//     State.update({ userData: body });
//     setLoading(false);
//   });
// };

// useEffect(() => {
//   fetchData();
// }, [secretkey, storedSecretKey]);

const arrayList = [
  { accountId: "phil", sent: true, amount: 0.5 },
  { accountId: "zahid", sent: false, amount: 1 },
];

if (state.redirectToTransactions) {
  return <Redirect to={`/${ownerId}/widget/Mobile.Home.RecentTransactions`} />;
}

function convertToReadableDate(dateString) {
  const date = new Date(dateString);

  // Get the components of the date
  let hours = date.getUTCHours();
  const minutes = date.getUTCMinutes();
  const day = date.getUTCDate();
  const months = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];
  const month = months[date.getUTCMonth()];

  // Convert to 12-hour format and set AM or PM
  const ampm = hours >= 12 ? "PM" : "AM";
  hours = hours % 12;
  hours = hours ? hours : 12; // the hour '0' should be '12'

  // Formatting minutes to always be two digits
  const formattedMinutes = minutes < 10 ? "0" + minutes : minutes;

  // Construct the formatted string
  return `${hours}:${formattedMinutes} ${ampm} at ${day} ${month}`;
}

return loading ? (
  <div
    style={{
      display: "flex",
      flexDirection: "column",
      justifyContent: "center",
      alignItems: "center",
      gap: 32,

      position: "relative",

      height: "calc(100% - 165px)",
      width: "100%",
      padding: "0 20px",
    }}
  >
    {/*<Widget src={`${ownerId}/widget/Components.LoadingOverlay`} />*/}
    <div
      class="spinner-border"
      style={{ color: "rgb(0, 236, 151)" }}
      role="status"
    >
      <span class="visually-hidden">Loading...</span>
    </div>
  </div>
) : (
  <>
    <Content>
      <div
        style={{
          flex: 1,
          display: "flex",
          flexDirection: "column",
          justifyContent: "flex-start",
          alignItems: "center",
          margin: 20,
          width: "calc(100% - 40px)",
        }}
      >
        {notifications?.map((item, index) => (
          <Alert key={index}>
            <div style={{ display: "flex", alignItems: "center", gap: "5px" }}>
              <i class="bi bi-clock" style={{ color: "#7269e1" }}></i>
              <p style={{ marginBottom: 0, color: "#7269e1" }}>
                {timeAgo(item?.createdAt || "")}
              </p>
            </div>
            <p style={{ color: "#4d3bc2" }}>{item?.message}</p>

            {item.showButton && (
              <a href={item.url} target="_blank">
                <AlertButton>
                  <i
                    class="bi bi-map"
                    style={{
                      width: "14",
                      height: "14",
                      color: "#4d3bc2",
                    }}
                  ></i>
                  {item.buttonLabel}
                </AlertButton>
              </a>
            )}
          </Alert>
        ))}

        <div
          style={{
            border: `2px ${theme.borderColor} solid`,
            borderRadius: 8,
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",

            aspectRatio: 1 / 1,
          }}
        >
          <h1
            style={{
              fontSize: 64,
              fontWeight: 500,
              margin: 0,
              letterSpacing: "-5px",
            }}
          >
            {userData?.balance?.replace?.("0000000000000000000000", "")}
          </h1>
          <h3
            style={{
              fontSize: 30,
              fontWeight: 500,
              margin: 0,
              color: "#00EC97",
            }}
          >
            NCON
          </h3>

          <div
            style={{
              marginTop: 24,
              width: 300,
              marginBottom: 24,
              display: "flex",
              justifyContent: "space-around",
            }}
          >
            <Button
              href={`/${ownerId}/widget/Mobile.Home.SendAddress`}
              style={{
                textDecoration: "none",
              }}
            >
              <ButtonIcon>
                <Widget src={`${ownerId}/widget/Icons.SendMoney`} />
              </ButtonIcon>

              <h6 style={{ fontWeight: "400", color: "#000000" }}>Send</h6>
            </Button>

            <Button
              href={`/${ownerId}/widget/Mobile.Home.Recieve`}
              style={{
                textDecoration: "none",
              }}
            >
              <ButtonIcon>
                <Widget src={`${ownerId}/widget/Icons.Receive`} />
              </ButtonIcon>

              <h6 style={{ fontWeight: "400", color: "#000000" }}>Receive</h6>
            </Button>

            <Link
              href={`/${ownerId}/widget/Mobile.Home.Scan`}
              style={{
                border: "none",
                backgroundColor: "transparent",
                color: "#000000",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                flexDirection: "column",
                gap: 8,

                textDecoration: "none",
              }}
            >
              <ButtonIcon>
                <Widget src={`${ownerId}/widget/Icons.Scan`} />
              </ButtonIcon>

              <h6 style={{ fontWeight: "400", color: "#000000" }}>Scan</h6>
            </Link>
          </div>

          <p
            style={{
              textAlign: "center",
              color: theme.textColor3,
              padding: "0 20px",
              maxWidth: 425,
              fontSize: 12,
              fontWeight: 400,
            }}
          >
            All NCON expire at the end of the conference
            <br /> and are worth no monetary value.
          </p>
        </div>

        {(transactions ?? [])?.length !== 0 && (
          <>
            <div style={{ paddingTop: 10, marginTop: 40 }}>
              <p style={{ color: "#868682", fontSize: 16 }}>
                Recent Transactions
              </p>
              {([...transactions.slice(0, 2)] ?? []).map((item) => (
                <Widget
                  props={{
                    sent: item.senderId === userData.nearconId,
                    amount: item.amount,
                    image:
                      item.senderId === userData.nearconId
                        ? item?.receiverCid
                        : item.senderCid,
                    accountId:
                      item.senderId === userData.nearconId
                        ? item.receiverId
                        : item.senderId,
                    time: convertToReadableDate(item.createdAt),
                  }}
                  src={`${ownerId}/widget/Components.TransactionCard`}
                />
              ))}

              <button
                onClick={() => {
                  State.update({ redirectToTransactions: true });
                }}
                style={{
                  backgroundColor: "#E3E3E0",
                  borderWidth: 0,
                  borderRadius: 100,
                  color: "#000",
                  padding: 10,
                  marginBottom: 20,
                  fontWeight: "500",
                  paddingLeft: 20,
                  marginTop: 10,
                  paddingRight: 20,
                }}
              >
                Show More
              </button>
            </div>
          </>
        )}
      </div>
    </Content>
  </>
);
