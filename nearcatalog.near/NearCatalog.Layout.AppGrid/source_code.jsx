const Css = styled.div`
  html {
    font-size: 20px;
  }
  .near-bg:before {
    background: linear-gradient(270deg, #fff0e2 35%, #d7dbff);
    right: 15vh;
    top: 10vh;
  }
  .near-item-sm {
    align-items: center;
    border-radius: 0.8rem;
    display: block;
    flex-direction: column;
    padding: 0.5rem;
    transition: all 0.15s ease;
    float: left;
  }
  .near-item-sm:focus,
  .near-item-sm:hover {
    background: rgba(34, 34, 34, 0.05);
    text-decoration: none;
  }
  .near-item-sm .tile-icon {
    box-shadow: 0 0.5rem 1.2rem rgba(34, 34, 34, 0.2);
    border-radius: 50%;
    height: 3.2rem;
    margin: 0.5rem auto;
    width: 3.2rem;
  }
  .near-item-sm .tile-icon img {
    border-radius: 50%;
    height: 100%;
    width: 100%;
  }
  .near-item-sm .tile-content {
    width: 100%;
  }
  .near-item-sm .tile-title {
    font-size: 0.7rem;
    text-align: center;
    color: rgb(34, 34, 34);
    font-weight: bold;
  }
  .near-bg:after,
  .near-bg:before {
    border-radius: 50%;
    content: "";
    display: block;
    filter: blur(3rem);
    height: 50vh;
    position: fixed;
    width: 50vh;
    z-index: -1;
  }
  .near-bg:after {
    background: linear-gradient(180deg, #e1d7ff 25%, #e1f4f8);
    bottom: 10vh;
    left: 15vh;
  }
  #awesomebos-wrap {
    max-width: 1216px;
  }
  .near-item {
    -webkit-text-size-adjust: 100%;
    line-height: 1.5;
    -webkit-tap-highlight-color: rgba(0, 0, 0, 0);
    font-size: 0.7rem;
    text-rendering: optimizeLegibility;
    box-sizing: inherit;
    outline: none;
    text-decoration: none;
    background: #fff;
    border: 0.05rem solid #eee;
    box-shadow: 0 0.05rem 0.05rem rgba(34, 34, 34, 0.05),
      0 0.2rem 0.8rem rgba(34, 34, 34, 0.075);
    border-radius: 0.8rem;
    color: #222;
    display: flex;
    flex-direction: column;
    height: 100%;
    min-height: 8.5rem;
    padding: 1rem;
    position: relative;
    transition: box-shadow 0.2s ease-in-out, transform 0.2s ease-in-out;
  }
  .near-item:hover {
    box-shadow: 0 0.1rem 0.2rem rgba(34, 34, 34, 0.05),
      0 0.4rem 1.6rem rgba(34, 34, 34, 0.15);
    text-decoration: none;
    transform: translateY(-0.1rem);
  }
  .near-item-header .tile {
    display: flex;
  }
  .tile .tile-subtitle {
    margin-bottom: 0.5em;
    margin-top: 0;
    color: #222;
    font-size: 0.65rem;
    font-weight: 400;
    height: 100%;
    line-height: 1rem;
    max-height: 2rem;
    overflow: hidden;
    text-overflow: ellipsis;
  }
  .tile {
    align-content: space-between;
    align-items: flex-start;
    display: flex;
  }
  .near-item .tile-tags {
    font-size: 0.6rem;
    padding-top: 0.1rem;
  }
  .near-item .tile-icon,
  .near-item .tile-icon img {
    border-radius: 50%;
    height: 3rem;
    width: 3rem;
    box-shadow: 0 0.5rem 1.2rem rgba(34, 34, 34, 0.2);
  }
  .near-item .tile-tags span {
    display: inline-block;
    text-transform: lowercase;
    margin-right: 2px;
    opacity: 0.8;
  }
  .near-item .tile-tags,
  .near-item .tile-title {
    font-size: 0.8rem;
    padding-bottom: 0.1rem;
    margin-bottom: 0px;
    overflow: hidden;
  }
  .near-item .tile-subtitle {
    font-size: 0.85rem;
    line-height: 1rem;
    max-height: 8rem;
    overflow: hidden;
    text-overflow: ellipsis;
  }
  .near-item .tile-content:not(:first-child) {
    font-size: 0.7rem;
    color: #090909;
    box-sizing: inherit;
    flex: 1 1 auto;
    overflow: hidden;
    padding-left: 0.8rem;
  }
  #btn-mobile-show-category {
    border: 0.1rem solid transparent;
    cursor: pointer;
    z-index: 9;
    padding: 20px;
    font-weight: bold;
  }
  .btn {
    align-items: center;
    -webkit-appearance: none;
    -moz-appearance: none;
    appearance: none;
    background: rgba(34, 34, 34, 0.05);
    border: 0.1rem solid transparent;
    border-radius: 0.4rem;
    color: #222;
    cursor: pointer;
    display: inline-flex;
    font-size: 0.7rem;
    height: 1.8rem;
    line-height: 1.2rem;
    outline: none;
    padding: 0.2rem 0.4rem;
    text-align: center;
    text-decoration: none;
    transition: background 0.2s, border 0.2s, box-shadow 0.2s, color 0.2s;
    -webkit-user-select: none;
    -moz-user-select: none;
    user-select: none;
    vertical-align: middle;
    white-space: nowrap;
  }
  .btn:focus {
    box-shadow: 0 0 0 0.1rem rgba(34, 34, 34, 0.2);
  }
  .btn:focus,
  .btn:hover {
    background: rgba(34, 34, 34, 0.1);
    border-color: transparent;
    text-decoration: none;
  }
  .btn.active,
  .btn:active {
    background: rgba(34, 34, 34, 0.15);
    border-color: rgba(34, 34, 34, 0.05);
    text-decoration: none;
  }
  .btn:disabled {
    cursor: default;
    opacity: 0.5;
    pointer-events: none;
  }
  .btn.btn-lg {
    font-size: 0.8rem;
    height: 2rem;
    padding: 0.3rem 0.6rem;
  }
  .btn.btn-block {
    display: flex;
    width: 100%;
  }
  .column {
    flex: 1;
    max-width: 100%;
    padding-left: 0.8rem;
    padding-right: 0.8rem;
  }
  .menu {
    box-shadow: 0 1rem 3rem rgba(34, 34, 34, 0.3);
    background: #fff;
    border-radius: 0.8rem;
    list-style: none;
    margin: 0;
    min-width: 180px;
    padding: 0.8rem;
    transform: translateY(0.2rem);
    z-index: 300;
  }
  .menu.menu-nav {
    background: transparent;
    box-shadow: none;
  }
  .menu .menu-item {
    margin-top: 0;
    padding: 0;
    text-decoration: none;
    -webkit-user-select: none;
    -moz-user-select: none;
    user-select: none;
  }
  .menu .menu-item > a {
    align-items: center;
    color: inherit;
    display: flex;
    margin: 0;
    padding: 0.4rem;
    text-decoration: none;
  }
  .menu .menu-item > a.active,
  .menu .menu-item > a:active,
  .menu .menu-item > a:focus,
  .menu .menu-item > a:hover {
    color: rgba(34, 34, 34, 0.75);
  }
  .aside-container {
    display: flex;
    flex-direction: column;
    flex: 1 1 12rem;
    scrollbar-width: none;
    -ms-overflow-style: none;
  }
  .aside-container::-webkit-scrollbar {
    background: transparent;
    display: none;
    width: 0;
  }
  @media screen and (min-width: 960px) {
    .aside-container {
      max-height: 90vh;
      overflow-y: auto;
      position: sticky;
      top: 0;
    }
  }
  .aside-container .sidebar-container {
    bottom: 2rem;
    display: flex;
    flex-direction: column;
    padding: 0 0 1rem;
    width: 100%;
  }
  @media screen and (min-width: 960px) {
    .aside-container .sidebar-container {
      max-width: 12rem;
      padding-top: 1rem;
    }
    #btn-mobile-show-category {
      display: none;
    }
  }
  .aside-container .awesome-aside-menu {
    padding: 0;
  }
  @media screen and (max-width: 960px) {
    #near-sidebar {
      display: none !important;
    }
  }
  #near-sidebar {
    margin-top: 20px;
  }
  #offcanvas-menu {
    z-index: 99999;
  }
  #offcanvas-menu .aside-container .awesome-aside-menu .menu-item {
    margin: 1.1rem;
    width: 100%;
  }
  #offcanvas-menu .aside-container .awesome-aside-menu .menu-item a,
  #offcanvas-menu .aside-container .awesome-aside-menu .btn.btn-lg {
    font-size: 1rem;
    padding: 15px;
    margin: 20px 0px;
  }
  .offcanvas-body {
    padding-bottom: 100px;
  }
  .aside-container .awesome-aside-menu .btn {
    background: transparent;
    display: flex;
    font-size: 0.75rem;
    justify-content: space-between;
    margin-bottom: 0.15rem;
    width: 100%;
  }
  .aside-container .awesome-aside-menu .btn.btn-lg {
    font-weight: 700;
    padding: 0.4rem;
  }
  .aside-container .awesome-aside-menu .btn:focus,
  .aside-container .awesome-aside-menu .btn:hover {
    background: rgba(34, 34, 34, 0.05);
    border-color: transparent;
  }
  .aside-container .awesome-aside-menu .btn.active,
  .aside-container .awesome-aside-menu .btn:active {
    background: rgba(34, 34, 34, 0.1);
    border-color: transparent;
  }
  .aside-container .awesome-aside-menu .menu-parent .menu-nav {
    padding: 0 0 0.8rem 0.8rem;
  }
  .aside-container .awesome-aside-menu .menu-badge {
    font-size: 0.8rem;
    font-weight: bold;
    margin-left: 0.5rem;
    opacity: 0.75;
    padding: 0 0.2rem;
  }
  .aside-container .awesome-aside-select {
    display: none;
  }
  @media screen and (max-width: 960px) {
    .aside-container .awesome-aside-select {
      display: flex;
      max-width: 24rem;
    }
  }
  .aside-container .awesome-aside-select .btn {
    font-size: 0.7rem;
    font-weight: 400;
    justify-content: space-between;
    position: relative;
    z-index: 9;
  }
`;
const componentPath = props.componentPath;
const indexPath = props.indexPath;
const router = props.router;
const cat = props.cat;
State.init({
  projects: props.projects ? props.projects : {},
  // bookmarkLoaded: null,
});
const TrendingMarquee = (data) => {
  // console.log("trending props:  ", data, "props props", data.props);
  const props = data.props;
  const Css = styled.div`
    overflow-x: hidden;
    .awesome-trending-content {
      text-align: center;
      white-space: nowrap !important;
    }
    .awesome-trending-content .near-item-sm {
      display: inline-block;
      float: none;
    }
  `;
  const Marquee = styled.div`
    @keyframes marquee {
      from {
        transform: translateX(0%);
      }
      to {
        transform: translateX(-100%);
      }
    }
    animation: marquee 30s linear infinite;
    margin: 0 auto;
    &:hover {
      animation-play-state: paused;
    }
  `;
  State.init({
    trendingProjects: false,
  });
  const router = props.router || "";
  if (props.cat == "trending") return <></>;
  setTimeout(() => {
    const ftd = fetch(
      props.indexer + "/projects-by-category?cid=trending"
    ).body;
    State.update({
      trendingProjects: ftd ? ftd.data : null,
    });
  }, 100);
  if (!state.trendingProjects) {
    return (
      <>
        <br />
        🐲🐉🐶😺~
        <br />
      </>
    );
  }
  return (
    <Css>
      <h3 className="my-3">🔥Trending</h3>
      <div
        className="awesome-trending-content"
        style={{
          marginLeft: 100,
          width: (Object.keys(state.trendingProjects).length - 1) * 90,
        }}
      >
        <Marquee>
          {Object.keys(state.trendingProjects).map((e) => {
            let p = state.trendingProjects[e];
            return (
              <Link
                className="near-item-sm"
                title={p.profile.name}
                href={`/${props.indexPath}?id=${e}`}
              >
                <div className="tile-icon">
                  <img
                    src={p.profile.image?.url || props.defaultImg}
                    alt={p.profile.name}
                  />
                </div>
                <div className="tile-content">
                  <h2 className="tile-title">{p.profile.name}</h2>
                </div>
              </Link>
            );
          })}
        </Marquee>
      </div>
    </Css>
  );
}; //Trending element
const LeftSidebar = (data) => {
  const props = data.props;
  const offcanvas = props.offcanvas;
  const indexPath = props.indexPath;
  const cat = props.cat;
  const LeftMenu = (data) => {
    const props = data.props;
    const path = props.indexPath;
    const cat = props.cat;
    const listItems = [
      { l: "", t: "All" },
      {
        t: "Dapps",
        l: "?cat=dapps",
        menuItems: [
          { l: "?cat=ai", t: "AI" },
          { l: "?cat=lending", t: "Lending" },
          { l: "?cat=defi", t: "DeFi" },
          { l: "?cat=desci", t: "DeSci" },
          { l: "?cat=dex", t: "DEX" },
          { l: "?cat=game", t: "Game" },
          { l: "?cat=launchpad", t: "Launchpad" },
          { l: "?cat=loyalty", t: "Loyalty" },
          { l: "?cat=marketplace", t: "Marketplace" },
          // { l: "?cat=memecoin", t: "Memecoin" },
          { l: "?cat=nft", t: "NFT" },
          { l: "?cat=privacy", t: "Privacy" },
          { l: "?cat=restaking", t: "Restaking" },
          { l: "?cat=rwa", t: "RWA" },
          { l: "?cat=social", t: "Social" },
          { l: "?cat=sports", t: "Sports" },
          { l: "?cat=stablecoin", t: "Stablecoin" },
        ],
      },
      {
        t: "Ecosystem",
        l: "?cat=ecosystem",
        menuItems: [
          { l: "?cat=accelerator", t: "Accelerator" },
          { l: "?cat=audits", t: "Audits" },
          { l: "?cat=bounties", t: "Bounties" },
          { l: "?cat=community", t: "Community" },
          { l: "?cat=compliance", t: "Compliance" },
          { l: "?cat=dao", t: "DAO" },
          { l: "?cat=design_support", t: "Design Support" },
          { l: "?cat=developer_support", t: "Developer Support" },
          { l: "?cat=devhub_grant", t: "DevHub Grant" },
          { l: "?cat=education", t: "Education" },
          { l: "?cat=enterprise", t: "Enterprise" },
          { l: "?cat=events", t: "Events" },
          { l: "?cat=funding_node", t: "Funding Node" },
          { l: "?cat=metapool_grant", t: "Metapool grant" },
          { l: "?cat=mintbase_grant", t: "Mintbase Grant" },
          { l: "?cat=ndc_grant", t: "NDC Grant" },
          { l: "?cat=nf_grant", t: "NF Grant" },
          { l: "?cat=proximity_grant", t: "Proximity Grant" },
          { l: "?cat=regional_hub", t: "Regional Hub" },
          { l: "?cat=security", t: "Security" },
          { l: "?cat=service_provider", t: "Service Provider" },
        ],
      },
      {
        t: "Infrastructure",
        l: "?cat=infrastructure",
        menuItems: [
          { l: "?cat=aurora", t: "Aurora" },
          { l: "?cat=bos", t: "BOS" },
          { l: "?cat=bridges", t: "Bridges" },
          { l: "?cat=cex", t: "CEX" },
          { l: "?cat=custodian", t: "Custodian" },
          { l: "?cat=chain_abstraction", t: "Chain Abstraction" },
          { l: "?cat=explorer", t: "Explorer" },
          { l: "?cat=indexers", t: "Indexers" },
          { l: "?cat=data_availability", t: "Data Availability" },
          { l: "?cat=mobile", t: "Mobile" },
          { l: "?cat=oracles", t: "Oracles" },
          { l: "?cat=rpc", t: "RPC" },
          { l: "?cat=storage", t: "Storage" },
          { l: "?cat=validator", t: "Validator" },
          { l: "?cat=wallets", t: "Wallets" },
        ],
      },
      {
        t: "Utilities",
        l: "?cat=utilities",
        menuItems: [
          { l: "?cat=analytics", t: "Analytics" },
          { l: "?cat=asset_management", t: "Asset Management" },
          { l: "?cat=developer_tooling", t: "Developer Tooling" },
          { l: "?cat=utilities", t: "Utilities" },
          { l: "?cat=messaging", t: "Messaging" },
          { l: "?cat=on_off_ramp", t: "On/Off-Ramp" },
          { l: "?cat=payments", t: "Payments" },
          { l: "?cat=productivity_tool", t: "Productivity Tool" },
          { l: "?cat=zero_knowledge", t: "Zero Knowledge" },
        ],
      },
      {
        t: "Other",
        l: "?cat=other",
      },
    ];
    return (
      <>
        {/* the menu */}
        <div className="awesome-aside-menu menu menu-nav">
          {listItems.map((e) => {
            // console.log("the path is:", path, "cat: ", cat);
            let subMenu = e.menuItems
              ? e.menuItems.map((s) => {
                  return (
                    <div className="menu-item">
                      <a
                        key={s.t}
                        preventScrollReset={true}
                        className={`${
                          (cat == (s.l.length > 0 ? s.l.substring(5) : "")
                            ? " active "
                            : "") + "btn"
                        }`}
                        href={`/${path + (s.l ? s.l : "")}`}
                      >
                        {s.t}
                        <span className="menu-badge d-none">6</span>
                      </a>
                    </div>
                  );
                })
              : false;
            return (
              <div className="menu-parent">
                <a
                  key={e.t}
                  preventScrollReset={true}
                  className={`${
                    (cat == (e.l.length > 0 ? e.l.substring(5) : "")
                      ? " active "
                      : "") + "btn btn-lg"
                  }`}
                  href={`/${path + (e.l ? e.l : "")}`}
                >
                  {e.t}
                  <span className="menu-badge d-none">9</span>
                </a>
                {subMenu ? (
                  <div className="menu menu-nav">{subMenu}</div>
                ) : (
                  <></>
                )}
              </div>
            );
          })}
        </div>
        {/* end the menu */}
      </>
    );
  }; //LeftMenu
  return (
    <>
      <div id="offcanvas-menu" className="sidebar-container container-fluid">
        {/* start offcanvas menu */}
        <div
          class="offcanvas offcanvas-start"
          data-bs-backdrop="static"
          tabindex="-1"
          id="staticBackdrop"
          aria-labelledby="staticBackdropLabel"
        >
          <div class="offcanvas-header">
            <h5 class="offcanvas-title" id="staticBackdropLabel">
              NEARCatalog
            </h5>
            <button
              type="button"
              class="btn-close"
              data-bs-dismiss="offcanvas"
              aria-label="Close"
            ></button>
          </div>
          <div class="offcanvas-body aside-container">
            <LeftMenu
              props={{
                indexPath,
                cat,
              }}
            />
          </div>
        </div>
        {/* offcanvas menu */}
      </div>
      <div id="near-sidebar" className="col-auto col-md-3 px-sm-2 px-0">
        <div className="aside-container">
          <div className="container">
            <div id="sidebar-menu-lg">
              <LeftMenu
                props={{
                  indexPath,
                  cat,
                }}
              />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}; //LeftSidebar
const Navbar = (data) => {
  const props = data.props;
  const Css = styled.div`
    margin-top: 10px;
    .nav-item {
      list-style: none;
    }
    #nearcatalog-navbar .navbar-nav {
      margin: 0;
    }
  `;
  const navItems = [
    { t: "🏠Home", l: ``, r: "home" },
    { t: "🔥Trending", l: `?cat=trending`, r: "trending" },
    { t: "⭐Bookmark", l: `?bookmark=lfg`, r: "trending" },
  ];
  return (
    <Css>
      <div
        id="nearcatalog-navbar"
        className="navbar navbar-expand-lg navbar-light"
        style={{
          background: "white",
          border: "0.05rem solid rgb(238, 238, 238)",
          boxShadow:
            "rgba(34, 34, 34, 0.05) 0px 0.05rem 0.05rem, rgba(34, 34, 34, 0.075) 0px 0.2rem 0.8rem",
          borderRadius: "0.8rem",
          color: "rgb(34, 34, 34)",
        }}
      >
        <div className="container-fluid">
          <Link className="navbar-brand" href={`/${props.indexPath}`}>
            📒NEARCatalog
          </Link>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarNavDropdown"
            aria-controls="navbarNavDropdown"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarNavDropdown">
            <ul className="navbar-nav">
              {navItems.map((e) => {
                return (
                  <li className="nav-item">
                    <Link
                      className="nav-link"
                      href={`/${props.indexPath}` + e.l}
                    >
                      {e.t}
                    </Link>
                  </li>
                );
              })}
              <li className="nav-item">
                <a
                  className="nav-link"
                  href="https://submit.nearcatalog.xyz/new-project/"
                >
                  📥 Submit project
                </a>
              </li>
            </ul>
            <ul class="navbar-nav flex-row flex-wrap ms-md-auto">
              <li class="nav-item col-2 col-md-auto">
                <a
                  class="nav-link p-2"
                  href="https://twitter.com/nearcatalog"
                  target="_blank"
                  title="NEARCatalog on Twitter"
                >
                  <i class="bi bi-twitter"></i>
                </a>
              </li>
              <li class="nav-item col-2 col-md-auto">
                <a
                  class="nav-link p-2"
                  href="https://t.me/nearcatalog"
                  target="_blank"
                  title="NEARCatalog on Telegram"
                >
                  <i class="bi bi-telegram"></i>
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </Css>
  );
}; //NavBar
return (
  <div key={router}>
    <Css>
      <div className="container near-bg" id="awesomebos-wrap">
        {/* START NAVBAR  */}
        <Navbar
          props={{
            componentPath,
            indexPath,
            router,
          }}
        />
        {/* END NAVBAR  */}
        <div className="row">
          {/* LEFT SIDEBAR  */}
          <LeftSidebar
            props={{
              componentPath,
              indexPath,
              cat,
            }}
          />
          {/* END LEFT SIDEBAR */}
          <div
            id="near-content-container"
            className="col col-md-9 py-3 near-right container "
          >
            <div className="awesome-hero">
              <h2
                className="awesome-title"
                style={{ textTransform: "capitalize" }}
              >
                {props.cat_slug.length > 0 ? props.cat_title : ""}
              </h2>
              <p className="awesome-desc">{props.cat_desc}</p>
            </div>
            {/* SEARCHBAR  */}
            <Widget
              src={`${componentPath}.Layout.SearchBar`}
              props={{
                indexPath,
                indexer: props.indexer,
                defaultImg: props.defaultImg,
              }}
            />
            {/* END SEARCHBAR */}
            <button
              className="awesome-aside-select btn btn-lg mt-3"
              id="btn-mobile-show-category"
              data-bs-toggle="offcanvas"
              data-bs-target="#staticBackdrop"
              aria-controls="staticBackdrop"
            >
              <i class="bi bi-search"></i>
              <span className="mx-2">Explore by categories</span>
            </button>
            {/* TRENDING  */}
            <TrendingMarquee
              props={{
                indexPath,
                indexer: props.indexer,
                cat: props.cat,
              }}
            />
            {/* END TRENDING  */}
            <div className="col py-3">
              <div className="near-content">
                <div className="near-list-container row">
                  {Object.keys(state.projects).length == 0 &&
                    props.bookmark && (
                      <div className="">
                        Nothing here, yet 🙅, press ⭐ in project you want to
                        add!
                      </div>
                    )}
                  {Object.keys(state.projects).map((e) => {
                    let p = state.projects[e];
                    return (
                      <div className="near-item-wrap col-md-4 col-sm-12 p-3">
                        <Link
                          className="near-item"
                          title={p.name}
                          href={`/${indexPath}?id=${e}`}
                        >
                          <div className="near-item-header">
                            <div className="tile">
                              <div className="tile-icon">
                                <img
                                  src={p.profile.image?.url || props.defaultImg}
                                  alt={p.profile.name}
                                  loading="lazy"
                                />
                              </div>
                              <div className="tile-content">
                                <h2 className="tile-title">{p.profile.name}</h2>
                                <div className="tile-tags">
                                  {Object.keys(p.profile.tags).length > 0 &&
                                    Object.keys(p.profile.tags).map((e) => {
                                      return (
                                        <span
                                          className="badge bg-secondary text-light"
                                          title={e}
                                        >
                                          {" "}
                                          {p.profile.tags[e]}
                                        </span>
                                      );
                                    })}
                                </div>
                              </div>
                            </div>
                            <div className="tile my-2">
                              <h3 className="tile-subtitle">
                                {p.profile.tagline}
                              </h3>
                            </div>
                          </div>
                        </Link>
                      </div>
                    );
                  })}
                </div>
                {/*app list container */}
              </div>
            </div>
          </div>
          {/*END near content container */}
        </div>
      </div>
    </Css>
  </div>
);
