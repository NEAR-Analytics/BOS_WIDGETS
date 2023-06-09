/* INCLUDE: "common.jsx" */
const nearDevGovGigsContractAccountId =
  props.nearDevGovGigsContractAccountId ||
  (context.widgetSrc ?? "devgovgigs.near").split("/", 1)[0];
const nearDevGovGigsWidgetsAccountId =
  props.nearDevGovGigsWidgetsAccountId ||
  (context.widgetSrc ?? "jgdev.near").split("/", 1)[0];

function widget(widgetName, widgetProps, key) {
  widgetProps = {
    ...widgetProps,
    nearDevGovGigsContractAccountId: props.nearDevGovGigsContractAccountId,
    nearDevGovGigsWidgetsAccountId: props.nearDevGovGigsWidgetsAccountId,
    referral: props.referral,
  };
  return (
    <Widget
      src={`${nearDevGovGigsWidgetsAccountId}/widget/gigs-board.${widgetName}`}
      props={widgetProps}
      key={key}
    />
  );
}

function href(widgetName, linkProps) {
  linkProps = { ...linkProps };
  if (props.nearDevGovGigsContractAccountId) {
    linkProps.nearDevGovGigsContractAccountId =
      props.nearDevGovGigsContractAccountId;
  }
  if (props.nearDevGovGigsWidgetsAccountId) {
    linkProps.nearDevGovGigsWidgetsAccountId =
      props.nearDevGovGigsWidgetsAccountId;
  }
  if (props.referral) {
    linkProps.referral = props.referral;
  }
  const linkPropsQuery = Object.entries(linkProps)
    .map(([key, value]) => `${key}=${value}`)
    .join("&");
  return `/#/${nearDevGovGigsWidgetsAccountId}/widget/gigs-board.pages.${widgetName}${
    linkPropsQuery ? "?" : ""
  }${linkPropsQuery}`;
}
/* END_INCLUDE: "common.jsx" */

/* INCLUDE: "communities.jsx" */
const communities = {
  "zero-knowledge": {
    overviewId: 397,
    eventsId: 401,
    icon: "https://ipfs.near.social/ipfs/bafkreiajwq6ep3n7veddozji2djv5vviyisabhycbweslvpwhsoyuzcwi4",
    cover:
      "https://ipfs.near.social/ipfs/bafkreihgxg5kwts2juldaeasveyuddkm6tcabmrat2aaq5u6uyljtyt7lu",
    title: "Zero Knowledge",
    desc: "Building a zero knowledge ecosystem on NEAR.",
  },
  protocol: {
    overviewId: 412,
    eventsId: 413,
    icon: "https://ipfs.near.social/ipfs/bafkreidpitdafcnhkp4uyomacypdgqvxr35jtfnbxa5s6crby7qjk2nv5a",
    cover:
      "https://ipfs.near.social/ipfs/bafkreicg4svzfz5nvllomsahndgm7u62za4sib4mmbygxzhpcl4htqwr4a",
    title: "Protocol",
    desc: "Supporting the ongoing innovation of the NEAR Protocol.",
  },
  tooling: {
    overviewId: 416,
    eventsId: 417,
    icon: "https://ipfs.near.social/ipfs/bafkreie2eaj5czmpfe6pe53kojzcspgozebdsonffwvbxtpuipnwahybvi",
    cover:
      "https://ipfs.near.social/ipfs/bafkreiehzr7z2fhoqqmkt3z667wubccbch6sqtsnvd6msodyzpnf72cszy",
    title: "Tooling",
    desc: "Supporting the ongoing innovation of tooling.",
  },
  "contract-standards": {
    overviewId: 414,
    eventsId: 415,
    icon: "https://ipfs.near.social/ipfs/bafkreiepgdnu7soc6xgbyd4adicbf3eyxiiwqawn6tguaix6aklfpir634",
    cover:
      "https://ipfs.near.social/ipfs/bafkreiaowjqxds24fwcliyriintjd4ucciprii2rdxjmxgi7f5dmzuscey",
    title: "Contract Standards",
    desc: "Coordinating the contribution to the NEAR dapp standards.",
  },
};
/* END_INCLUDE: "communities.jsx" */

