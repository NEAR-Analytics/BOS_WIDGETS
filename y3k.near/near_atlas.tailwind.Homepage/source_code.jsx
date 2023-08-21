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
  {
    name: "dao_world",
    label: "DAO World",
    content:
      "Fugiat dolor et quis in incididunt aute. Ullamco voluptate consectetur dolor officia sunt est dolor sint.",
  },
];

State.init({ activeTab: activeTab_tab || "home" });

return (
  <div>
    <div>
      {accountId && !name && (
        <div classNameName="alert alert-warning rounded-4 mb-3">
          <p>Your profile is missing a name.</p>
          {editProfileButton}
        </div>
      )}

      {accountId &&
        !image.ipfs_cid &&
        (!image.nft.contractId || !image.nft.tokenId) &&
        !image.url && (
          <div classNameName="alert alert-warning rounded-4 mb-3">
            <p>Your profile is missing a picture.</p>
            {editProfileButton}
          </div>
        )}
    </div>

    <div>
      <div className="text-white flex space-x-3 border-b">
        {tabsData.map((tab) => {
          return (
            <button
              key={tab.name}
              className={`text-gray-50 py-2 border-b-4 transition-colors duration-300 ${
                tab.name === state.activeTab
                  ? "border-teal-500"
                  : "border-transparent hover:border-gray-200"
              }`}
              onClick={() => State.update({ activeTab: tab.name })}
            >
              {tab.label}
            </button>
          );
        })}
      </div>

      <div className="py-4">
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
      </div>
    </div>
  </div>
);
