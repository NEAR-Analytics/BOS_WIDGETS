const [address, setAddress] = useState("");
const [message, setMessage] = useState("");
const [timeLeftToWhitelist, setTimeLeftToWhitelist] = useState(
  7 * 24 * 60 * 60 * 1000
); // 7 days in milliseconds
const [whitelistedAddresses, setWhitelistedAddresses] = useState([]);
const [selectedTab, setSelectedTab] = useState("airdrop");

// Update time left to whitelist every second
useEffect(() => {
  const timer = setInterval(() => {
    setTimeLeftToWhitelist((prevTimeLeft) => prevTimeLeft - 1000);
  }, 1000);

  // Clear interval on component unmount
  return () => clearInterval(timer);
}, []);

// Format time into days, hours, minutes, and seconds
function formatTime(time) {
  const days = Math.floor(time / (1000 * 60 * 60 * 24));
  const hours = Math.floor((time % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
  const minutes = Math.floor((time % (1000 * 60 * 60)) / (1000 * 60));
  const seconds = Math.floor((time % (1000 * 60)) / 1000);

  return `${days}d ${hours}h ${minutes}m ${seconds}s`;
}

const handleInputChange = (event) => {
  setAddress(event.target.value);
};

const handleWhitelistClick = () => {
  if (whitelistedAddresses.includes(address)) {
    setMessage("This address is Already Brownlisted");
  } else if (address.endsWith(".near")) {
    setMessage("Brownlisted!");
    setAddress("");
    setWhitelistedAddresses([...whitelistedAddresses, address]);
  } else {
    setMessage('Your address must end in ".near"');
  }
};

const handleTabChange = (tab) => {
  setSelectedTab(tab);
};

return (
  <div
    style={{
      backgroundColor: "#F5DEB3",
      padding: "5%",
      fontFamily: "Comic Sans MS",
      border: "5px solid black",
      borderRadius: "2vw",
      textAlign: "center",
    }}
  >
    <div
      style={{
        display: "flex",
        justifyContent: "space-between",
        marginBottom: "5%",
      }}
    >
      <div
        style={{
          cursor: "pointer",
          marginRight: "5%",
          textDecoration: selectedTab === "airdrop" ? "underline" : "none",
          fontFamily: "Comic Sans MS",
          fontSize: "2vw",
        }}
        onClick={() => handleTabChange("airdrop")}
      >
        Airdrop
      </div>
      <div
        style={{
          cursor: "pointer",
          marginRight: "5%",
          textDecoration: selectedTab === "about" ? "underline" : "none",
          fontFamily: "Comic Sans MS",
          fontSize: "2vw",
        }}
        onClick={() => handleTabChange("about")}
      >
        About
      </div>
    </div>
    {selectedTab === "airdrop" && (
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <h1
          style={{
            color: "darkbrown",
            fontSize: "3vw",
            fontFamily: "Comic Sans MS",
          }}
        >
          💩 Shit Coin Airdrop! 💩
        </h1>
        <p style={{ fontFamily: "Comic Sans MS", fontSize: "1.5vw" }}>
          Time Left to Brownlist: {formatTime(timeLeftToWhitelist)}
        </p>
        <input
          type="text"
          value={address}
          onChange={handleInputChange}
          placeholder="Enter your NEAR Address"
          style={{
            margin: "2%",
            padding: "2%",
            fontFamily: "Comic Sans MS",
            width: "50%",
            fontSize: "1.5vw",
          }}
        />
        <button
          onClick={handleWhitelistClick}
          style={{
            margin: "2%",
            padding: "1% 3%",
            fontFamily: "Comic Sans MS",
            cursor: "pointer",
            fontSize: "1.5vw",
          }}
        >
          Brownlist for Airdrop
        </button>
        <p
          style={{
            margin: "2%",
            fontFamily: "Comic Sans MS",
            fontSize: "1.5vw",
          }}
        >
          {message}
        </p>
      </div>
    )}
    {selectedTab === "about" && (
      <div>
        <h2
          style={{
            fontFamily: "Comic Sans MS",
            fontSize: "2vw",
            textAlign: "center",
          }}
        >
          About Shit Coin
        </h2>
        <p
          style={{
            fontFamily: "Comic Sans MS",
            fontSize: "1.5vw",
            textAlign: "center",
          }}
        >
          Shit Coin is the first Offical Shitcoin on NEAR! It is, well, a
          shitcoin. Roadmap in the works.
        </p>
        <h2
          style={{
            fontFamily: "Comic Sans MS",
            fontSize: "2vw",
            textAlign: "center",
          }}
        >
          Shitty Tokenomics
        </h2>
        <div
          style={{
            width: "80%",
            margin: "auto",
            marginTop: "10px",
            border: "2px solid black",
            borderRadius: "10px",
            overflow: "hidden",
          }}
        >
          <div
            style={{
              backgroundColor: "chocolate",
              height: "30px",
              width: "100%",
              position: "relative",
            }}
          >
            <div
              style={{
                backgroundColor: "brown",
                height: "100%",
                width: "10%",
                position: "absolute",
                top: "0",
                left: "0",
              }}
            ></div>
          </div>
        </div>
        <div style={{ textAlign: "center", marginTop: "10px" }}>
          <div
            style={{
              fontFamily: "Comic Sans MS",
              fontSize: "1.5vw",
              color: "brown",
            }}
          >
            Airdrop: 100,000,000 SHIT
          </div>
          <div
            style={{
              fontFamily: "Comic Sans MS",
              fontSize: "1.5vw",
              color: "chocolate",
            }}
          >
            Added to LP: 900,000,000 SHIT
          </div>
          <div style={{ fontFamily: "Comic Sans MS", fontSize: "1.5vw" }}>
            Total Supply: 1,000,000,000 SHIT
          </div>
        </div>
      </div>
    )}
  </div>
);
