// tab isn't rerederning properly
// add better icons and actually populate components
// pass in props so can keep track of state
// make it so on click is home tag
// add number of stars
// add hover effect
// make every header also a filter
// add selecte tab styling

const Card = styled.div`
  position: relative;
  width: 100%;
  border-radius: 12px;
  justify-content: center;
  background: #fff;
  border: 1px solid #eceef0;
  box-shadow: 0px 1px 3px rgba(16, 24, 40, 0.1),
    0px 1px 2px rgba(16, 24, 40, 0.06);
  overflow: hidden;
  padding: 23px;
    .join-button {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    gap: 8px;
    padding: 8px 16px;
    height: 32px;
    border-radius: 100px;
    font-weight: 600;
    font-size: 12px;
    line-height: 15px;
    text-align: center;
    cursor: pointer;
    background: #FBFCFD;
    border: 1px solid #D7DBDF;
    color: ${props.primary ? "#006ADC" : "#11181C"} !important;
    white-space: nowrap;

    &:hover,
    &:focus {
      background: #ECEDEE;
      text-decoration: none;
      outline: none;
    }

    i {
      display: inline-block;
      color: #7E868C;
    }
  }
`;

const ownerId = "manzanal.near";
const curatedComps = [
  {
    category: "NFT",
    id: "nft",
    icon: "bi-camera",
    components: [
      {
        accountId: "mintbase.near",
        widgetName: "nft-marketplace",
      },
      {
        accountId: "ndcplug.near",
        widgetName: "Sharddog.Holders",
      },
      {
        accountId: "genadrop.near",
        widgetName: "GenaDrop.App.Index",
      },
      {
        accountId:
          "9c461db4ac11b66ed1167ff969042ac278eaf2d571712585424be00171a63884",
        widgetName: "NFT-Collection-Holder-Snapshot",
      },
      {
        accountId:
          "9c461db4ac11b66ed1167ff969042ac278eaf2d571712585424be00171a63884",
        widgetName: "Wallet-Viewer-Indexer-xyz",
      },
      {
        accountId:
          "9c461db4ac11b66ed1167ff969042ac278eaf2d571712585424be00171a63884",
        widgetName: "NFT-Collection-Data",
      },
      {
        accountId: "minorityprogrammers.near",
        widgetName: "NFTSelector",
      },
      {
        accountId: "cuongdcdev.near",
        widgetName: "linkdrop_plus",
      },
      {
        accountId: "cuongdcdev.near",
        widgetName: "linkdrop-viewer",
      },
      {
        accountId: "onboarder.near",
        widgetName: "NFT-Transfer",
      },
      {
        accountId: "contesty.near",
        widgetName: "NftVotingLeaderboard",
      },
      {
        accountId: "mintbase.near",
        widgetName: "ListToMarket",
      },
      {
        accountId: "genadrop.near",
        widgetName: "GenaDropMultilisting",
      },
      {
        accountId: "mintbase.near",
        widgetName: "mintsta",
      },
    ],
  },
  {
    category: "EVM",
    id: "evm",
    icon: "bi-diamond",
    components: [
      {
        accountId: "hackerhouse.near",
        widgetName: "EVMComponents",
      },
    ],
  },
  {
    category: "NDC",
    id: "ndc",
    icon: "bi-building",
    components: [
      {
        accountId: "easypoll-v0.ndc-widgets.near",
        widgetName: "EasyPoll",
      },
      {
        accountId: "mattb.near",
        widgetName: "NDC.Views.Home",
      },
      {
        accountId: "neardigitalcollective.near",
        widgetName: "NDCDocs",
      },
      {
        accountId: "neardigitalcollective.near",
        widgetName: "Gigs",
      },
      {
        accountId: "nomination.ndctools.near",
        widgetName: "NDC.Nomination.Page",
      },
      {
        accountId: "kudos.ndctools.near",
        widgetName: "NDC.Kudos.Main",
      },
      {
        accountId: "sayalot.near",
        widgetName: "SayALot",
      },
      {
        accountId: "dokxo.near",
        widgetName: "FASTSBT",
      },
      {
        accountId: "ndcplug.near",
        widgetName: "NDC.SBT.main",
      },
      {
        accountId: "minorityprogrammers.near",
        widgetName: "IAH-Gate",
      },
      {
        accountId: "ndcplug.near",
        widgetName: "BlueCheck.helper",
      },
    ],
  },
  {
    category: "DeFi",
    id: "defi",
    icon: "bi-money",
    components: [
      {
        accountId: "meta-pool-official.near",
        widgetName: "MetaPoolStakeEth",
      },
      {
        accountId: "azbang.near",
        widgetName: "StakeHERE",
      },
      {
        accountId: "aave-v3.near",
        widgetName: "AAVE",
      },
      {
        accountId: "ref-admin.near",
        widgetName: "ZKEVM.GAMMA",
      },
      {
        accountId: "ref-admin.near",
        widgetName: "ZKEVMSwap.zkevm-swap",
      },
      {
        accountId: "chanon.near",
        widgetName: "1inch",
      },
      {
        accountId: "syi216.near",
        widgetName: "GNS-Container",
      },
      {
        accountId: "alotaco.near",
        widgetName: "SushiSwap",
      },
      {
        accountId: "tribos.near",
        widgetName: "swap",
      },
    ],
  },
  {
    category: "Social",
    id: "social",
    icon: "bi-money",
    components: [
      {
        accountId: "near",
        widgetName: "ProfilePage",
      },
      {
        accountId: "mob.near",
        widgetName: "ProfilePage",
      },
      {
        accountId: "ndcplug.near",
        widgetName: "Linktree.Main",
      },
      {
        accountId: "proofofvibes.near",
        widgetName: "Vibes.DAO.Main",
      },
    ],
  },
  {
    category: "APIs",
    id: "api",
    icon: "bi-money",
    components: [
      {
        accountId: "baam25.near",
        widgetName: "PrayerTimes",
      },
      {
        accountId: "proofofvibes.near",
        widgetName: "Medium.main",
      },
    ],
  },
  {
    category: "Gaming",
    id: "gaming",
    icon: "bi-money",
    components: [
      {
        accountId: "microchipgnu.near",
        widgetName: "Game.FlappyBOS",
      },
      {
        accountId: "let45fc.near",
        widgetName: "LaserChess3D",
      },
      {
        accountId: "chess-game.near",
        widgetName: "ChessGameLobby",
      },
    ],
  },
  {
    category: "DAO",
    id: "dao",
    icon: "bi-judge",
    components: [
      {
        accountId: "sking.near",
        widgetName: "DAO.Page",
      },
      {
        accountId: "hack.near",
        widgetName: "DAO.Page",
      },
      {
        accountId: "frichard5.near",
        widgetName: "NDC-Page",
      },
      {
        accountId: "onboarder.near",
        widgetName: "DAOSocialSearch",
      },
      {
        accountId: "frichard5.near",
        widgetName: "SputnikBOS.Home",
      },
      {
        accountId: "hack.near",
        widgetName: "DAO.Profile.Editor",
      },
      {
        accountId: "hack.near",
        widgetName: "CreateDAO",
      },
      {
        accountId: "sking.near",
        widgetName: "DAO.Permissions",
      },
      {
        accountId: "sking.near",
        widgetName: "DAO.PermissionsHelper",
      },
      {
        accountId: "mob.near",
        widgetName: "DAO.Main",
      },
      {
        accountId: "hack.near",
        widgetName: "Every.DAO",
      },
      {
        accountId: "ndcplug.near",
        widgetName: "DAO.main.sidebar",
      },
    ],
  },
  {
    category: "NEAR APIs JS",
    id: "naj",
    icon: "bi-infinity",
    components: [
      {
        accountId: "ndcplug.near",
        widgetName: "Transfer",
      },
      {
        accountId: "bluntdao.near",
        widgetName: "RequestASesh",
      },
      {
        accountId: "iam_prometheus.near",
        widgetName: "genadropMinter",
      },
    ],
  },
  {
    category: "Styled Comps",
    id: "style",
    icon: "bi-brush",
    components: [
      {
        accountId: "nomination.ndctools.near",
        widgetName: "NDC.StyledComponents",
      },
      {
        accountId: "nearui.near",
        widgetName: "index",
      },
    ],
  },
  {
    category: "Chain-Agnostic",
    id: "agnostic",
    icon: "bi-link",
    components: [
      {
        accountId: "mob.near",
        widgetName: "CopyButton",
      },
    ],
  },
  {
    category: "Data",
    id: "data",
    icon: "bi-link",
    components: [
      {
        accountId: "frichard2.near",
        widgetName: "most-active-contracts",
      },
      {
        accountId: "mob.near",
        widgetName: "Explorer",
      },
      {
        accountId: "dataplatform.near",
        widgetName: "QueryApi.Dashboard",
      },
    ],
  },
  {
    category: "Complex Apps",
    id: "complex",
    icon: "bi-spin",
    components: [
      {
        accountId: "nearhorizon.near",
        widgetName: "Index",
      },
      {
        accountId: "devgovgigs.near",
        widgetName: "Ideas",
      },
      {
        accountId: "astraplusplus.ndctools.near",
        widgetName: "index",
      },
    ],
  },
  {
    category: "Helper Components",
    id: "helper",
    icon: "bi-wave",
    components: [
      {
        accountId: "proofofvibes.near",
        widgetName: "LocationHelper",
      },
    ],
  },
  {
    category: "Primitives",
    id: "primitives",
    icon: "bi-diamond",
    components: [
      {
        accountId: "mob.near",
        widgetName: "CopyButton",
      },
    ],
  },
  {
    category: "Buttons",
    id: "buttons",
    icon: "bi-egg",
    components: [
      {
        accountId: "mob.near",
        widgetName: "CopyButton",
      },
      {
        accountId: "mob.near",
        widgetName: "CommentButton",
      },
      {
        accountId: "rubycop.near",
        widgetName: "NftVotingButton",
      },
      {
        accountId: "mob.near",
        widgetName: "LikeButton",
      },
      {
        accountId: "mob.near",
        widgetName: "LikeButton.Faces",
      },
      {
        accountId: "mob.near",
        widgetName: "FollowButton",
      },
      {
        accountId: "mob.near",
        widgetName: "NotificationButton",
      },
      {
        accountId: "mob.near",
        widgetName: "PokeButton",
      },
      {
        accountId: "peechz.near",
        widgetName: "TwitterFollowButton",
      },
    ],
  },
  {
    category: "Landing Page",
    icon: "bi-land",
    id: "landing",
    components: [
      {
        accountId: "mattb.near",
        widgetName: "Edge.Views.Home",
      },
      {
        accountId: "nearcon23.near",
        widgetName: "Index",
      },
      {
        accountId: "jgodwil.near",
        widgetName: "GenaDrop.Home",
      },
    ],
  },
  {
    category: "Search",
    icon: "bi-search",
    id: "search",
    components: [
      {
        accountId: "mob.near",
        widgetName: "ComponentSearch",
      },
      {
        accountId: "mob.near",
        widgetName: "ComponentSearch.Item",
      },
      {
        accountId: "manzanal.near",
        widgetName: "SerchComponent",
      },
    ],
  },
  {
    category: "DevTooling",
    id: "tooling",
    icon: "bi-toolbox",
    components: [{ accountId: "sourcescan.near", widgetName: "SourceScan" }],
  },
  {
    category: "Time and Date",
    id: "time",
    icon: "bi-calendar",
    components: [
      {
        accountId: "mob.near",
        widgetName: "TimeAgo",
      },
    ],
  },
  {
    category: "Compose",
    id: "compose",
    icon: "bi-envelope-paper",
    components: [
      {
        accountId: "mob.near",
        widgetName: "Common.Compose",
      },
    ],
  },
  {
    category: "Markdown",
    id: "markdown",
    icon: "bi-markdown",
    components: [{ accountId: "mob.near", widgetName: "MarkdownEditorDemo" }],
  },
  {
    category: "Metadata",
    id: "metadata",
    icon: "bi-box-seam",
    components: [{ accountId: "mob.near", widgetName: "MetadataEditor" }],
  },
  {
    category: "Widget Tools",
    id: "tools",
    icon: "bi-tools",
    components: [
      { accountId: "mob.near", widgetName: "Explorer" },
      { accountId: "mob.near", widgetName: "WidgetHistory" },
      { accountId: "mob.near", widgetName: "WidgetSource" },
    ],
  },
];
const filterTag = props.catTab ?? "home";
const debug = props.debug ?? false;
const id = props.id ?? "";

