const Alert = styled.div`
  width: 100%;
  border: 0.5px solid lightgray;
  padding: 20px;
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

const jutsuApi = "http://localhost:8000/api/v1/nearcon/notifications";

const apiUrl = "http://localhost:8080";
const socketUrl = "ws://localhost:8080";

const [loading, setLoading] = useState(false);
const [notifications, setNotifications] = useState([]);

const getData = async () => {
  setLoading(true);
  asyncFetch(jutsuApi)
    .then(({ body }) => {
      console.log("RES : ", body);
      setNotifications(body);
      setLoading(false);
    })
    .catch((err) => {
      setLoading(false);
    });

  setLoading(false);
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

return (
  <div
    style={{
      height: "100%",
      // position: "relative",
    }}
  >
    {loading ? (
      <div
        style={{
          height: "75%",
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
          <div style={{ display: "flex", alignItems: "center", gap: "5px" }}>
            <i class="bi bi-clock" style={{ color: "lightgray" }}></i>
            <p style={{ marginBottom: 0, color: "lightgray" }}>
              {timeAgo(item?.createdAt || "")}
            </p>
          </div>
          <p>{item?.message}</p>

          {item.showButton && (
            <a href={item.url} target="_blank">
              <Button>
                <i
                  class="bi bi-map"
                  style={{
                    width: "14",
                    height: "14",
                    color: "#7269E1",
                  }}
                ></i>
                {item.buttonLabel}
              </Button>
            </a>
          )}
        </Alert>
      ))
    )}
  </div>
);
