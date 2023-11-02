const ownerId = "nearpad.testnet";
const apiUrl =
  "https://gqqkd7l7mk.execute-api.us-east-1.amazonaws.com/mainnet/api/v1";
const socketUrl =
  "wss://bva2os6ai2.execute-api.us-east-1.amazonaws.com/mainnet";

const Alert = styled.div`
  width: 100%;
  border-bottom: 1px solid #F2F1EA;
  padding: 20px;

  display: flex;
`;

const Button = styled.button`
    background-color: #BABAFC;
    border-width: 0px;
    color: #4D3BC2;
    font-size: 12px;
    font-weight: 600;
    padding: 10px;
    width: 100%;
    border-radius: 100px;
`;
const IconButton = styled.button`
  border: none;
  background-color: transparent;
`;

const CreateButton = styled.a`
    position: sticky;
    bottom: 20px;
    width: calc(100% - 40px);
    height: 48px;
    padding: 10px;
    margin: 0 20px;
    border-radius: 100px;
    border-width: 0px;
    font-size: 16px;
    font-weight: 600;
    background-color: #000000;
    color: #FFFFFF;

    display: flex; 
    align-items: center;
    justify-content: center;

    :hover {
      background-color: #000000dd;
    }
    :active {
      background-color: #000000aa;
    }
`;

const isAdmin = props.isAdmin;

// const { secretkey } = props;

// const storedSecretKey = Storage.get(
//   "newPrivateKey",
//   "nearpad.testnet/widget/Ticket.Page"
// )
//   ? Storage.get("newPrivateKey", `${ownerId}/widget/Ticket.Page`)
//   : Storage.get("newPrivateKey", `${ownerId}/widget/RegisterMobile.Index`);

// const fetchData = () => {
//   const key = secretkey ? secretkey : storedSecretKey;

//   asyncFetch(`${apiUrl}/accounts/auth/${key}`).then(({ body }) => {
//     if (body?.isAdmin) {
//       setIsAdmin(body?.isAdmin);
//     }
//   });
// };

const [loading, setLoading] = useState(true);
const [notifications, setNotifications] = useState([]);

const getData = async () => {
  setLoading(true);
  asyncFetch(`${apiUrl}/notifications`)
    .then(({ body }) => {
      console.log("RES : ", body);
      if (body) setNotifications(body);
      setLoading(false);
    })
    .catch((err) => {
      setLoading(false);
    });
};
useEffect(() => {
  getData();
}, []);

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

const deleteNotification = (id) => {
  setLoading(true);

  asyncFetch(`${apiUrl}/notifications/${id}`, {
    method: "DELETE",
    headers: {
      Accept: "application/json",
      Authorization: "Bearer 83d2e488-68e3-11ee-8c99-0242ac120002",
      "x-amzn-RequestId": "83d2e488-68e3-11ee-8c99-0242ac120002",
    },
  })
    .then((res) => {
      console.log("Delete Noti: ", res.body);

      getData();
      // if (typeof res.body !== "string") {
      //   setNotifications(res.body);
      // }
      setLoading(false);
    })
    .catch((err) => {
      console.log("Delete Noti: ", err);
      setLoading(false);
    });
};

