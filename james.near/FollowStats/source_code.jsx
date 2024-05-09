const accountId = props.accountId;

if (!accountId) {
  return "";
}

const following = Social.keys(`${accountId}/graph/follow/*`, "final", {
  return_type: "BlockHeight",
  values_only: true,
});

const followers = Social.keys(`*/graph/follow/${accountId}`, "final", {
  return_type: "BlockHeight",
  values_only: true,
});

const numFollowing = following
  ? Object.keys(following[accountId].graph.follow || {}).length
  : null;
const numFollowers = followers ? Object.keys(followers || {}).length : null;

return (
  <div style={{ backgroundColor: "#000" }} className="p-2">
    <div className="d-flex flex-row">
      <div className="me-4">
        <Link
          style={{ color: "#fff", textDecoration: "none" }}
          href={`/mob.near/widget/FollowPage?accountId=${accountId}&tab=following`}
        >
          {numFollowing !== null ? (
            <span className="fw-bolder">{numFollowing}</span>
          ) : (
            "?"
          )}
          Following
        </Link>
      </div>
      <div>
        <a
          style={{ color: "#fff", textDecoration: "none" }}
          href={`/mob.near/widget/FollowPage?accountId=${accountId}&tab=followers`}
        >
          {numFollowers !== null ? (
            <span className="fw-bolder">{numFollowers}</span>
          ) : (
            "?"
          )}
          Follower{numFollowers !== 1 && "s"}
        </a>
      </div>
    </div>
  </div>
);
