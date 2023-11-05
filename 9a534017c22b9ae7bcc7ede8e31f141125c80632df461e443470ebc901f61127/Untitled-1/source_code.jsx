// State for your token selection and amount
const [selectedToken, setSelectedToken] = useState(""); // default token
const [amount, setAmount] = useState("");
const [quote, setQuote] = useState("");
const [status, setStatus] = useState("Awaiting payment...");
const [tokens, setTokens] = useState([]); // Array of available tokens

// Fetch available tokens on component mount
useEffect(() => {
  const fetchTokens = async () => {
    try {
      const response = await axios.get(
        "https://api.1inch.exchange/v3.0/1/tokens"
      );
      setTokens(Object.values(response.data.tokens));
    } catch (error) {
      console.error("Error fetching tokens:", error);
      setStatus("Error fetching tokens");
    }
  };

  fetchTokens();
}, []);

// Function to update the selected token
const handleTokenChange = (e) => {
  setSelectedToken(e.target.value);
};

// Function to update the amount to be swapped
const handleAmountChange = (e) => {
  setAmount(e.target.value);
};

// Function to fetch quote from 1inch
const getQuote = async () => {
  if (!selectedToken || !amount) {
    alert("Please select a token and enter an amount");
    return;
  }
  try {
    const response = await axios.get(
      `https://api.1inch.exchange/v3.0/1/quote?fromTokenSymbol=${selectedToken}&toTokenSymbol=ETH&amount=${amount}`
    );
    setQuote(response.data);
  } catch (error) {
    console.error("Error fetching quote:", error);
    setStatus("Error fetching quote");
  }
};

// Function to perform the swap
const doSwap = async () => {
  // You would typically pass the wallet address and slippage as well
  const fromAddress = "YOUR_WALLET_ADDRESS"; // This must be the actual user's address
  const slippage = 1; // 1% slippage

  if (!selectedToken || !amount) {
    alert("Please select a token and enter an amount");
    return;
  }
  try {
    const response = await axios.get(
      `https://api.1inch.exchange/v3.0/1/swap?fromTokenSymbol=${selectedToken}&toTokenSymbol=ETH&amount=${amount}&fromAddress=${fromAddress}&slippage=${slippage}`
    );
    // This response will contain the transaction data
    // Typically, you would then pass this data to a wallet provider (e.g., MetaMask) to perform the transaction
    console.log(response.data);
    setStatus("Swap executed, transaction hash: " + response.data.tx.hash);
  } catch (error) {
    console.error("Error performing swap:", error);
    setStatus("Error performing swap");
  }
};

