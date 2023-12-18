const signer = Ethers.send("eth_requestAccounts", [])[0];
const api_route = "https://blockathon-2023.vercel.app/api/";

if (!signer) {
  return (
    <div
      style={{
        width: "100%",
        fontFamily: "Arial, sans-serif",
        textAlign: "center",
        padding: "2rem 0",
        background: "#333", // Dark background color for the navbar
        color: "white",
        boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)", // Add a subtle box shadow
      }}
    >
      <h3>Please connect your wallet</h3>
      <Web3Connect />
    </div>
  );
}

async function portfolio_detail() {
  asyncFetch(`${api_route}portfolio?wallet_address=${signer}`).then((res) => {
    const data = res.body.result[0]["portfolio"];

    const portObj = Object.keys(data).map((key, index) => (
      <div
        key={key}
        style={{
          display: "flex",
          justifyContent: "space-between",
          padding: "0.5rem 0",
          borderBottom:
            index < Object.keys(data).length - 1 ? "1px solid #ccc" : "none",
        }}
      >
        <div style={{ width: "50%", textAlign: "center" }}>{key}</div>
        <div style={{ width: "50%", textAlign: "center" }}>{data[key]}</div>
      </div>
    ));

    State.update({ port: portObj });
  });
}

return (
  <div
    style={{ width: "100%", fontFamily: "Arial, sans-serif", color: "black" }}
  >
    <div
      style={{
        padding: "1rem",
        backgroundColor: "#f9f9f9",
        boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
        borderRadius: "8px",
        marginBottom: "1rem",
      }}
    >
      <img
        src="https://blockathon-2023.vercel.app/images/HomeBanner.png"
        style={{
          width: "100%",
          height: "auto",
          borderRadius: "8px",
        }}
      />
    </div>
    <div
      style={{
        padding: "1rem",
        backgroundColor: "#f9f9f9",
        boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
        borderRadius: "8px",
      }}
    >
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "1fr auto",
          alignItems: "center",
          paddingBottom: "1rem",
        }}
      >
        <h3 style={{ margin: 0 }}>Carbon Credit Token</h3>
        <a
          href="https://blockathon-2023.vercel.app/"
          target="_blank"
          rel="noopener noreferrer"
          style={{
            textDecoration: "none",
            color: "#008000", // Green color for the link
            padding: "0.5rem 1rem",
            border: "none",
            borderRadius: "4px",
            cursor: "pointer",
          }}
        >
          Go to website
        </a>
      </div>
      {state.port ? (
        <div>
          <p style={{ fontSize: "1.2rem", fontWeight: "bold" }}>
            Your Portfolio
          </p>
          {state.port}
        </div>
      ) : (
        <p style={{ fontSize: "1.2rem", fontWeight: "bold" }}>
          Click to show your portfolio.
        </p>
      )}
      <button
        style={{
          backgroundColor: "#008000",
          color: "white",
          padding: "0.5rem 1rem",
          border: "none",
          cursor: "pointer",
          marginTop: "1rem",
        }}
        onClick={portfolio_detail}
      >
        Click
      </button>
    </div>
  </div>
);
