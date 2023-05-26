const accountId = context.accountId;

const limit = props.limit || 24;
State.init({
  accountsOnPath: [],
  activeTab: "info",
  peopleSelected: [],
  badgeSelected: "",
  badgeInfo: {
    key: "",
    name: "",
    description: "",
    image: {},
  },
});

const onBadgeClick = (badge) => {
  State.update({
    badgeSelected: badge,
    holdersProfiles: [],
    holdersAccounts: [],
    noBadgepeople: [],
    pathQueryPeople: [],
  });
  let holdersAccounts = Object.keys(badge.holder).filter(
    (account) => account !== ""
  );

  let holdersProfiles = [];
  for (let i = 0; i < holdersAccounts.length; ++i) {
    const accountId = holdersAccounts[i];
    holdersProfiles.push(
      <a
        href={`#/mob.near/widget/ProfilePage?accountId=${accountId}`}
        className="text-decoration-none"
        key={`${i}`}
      >
        <Widget
          src="mob.near/widget/ProfileImage"
          props={{
            accountId,
            tooltip: true,
            className: "d-inline-block overflow-hidden",
          }}
        />
      </a>
    );
  }
  State.update({ holdersProfiles, holdersAccounts });
};

const badgedIssuedByAccountQuery = Social.getr(`${accountId}/badge/*`, "final");
if (!badgedIssuedByAccountQuery) return "Loading...";

if (badgedIssuedByAccountQuery) {
  const allBadgesIssued = Object.entries(badgedIssuedByAccountQuery);
  const initBadge = allBadges[0];
  if (!state.badgeSelected)
    State.update({
      badgeSelected: { key: initBadge[0], info: { ...initBadge[1].info } },
    });
  State.update({ allBadgesIssued });
}

const predefinedQueries = [
  { name: "Widget Builders", query: "*/widget/*" },
  { name: "Feature Builders", query: "*/widget/*/metadata/tags/app" },
];

const BadgeImg = styled.img`
  objectFit: "cover";
  objectPosition: "center";
  height: ${size};
  width: ${size};
`;

const onProfileClick = (accountId) => {
  if (state.peopleSelected.includes(accountId)) {
    // remove account
    State.update({
      peopleSelected: [...state.peopleSelected.filter((i) => i !== accountId)],
    });
  } else {
    // add account
    State.update({ peopleSelected: [...state.peopleSelected, accountId] });
  }
};

const renderMintButton = (badgeData, buttonText, holders) => (
  <CommitButton
    data={{
      badge: {
        [badgeData.key]: {
          info: badgeData.info,
          holder: {
            [holders]: "",
          },
        },
      },
    }}
  >
    {buttonText}
    <span class="badge badge-info">{holders.length}</span>
  </CommitButton>
);

const renderCreateNewBadgeForm = () => (
  <>
    <div class="form-group row">
      <label for="name" class="col-sm-2 col-form-label">
        Key (unique)
      </label>
      <div class="col-sm-10">
        <input
          type="text"
          className={`form-control`}
          id="name"
          value={state.badgeInfo.key}
        />
      </div>
    </div>
    <div class="form-group row">
      <label for="name" class="col-sm-2 col-form-label">
        Name
      </label>
      <div class="col-sm-10">
        <input
          type="text"
          className={`form-control`}
          id="name"
          value={state.badgeInfo.name}
        />
      </div>
    </div>
    <div class="form-group row">
      <label for="description" class="col-sm-2 col-form-label">
        Description
      </label>
      <div class="col-sm-10">
        <input
          type="text"
          className={`form-control`}
          id="name"
          value={state.badgeInfo.description}
        />
      </div>
    </div>
    <div class="form-group row">
      <label for="description" class="col-sm-2 col-form-label">
        Image
      </label>

      <div class="col-sm-10">
        <IpfsImageUpload image={state.badgeInfo.image} />
      </div>

      <div class="ratio ratio-1x1 overflow-hidden" style={{ width: "8rem" }}>
        {state.badgeInfo.image.cid && (
          <img
            src={`https://ipfs.near.social/ipfs/${state.badgeInfo.image.cid}`}
            alt="badge"
          />
        )}
      </div>
    </div>
    {renderMintButton(
      {
        key: state.badgeInfo.key.replace(/ /g, ""),
        info: {
          name: state.badgeInfo.name,
          description: state.badgeInfo.description,
          image: {
            url: `https://ipfs.near.social/ipfs/${state.badgeInfo.image.cid}`,
          },
        },
      },
      "Create new Badge",
      []
    )}
  </>
);
const renderBadgeDetails = () => (
  <>
    <div class="form-group row">
      <label for="name" class="col-sm-2 col-form-label">
        Key (unique)
      </label>
      <div class="col-sm-10">
        <p class="form-control-plaintext">{state.badgeSelected.key}</p>
      </div>
    </div>
    <div class="form-group row">
      <label for="name" class="col-sm-2 col-form-label">
        Name
      </label>
      <div class="col-sm-10">
        <p class="form-control-plaintext">{state.badgeSelected.info.name}</p>
      </div>
    </div>
    <div class="form-group row">
      <label for="description" class="col-sm-2 col-form-label">
        Description
      </label>
      <div class="col-sm-10">
        <p class="form-control-plaintext">
          {state.badgeSelected.info.description}
        </p>
      </div>
    </div>
    <div class="form-group row">
      <label for="description" class="col-sm-2 col-form-label">
        Image
      </label>
      <div class="ratio ratio-1x1 overflow-hidden" style={{ width: "8rem" }}>
        <BadgeImg
          src={state.badgeSelected.info.image.url}
          alt="badge"
          title={state.badgeSelected.info.description}
        />
      </div>
    </div>
  </>
);

