/* INCLUDE: "common.jsx" */
const nearDevGovGigsContractAccountId =
  props.nearDevGovGigsContractAccountId ||
  (context.widgetSrc ?? "devgovgigs.near").split("/", 1)[0];

const nearDevGovGigsWidgetsAccountId =
  props.nearDevGovGigsWidgetsAccountId ||
  (context.widgetSrc ?? "devgovgigs.near").split("/", 1)[0];

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
    .filter(([_key, nullable]) => (nullable ?? null) !== null)
    .map(([key, value]) => `${key}=${value}`)
    .join("&");

  return `/#/${nearDevGovGigsWidgetsAccountId}/widget/gigs-board.pages.${widgetName}${
    linkPropsQuery ? "?" : ""
  }${linkPropsQuery}`;
}
/* END_INCLUDE: "common.jsx" */
/* INCLUDE: "core/adapter/dev-hub" */
const contractAccountId =
  props.nearDevGovGigsContractAccountId ||
  (context.widgetSrc ?? "devgovgigs.near").split("/", 1)[0];

const DevHub = {
  edit_community_github: ({ handle, github }) =>
    Near.call(contractAccountId, "edit_community_github", { handle, github }) ??
    null,

  get_access_control_info: () =>
    Near.view(contractAccountId, "get_access_control_info") ?? null,

  get_all_authors: () =>
    Near.view(contractAccountId, "get_all_authors") ?? null,

  get_all_communities: () =>
    Near.view(contractAccountId, "get_all_communities") ?? null,

  get_all_labels: () => Near.view(contractAccountId, "get_all_labels") ?? null,

  get_community: ({ handle }) =>
    Near.view(contractAccountId, "get_community", { handle }) ?? null,

  get_post: ({ post_id }) =>
    Near.view(contractAccountId, "get_post", { post_id }) ?? null,

  get_posts_by_author: ({ author }) =>
    Near.view(contractAccountId, "get_posts_by_author", { author }) ?? null,

  get_posts_by_label: ({ label }) =>
    Near.view(nearDevGovGigsContractAccountId, "get_posts_by_label", {
      label,
    }) ?? null,

  get_root_members: () =>
    Near.view(contractAccountId, "get_root_members") ?? null,
};
/* END_INCLUDE: "core/adapter/dev-hub" */

if (!props.handle) {
  return (
    <div class="alert alert-danger" role="alert">
      Error: community handle not found in URL parameters
    </div>
  );
}

const communityData = DevHub.get_community({ handle: props.handle });
const root_members = DevHub.get_root_members() ?? null;

if (communityData === null || root_members === null) {
  return <div>Loading...</div>;
}

const moderators = root_members["team:moderators"].children;
const admins = communityData.admins;

console.log(admins);
console.log(moderators);

const UserList = (name, users) => {
  return (
    <div>
      {users.map((user, i) => (
        <div className={`row ${i < users.length - 1 ? "mb-3" : ""}`}>
          <div class="col-3">
            <b>{name + " #" + (i + 1)}</b>
          </div>
          <div class="col-9">
            <span
              key={user}
              className="d-inline-flex"
              style={{ fontWeight: 500 }}
            >
              <Widget
                src="neardevgov.near/widget/ProfileLine"
                props={{
                  accountId: user,
                  hideAccountId: true,
                  tooltip: true,
                }}
              />
            </span>
          </div>
        </div>
      ))}
    </div>
  );
};

const Team = (
  <div class="d-flex flex-column align-items-center gap-4 p-4">
    {widget("components.molecule.tile", {
      heading: "Community Moderators",
      children: UserList("Moderator", moderators),
    })}
    {widget("components.molecule.tile", {
      heading: "Admins",
      children: UserList("Admin", admins),
    })}
  </div>
);

return widget("components.template.community-page", {
  handle: props.handle,
  title: "Team",
  children: Team,
});
