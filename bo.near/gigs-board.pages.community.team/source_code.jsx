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
const  root_members = DevHub.get_root_members() ?? null;

if (communityData === null) {
  return <div>Loading...</div>;
}

const Team = (
  <div>
    {Object.keys(root_members).map((member) =>
      widget(
        "entity.team.TeamInfo",
        { member, members_list: access_info.members_list },
        member
      )
    )}
  </div>
);

return widget("components.template.community-page", {
  handle: props.handle,
  title: "Team",
  children: Team,
});
