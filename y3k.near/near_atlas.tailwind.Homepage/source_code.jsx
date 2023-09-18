const accountId = props.debugAccountId ?? context.accountId;

const activeTab_tab = props.tab || "home";

// change this back to !accountId
if (!accountId) {
}

const profile = Social.getr(`${accountId}/profile`);

if (profile === null) {
  return "";
}

const name = profile.name;
const image = profile.image;

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

const icons = {
  home: (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      strokeWidth={1.5}
      stroke="currentColor"
      className="w-6 h-6"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M2.25 12l8.954-8.955c.44-.439 1.152-.439 1.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h8.25"
      />
    </svg>
  ),
  economy: (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      strokeWidth={1.5}
      stroke="currentColor"
      className="w-6 h-6"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M3 13.125C3 12.504 3.504 12 4.125 12h2.25c.621 0 1.125.504 1.125 1.125v6.75C7.5 20.496 6.996 21 6.375 21h-2.25A1.125 1.125 0 013 19.875v-6.75zM9.75 8.625c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125v11.25c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 01-1.125-1.125V8.625zM16.5 4.125c0-.621.504-1.125 1.125-1.125h2.25C20.496 3 21 3.504 21 4.125v15.75c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 01-1.125-1.125V4.125z"
      />
    </svg>
  ),
  dev_world: (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      strokeWidth={1.5}
      stroke="currentColor"
      className="w-6 h-6"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M14.25 9.75L16.5 12l-2.25 2.25m-4.5 0L7.5 12l2.25-2.25M6 20.25h12A2.25 2.25 0 0020.25 18V6A2.25 2.25 0 0018 3.75H6A2.25 2.25 0 003.75 6v12A2.25 2.25 0 006 20.25z"
      />
    </svg>
  ),
  nft_world: (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      strokeWidth={1.5}
      stroke="currentColor"
      className="w-6 h-6"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M9.53 16.122a3 3 0 00-5.78 1.128 2.25 2.25 0 01-2.4 2.245 4.5 4.5 0 008.4-2.245c0-.399-.078-.78-.22-1.128zm0 0a15.998 15.998 0 003.388-1.62m-5.043-.025a15.994 15.994 0 011.622-3.395m3.42 3.42a15.995 15.995 0 004.764-4.648l3.876-5.814a1.151 1.151 0 00-1.597-1.597L14.146 6.32a15.996 15.996 0 00-4.649 4.763m3.42 3.42a6.776 6.776 0 00-3.42-3.42"
      />
    </svg>
  ),

  active_accounts: (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      strokeWidth={1.5}
      stroke="currentColor"
      className="w-6 h-6"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M3.75 3v11.25A2.25 2.25 0 006 16.5h2.25M3.75 3h-1.5m1.5 0h16.5m0 0h1.5m-1.5 0v11.25A2.25 2.25 0 0118 16.5h-2.25m-7.5 0h7.5m-7.5 0l-1 3m8.5-3l1 3m0 0l.5 1.5m-.5-1.5h-9.5m0 0l-.5 1.5M9 11.25v1.5M12 9v3.75m3-6v6"
      />
    </svg>
  ),
  resources: (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      strokeWidth={1.5}
      stroke="currentColor"
      className="w-6 h-6"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M12 18v-5.25m0 0a6.01 6.01 0 001.5-.189m-1.5.189a6.01 6.01 0 01-1.5-.189m3.75 7.478a12.06 12.06 0 01-4.5 0m3.75 2.383a14.406 14.406 0 01-3 0M14.25 18v-.192c0-.983.658-1.823 1.508-2.316a7.5 7.5 0 10-7.517 0c.85.493 1.509 1.333 1.509 2.316V18"
      />
    </svg>
  ),

  about: (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      strokeWidth={1.5}
      stroke="currentColor"
      className="w-6 h-6"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M11.25 11.25l.041-.02a.75.75 0 011.063.852l-.708 2.836a.75.75 0 001.063.853l.041-.021M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-9-3.75h.008v.008H12V8.25z"
      />
    </svg>
  ),
  social_activities: (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      strokeWidth={1.5}
      stroke="currentColor"
      className="w-6 h-6"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M15 19.128a9.38 9.38 0 002.625.372 9.337 9.337 0 004.121-.952 4.125 4.125 0 00-7.533-2.493M15 19.128v-.003c0-1.113-.285-2.16-.786-3.07M15 19.128v.106A12.318 12.318 0 018.624 21c-2.331 0-4.512-.645-6.374-1.766l-.001-.109a6.375 6.375 0 0111.964-3.07M12 6.375a3.375 3.375 0 11-6.75 0 3.375 3.375 0 016.75 0zm8.25 2.25a2.625 2.625 0 11-5.25 0 2.625 2.625 0 015.25 0z"
      />
    </svg>
  ),
};