return (
  <div
    style={{
      height: "100%",
      // position: "relative",
      width: "100%",
    }}
  >
    {loading ? (
      <div
        style={{
          height: "100%",
          width: "100%",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          position: "relative",
        }}
      >
        <div class="spinner-border" role="status">
          <span class="visually-hidden">Loading...</span>
        </div>
      </div>
    ) : (
      notifications?.map((item, index) => (
        <Alert key={index}>
          <div style={{ width: "100%" }}>
            <div
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
              }}
            >
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "4px",
                }}
              >
                <svg
                  width="16"
                  height="16"
                  viewBox="0 0 16 16"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M8 1.25C6.66498 1.25 5.35994 1.64588 4.2499 2.38758C3.13987 3.12928 2.27471 4.18349 1.76382 5.41689C1.25292 6.65029 1.11925 8.00749 1.3797 9.31686C1.64015 10.6262 2.28303 11.829 3.22703 12.773C4.17104 13.717 5.37377 14.3599 6.68314 14.6203C7.99252 14.8808 9.34972 14.7471 10.5831 14.2362C11.8165 13.7253 12.8707 12.8601 13.6124 11.7501C14.3541 10.6401 14.75 9.33502 14.75 8C14.748 6.2104 14.0362 4.49466 12.7708 3.22922C11.5053 1.96378 9.78961 1.25199 8 1.25ZM8 13.25C6.96165 13.25 5.94662 12.9421 5.08326 12.3652C4.2199 11.7883 3.547 10.9684 3.14964 10.0091C2.75228 9.04978 2.64831 7.99418 2.85088 6.97578C3.05345 5.95738 3.55347 5.02192 4.28769 4.28769C5.02192 3.55346 5.95738 3.05345 6.97578 2.85088C7.99418 2.64831 9.04978 2.75227 10.0091 3.14963C10.9684 3.54699 11.7883 4.2199 12.3652 5.08326C12.9421 5.94661 13.25 6.96165 13.25 8C13.2485 9.39193 12.6949 10.7264 11.7107 11.7107C10.7264 12.6949 9.39193 13.2485 8 13.25ZM12.25 8C12.25 8.19891 12.171 8.38968 12.0303 8.53033C11.8897 8.67098 11.6989 8.75 11.5 8.75H8C7.80109 8.75 7.61033 8.67098 7.46967 8.53033C7.32902 8.38968 7.25 8.19891 7.25 8V4.5C7.25 4.30109 7.32902 4.11032 7.46967 3.96967C7.61033 3.82902 7.80109 3.75 8 3.75C8.19892 3.75 8.38968 3.82902 8.53033 3.96967C8.67099 4.11032 8.75 4.30109 8.75 4.5V7.25H11.5C11.6989 7.25 11.8897 7.32902 12.0303 7.46967C12.171 7.61032 12.25 7.80109 12.25 8Z"
                    fill="#DBDBD7"
                  />
                </svg>

                <p style={{ marginBottom: 0, color: "#C8C7c1" }}>
                  {timeAgo(item?.createdAt || "")}
                </p>
              </div>

              {isAdmin && (
                <IconButton
                  onClick={() => {
                    deleteNotification(item?._id);
                  }}
                >
                  <svg
                    width="22"
                    height="22"
                    viewBox="0 0 22 22"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M18.5625 4.125H15.4688V3.09375C15.4688 2.45557 15.2152 1.84353 14.764 1.39227C14.3127 0.941015 13.7007 0.6875 13.0625 0.6875H8.9375C8.29932 0.6875 7.68728 0.941015 7.23602 1.39227C6.78477 1.84353 6.53125 2.45557 6.53125 3.09375V4.125H3.4375C3.164 4.125 2.90169 4.23365 2.7083 4.42705C2.5149 4.62044 2.40625 4.88275 2.40625 5.15625C2.40625 5.42975 2.5149 5.69206 2.7083 5.88545C2.90169 6.07885 3.164 6.1875 3.4375 6.1875H3.78125V17.875C3.78125 18.3308 3.96233 18.768 4.28466 19.0903C4.60699 19.4127 5.04416 19.5938 5.5 19.5938H16.5C16.9558 19.5938 17.393 19.4127 17.7153 19.0903C18.0377 18.768 18.2188 18.3308 18.2188 17.875V6.1875H18.5625C18.836 6.1875 19.0983 6.07885 19.2917 5.88545C19.4851 5.69206 19.5938 5.42975 19.5938 5.15625C19.5938 4.88275 19.4851 4.62044 19.2917 4.42705C19.0983 4.23365 18.836 4.125 18.5625 4.125ZM8.59375 3.09375C8.59375 3.00258 8.62997 2.91515 8.69443 2.85068C8.7589 2.78622 8.84633 2.75 8.9375 2.75H13.0625C13.1537 2.75 13.2411 2.78622 13.3056 2.85068C13.37 2.91515 13.4062 3.00258 13.4062 3.09375V4.125H8.59375V3.09375ZM16.1562 17.5312H5.84375V6.1875H16.1562V17.5312ZM9.96875 8.9375V14.4375C9.96875 14.711 9.8601 14.9733 9.6667 15.1667C9.47331 15.3601 9.211 15.4688 8.9375 15.4688C8.664 15.4688 8.40169 15.3601 8.2083 15.1667C8.0149 14.9733 7.90625 14.711 7.90625 14.4375V8.9375C7.90625 8.664 8.0149 8.40169 8.2083 8.2083C8.40169 8.0149 8.664 7.90625 8.9375 7.90625C9.211 7.90625 9.47331 8.0149 9.6667 8.2083C9.8601 8.40169 9.96875 8.664 9.96875 8.9375ZM14.0938 8.9375V14.4375C14.0938 14.711 13.9851 14.9733 13.7917 15.1667C13.5983 15.3601 13.336 15.4688 13.0625 15.4688C12.789 15.4688 12.5267 15.3601 12.3333 15.1667C12.1399 14.9733 12.0312 14.711 12.0312 14.4375V8.9375C12.0312 8.664 12.1399 8.40169 12.3333 8.2083C12.5267 8.0149 12.789 7.90625 13.0625 7.90625C13.336 7.90625 13.5983 8.0149 13.7917 8.2083C13.9851 8.40169 14.0938 8.664 14.0938 8.9375Z"
                      fill="#C8C7C1"
                    />
                  </svg>
                </IconButton>
              )}
            </div>

            <p>{item?.message}</p>

            {item.showButton && (
              <a href={item.url} target="_blank">
                <Button
                  style={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    gap: 4,
                  }}
                >
                  {/*<svg
                    width="16"
                    height="16"
                    viewBox="0 0 16 16"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M14.4613 2.90851C14.3714 2.83845 14.2668 2.78977 14.1554 2.76617C14.044 2.74256 13.9286 2.74464 13.8181 2.77226L10.0875 3.70476L6.3375 1.82976C6.17732 1.74962 5.99376 1.72944 5.82 1.77288L1.82 2.77288C1.6575 2.81306 1.51311 2.90644 1.40982 3.03816C1.30653 3.16988 1.25027 3.33237 1.25 3.49976V12.4998C1.25002 12.6137 1.27601 12.7262 1.32599 12.8286C1.37598 12.931 1.44864 13.0207 1.53847 13.0908C1.62831 13.161 1.73294 13.2097 1.84442 13.2333C1.95591 13.257 2.07131 13.2549 2.18187 13.2273L5.9125 12.2948L9.6625 14.1698C9.82268 14.2499 10.0062 14.2701 10.18 14.2266L14.18 13.2266C14.3425 13.1865 14.4869 13.0931 14.5902 12.9614C14.6935 12.8296 14.7497 12.6671 14.75 12.4998V3.49976C14.75 3.38574 14.724 3.27323 14.6739 3.17078C14.6239 3.06833 14.5512 2.97863 14.4613 2.90851ZM6.75 3.71351L9.25 4.96351V12.286L6.75 11.036V3.71351ZM2.75 4.08851L5.25 3.46351V10.9141L2.75 11.5391V4.08851ZM13.25 11.9141L10.75 12.5391V5.08538L13.25 4.46038V11.9141Z"
                      fill="#7269E1"
                    />
                  </svg>*/}

                  {item.buttonLabel}
                </Button>
              </a>
            )}
          </div>
        </Alert>
      ))
    )}

    {isAdmin && (
      <Link to={`${ownerId}/widget/Mobile.Home.Alerts.New`}>
        <CreateButton>
          New Alert
          <i class="bi bi-send" style={{ marginLeft: 8 }}></i>
        </CreateButton>
      </Link>
    )}
  </div>
);
