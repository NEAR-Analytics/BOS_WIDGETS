const { contractAddress, walletAddress, gqlUrl, userStatus } = props;

if (!contractAddress || !walletAddress || !gqlUrl) {
  return "Cannot connect to Impetus Network";
}

const nearAccount =
  "2a41aa578c1b22793cefc232be387b13a84693921898f4f4dfd03d12c12ad149";
const createGAWidgetSrc = `${nearAccount}/widget/ipt-giveaway`;
const listGAWidgetSrc = `${nearAccount}/widget/ipt-giveaway-list`;

State.init({
  activeLink: "dashboard",
  address: null,
  isClaiming: false,
  claimMessage: null,
  claimAddress: null,
  claimStatus: null,
});

const updateState = (value, field) => {
  State.update({
    ...state,
    [field]: value,
  });
};

// CSS
const Header = styled.div`
  padding: 18px 15px;
  background: #151718;

  display: flex;
  justify-content: end;
`;

const SideBar = styled.div`
    display: flex!important;
    flex-direction: column!important;
    flex-shrink: 0!important;
    padding: 1rem!important;
--bs-text-opacity: 1;
    color: rgba(var(--bs-white-rgb),var(--bs-text-opacity))!important;
    --bs-bg-opacity: 1;
    background-color: rgba(var(--bs-dark-rgb),var(--bs-bg-opacity))!important;
`;

const Layout = styled.div`
    display: flex;
    flex-wrap: nowrap;
    // height: 100vh;
    // height: -webkit-fill-available;
    // max-height: 100vh;
    // overflow-x: auto;
    // overflow-y: hidden;

    .web3-connect {
    font-size: 13px;
    font-weight: bold;

    display: grid;
    place-content: center;

    background: #262626;
    border-radius: 5px;
    border: 0;

    color: white;
    transition: all 300ms ease-in-out;
    &:hover {
      background: #262626;
      opacity: 0.5;
    }
    &:active {
      background: #262626 !important;
    }
  }
`;

// position: fixed;
// top: 0;
// right: 0;
// left: 0;
// bottom: 0;

const ContentWrapper = styled.div`
    flex-grow: 1;
`;

const GapDivider = styled.div`
    flex-shrink: 0;
    width: 0;
    height: 100vh;
    background-color: rgba(0, 0, 0, .1);
    box-shadow: inset 0 0.5em 1.5em rgba(0, 0, 0, .1), inset 0 0.125em 0.5em rg
`;

// Define
const menuList = [
  {
    id: "dashboard",
    icon: "bi-house-fill",
    label: "Dashboard",
  },
  {
    id: "create-giveaway",
    icon: "bi-gift-fill",
    label: "Create Giveaway",
  },
  {
    id: "list-giveaways",
    icon: "bi-list-ul",
    label: "List Giveaway",
  },
];

if (Ethers.provider()) {
  const signer = Ethers.provider().getSigner(walletAddress);
  signer.getAddress().then((address) => {
    State.update({
      address,
    });
  });
}

const fetchClaimToken = () => {
  return asyncFetch("https://api.impetus.network/balance", {
    body: `{ "address": "${state.claimAddress}" }`,
    headers: {
      "Content-Type": "application/json",
    },
    method: "POST",
  });
};

const isLoggedIn = () => {
  return !!state.address;
};

const onClaim = () => {
  State.update({
    ...state,
    isClaiming: true,
    claimMessage: null,
    claimStatus: null,
  });

  fetchClaimToken()
    .then((res) => {
      console.log("res", res);
      if (res.ok) {
        if (res.body === "true") {
          State.update({
            claimStatus: res.body,
            claimMessage:
              "Token has been sent to your wallet, it should be deposited in awhile.",
            isClaiming: false,
          });
        } else if (res.body === "false") {
          State.update({
            claimStatus: res.body,
            claimMessage: "Too many attemps, please try again later.",
            isClaiming: false,
          });
        }
      } else {
        State.update({
          claimStatus: "error",
          claimMessage: "Please re-check your wallet address",
          isClaiming: false,
        });
      }
    })
    .catch((e) => {
      console.log(e);

      State.update({
        claimStatus: "error",
        claimMessage: "Something went wrong, please contact admin.",
        isClaiming: false,
      });
    });
};

