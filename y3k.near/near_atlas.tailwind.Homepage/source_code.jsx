const accountId = props.debugAccountId ?? context.accountId;

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

const pills = [
  { id: "overview", title: "Overview" },
  { id: "posts", title: "Posts" },
  { id: "nfts", title: "NFTs" },
  { id: "widget", title: "Widgets" },
];

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

    <div className="bg-gray-900 px-4 py-6 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <div className="hidden sm:block">
          <nav className="flex border-b border-white/10 py-4">
            <ul
              role="list"
              className="flex min-w-full flex-none gap-x-6 px-2 text-sm font-semibold leading-6 text-gray-400"
            >
              <li>
                <button
                  className="text-indigo-400"
                  id="pills-widget-tab"
                  data-bs-toggle="pill"
                  data-bs-target="#pills-widget"
                  type="button"
                  role="tab"
                  aria-controls="pills-widget"
                  aria-selected="true"
                >
                  Widget
                </button>
              </li>
              <li>
                <button
                  className="text-gray-400"
                  id="pills-groups-tab"
                  data-bs-toggle="pill"
                  data-bs-target="#pills-groups"
                  type="button"
                  role="tab"
                  aria-controls="pills-groups"
                  aria-selected="false"
                  onClick={() => {
                    !state.loadGroups && State.update({ loadGroups: true });
                  }}
                >
                  Groups
                </button>
              </li>
              <li>
                <button
                  className="text-gray-400"
                  id="pills-comments-tab"
                  data-bs-toggle="pill"
                  data-bs-target="#pills-comments"
                  type="button"
                  role="tab"
                  aria-controls="pills-comments"
                  aria-selected="false"
                  onClick={() => {
                    !state.loadComments && State.update({ loadComments: true });
                  }}
                >
                  Comments
                </button>
              </li>
            </ul>
          </nav>
        </div>
        <div className="tab-content" id="pills-tabContent">
          <div
            className="tab-pane fade in show active"
            id="pills-widget"
            role="tabpanel"
            aria-labelledby="pills-widget-tab"
          >
            <Widget src={featuredWidget} />
          </div>
          <div
            className="tab-pane fade groups"
            id="pills-groups"
            role="tabpanel"
            aria-labelledby="pills-groups-tab"
          >
            <Widget src="gov.near/widget/FollowTabs" props={{ accountId }} />
          </div>
          <div
            className="tab-pane fade comments"
            id="pills-comments"
            role="tabpanel"
            aria-labelledby="pills-comments-tab"
          >
            <Widget src="gov.near/widget/Comments" props={{ accountId }} />
          </div>
        </div>
      </div>
    </div>
  </div>
);
