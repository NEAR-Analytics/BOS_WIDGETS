// if (
//   !props.accountId ||
//   !context.accountId ||
//   context.accountId === props.accountId
// ) {
//   return "";
// }
const datas = Social.keys(`${context.accountId}`, undefined, {
  values_only: true,
});
console.log(datas);
const connectEdge = Social.keys(
  `${context.accountId}/graph/connect/${props.accountId}`,
  undefined,
  {
    values_only: true,
  }
);

const inverseEdge = Social.keys(
  `${props.accountId}/graph/connect/${context.accountId}`,
  undefined,
  {
    values_only: true,
  }
);

const loading = connectEdge === null || inverseEdge === null;
const isConnected = Object.keys(connectEdge || {}).length > 0;
const isInverse = Object.keys(inverseEdge || {}).length > 0;
const type = connect ? "disconnect" : "connect";

const datum = {
  graph: { connect: { [props.accountId]: isConnected ? null : "" } },
  index: {
    graph: JSON.stringify({
      key: "connect",
      value: {
        type,
        accountId: props.accountId,
      },
    }),
    notify: JSON.stringify({
      key: props.accountId,
      value: {
        type,
      },
    }),
  },
};

State.init({
  dropName: "",
  dropSymbol: "",
  dropDescription: "",
  bannerImage:
    "https://img.freepik.com/free-photo/abstract-colorful-splash-3d-background-generative-ai-background_60438-2493.jpg?size=626&ext=jpg&ga=GA1.1.844735360.1701308085&semt=sph",
  profileImage:
    "https://t3.ftcdn.net/jpg/03/91/19/22/240_F_391192211_2w5pQpFV1aozYQhcIw3FqA35vuTxJKrB.jpg",
  network: "",
  dropURL: "",
  maxSupply: "",
  walletAddress: "",
  saleRoyalty: "",
  priceByEther: "",
});
const data = {
  formData: {
    bannerImage: `ipfs://${state.bannerImage.cid}`,
    profileImage: `ipfs://${state.profileImage.cid}`,
    network: state.network,
    dropName: state.dropName,
    dropSymbol: state.dropSymbol,
    dropURL: state.dropURL,
    dropDescription: state.dropDescription,
    maxSupply: state.maxSupply,
    walletAddress: state.walletAddress,
    saleRoyalty: state.saleRoyalty,
    priceByEther: state.priceByEther,
  },
};
const submitForm = (e) => {
  e.preventDefault();
  const metadata = {
    bannerImage: `ipfs://${state.bannerImage.cid}`,
    profileImage: `ipfs://${state.profileImage.cid}`,
    network: state.network,
    dropName: state.dropName,
    dropSymbol: state.dropSymbol,
    dropURL: state.dropURL,
    dropDescription: state.dropDescription,
    maxSupply: state.maxSupply,
    walletAddress: state.walletAddress,
    saleRoyalty: state.saleRoyalty,
    priceByEther: state.priceByEther,
  };

  asyncFetch("https://ipfs.near.social/add", {
    method: "POST",
    headers: {
      Accept: "application/json",
    },
    body: metadata,
  })
    .then((res) => {
      if (res && res.body && res.body.cid) {
        const cid = res.body.cid;
        const Id = Math.floor(Math.random() * (9999999 - 100000 + 1) + 100000);
        console.log("in the promise", res, Id);
      } else {
        console.error("Unexpected response structure:", res);
      }
    })
    .catch((error) => {
      console.error("Error during form submission:", error);
    });
};

const profilebanner = {
  position: "relative",
  overflow: "hidden",
};

const bannerimage = {
  width: "100%",
  height: "auto",
  display: "block",
};

const profilecontainer = {
  position: "relative",
  top: "30%",
  left: "50%",
  transform: "translate(-50%, -50%)",
};

const profileimage = {
  borderRadius: "50%",
  width: "150px" /* Adjust the width as needed */,
  height: "150px" /* Adjust the height as needed */,
  objectFit: "cover",
  border:
    "5px solid #fff" /* Optional: Add a border around the profile image */,
};
const placeholder = state.network
  ? "Price by " + state.network
  : "Price by Near";

