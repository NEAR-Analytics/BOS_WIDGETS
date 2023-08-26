State.init({
  activeLink: "dashboard",
  address: null,
  balance: null,
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
`;

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
  console.log("------------------Provider Start----------------------");
  const signer = Ethers.provider().getSigner();

  console.log("signer", signer);

  signer.getAddress().then((address) => {
    updateState(address, "address");

    Ethers.provider()
      .getBalance(address)
      .then((balance) => {
        updateState(balance.toString(), "balance");
      });
  });
}

const renderHeader = () => {
  return (
    <Header>
      {!!state.balance && (
        <div class="me-3">
          <span class="badge h-100 text-bg-dark d-flex align-items-center">
            <i class="bi bi-coin me-2" /> {state.balance}
          </span>
        </div>
      )}
      {!!state.address && (
        <div class="me-3">
          <span class="badge h-100 text-bg-dark d-flex align-items-center">
            <i class="bi bi-wallet2 me-2" /> {state.address}
          </span>
        </div>
      )}
      <Web3Connect className="web3-connect" connectLabel="Connect Wallet" />
    </Header>
  );
};

const renderSidebar = () => {
  return (
    <SideBar>
      <div class="d-flex align-items-center mb-3 mb-md-0 me-md-auto text-white text-decoration-none">
        <span class="fs-4">Impetus</span>
      </div>
      <hr />
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
    <div class="px-4 py-5 my-5 text-center">
      <h1 class="display-5 fw-bold">Impetus Network</h1>
      <div class="col-lg-6 mx-auto">
        <p class="lead mb-4">
          Quickly design and customize responsive mobile-first sites with
          Bootstrap, the world’s most popular front-end open source toolkit,
          featuring Sass variables and mixins, responsive grid system, extensive
          prebuilt components, and powerful JavaScript plugins.
        </p>
        <div class="d-grid gap-2 d-sm-flex justify-content-sm-center">
          <button type="button" class="btn btn-primary btn-lg px-4 gap-3">
            Primary button
          </button>
          <button type="button" class="btn btn-outline-secondary btn-lg px-4">
            Secondary
          </button>
        </div>
      </div>
    </div>
  );
};

const renderContent = () => {
  return (
    <ContentWrapper>
      {renderHeader()}
      <div class="container-fluid">
        <div class="row">
          <div class="col-12">
            {state.activeLink === "dashboard" && renderDashboard()}
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
