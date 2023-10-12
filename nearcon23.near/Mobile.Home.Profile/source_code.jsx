const ownerId = "nearcon23.near";
const prefix = props.prefix || "/mobile";
const theme = props.theme;

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
  gap: 8px
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

const jutsuApi = "http://localhost:8000/api/v1/nearcon/notifications";

const apiUrl = "http://localhost:8080";
const socketUrl = "ws://localhost:8080";
// const socketUrl = "ws://192.168.0.100:8080";

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

return (
  <Content>
    <div
      style={{
        flex: 1,
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
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
          50.00
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
            marginBottom: 24,
            display: "flex",
            justifyContent: "space-around",
          }}
        >
          <Button href={`/${ownerId}/widget/Mobile.Home.SendAddress`}>
            <ButtonIcon>
              <svg
                width="23"
                height="22"
                viewBox="0 0 23 22"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M20.2768 2.22235C20.0608 2.00628 19.7912 1.85169 19.4956 1.77451C19.1999 1.69732 18.8891 1.70032 18.5951 1.7832L18.5761 1.78922L2.08388 6.78906C1.74889 6.88619 1.45138 7.08293 1.23087 7.35316C1.01035 7.62338 0.877266 7.9543 0.849289 8.30196C0.821313 8.64962 0.899768 8.99756 1.07423 9.29958C1.2487 9.60159 1.51092 9.84337 1.82607 9.99281L9.07232 13.4303L12.5098 20.6766C12.647 20.9709 12.8656 21.2199 13.1397 21.3941C13.4137 21.5683 13.7319 21.6604 14.0567 21.6597C14.1057 21.6597 14.1555 21.6597 14.2054 21.6537C14.5527 21.626 14.8833 21.4924 15.1524 21.271C15.4214 21.0495 15.6161 20.7509 15.7101 20.4153L20.71 3.92305C20.7125 3.91692 20.7145 3.9106 20.716 3.90414C20.7989 3.61008 20.8019 3.29925 20.7247 3.00364C20.6475 2.70803 20.4929 2.43835 20.2768 2.22235ZM13.9914 18.9853L11.0936 12.8674L14.9822 8.97875C15.176 8.78502 15.2848 8.52226 15.2848 8.24828C15.2848 7.9743 15.176 7.71155 14.9822 7.51781C14.7885 7.32408 14.5257 7.21524 14.2518 7.21524C13.9778 7.21524 13.715 7.32408 13.5213 7.51781L9.63263 11.4065L3.51388 8.50781L18.5461 3.95313L13.9914 18.9853Z"
                  fill="white"
                />
              </svg>
            </ButtonIcon>

            <h6>Send</h6>
          </Button>

          <Button href={`/${ownerId}/widget/Mobile.Home.Recieve`}>
            <ButtonIcon>
              <svg
                width="23"
                height="22"
                viewBox="0 0 23 22"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M18.7197 2.75C18.7197 3.0235 18.611 3.28581 18.4176 3.4792C18.2242 3.6726 17.9619 3.78125 17.6884 3.78125C15.7745 3.7833 13.9396 4.5445 12.5863 5.89783C11.2329 7.25117 10.4717 9.0861 10.4697 11V16.7578L12.8338 14.3928C13.0276 14.1991 13.2903 14.0902 13.5643 14.0902C13.8383 14.0902 14.101 14.1991 14.2948 14.3928C14.4885 14.5865 14.5973 14.8493 14.5973 15.1233C14.5973 15.3973 14.4885 15.66 14.2948 15.8538L10.1698 19.9788C10.074 20.0749 9.96011 20.1512 9.83476 20.2032C9.70941 20.2553 9.57502 20.2821 9.43929 20.2821C9.30356 20.2821 9.16917 20.2553 9.04382 20.2032C8.91847 20.1512 8.80463 20.0749 8.70882 19.9788L4.58382 15.8538C4.48789 15.7578 4.4118 15.6439 4.35989 15.5186C4.30797 15.3933 4.28125 15.2589 4.28125 15.1233C4.28125 14.8493 4.39009 14.5865 4.58382 14.3928C4.77755 14.1991 5.04031 14.0902 5.31429 14.0902C5.58827 14.0902 5.85103 14.1991 6.04476 14.3928L8.40718 16.7578V11C8.40991 8.5393 9.38863 6.18016 11.1286 4.44018C12.8686 2.7002 15.2277 1.72148 17.6884 1.71875C17.9619 1.71875 18.2242 1.8274 18.4176 2.0208C18.611 2.21419 18.7197 2.4765 18.7197 2.75Z"
                  fill="white"
                />
              </svg>
            </ButtonIcon>

            <h6>Receive</h6>
          </Button>

          <Link
            href={`${prefix}/${ownerId}/widget/Mobile.Home.Scan`}
            style={{
              border: "none",
              backgroundColor: "transparent",
              color: "#000000",

              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              flexDirection: "column",
              gap: 8,
            }}
          >
            <ButtonIcon>
              <svg
                width="23"
                height="22"
                viewBox="0 0 23 22"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M18.375 4.46875H16.1767L15.1094 2.86516C15.015 2.72377 14.8872 2.60789 14.7373 2.52783C14.5874 2.44776 14.42 2.406 14.25 2.40625H8.75C8.58003 2.406 8.41264 2.44776 8.2627 2.52783C8.11277 2.60789 7.98496 2.72377 7.89062 2.86516L6.82242 4.46875h6.625C3.98682 4.46875 3.37478 4.72227 2.92352 5.17353C2.47226 5.62478 2.21875 6.23682 2.21875 6.875V16.5C2.21875 17.1382 2.47226 17.7502 2.92352 18.2015C3.37478 18.6527 3.98682 18.9063 4.625 18.9063H18.375C18.691 18.9063 19.0039 18.844 19.2958 18.7231C19.5878 18.6022 19.853 18.4249 20.0765 18.2015C20.2999 17.978 20.4772 17.7128 20.5981 17.4208C20.719 17.1289 20.7812 16.816 20.7812 16.5V6.875C20.7812 6.55901 20.719 6.24611 20.5981 5.95417C20.4772 5.66223 20.2999 5.39697 20.0765 5.17353C19.853 4.95008 19.5878 4.77284 19.2958 4.65192C19.0039 4.53099 18.691 4.46875 18.375 4.46875ZM18.7188 16.5C18.7188 16.5912 18.6825 16.6786 18.6181 16.7431C18.5536 16.8075 18.4662 16.8438 18.375 16.8438h6.625C4.53383 16.8438 4.4464 16.8075 4.38193 16.7431C4.31747 16.6786 4.28125 16.5912 4.28125 16.5V6.875C4.28125 6.78383 4.31747 6.6964 4.38193 6.63193C4.4464 6.56747 4.53383 6.53125 4.625 6.53125H7.375C7.54497 6.5315 7.71236 6.48974 7.8623 6.40968C8.01223 6.32961 8.14004 6.21373 8.23438 6.07235L9.30172 4.46875H13.6974L14.7656 6.07235C14.86 6.21373 14.9878 6.32961 15.1377 6.40968C15.2876 6.48974 15.455 6.5315 15.625 6.53125H18.375C18.4662 6.53125 18.5536 6.56747 18.6181 6.63193C18.6825 6.6964 18.7188 6.78383 18.7188 6.875V16.5ZM11.5 7.21875C10.6842 7.21875 9.88663 7.46068 9.20827 7.91394C8.52992 8.3672 8.00121 9.01144 7.689 9.76518C7.37679 10.5189 7.2951 11.3483 7.45426 12.1485C7.61343 12.9487 8.00629 13.6837 8.58318 14.2606C9.16008 14.8375 9.89508 15.2303 10.6953 15.3895C11.4954 15.5487 12.3248 15.467 13.0786 15.1548C13.8323 14.8425 14.4766 14.3138 14.9298 13.6355C15.3831 12.9571 15.625 12.1596 15.625 11.3438C15.6239 10.2501 15.1889 9.20153 14.4156 8.42819C13.6422 7.65485 12.5937 7.21989 11.5 7.21875ZM11.5 13.4063C11.0921 13.4063 10.6933 13.2853 10.3541 13.0587C10.015 12.832 9.7506 12.5099 9.5945 12.133C9.43839 11.7562 9.39755 11.3415 9.47713 10.9414C9.55671 10.5413 9.75315 10.1738 10.0416 9.88534C10.33 9.5969 10.6975 9.40046 11.0976 9.32088C11.4977 9.2413 11.9124 9.28214 12.2893 9.43825C12.6662 9.59436 12.9883 9.85871 13.2149 10.1979C13.4415 10.5371 13.5625 10.9358 13.5625 11.3438C13.5625 11.8908 13.3452 12.4154 12.9584 12.8022C12.5716 13.189 12.047 13.4063 11.5 13.4063Z"
                  fill="white"
                />
              </svg>
            </ButtonIcon>

            <h6>Scan</h6>
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
          All NCON expire at the end of the conference and are worth no monetary
          value.
        </p>
      </div>
    </div>

    <Widget src={`${ownerId}/widget/Profile.TogglePrivacy`} />

    <div
      style={{
        margin: "20px 20px 0px 20px",
        paddingBottom: 80,
        width: "calc(100% - 40px)",
      }}
    >
      <h5>Track Preference</h5>

      <Widget
        src={`${ownerId}/widget/Inputs.Select`}
        props={{
          label: "",
          value: persona,
          placeholder: "Choose...",
          options: [
            { value: "allTracks", text: "All Tracks" },
            { value: "developers", text: "Developers" },
            { value: "entrepreneurs", text: "Entrepreneurs" },
            { value: "creators", text: "Creators" },
            { value: "regulators", text: "Regulators" },
          ],
          onChange: (persona) => setPersona(persona),
        }}
      />
    </div>
  </Content>
);