return (
  <>
    <div class="container border border-info p-3 text-center">
      <div class="row">
        <div class="col-md-6 bg-success">
          <div class="card" style={{ width: "18rem", textAlign: "center" }}>
            <div class="profilebanner" style={profilebanner}>
              {state.bannerImage.cid ? (
                <img
                  src={`https://ipfs.near.social/ipfs/${state.bannerImage.cid}`}
                  alt="uploaded"
                  class="bannerimage"
                  style={bannerimage}
                />
              ) : (
                <img
                  src={`https://img.freepik.com/free-photo/minimalistic-geometric-background-with-charts-generative-ai_169016-29527.jpg?size=626&ext=jpg&ga=GA1.1.844735360.1701308085&semt=sph`}
                  alt="uploaded"
                  class="bannerimage"
                  style={bannerimage}
                />
              )}

              <div class="profilecontainer" style={profilecontainer}>
                {state.profileImage.cid ? (
                  <img
                    src={`https://ipfs.near.social/ipfs/${state.profileImage.cid}`}
                    alt="uploaded"
                    class="profileimage"
                    style={profileimage}
                  />
                ) : (
                  <img
                    src={`https://img.freepik.com/premium-photo/human-icon-3d-render-illustration_567294-4058.jpg?size=626&ext=jpg&ga=GA1.1.844735360.1701308085&semt=ais`}
                    alt="uploaded"
                    class="profileimage"
                    style={profileimage}
                  />
                )}
              </div>
            </div>
            <div class="card-body">
              <h5 class="card-title" style={{ fontWeight: "bold" }}>
                {state.dropName !== "" ? state.dropName : "Name"}
              </h5>
              <p class="card-text">
                {state.dropSymbol !== "" ? state.dropSymbol : "Symbol"}
              </p>
              <p>
                {state.dropDescription !== ""
                  ? state.dropDescription
                  : "Description"}
              </p>
            </div>
          </div>
        </div>
        <div class="col-md-6">
          <div>
            <div className="container row">
              <Web3Connect />

              <div>
                Banner Image picture: <br />
                <IpfsImageUpload image={state.bannerImage} />
              </div>
            </div>
            <div className="container row">
              <div>
                Profile Image: <br />
                <IpfsImageUpload image={state.profileImage} />
              </div>
            </div>
            <div class="form-group">
              <label for="exampleFormControlSelect1">Network</label>
              <select
                class="form-control"
                id="network"
                onChange={(e) => {
                  State.update({ [e.target.id]: e.target.value });
                }}
              >
                <option>Near</option>
                <option>Ethereum</option>
                <option>Solana</option>
                <option>Polygon</option>
              </select>
            </div>
            <p></p>
            <input
              type="text"
              id="dropName"
              value={state.dropName}
              onChange={(e) => {
                State.update({ [e.target.id]: e.target.value });
              }}
              placeholder="Drop Name"
              class="form-control"
            />
            <p></p>
            <input
              type="text"
              id="dropSymbol"
              value={state.dropSymbol}
              onChange={(e) => {
                State.update({ [e.target.id]: e.target.value });
              }}
              placeholder="Drop Symbol"
            />
            <p></p>
            <input
              type="text"
              id="dropURL"
              value={state.dropURL}
              onChange={(e) => {
                State.update({ [e.target.id]: e.target.value });
              }}
              placeholder="Drop URL"
            />
            <p></p>
            <input
              type="text"
              id="dropDescription"
              value={state.dropDescription}
              onChange={(e) => {
                State.update({ [e.target.id]: e.target.value });
              }}
              placeholder="Drop Description"
            />
            <p></p>
            <input
              type="text"
              id="maxSupply"
              value={state.maxSupply}
              onChange={(e) => {
                State.update({ [e.target.id]: e.target.value });
              }}
              placeholder="Max Supply"
            />
            <p></p>
            <input
              type="text"
              id="walletAddress"
              value={state.walletAddress}
              onChange={(e) => {
                State.update({ [e.target.id]: e.target.value });
              }}
              placeholder="Wallet Address to receive Royalty"
            />
            <p></p>
            <input
              type="text"
              id="saleRoyalty"
              value={state.saleRoyalty}
              onChange={(e) => {
                State.update({ [e.target.id]: e.target.value });
              }}
              placeholder="Secondary Sales Royalty Percentage"
            />
            <p></p>
            <input
              type="text"
              id="priceByEther"
              value={state.priceByEther}
              onChange={(e) => {
                State.update({ [e.target.id]: e.target.value });
              }}
              placeholder={placeholder}
            />
            <p></p>
            <a
              class="btn btn-primary"
              href="https://near.org/mohaa.near/widget/profile"
            >
              Continue
            </a>
          </div>
        </div>
      </div>
    </div>
  </>
);
