const ownerId = "nearcon23.near";
const apiUrl =
  "https://gqqkd7l7mk.execute-api.us-east-1.amazonaws.com/mainnet/api/v1/transactions";

const Container = styled.div`
    background-color:#000000;
    min-height:100vh;
    .header {
        padding:20px;
        p {
            font-family:FK Grotesk;
            color:white;
            font-size:45px;
        }
      .bottomBorderDiv {
        border: 0px solid #FFFFFF;
        border-bottom-width: 1px;
      }
    };
    overflow:scroll;
    .ads {
      padding:10px;
      width: 45%;
      text-align: center;
    }
`;

const fetchTransaction = () => {
  asyncFetch(apiUrl).then(({ body }) => {
    State.update(body);
  });
};

useEffect(() => {
  const interval = setInterval(() => {
    fetchTransaction();
  }, 30000);
  fetchTransaction();
  return () => {
    clearInterval(interval);
  };
}, []);

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
  return `${hours}:${formattedMinutes} ${ampm} ${day} ${month}`;
}

return (
  <Container>
    <div style={{ display: "flex", width: "100%", gap: "50px" }}>
      <div style={{ width: "70%" }}>
        <div className="header">
          <div
            style={{
              display: "flex",
              width: "690px",
              marginTop: -20,
              height: "150px",
              overflow: "hidden",
              alignItems: "center",
              justifyContent: "space-between",
            }}
          >
            <img
              style={{
                padding: 20,
                width: "380px",
                height: "150px",
                transform: "scale(2)",
                marginLeft: 120,
                objectFit: "contain",
              }}
              src="https://ipfs.near.social/ipfs/bafkreictx7pybi5goa5sfzfgina45nkric3chajfszyekqlufkg4gqhuna"
            />
          </div>
          <div className="bottomBorderDiv" />
        </div>
        {(state?.transactions ?? []).map?.((item) => (
          <Widget
            props={{
              isSend: item.senderId === state.userData.nearconId,
              amount: item.amount,
              receiverCid: item?.receiverCid,
              senderCid: item.senderCid,
              sendAccount: item.senderId,
              recieveAccount: item.receiverId,
              time: convertToReadableDate(item.createdAt),
            }}
            src={`${ownerId}/widget/Nearconomy.TransactionCard`}
          />
        ))}
      </div>
      <div style={{ width: "30%", paddingTop: 20, paddingRight: 30 }}>
        <div
          style={{
            display: "flex",
            gap: "50px",
          }}
        >
          <div>
            <h2
              style={{
                textAlign: "center",
                marginBottom: 0,
                fontSize: 76,
                color: "white",
                fontFamily: "FK Grotesk",
                fontWeight: 400,
              }}
            >
              {state.numberOfTransactions || 0}
            </h2>
            <p
              style={{
                fontWeight: 400,
                fontSize: 32,
                marginTop: -15,
                color: "#00EC97",
                fontFamily: "Mona Sans",
                textAlign: "center",
              }}
            >
              Transactions
            </p>
          </div>
          <div></div>
          <div>
            <h2
              style={{
                fontWeight: 400,
                textAlign: "center",
                marginBottom: 0,
                fontSize: 76,
                color: "white",
                fontFamily: "FK Grotesk",
              }}
            >
              {state.totalNCONTransacted || 0}
            </h2>
            <p
              style={{
                fontWeight: 400,
                fontSize: 32,
                marginTop: -15,
                color: "#00EC97",
                fontFamily: "Mona Sans",
                textAlign: "center",
              }}
            >
              NCON transacted
            </p>
          </div>
        </div>
        <div>
          <h2
            style={{
              color: "white",
              fontSize: 76,
              fontWeight: 400,
              fontFamily: "FK Grotesk",
              fontWeight: 400,
            }}
          >
            Top Earners
          </h2>
          <p style={{ color: "#00EC97", fontSize: 32, marginTop: -20 }}>
            NCON Leaderboard
          </p>
        </div>
        {state?.leaderboard?.map?.((item, idx) => (
          <Widget
            src={`${ownerId}/widget/Nearconomy.TopEarners`}
            props={{ ...item, idx: idx + 1 }}
          />
        ))}
        <div style={{ padding: 20, width: "100%", margin: "auto" }}>
          <img
            style={{ width: "100%" }}
            src="https://ipfs.near.social/ipfs/bafkreidmadn2kmerlxwlcjmu5qwj4mt7pdiqv5obmfwgeb536qowme2dn4"
          />
        </div>
      </div>
    </div>
  </Container>
);