State.init({
  catTab: filterTag,
  id: id,
  selectedTab: props.catTab || "home",
  accountUrl: `#/ndcplug.near/widget/BOSHACKS.Index?tab=resources&catTab=${state.selectedTab}`,
});
const regAccountUrl = `#/ndcplug.near/widget/BOSHACKS.Index?tab=resources&catTab=`;
const updateTab = (tab) => {
  State.update({
    selectedTab: tab,
    accountUrl: `#/ndcplug.near/widget/BOSHACKS.Index?tab=resources&catTab=${tab}`,
  });
  //   window.location.href = `${state.accountUrl}`;
  console.log("Tab is: " + tab);
  console.log("SelectedTab is: " + state.selectedTab);
  console.log("AccountURL: " + state.accountUrl);
};

if (props.catTab && props.catTab !== state.selectedTab) {
  State.update({
    selectedTab: props.catTab,
  });
}

const searchComponents = () => {
  return (
    <div class="mb-4">
      <div className="mb-2">
        <Widget
          src="mob.near/widget/ComponentSearch"
          props={{
            debug: debug,
            filterTag: filterTag,
            placeholder: "🔍 Search for common components",
            limit: 24,
            onChange: ({ result }) => {
              State.update({ components: result });
            },
          }}
        />
      </div>
      {state.components && (
        <div className="mb-2">
          {state.components.map((comp, i) => (
            <div class="mb-2" key={i}>
              {false && (
                <Widget
                  src="mob.near/widget/WidgetMetadata"
                  props={{
                    accountId: comp.accountId,
                    widgetName: comp.widgetName,
                    expanded: true,
                  }}
                />
              )}
              <Widget
                src="ndcplug.near/widget/CommonLibraries.Component.Like"
                props={{
                  widgetPath: `${comp.accountId}/widget/${comp.widgetName}`,
                }}
              />
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

const renderCategory = (categoryId) => {
  if (!categoryId || categoryId === "") return <></>;
  const item = curatedComps.find((i) => i.id == categoryId);
  return (
    <div class="mt-3">
      <div
        class="text fs-5 text-muted mb-1"
        href={`${state.accountUrl}`}
        target="_blank"
        selected={state.selectedTab === item.id}
        id={item.id}
      >
        {item.category}
      </div>
      <div class="border border-2 mb-4 rounded"></div>
      <div class="container">
        <div className="row ">
          {item.components.map((comp, i) => (
            <div class="w-100 mb-2">
              {false && (
                <Widget
                  key={i}
                  src="mob.near/widget/WidgetMetadata"
                  props={{
                    accountId: comp.accountId,
                    widgetName: comp.widgetName,
                    expanded: false,
                  }}
                />
              )}
              <Widget
                key={i}
                src="ndcplug.near/widget/CommonLibraries.Component.Like"
                props={{
                  widgetPath: `${comp.accountId}/widget/${comp.widgetName}`,
                }}
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

const renderHome = () => {
  return (
    <>
      <div class="mt-2">
        <h4>Libraries</h4>
        <p class="text text-muted ">
          A curated list of common librairies grouped by categories.
        </p>
        <div className="mb-3">
          {curatedComps && (
            <div className="mb-6">
              {curatedComps.map((cat, i) => renderCategory(cat.id))}
            </div>
          )}
        </div>
      </div>
    </>
  );
};

const onSelect = (selection) => {
  State.update({ catTab: selection.tab, id: selection.id ? selection.id : "" });
};

const renderContent = {
  home: renderHome(),
  //   searchComponents: searchComponents(),
  category: renderCategory(state.id),
}[state.selectedTab];
const navItems = curatedComps.map((i) => ({
  category: i.category,
  icon: i.icon,
  id: i.id,
}));
return (
  <>
    <Card>
      <div class="row">
        <div class="col-md-3">
          {false && (
            <Widget
              src={`ndcplug.near/widget/CommonLibraries.Navbar`}
              props={{
                catTab: state.catTab,
                onSelect,
                navItems: curatedComps.map((i) => ({
                  category: i.category,
                  icon: i.icon,
                  id: i.id,
                })),
              }}
            />
          )}
          <div className="d-flex flex-column">
            <h4 className="fs-4 text-nowrap d-flex flex-row align-items-center">
              <span>📚 Libraries</span>
            </h4>
            <button className="nav-link mt-2" onClick={() => updateTab("home")}>
              <i className="bi-house" />
              <span>Home</span>
            </button>
            <button
              className="nav-link mt-2"
              onClick={() => updateTab("searchComponents")}
            >
              <i className="bi-search" />
              <span>Search</span>
            </button>
            <hr className="border-2" />
            {navItems.map((item) => {
              // console.log(item);
              return (
                <a
                  className={`join-button rounded-3${
                    item.id === props.catTab ? "bg-secondary" : ""
                  }`}
                  onClick={() => updateTab(item.id)}
                  href={`${regAccountUrl}${item.id}`}
                  target="_blank"
                >
                  {" "}
                  <i className={item.icon} /> <span>{item.category}</span>{" "}
                </a>
              );
            })}
          </div>
          <hr className="border-2" />
        </div>
        <div class="col-md-9">
          {" "}
          <h2>Component Libraries</h2>
          <p class="text text-muted">Libraries for building a better BOS.</p>
          {searchComponents()}
          {renderContent}
        </div>
      </div>
    </Card>
  </>
);
