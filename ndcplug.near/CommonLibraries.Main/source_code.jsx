// tab isn't rerederning properly
// add better icons and actually populate components
// pass in props so can keep track of state
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
    category: "NEAR APIs JS Examples",
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
    category: "Styled Components",
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
const filterTag = props.tab ?? "home";
const debug = props.debug ?? false;
const id = props.id ?? "";

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
              <Widget
                src="mob.near/widget/WidgetMetadata"
                props={{
                  accountId: comp.accountId,
                  widgetName: comp.widgetName,
                  expanded: false,
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
      <div class="text fs-5 text-muted mb-1" id={item.id}>
        {item.category}
      </div>
      <div class="border border-2 mb-4 rounded"></div>
      <div class="container">
        <div className="row ">
          {item.components.map((comp, i) => (
            <div class="w-100 mb-2">
              <Widget
                key={i}
                src="mob.near/widget/WidgetMetadata"
                props={{
                  accountId: comp.accountId,
                  widgetName: comp.widgetName,
                  expanded: false,
                }}
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
State.init({
  tab: filterTag,
  id: id,
});

const renderHome = () => {
  return (
    <>
      {searchComponents()}
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
  State.update({ tab: selection.tab, id: selection.id ? selection.id : "" });
};

const renderContent = {
  home: renderHome(),
  searchComponents: searchComponents(),
  category: renderCategory(state.id),
}[state.tab];

return (
  <>
    <div class="row">
      <div class="col-md-3">
        <Widget
          src={`ndcplug.near/widget/CommonLibraries.Navbar`}
          props={{
            tab: state.tab,
            onSelect,
            navItems: curatedComps.map((i) => ({
              category: i.category,
              icon: i.icon,
              id: i.id,
            })),
          }}
        />
        <hr className="border-2" />
      </div>
      <div class="col-md-9">
        {" "}
        <h2>Component Libraries</h2>
        <p class="text text-muted">Librairies for building a better BOS.</p>
        {renderContent}
      </div>
    </div>
  </>
);
