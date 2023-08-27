const { contractAddress, walletAddress, chainIdIPT, apiUrl } = props;

if (!contractAddress || !walletAddress || !chainIdIPT || !apiUrl) {
  return "Cannot connect to Impetus Network";
}

const nearAccount =
  "2a41aa578c1b22793cefc232be387b13a84693921898f4f4dfd03d12c12ad149";
const createGAWidgetSrc = `${nearAccount}/widget/ipt-giveaway`;
const listGAWidgetSrc = `${nearAccount}/widget/ipt-giveaway-list`;

State.init({
  activeLink: "dashboard",
  address: null,
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
    height: 100vh;
    height: -webkit-fill-available;
    max-height: 100vh;
    overflow-x: auto;
    overflow-y: hidden;

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

  console.log("signer info", signer);

  signer.getAddress().then((address) => {
    State.update({
      address,
    });
  });
}

const isLoggedIn = () => {
  return !!state.address;
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
              Quickly design and customize responsive mobile-first sites with
              Bootstrap, the world’s most popular front-end open source toolkit,
              featuring Sass variables and mixins, responsive grid system,
              extensive prebuilt components, and powerful JavaScript plugins.
            </p>
            <div class="justify-content-sm-center">
              <div class="input-group mb-3">
                <input
                  type="text"
                  class="form-control"
                  placeholder="Wallet address"
                />
                <button
                  class="btn btn-primary"
                  type="button"
                  id="claimTokenBtn"
                >
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
                      contractAddress:
                        "0x0000000000000000000000000000000000000805",
                      chainIdIPT: 322,
                      rpcUrl: "https://testnet.impetus.network",
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
                      apiUrl,
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
  <Layout>
    {renderSidebar()}
    <GapDivider />
    {renderContent()}
  </Layout>
);