/* INCLUDE: "mockcommunity.jsx" */
const SocialMediaIcons = (
  <div className="mb-2 d-flex gap-2 flex-wrap flex-column">
    <a
      className="btn btn-outline-secondary border-0 d-flex align-items-center"
      href="#/mob.near/widget/ProfilePage?accountId=self.social.near"
    >
      <i className="bi bi-person-circle"></i>
      <span className="ms-2">Person Circle</span>
    </a>
    <a
      className="btn btn-outline-secondary border-0 d-flex align-items-center"
      href="https://t.me/NearSocial"
    >
      <i className="bi bi-telegram"></i>
      <span className="ms-2">Telegram</span>
    </a>
    <a
      className="btn btn-outline-secondary border-0 d-flex align-items-center"
      href="https://github.com/NearSocial"
    >
      <i className="bi bi-github"></i>
      <span className="ms-2">GitHub</span>
    </a>
    <a
      className="btn btn-outline-secondary border-0 d-flex align-items-center"
      href="https://twitter.com/NearSocial_"
    >
      <i className="bi bi-twitter"></i>
      <span className="ms-2">Twitter</span>
    </a>
    <a
      className="btn btn-outline-secondary border-0 d-flex align-items-center"
      href="https://thewiki.near.page/near.social"
    >
      <i className="bi bi-wikipedia"></i>
      <span className="ms-2">Wikipedia</span>
    </a>
  </div>
);

const mockTeamMembers = [
  {
    id: "css_queen",
    role: "Owner",
    avatar: "https://avatars.dicebear.com/api/avataaars/css_queen.svg",
    wallet: "@css_queen.near",
  },
  {
    id: "js_joker",
    role: "Moderator",
    avatar: "https://avatars.dicebear.com/api/avataaars/js_joker.svg",
    wallet: "@js_joker.near",
  },
  {
    id: "python_princess",
    role: "Admin",
    avatar: "https://avatars.dicebear.com/api/avataaars/python_princess.svg",
    wallet: "@python_princess.near",
  },
];
/* END_INCLUDE: "mockcommunity.jsx" */

if (!props.label) {
  return (
    <div class="alert alert-danger" role="alert">
      Error: label is required
    </div>
  );
}

const label = props.label;

const discussionRequiredPosts =
  Near.view(nearDevGovGigsContractAccountId, "get_posts_by_label", {
    label,
  }) ?? [];

const community = communities[props.label];

const SearchResults = (
  <div class="row">
    <div class="col">
      {widget("components.search.Search", { query: "your-query-string" })}
    </div>
  </div>
);

const onMention = (accountId) => (
  <span key={accountId} className="d-inline-flex" style={{ fontWeight: 500 }}>
    <Widget
      src="neardevgov.near/widget/ProfileLine"
      props={{
        accountId: accountId.toLowerCase(),
        hideAccountId: true,
        tooltip: true,
      }}
    />
  </span>
);

const LabelsDisplay = (
  <div className="d-flex flex-wrap gap-2 mb-2">
    {tags.length > 0 && (
      <div>
        {tags.map((tag, i) => (
          <span
            key={i}
            className="me-1 mb-1 fw-light badge border border-secondary text-bg-light"
          >
            #{tag}
          </span>
        ))}
      </div>
    )}
    <div className="collapse public-tags">
      <Widget src="mob.near/widget/PublicTags" props={{ accountId }} />
    </div>
  </div>
);

// START OF SIDEBAR
const CommunitySummary = (
  <div>
    <Markdown text={community.desc} onMention={onMention} />
    {LabelsDisplay}
    {SocialMediaIcons}
  </div>
);

