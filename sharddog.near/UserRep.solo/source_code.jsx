State.init({
  data: null,
  loading: false,
});

const accountId = props.accountId ?? context.accountId;

const getBackgroundColor = (value, goodCondition, warningCondition) => {
  if (goodCondition(value)) return "lightgreen";
  if (warningCondition(value)) return "yellow";
  return "pink";
};

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
  currentBalance,
  storageUsed,
} = state.data || {};

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
  width: "620px",
  maxWidth: "100%",
  background: "rgba(251, 249, 245, 0.85)",
  filter: "drop-shadow(0px 4px 4px rgba(0, 0, 0, 0.15))",
  borderRadius: "12px",
  display: "flex",
  justifyContent: "center",
  marginTop: "20px",
  margin: "20px Auto",
  color: "black",
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
const bottomRightTop = {
  position: "absolute",
  bottom: "50px",
  right: "16px",
  zIndex: "1000",
  fontWeight: "500",
  fontSize: "14px",
  backgroundClip: "text",
  color: "white",
};

const bottomRight = {
  position: "absolute",
  bottom: "8px",
  right: "16px",
  zIndex: "1000",
  fontWeight: "900",
  fontSize: "30px",
  backgroundColor: "#fff",
  backgroundClip: "text",
  color: "transparent",
  textShadow: "rgba(245,245,245,0.5) 1px 2px 1px",
};

const container = {
  position: "relative",
};

const animateCharacter = {
  textTransform: "uppercase",
  backgroundImage:
    "linear-gradient(-225deg, #231557 0%, #44107a 29%, #ff1361 67%, #fff800 100%)",
  backgroundSize: "200% auto",
  backgroundClip: "text",
  color: "#fff",
  textFillColor: "transparent",
  WebkitBackgroundClip: "text",
  WebkitTextFillColor: "transparent",
  animation: "textclip 2s linear infinite",
  display: "inline-block",
  fontSize: "30px",
};

function fetchData() {
  // State.update({ loading: true });
  asyncFetch("https://auth.shard.dog/wallet/" + accountId, {
    method: "GET",
  }).then((res) => {
    if (res.ok) {
      State.update({ loading: false });
      State.update({ data: res.body });
    } else {
      // console.log(res);
    }
  });
}
fetchData();

function isEmpty(obj) {
  return Object.keys(obj).length === 0;
}

if (state.loading) {
  return <h2 style={animateCharacter}>Loading...</h2>;
}

function getCreateDate(creationTimestamp) {
  console.log(creationTimestamp);
  let created = creationTimestamp / 1000000;
  console.log(created);
  let date = new Date(created);

  return date.toString("MMM dd yy");
}

function parsedBalance(currentBalance) {
  let walletBalance = 0;
  if (currentBalance > 0) {
    walletBalance = Big(currentBalance).div(Big(10).pow(24)).toFixed(5);
    return walletBalance;
  } else {
    return walletBalance;
  }
}

const profile = props.profile ?? Social.getr(`${accountId}/profile`);
const image = profile.image;

const following = Social.keys(`${accountId}/graph/follow/*`, "final", {
  return_type: "BlockHeight",
  values_only: true,
});

const followers = Social.keys(`*/graph/follow/${accountId}`, "final", {
  return_type: "BlockHeight",
  values_only: true,
});

const numFollowing = following
  ? Object.keys(following[accountId].graph.follow || {}).length
  : 0;
const numFollowers = followers ? Object.keys(followers || {}).length : 0;

function getKudos(wallet) {
  let data = Social.getr("kudos.ndctools.near/kudos/" + wallet);
  //console.log(data);
  let countK = 0;
  let countD = 0;
  if (data != undefined) {
    Object.values(data).forEach((item) => {
      if (item.kind === "k") {
        countK++;
      } else if (item.kind === "d") {
        countD++;
      }
    });
  }
  //console.log(countK);
  return { countK, countD };
}

function getSBT(wallet) {
  const getFirstSBTToken = () => {
    const view = Near.view("registry.i-am-human.near", "sbt_tokens_by_owner", {
      account: wallet,
      issuer: "fractal.i-am-human.near",
    });
    return view?.[0]?.[1]?.[0];
  };

  if (getFirstSBTToken(accountId) !== undefined) {
    return "Yes";
  }
  return "No";
}

return (
  <div
    style={{
      justifyContent: "center",
      alignItems: "center",
    }}
  >
    <div style={cardStyle}>
      <div className="center-box">
        <h3>Check out Your NEAR "Just to get a rep"</h3>
        <small>
          <i>
            This is a beta of how you could look at scoring users rep based on
            activity
          </i>
        </small>
        <br />
        <div style={container}>
          <div style={centered}>{accountId}</div>
          <Widget
            src="mob.near/widget/Image"
            props={{
              image,
              alt: title,
              className: "img-fluid rounded-3",
              style: { maxWidth: "620px" },
              thumbnail,
              fallbackUrl:
                "https://ipfs.near.social/ipfs/bafkreigx4syocpq3spthgozerqnqjf4k7ri5jrsslgali7tslvfmjrefte",
            }}
          />
          {og == true && <div style={bottomLeft}>OG</div>}
          <div style={bottomRightTop}>following/followers</div>
          <div style={bottomRight}>
            {numFollowing}/{numFollowers}
          </div>
        </div>
        <p style={{ justifyContent: "center", alignItems: "center" }}>
          Account Created: {getCreateDate(creationTimestamp)} <br />
          Current Balance: {parsedBalance(currentBalance)}N<br />
          Fractal Verified: {getSBT(accountId)}
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
              <td>Storage Used (Onchain)</td>
              <td>{storageUsed} Bytes</td>
            </tr>
          </tbody>
        </table>
        <p>
          <small>
            <i>Data may take a few seconds to fully populate</i>
          </small>
        </p>
      </div>
    </div>
  </div>
);