const renderNavItemButton = (tabId, tabText, disabled) => (
  <button
    className={`${disabled ? "disabled" : ""}  nav-link ${
      state.activeTab == tabId ? "active" : ""
    }`}
    id={tabId}
    data-mdb-toggle="tab"
    role="tab"
    aria-controls={tabId}
    aria-selected="true"
    onClick={() => {
      State.update({ activeTab: tabId });
    }}
  >
    {tabText}
  </button>
);

const onUpdateSearchResult = (accountsOnPath) => {
  let pathQueryPeople = [];
  let noBadgepeople = [];
  for (let i = 0; i < accountsOnPath.length; ++i) {
    const accountId = accountsOnPath[i];
    const isSelected = state.peopleSelected.includes(accountId);
    const hasBadge = state.holdersAccounts.includes(accountId);
    if (!hasBadge) noBadgepeople.push(accountId);

    pathQueryPeople.push(
      <button
        className={`btn ${
          isSelected ? "btn-outline-primary" : "text-decoration-none"
        }`}
        key={`people_on_path_${i}`}
        onClick={() => {
          !hasBadge && onProfileClick(accountId);
        }}
      >
        <Widget
          src="mob.near/widget/ProfileImage"
          props={{
            accountId,
            tooltip: true,
            className: "d-inline-block overflow-hidden",
          }}
        />
        {hasBadge && (
          <span class="position-absolute top-10 start-90 translate-middle p-2 bg-secondary border border-light rounded-circle">
            <span class="visually-hidden">Account with badge</span>
          </span>
        )}
      </button>
    );
  }
  State.update({ accountsOnPath, pathQueryPeople, noBadgepeople });
};

return (
  <div>
    <div class="d-flex flex-row">
      {Object.entries(badgedIssuedByAccountQuery).map(([key, value]) => (
        <>
          <button
            className={`btn ${
              state.badgeSelected.key == key
                ? "btn-outline-primary"
                : "text-decoration-none"
            }`}
            key={`badge_${key}`}
            onClick={() => {
              onBadgeClick({ key: key, ...value });
            }}
          >
            <Widget
              src="manzanal.near/widget/Badge"
              props={{
                badge_name: key,
                size: "8rem",
                full_card: false,
              }}
            />
          </button>
        </>
      ))}
    </div>

    <ul class="nav nav-tabs my-3" id="ex1" role="tablist">
      <li class="nav-item" role="presentation">
        {renderNavItemButton("info", "Info")}
      </li>
      <li class="nav-item" role="presentation">
        {renderNavItemButton("owners", "Owners")}
      </li>
      <li class="nav-item" role="presentation">
        {renderNavItemButton("add_owners", "Add new owners")}
      </li>
      <li class="nav-item" role="presentation">
        {renderNavItemButton("create", "Create new badge")}
      </li>
    </ul>

    <div class="tab-content" id="add_owners">
      <div
        className={`tab-pane fade ${
          state.activeTab == "info" ? "show active" : ""
        }`}
        id="info"
        role="tabpanel"
        aria-labelledby="info"
      >
        {renderBadgeDetails()}
      </div>
      <div
        className={`tab-pane fade ${
          state.activeTab == "owners" ? "show active" : ""
        }`}
        id="owners"
        role="tabpanel"
        aria-labelledby="owners"
      >
        <div>
          <div class="d-flex flex-wrap gap-1">{state.holdersProfiles}</div>
          <div>Total {state.holdersProfiles.length} profiles</div>
        </div>
      </div>

      <div
        className={`tab-pane fade ${
          state.activeTab == "add_owners" ? "show active" : ""
        }`}
        id="add_owners"
        role="tabpanel"
        aria-labelledby="add_owners"
      >
        <div>
          <Widget
            src="manzanal.near/widget/PeopleExplorer"
            props={{
              onUpdateSearchResult,
              predefinedQueries,
              debug: false,
            }}
          />
          <div>
            <div class="d-flex flex-wrap gap-1">{state.pathQueryPeople}</div>
            <div>Total {state.pathQueryPeople.length} profiles</div>

            {renderMintButton(
              state.badgeSelected,
              "Mint badge to all accounts",
              state.noBadgepeople
            )}
            {renderMintButton(
              state.badgeSelected,
              "Mint badge to selected accounts",
              state.peopleSelected
            )}
          </div>
        </div>
      </div>
    </div>
    <div
      className={`tab-pane fade ${
        state.activeTab == "create" ? "show active" : ""
      }`}
      id="create"
      role="tabpanel"
      aria-labelledby="create"
    >
      {renderCreateNewBadgeForm()}
    </div>
  </div>
);