return (
  <div
    style={{
      height: "100vh", // changed to viewport height to fill the screen
      width: "100vw", // changed to viewport width to fill the screen
      display: "flex",
      justifyContent: "center",
      background: "linear-gradient(to top left, #0d6efd, #f6851b)",
      paddingTop: "5vh", // using viewport height units instead of percentage
      paddingBottom: "5vh", // using viewport height units instead of percentage
      paddingLeft: "10%",
      paddingRight: "10%",
    }}
  >
    <div
      style={{
        width: "60%",
        display: "flex",
        flexDirection: "column",
        paddingLeft: "3rem",
        paddingRight: "3rem",
      }}
    >
      <div
        style={{
          borderBottom: "2px solid",
          width: "100%",
          height: "15%",
          paddingTop: "3rem",
          paddingBottom: "3rem",
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "baseline",
            justifyContent: "space-between",
            marginBottom: "3rem",
          }}
        >
          <div style={{ display: "flex" }}>
            <h1 style={{ fontSize: "1.5rem", fontStyle: "italic" }}>Pay</h1>
            <h1 style={{ fontSize: "1.5rem", fontStyle: "italic" }}>Dal</h1>
          </div>
          <h3
            style={{
              fontSize: "0.5rem",
              opacity: "0.8",
              alignSelf: "flex-end",
            }}
          >
            {" "}
            a faster, scalable way to pay.{" "}
          </h3>
        </div>
      </div>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          flexGrow: 1,
          alignItems: "center",
          justifyContent: "center",
          paddingTop: "3rem",
          paddingBottom: "3rem",
        }}
      >
        <div
          class="text-center"
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            height: "33.333%",
            width: "100%",
          }}
        >
          <h1
            style={{
              fontSize: "0.75rem",
              marginBottom: "0.5rem",
              opacity: "0.8",
              marginBottom: "2rem",
            }}
          >
            {" "}
            PRODUCT/MERCHANT INFO{" "}
          </h1>
          <h3>{props.seller}</h3>
          <h4>{props.product}</h4>
        </div>
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            height: "66.666%",
          }}
        >
          <h1
            style={{
              fontSize: "0.75rem",
              marginBottom: "0.5rem",
              opacity: "0.8",
            }}
          >
            {" "}
            AMOUNT DUE{" "}
          </h1>
          <h1 style={{ fontSize: "3rem" }}>
            {props.amount} {props.pref_token}
          </h1>
        </div>
      </div>
    </div>
    <div
      style={{
        width: "40%",
        height: "calc(100vh - 10vh)",
        backgroundColor: "white",
        borderRadius: "1rem",
        display: "flex",
        flexDirection: "column",
        overflow: "hidden",
      }}
    >
      <div
        style={{
          backgroundColor: "#1d4ed8",
          color: "white",
          fontSize: "0.5rem",
          fontWeight: "bold",
          height: "15%",
          width: "100%",
          borderRadius: "0.25rem",
          display: "flex",
        }}
      >
        <Web3Connect />{" "}
      </div>

      <div
        style={{
          height: "85%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          padding: "1rem 3rem 1rem 3rem",
        }}
      >
        <div
          style={{
            height: "85%",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "space-between",
            padding: "1rem 3rem 0rem 3rem",
          }}
        >
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              gap: "1rem",
              width: "100%",
              height: "33.333%",
            }}
          >
            <div
              style={{
                display: "flex",
                width: "100%",
                justifyContent: "space-between",
                gap: "3rem",
                borderBottom: "1px solid",
              }}
            >
              {" "}
              {/* Token Selection Dropdown */}{" "}
              <div style={{ width: "100%" }}>
                <label
                  style={{
                    display: "block",
                    fontSize: "0.85rem",
                    fontWeight: "bold",
                    marginBottom: "0.5rem",
                    color: "black",
                  }}
                  htmlFor="token-selection"
                >
                  {" "}
                  Choose Token:{" "}
                </label>
                <select
                  id="token-selection"
                  style={{
                    color: "black",
                    marginTop: "0.25rem",
                    width: "100%",
                    padding: "0.5rem",
                    fontSize: "0.5rem",
                    borderWidth: "1px",
                    borderColor: "#d1d5db",
                    borderRadius: "0.25rem",
                  }}
                >
                  <option>Token A</option>
                  <option>Token B</option> {/* ... more tokens ... */}
                </select>
              </div>
              {/* Amount Input */}
              <div style={{ width: "100%" }}>
                <label
                  style={{
                    display: "block",
                    fontSize: "0.85rem",
                    fontWeight: "bold",
                    marginBottom: "0.5rem",
                    color: "black",
                  }}
                  htmlFor="amount"
                >
                  {" "}
                  Amount to Send:{" "}
                </label>
                <input
                  id="amount"
                  type="number"
                  style={{
                    color: "black",
                    width: "100%",
                    padding: "0.5rem",
                    fontSize: "0.5rem",
                    borderWidth: "1px",
                    borderColor: "#d1d5db",
                    borderRadius: "0.25rem",
                  }}
                  placeholder="Enter amount"
                />
              </div>
            </div>
            <div style={{ width: "100%" }}>
              <div
                style={{
                  backgroundColor: "#f3f4f6",
                  padding: "0.5rem",
                  borderRadius: "0.5rem",
                }}
              >
                <p
                  id="conversion-rate"
                  style={{
                    fontSize: "0.5rem",
                    color: "black",
                  }}
                >
                  {" "}
                  Current rate to `ETH` ~ xx.xx${" "}
                </p>
              </div>
            </div>
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                gap: "2rem",
                alignItems: "center",
                justifyContent: "center",
                width: "100%",
                flex: 1,
              }}
            >
              <div
                style={{
                  display: "flex",
                  gap: "1rem",
                  justifyContent: "space-between",
                  width: "100%",
                }}
              >
                <button
                  style={{
                    backgroundColor: "#22c55e",
                    color: "white",
                    fontWeight: "bold",
                    fontSize: "0.5rem",
                    padding: "0.25rem 0.5rem",
                    borderRadius: "0.25rem",
                    flex: 1,
                  }}
                >
                  {" "}
                  Add Amount{" "}
                </button>
                <button
                  style={{
                    backgroundColor: "#ef4444",
                    color: "white",
                    fontWeight: "bold",
                    fontSize: "0.5rem",
                    padding: "0.25rem 0.5rem",
                    borderRadius: "0.25rem",
                    flex: 1,
                  }}
                >
                  {" "}
                  Cancel{" "}
                </button>
              </div>
            </div>

            <div
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
                marginTop: "3rem",
                marginBottom: "rem",
                height: "20%",
              }}
            >
              <h1
                style={{
                  color: "black",
                  marginBottom: "0rem",
                  fontSize: "0.75rem",
                }}
              >
                {" "}
                AMOUNT APPENDED{" "}
              </h1>
              <h1
                style={{
                  color: "black",
                  fontSize: "3rem",
                }}
              >
                {" "}
                0 {props.pref_token}{" "}
              </h1>
            </div>
          </div>{" "}
          {/* Transaction Status Display */}
          <div style={{ width: "100%", height: "5rem", marginTop: "10rem" }}>
            <label
              style={{
                display: "block",
                color: "black",
                fontSize: "0.85rem",
                fontWeight: "bold",
                marginBottom: "0.5rem",
              }}
              htmlFor="transaction-status"
            >
              {" "}
              Status:{" "}
            </label>
            <div
              id="transaction-status"
              style={{
                backgroundColor: "#f3f4f6",
                padding: "0.5rem",
                borderRadius: "0.5rem",
              }}
            >
              <p
                style={{
                  fontSize: "0.5rem",
                  color: "black",
                }}
              >
                {" "}
                Awaiting payment...{" "}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
);
