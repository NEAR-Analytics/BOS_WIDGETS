State.init({
  wallet: "",
  data: null,
});

const getBackgroundColor = (value, goodCondition, warningCondition) => {
  if (goodCondition(value)) return "lightgreen";
  if (warningCondition(value)) return "yellow";
  return "pink";
};

const handleWalletChange = (event) => {
  State.update({ wallet: event.target.value });
  fetchData();
};

function fetchData() {
  console.log("getData");
  asyncFetch("https://auth.shard.dog/wallet/" + state.wallet, {
    method: "GET",
  }).then((res) => {
    if (res.ok) {
      State.update({ data: res.body });
    } else {
      console.log(res);
    }
  });
}

if (!state.data) {
  return (
    <div>
      <h3>NEAR "Just to get a rep"</h3>
      <small>
        <i>
          This is a beta of how you could look at scoring users rep based on
          activity
        </i>
      </small>
      <input
        value={state.wallet}
        onChange={handleWalletChange}
        placeholder="Enter wallet name"
      />
      <button onClick={fetchData}>Get Rep</button>
    </div>
  );
}

const {
  creationTimestamp,
  last30,
  stakeDeposit,
  functionCall,
  sbt,
  nftTokens,
  historicCount,
  nominationInteractions,
  og,
} = state.data;

const tableStyle = {
  borderCollapse: "collapse",
  boxShadow: "0px 0px 10px 2px rgba(0,0,0,0.1)",
  width: "100%",
  textAlign: "left",
};

const cellStyle = {
  border: "1px solid black",
  padding: "10px",
};

const cardStyle = {
  padding: "10px",
  width: "680px",
  maxWidth: "100%",
  background: "rgba(251, 249, 245, 0.85)",
  filter: "drop-shadow(0px 4px 4px rgba(0, 0, 0, 0.15))",
  height: "1000px",
  borderRadius: "12px",
  display: "flex",
  justifyContent: "center",
  marginTop: "20px",
  margin: "20px Auto",
};

const centered = {
  position: "absolute",
  top: "5%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  zIndex: "1000",
  fontWeight: "900",
  fontSize: "1.2rem",
  color: "#f0f0f0",
  textShadow: "1px 4px 4px #555",
};

const bottomLeft = {
  position: "absolute",
  bottom: "8px",
  left: "16px",
  zIndex: "1000",
  fontWeight: "900",
  fontSize: "50px",
  backgroundColor: "#ffffff",
  backgroundClip: "text",
  color: "transparent",
  textShadow: "rgba(245,245,245,0.5) 1px 2px 1px",
};

const container = {
  position: "relative",
};

function getCreateDate(creationTimestamp) {
  console.log(creationTimestamp);
  let created = creationTimestamp / 1000000;
  console.log(created);
  let date = new Date(created);

  return date.toString("MMM dd yy");
}
const profile = props.profile ?? Social.getr(`${state.wallet}/profile`);
const image = profile.image;

return (
  <div
    style={{
      justifyContent: "center",
      alignItems: "center",
      height: "100vh",
    }}
  >
    <h3>NEAR "Just to get a rep"</h3>
    <small>
      <i>
        This is a beta of how you could look at scoring users rep based on
        activity
      </i>
    </small>
    <input
      value={state.wallet}
      onChange={handleWalletChange}
      placeholder="Enter wallet name"
    />
    <button onClick={fetchData}>Get Rep</button>
    <br />
    <div style={cardStyle}>
      <div className="center-box">
        <div style={container}>
          <div style={centered}>{state.wallet}</div>
          <Widget
            src="mob.near/widget/Image"
            props={{
              image,
              alt: title,
              className: "img-fluid rounded-3",
              style: { maxHeight: "100vh" },
              thumbnail,
              fallbackUrl:
                "https://ipfs.near.social/ipfs/bafkreibmiy4ozblcgv3fm3gc6q62s55em33vconbavfd2ekkuliznaq3zm",
            }}
          />
          {og == true && <div style={bottomLeft}>OG</div>}
        </div>
        <p style={{ justifyContent: "center", alignItems: "center" }}>
          Account Created: {getCreateDate(creationTimestamp)}
        </p>
        <table style={tableStyle}>
          <thead>
            <tr style={cellStyle}>
              <th>Criteria</th>
              <th>Value</th>
            </tr>
          </thead>
          <tbody>
            <tr
              style={{
                backgroundColor:
                  last30 === historicCount ||
                  Math.abs(last30 - historicCount) <= 10
                    ? "yellow"
                    : "white",
              }}
            >
              <td>Tx - Last 30 days vs Historic</td>
              <td>
                {last30} vs {historicCount}
              </td>
            </tr>
            <tr
              style={{
                backgroundColor: getBackgroundColor(
                  sbt,
                  (v) => v > 0,
                  (v) => v === 0
                ),
              }}
            >
              <td>SBT</td>
              <td>{sbt}</td>
            </tr>
            <tr
              style={{
                backgroundColor: getBackgroundColor(
                  nftTokens,
                  (v) => v > 5,
                  (v) => v >= 1 && v <= 4
                ),
              }}
            >
              <td>NFT Tokens (max 100)</td>
              <td>{nftTokens}</td>
            </tr>
            <tr
              style={{
                backgroundColor: getBackgroundColor(
                  stakeDeposit,
                  (v) => v > 1,
                  (v) => v === 1
                ),
              }}
            >
              <td>Stake Actions (max 50)</td>
              <td>{stakeDeposit}</td>
            </tr>
            <tr
              style={{
                backgroundColor: getBackgroundColor(
                  functionCall,
                  (v) => v > 20,
                  (v) => v >= 6 && v <= 20
                ),
              }}
            >
              <td>Contract Interactions (max 50)</td>
              <td>{functionCall}</td>
            </tr>
            <tr
              style={{
                backgroundColor: getBackgroundColor(
                  nominationInteractions,
                  (v) => v > 20,
                  (v) => v >= 3 && v <= 20
                ),
              }}
            >
              <td>Nomination Interactions (max 50)</td>
              <td>{nominationInteractions}</td>
            </tr>
          </tbody>
        </table>
        <p>
          <small>
            <i>Data may take a couple seconds to populate</i>
          </small>
        </p>
      </div>
    </div>
  </div>
);
