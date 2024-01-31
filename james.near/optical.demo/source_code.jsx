const $ = VM.require("sdks.near/widget/Loader");
const { LensSDK } = $("@sdks/lens-sdk");
const { Constants } = $("@sdks/lens/definitions");

State.init({
  evmAddress: "",
  handleToCreate: "",
  lastAuthenticationResult: "",
  lastProfileResult: "",
  lastProfileWriteResult: "",
  lastPublicationReadResult: "",
  lastPublicationWriteResult: "",
  lastPublicationSearchResult: "",
  lastProfileSearchResult: "",
  lastNotificationResult: "",
  lastTransactionResult: "",
  lastCustomRequestResult: "",
  handleCreated: null,
  alive: null,
  profiles: [],
  login: null,
  verify: null,
  refresh: null,
  list: null,
  revoke: null,
  customProfileHandle: "lens/mattb",
  searchProfileTerm: "stani",
  searchPublicationTerm: "NEAR Protocol",
  transactionHash:
    "0xa46ff9fe2c68c0c5ff4347b449bf73373733d01a0377dc44bb1c684c2e702ca0",
  transactionId: "",
  testPublication: "0x01-0x02c5",
  onlyOnce: true,
  customRequest: `query Profile($request: ProfileRequest!) {
  profile(request: $request) {
    operations {
      isFollowedByMe {
        value
      }
    }
  }
}`,
  customRequestParameters: `{
  "request": {
    "forHandle": "lens/mattb"
  }
}`,
});

LensSDK = new LensSDK(State, state);

if (!state.evmAddress && Ethers.provider()) {
  Ethers.provider()
    .send("eth_requestAccounts", [])
    .then(([address]) => {
      if (address) {
        State.update({ evmAddress: address });
      }
    });
}

const Response = styled.div`
  width:100%;
  overflow-y:auto;
  border-radius:10px;
  background-color:rgba(0,0,0,.06);
  border:1px solid rgba(0,0,0,.05);
  color:rgba(0,0,0,.5);
  font-size:.8rem;
  font-weight:bold;
  padding:20px;
  overflow-wrap:break-word;
`;

const [lensHandle, setLensHandle] = useState("lens/mattb");
const [followersData, setFollowersData] = useState([]);

useEffect(() => {
  const fetchProfile = LensSDK.profile.getProfile || LensSDK.profile.fetch;

  if (fetchProfile) {
    fetchProfile({ handle: lensHandle })
      .then((profile) => {
        const followersRequest = {
          profileId: profile.id,
        };

        LensSDK.profile
          .followers(followersRequest)
          .then((followersResponse) => {
            console.log("Followers:", followersResponse); // Debugging log
            const profileIds = followersResponse.profiles.map(
              (follower) => follower.id
            );
            console.log("Profile IDs:", profileIds); // Debugging log
            setFollowersData(profileIds);
          })
          .catch((error) => console.error("Error fetching followers:", error));
      })
      .catch((error) => console.error("Error fetching profile:", error));
  } else {
    console.error("Profile fetch method not available in LensSDK");
  }
}, [lensHandle]);

return (
  <>
    <div className="m-3">
      <h3>Optical ~ DEMO</h3>
      <h5>Lens Graph Visualizer</h5>
      <div className="mb-3">
        <input
          placeholder="lens/<handle>"
          value={lensHandle}
          onChange={(e) => setLensHandle(e.target.value)}
        />
      </div>
      <button
        className="btn btn-primary m-1"
        onClick={() => {
          LensSDK.profile
            .fetch({
              forHandle: lensHandle,
            })
            .then((profile) => {
              LensSDK.profile
                .following({
                  for: profile.id,
                })
                .then((paginatedResult) => {
                  State.update({ lastProfileResult: paginatedResult });
                });
            });
        }}
      >
        Following
      </button>
      <button
        className="btn btn-primary m-1"
        onClick={() => {
          LensSDK.profile
            .fetch({
              forHandle: lensHandle,
            })
            .then((profile) => {
              LensSDK.profile
                .followers({
                  of: profile.id,
                })
                .then((paginatedResult) => {
                  State.update({ lastProfileResult: paginatedResult });
                });
            });
        }}
      >
        Followers
      </button>
    </div>
    <div className="m-3">
      {state.lastProfileResult && (
        <Response>
          {JSON.stringify(
            state.lastProfileResult.profiles.map((profile) => profile.id)
          )}
        </Response>
      )}
    </div>
  </>
);
