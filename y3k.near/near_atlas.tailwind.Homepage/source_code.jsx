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

    <ul
      className="flex flex-1 flex-col block w-full rounded-md border-gray-300 py-2 pl-3 pr-10 text-base focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
      id="pills-tab"
      role="tablist"
      aria-label="Sidebar"
    >
      {pills.map(({ id, title }, i) => (
        <li className="nav-item" role="presentation" key={i}>
          <button
            className={`nav-link ${i === 0 ? "active" : ""}`}
            id={`pills-${id}-tab`}
            data-bs-toggle="pill"
            data-bs-target={`#pills-${id}`}
            type="button"
            role="tab"
            aria-controls={`pills-${id}`}
            aria-selected={i === 0}
            onClick={() => {
              const key = `load${id}`;
              !state[key] && State.update({ [key]: true });
            }}
          >
            {title}
          </button>
        </li>
      ))}
    </ul>

    <div class="-mb-px flex space-x-8" aria-label="Tabs">
      <div
        className="tab-pane fade "
        id="pills-posts"
        role="tabpanel"
        aria-labelledby="pills-posts-tab"
      >
        <div className="col-lg-8 mx-auto">
          {description && (
            <div className="border rounded-4 p-3 pb-0 mb-3">
              <h4>
                <i class="bi bi-pin-angle" /> Bio
              </h4>
              <Markdown text={description} />
            </div>
          )}
          <Widget
            src="mob.near/widget/MainPage.Feed"
            props={{ accounts: [accountId] }}
          />
        </div>
      </div>
      <div
        className="tab-pane fade show active"
        id="pills-overview"
        role="tabpanel"
        aria-labelledby="pills-overview-tab"
      >
        <div>
          <Widget
            src="y3k.near/widget/Profile.RightSection"
            props={{ accountId, profile, theme }}
          />
        </div>
      </div>
      <div
        className="tab-pane fade"
        id="pills-nfts"
        role="tabpanel"
        aria-labelledby="pills-nfts-tab"
      >
        {state.loadnfts && (
          <Widget src="mob.near/widget/YourNFTs" props={{ accountId }} />
        )}
      </div>
      <div
        className="tab-pane fade widget"
        id="pills-widget"
        role="tabpanel"
        aria-labelledby="pills-widget-tab"
      >
        {state.loadwidget && (
          <Widget src="mob.near/widget/LastWidgets" props={{ accountId }} />
        )}
      </div>
    </div>
  </div>
);
