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
};

const tabsData = [
  {
    name: "home",
    label: "Home",
    content:
      "Ut irure mollit nulla eiusmod excepteur laboris elit sit anim magna tempor excepteur labore nulla.",
  },
  {
    name: "economy",
    label: "Economy",
    content:
      "Fugiat dolor et quis in incididunt aute. Ullamco voluptate consectetur dolor officia sunt est dolor sint.",
  },
  {
    name: "dev_world",
    label: "Dev World",
    content:
      "Fugiat dolor et quis in incididunt aute. Ullamco voluptate consectetur dolor officia sunt est dolor sint.",
  },
  // {
  //   name: "dao_world",
  //   label: "DAO World",
  //   content:
  //     "Fugiat dolor et quis in incididunt aute. Ullamco voluptate consectetur dolor officia sunt est dolor sint.",
  // },
  // {
  //   name: "nft_world",
  //   label: "NFT World",
  //   content:
  //     "Fugiat dolor et quis in incididunt aute. Ullamco voluptate consectetur dolor officia sunt est dolor sint.",
  // },
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
        {/* <p>{tabsData.find((tab) => tab.name === state.activeTab).content}</p> */}

        <div
          className={`${
            tabsData.find((tab) => tab.name === state.activeTab).name === "home"
              ? ""
              : "visibility: hidden"
          }`}
        >
          <div>
            <Widget
              src="y3k.near/widget/near_atlas.components.MonthlyActiveAcounts"
              props={{}}
            />
          </div>

          <div>
            <Widget
              src="y3k.near/widget/near_atlas.tailwind.React.Table.TopDapps"
              props={{}}
            />
          </div>
        </div>

        <div
          className={`${
            tabsData.find((tab) => tab.name === state.activeTab).name ===
            "economy"
              ? ""
              : "visibility: hidden"
          }`}
        >
          <div>
            <div class="row ">
              <Widget
                src="y3k.near/widget/near_atlas.vis.total_supply"
                props={{}}
              />
            </div>

            <div class="row ">
              <Widget
                src="y3k.near/widget/near_atlas.vis.total_staked"
                props={{}}
              />
            </div>
          </div>
        </div>

        <div
          className={`${
            tabsData.find((tab) => tab.name === state.activeTab).name ===
            "dev_world"
              ? ""
              : "visibility: hidden"
          }`}
        >
          <div class="grid grid-cols-2 gap-4">
            <div>
              <Widget
                src="y3k.near/widget/widgets.dailyCommitStats"
                props={{}}
              />
            </div>
            <div>
              <Widget src="y3k.near/widget/widgets.dailyDevStats" props={{}} />
            </div>
            <div>
              <Widget
                src="y3k.near/widget/widgets.monthlyCommitStats"
                props={{}}
              />
            </div>
            <div>
              <Widget
                src="y3k.near/widget/widgets.monthlyDevStats"
                props={{}}
              />
            </div>
          </div>
        </div>

        <div
          className={`${
            tabsData.find((tab) => tab.name === state.activeTab).name ===
            "dao_world"
              ? ""
              : "visibility: hidden"
          }`}
        >
          <div className="py-4">
            <div>
              <Widget
                src="y3k.near/widget/near_atlas.components.vis.DAUbyDAO"
                props={{}}
              />
            </div>

            <div>
              <Widget
                src="y3k.near/widget/near_atlas.components.table.TopDAOs"
                props={{}}
              />
            </div>
          </div>
        </div>

        <div
          className={`${
            tabsData.find((tab) => tab.name === state.activeTab).name ===
            "nft_world"
              ? ""
              : "visibility: hidden"
          }`}
        >
          <div className="py-4">
            <div>
              <Widget
                src="y3k.near/widget/near_atlas.components.vis.DAUbyNFTs"
                props={{}}
              />
            </div>

            <div>
              <Widget
                src="y3k.near/widget/near_atlas.components.table.TopNFTs"
                props={{}}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
);
