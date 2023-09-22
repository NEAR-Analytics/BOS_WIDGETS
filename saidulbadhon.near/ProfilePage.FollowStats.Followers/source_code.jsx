const accountId = props.accountId;

if (!accountId) {
  return "";
}

const followers = Social.keys(`*/graph/follow/${accountId}`, "final", {
  return_type: "BlockHeight",
  values_only: true,
});

const numFollowers = followers ? Object.keys(followers || {}).length : null;

return numFollowers !== null ? <span>{numFollowers}</span> : "";
