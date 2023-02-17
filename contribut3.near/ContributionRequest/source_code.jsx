const ownerId = "contribut3.near";
const accountId = context.accountId;
const entityId = props.entityId;
const contributorId = props.contributorId;

State.init({
  description: "",
  startDate: "",
});

if (!entityId || !contributorId) {
  return "Cannot show contribution request without entityId or contributorId!";
}

const contributor = Near.view(
  ownerId,
  "get_contribution",
  { entity_id: entityId, contributor_id: accountId },
  "final"
);

const isAuthorized = !!contributor && contributor.permissions.includes("Admin");

const contributionRequest = props.isPreview
  ? props.contributionRequest
  : Near.view(ownerId, "get_contribution_request", {
    entity_id: entityId,
    contributor_id: contributorId,
  });

if (!contributionRequest) {
  return props.isPreview
    ? "You must provide contribution request object in preview mode!"
    : "Loading...";
}

const description = isPreview
  ? props.contributionRequest.description
  : contributionRequest.description;

const descriptionArea = <Markdown text={description} />;

const contributorProfile = Social.getr(`${contributorId}/profile`);
const imageUrl =
  (contributorProfile.image.ipfs_cid
    ? `https://ipfs.near.social/ipfs/${contributorProfile.image.ipfs_cid}`
    : contributorProfile.image.url) ||
  "https://thewiki.io/static/media/sasha_anon.6ba19561.png";

const contributorCircle = (
  <div
    className="profile-circle d-inline-block"
    title={`${contributorProfile.name} @${contributorId}`}
    style={{ width: "1.5em", height: "1.5em" }}
  >
    <img
      className="rounded-circle w-100 h-100"
      style={{ objectFit: "cover" }}
      src={`https://i.near.social/thumbnail/${imageUrl}`}
      alt="profile image"
    />
  </div>
);

const header = (
  <div className="d-flex flex-row justify-content-start align-items-center my-1">
    {contriubutorCircle}
    <span className="mx-1">{contributorProfile.name}</span>
    <span className="text-muted">@{founder}</span>
  </div>
);

return (
  <div className="card">
    {header}
    {body}
    {footer}
  </div>
);