const Card = ({ title, content }) => (
  <div
    className="card"
    style={{ border: "none", boxShadow: "0 4px 8px 0 rgba(0,0,0,0.1)" }}
  >
    <div className="card-body">
      {/* <h5 className="card-title">{title}</h5> */}
      <p className="card-text">{content}</p>
    </div>
  </div>
);

const CommunityOverview = (
  <Card title={`${community.title} Overview`} content={CommunitySummary} />
);

// Define a role ranking map
const roleRanking = {
  Owner: 1,
  Admin: 2,
  Moderator: 3,
  Member: 4,
};

// Function to sort members by role
const sortMembersByRole = (a, b) => {
  return roleRanking[a.role] - roleRanking[b.role];
};

const sortedTeamMembers = mockTeamMembers.sort(sortMembersByRole);

const TeamMember = ({ member }) => (
  <div className="d-flex align-items-start mb-1 justify-content-between">
    <div className="d-flex align-items-center">
      <img
        src={member.avatar}
        alt={member.id}
        style={{ width: "50px", height: "50px", borderRadius: "50%" }}
        className="mr-3"
      />
      <div>
        <h5>{member.id}</h5>
        <p>{member.wallet}</p>
      </div>
    </div>
    <span>{member.role}</span>
  </div>
);

// Team Members List
const TeamMembersList = mockTeamMembers.map((member) => (
  <TeamMember key={member.id} member={member} />
));

// More Info Button
const MoreInfoButton = (
  <div className="row justify-content-center">
    <button
      type="button"
      class="btn btn-link"
      style={{ color: "black" }}
      href="#"
    >
      More Info
    </button>
  </div>
);

// Team Card
const TeamsCard = (
  <Card
    title={"Team Members"}
    content={
      <div>
        <h4>Group Moderators</h4>
        <br></br>
        {TeamMembersList}
        {MoreInfoButton}
      </div>
    }
  ></Card>
);

// Define the Sidebar component
const Sidebar = () => (
  <div class="col-md-4">
    {CommunityOverview}
    <br></br>
    {TeamsCard}
  </div>
);
// END OF SIDEBAR

// Update the Discussions layout to include the sidebar
const Discussions = (
  <div class="row">
    <div class="col-md-8">
      {widget("components.layout.Controls", {
        labels: discussionsRequiredLabels,
      })}
      <div className="row mb-2">
        <div className="col">
          <small className="text-muted">
            Required label:
            <a href={href("Feed", { label })} key={label}>
              <span
                className="badge text-bg-grey me-1"
                style={{
                  color: "black",
                  fontSize: "1.em",
                  boxShadow: "0px 1px 3px rgba(0, 0, 0, 0.2)",
                }}
              >
                {label}
              </span>
            </a>
          </small>
        </div>
      </div>

      <div class="row">
        <div class="col">
          {discussionRequiredPosts.map((postId) =>
            widget("components.posts.Search", { id: postId }, postId)
          )}
        </div>
      </div>
    </div>
    <Sidebar />
  </div>
);

return widget("components.community.Layout", {
  label: props.label,
  tab: "Discussions",
  children: (
    <div class="row">
      <div class="col-md-8">
        {widget("components.layout.PlusPost", {
          labels: discussionsRequiredLabels,
        })}
        <div className="row mb-2">
          <div className="col">
            <small className="text-muted">
              Required label:
              <a href={href("Feed", { label })} key={label}>
                <span
                  className="badge text-bg-grey me-1"
                  style={{
                    color: "black",
                    fontSize: "1.em",
                    boxShadow: "0px 1px 3px rgba(0, 0, 0, 0.2)",
                  }}
                >
                  {label}
                </span>
              </a>
            </small>
          </div>
        </div>

        <div class="row">
          <div class="col">
            {discussionRequiredPosts.map(
              (postId) =>
                widget(
                  "components.posts.Search",
                  { id: postId, collapsed: true },
                  postId
                ) // Here, add a property 'collapsed' with value 'true' to the Post widget.
            )}
          </div>
        </div>
      </div>
      <Sidebar />
    </div>
  ),
});
