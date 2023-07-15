const sender = Ethers.send("eth_requestAccounts", [])[0];
if (!sender) return "You need to login first";
const { nftCollectionAddress } = props;
const nftCollectionABI = [
  {
    inputs: [{ internalType: "address", name: "owner", type: "address" }],
    name: "balanceOf",
    outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
    stateMutability: "view",
    type: "function",
  },
];

State.init({ isLoggedIn: false, loading: false, displayMsg: false });

const getNftContract = async () => {
  State.update({ loading: true });
  window.location.href =
    "https://1234-nearexamples-donationjs-70k9fwuh5p5.ws-us101.gitpod.io/";
  const signer = Ethers.provider().getSigner();
  const nftContract = new ethers.Contract(
    nftCollectionAddress,
    nftCollectionABI,
    signer
  );
  nftContract
    .balanceOf(sender)
    .then((res) => {
      if (parseInt(res["_hex"], 16) > 0) {
        State.update({ isLoggedIn: true, displayMsg: false });
      } else {
        State.update({ isLoggedIn: false, displayMsg: true });
      }
      State.update({ loading: false });
    })
    .catch((error) => console.log(error));
};

return (
  <div>
    <div>
      <div style={{ display: "flex" }}>
        <img
          width={48}
          src="https://res.cloudinary.com/crunchbase-production/image/upload/c_lpad,f_auto,q_auto:eco,dpr_1/wfb8wvfuzofnk7wnfvli"
        />
        <h1
          style={{
            fontFamily: "Syncopate, sans-serif",
            fontSize: "2rem",
            fontWeight: "bold",
            margin: "0.5rem -0.4rem",
            color: "#CF574A",
          }}
        >
          fropolitan x Near
        </h1>
      </div>
      <h6
        style={{
          fontFamily: "Syncopate, sans-serif",
          fontSize: "0.8rem",
          margin: "0.2rem 0.8rem",
        }}
      >
        NFT Gated payment system for Social Activities
      </h6>
      <hr />
    </div>
    {state.isLoggedIn ? (
      <>
        <iframe src="https://1234-nearexamples-donationjs-70k9fwuh5p5.ws-us101.gitpod.io/" />
      </>
    ) : (
      <div>
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <div style={{ marginRight: "1rem" }}>
            <img
              style={{
                borderRadius: "50%",
                margin: "0.5rem",
              }}
              width={80}
              src="https://i.seadn.io/gcs/files/4530fc473fea3a9dbdb8e61afe177920.jpg?auto=format&dpr=1&w=640"
              alt="Profile Image"
            />
            <img
              style={{
                borderRadius: "50%",
                margin: "0.5rem",
              }}
              width={80}
              src="https://i.seadn.io/gcs/files/b1ecedc94ed29bacf8a57500fa824523.jpg?auto=format&dpr=1&w=640"
              alt="Profile Image"
            />
            <img
              style={{
                borderRadius: "50%",
                margin: "0.5rem",
              }}
              width={80}
              src="https://i.seadn.io/gcs/files/3704274360a7809fac8f73917db90f16.jpg?auto=format&dpr=1&w=640"
              alt="Profile Image"
            />
          </div>
          <div>
            <p
              style={{
                fontFamily: "Arial, sans-serif",
                fontSize: "1.5rem",
                color: "#CF574A",
              }}
            >
              Welcome to the Afropolitan Network!
            </p>
            <p
              style={{
                fontFamily: "Arial, sans-serif",
                fontSize: "1rem",
                color: "#333",
                marginBottom: "1rem",
              }}
            >
              Own an Afropolitan Network NFT to join the exclusive community
            </p>
            <button
              style={{
                marginTop: "1rem",
                fontSize: "1rem",
                padding: "0.5rem 1rem",
                borderRadius: "0.25rem",
                backgroundColor: "#CF574A",
                color: "white",
                border: "none",
                boxShadow: "0px 2px 5px rgba(0, 0, 0, 0.2)",
              }}
              onClick={getNftContract}
              disabled={state.loading}
            >
              Enter Network
            </button>
            <br />
            {state.displayMsg ? (
              <div style={{ fontSize: "0.8rem", textAlign: "center" }}>
                Bye bye bro! Go get one from
                <a
                  href="https://opensea.io/collection/afropolitan"
                  style={{ textDecoration: "none", color: "#CF574A" }}
                >
                  here!
                </a>
                Can't let you get in :/
              </div>
            ) : (
              <></>
            )}
          </div>
        </div>
      </div>
    )}
  </div>
);