const tabsData = [
  {
    name: "home",
    label: "Home",
    content: "...",
    widgets: ["y3k.near/widget/near_atlas.components.vis.total_wallets"],
  },
  {
    name: "active_accounts",
    label: "Active Accounts",
    content: "...",
    widgets: [
      "y3k.near/widget/near_atlas.components.MonthlyActiveAcounts",
      "y3k.near/widget/near_atlas.tailwind.React.Table.TopDapps",
    ],
  },
  {
    name: "economy",
    label: "Economy",
    content: "...",
    widgets: [
      "y3k.near/widget/near_atlas.vis.total_supply",
      "y3k.near/widget/near_atlas.vis.total_staked",
    ],
  },
  {
    name: "dev_world",
    label: "Dev World",
    content: "...",
    widgets: [
      "y3k.near/widget/widgets.dailyCommitStats",
      "y3k.near/widget/widgets.dailyDevStats",
      "y3k.near/widget/widgets.monthlyCommitStats",
      "y3k.near/widget/widgets.monthlyDevStats",
    ],
  },
  {
    name: "nft_world",
    label: "NFT World",
    content: "...",
    widgets: [
      "y3k.near/widget/near_atlas.components.vis.DAUbyNFTs",
      "y3k.near/widget/near_atlas.tailwind.React.Table.TopNFTs",
    ],
  },

  {
    name: "social_activities",
    label: "Social Activities",
    content: "...",
    widgets: [
      "y3k.near/widget/near_atlas.components.Vis.Social_Activity_Overtime",
      "y3k.near/widget/near_atlas.components.Table.Social_Stats_Posts",
    ],
  },
  {
    name: "resources",
    label: "Resources",
    content: "...",
    widgets: ["y3k.near/widget/near_atlas.components.resources_page"],
  },

  {
    name: "about",
    label: "About",
    content: "...",
    widgets: ["y3k.near/widget/near_atlas.components.about"],
  },
];

State.init({ activeTab: activeTab_tab || "home" });

return (
  <div className="grid grid-flow-col gap-3">
    <div className="col-span-1">
      <ul>
        {tabsData.map((tab) => {
          return (
            <li>
              <a
                className={`${
                  tab.name === state.activeTab
                    ? "flex items-center gap-2 borderS3px border-blue-500 bg-blue-50 px-4 py-3 text-blue-700 dark:bg-blue-500/20 dark:text-blue-50"
                    : "flex items-center gap-2 borderS3px border-transparent px-4 py-3 text-gray-500 hover:border-gray-100 hover:bg-gray-50 hover:text-gray-700 dark:text-gray-400 dark:hover:border-gray-700 dark:hover:bg-gray-800 dark:hover:text-gray-200"
                }`}
                key={tab.name}
                onClick={() => State.update({ activeTab: tab.name })}
              >
                {icons[tab.name]}
                <span className="text-sm font-medium"> {tab.label} </span>
              </a>
            </li>
          );
        })}
      </ul>
    </div>
    <div className="col-span-4">
      <div class="container m-auto grid">
        {tabsData
          .find((tab) => tab.name === state.activeTab)
          .widgets.map((widgetSrc) => (
            <div key={widgetSrc}>
              <Widget src={widgetSrc} props={{}} />
            </div>
          ))}
      </div>
    </div>
  </div>
);