const renderClaimMessage = () => {
  let status = "";

  if (state.claimStatus === "true") {
    status = "success";
  } else if (
    state.claimStatus === "false" ||
    state.claimStatus === "required"
  ) {
    status = "warning";
  } else if (state.claimStatus === "error") {
    status = "danger";
  }

  return (
    <div class={`alert alert-${status}`} role="alert">
      {state.claimMessage}
    </div>
  );
};

const renderSidebar = () => {
  return (
    <SideBar>
      <ul class="nav nav-pills flex-column mb-auto">
        {menuList.map((menu) => (
          <li class="nav-item mb-2" key={menu.id}>
            <button
              class={`nav-link text-start w-100 ${
                state.activeLink === menu.id ? "active" : "text-white"
              }`}
              aria-current="page"
              onClick={() => updateState(menu.id, "activeLink")}
            >
              <i class={`bi ${menu.icon}`} /> {menu.label}
            </button>
          </li>
        ))}
      </ul>
    </SideBar>
  );
};

const renderDashboard = () => {
  return (
    <>
      {!isLoggedIn() && (
        <div>
          <h5>Please connect to BOS to continue</h5>
          <Web3Connect className="web3-connect" connectLabel="Connect to BOS" />
        </div>
      )}
      {isLoggedIn() && (
        <div class="px-4 py-5 my-5 text-center">
          <h1 class="display-5 fw-bold">Impetus Network</h1>
          <div class="col-lg-6 mx-auto">
            <p class="lead mb-4">
              Obtain <b>Impetus</b> testnet's token: <strong>IPT</strong> for
              creating and testing giveaways, as well as participating in other
              giveaways.
            </p>
            <p class="fs-6">Enter you wallet address here</p>
            {!!state.claimStatus && renderClaimMessage()}
            <div class="justify-content-sm-center">
              <div class="input-group mb-3">
                <input
                  type="text"
                  class="form-control"
                  placeholder="Wallet address"
                  onChange={(e) =>
                    State.update({ claimAddress: e.target.value })
                  }
                />
                <button
                  class="btn btn-primary"
                  type="button"
                  disabled={state.isClaiming}
                  onClick={() => onClaim()}
                >
                  {state.isClaiming && (
                    <span
                      class="spinner-grow spinner-grow-sm"
                      role="status"
                      aria-hidden="true"
                    />
                  )}
                  Claim
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

const renderContent = () => {
  return (
    <ContentWrapper>
      <div class="container-fluid">
        <div class="row">
          <div class="col-12 pt-4">
            {state.activeLink === "dashboard" && renderDashboard()}

            {state.activeLink === "create-giveaway" && (
              <>
                {isLoggedIn() ? (
                  <Widget
                    src={createGAWidgetSrc}
                    props={{
                      contractAddress,
                      walletAddress,
                    }}
                  />
                ) : (
                  "Please login with your wallet"
                )}
              </>
            )}

            {state.activeLink === "list-giveaways" && (
              <>
                {isLoggedIn() ? (
                  <Widget
                    src={listGAWidgetSrc}
                    props={{
                      contractAddress,
                      walletAddress,
                      gqlUrl,
                      userStatus,
                    }}
                  />
                ) : (
                  "Please login with your wallet"
                )}
              </>
            )}
          </div>
        </div>
      </div>
    </ContentWrapper>
  );
};

return (
  <div>
    <Layout>
      {renderSidebar()}
      <GapDivider />
      {renderContent()}
    </Layout>
  </div>
);
