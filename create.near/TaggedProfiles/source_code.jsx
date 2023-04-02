const accountId = props.accountId;
const tag = props.tag;

let keys = `${accountId ?? "*"}/profile/*`;

console.log(keys);

if (tag) {
  const taggedProfiles = Social.keys(
    `${accountId}/profile/tags/${tag}`,
    "final"
  );

  if (taggedProfiles === null) {
    return "Loading Tags";
  }

  keys = Object.entries(taggedProfiles)
    .map((kv) =>
      Object.keys(kv[1].profile.tags).map((t) => `${kv[0]}/profile/tags/${t}`)
    )
    .flat();

  if (!keys.length) {
    return `No profiles found with tag #${tag}`;
  }
}

const data = Social.keys(keys, "final", {
  return_type: "BlockHeight",
});

if (data === null) {
  return "Loading profiles...";
}

console.log(data);

const processData = (data) => {
  const accounts = Object.entries(data);

  const allItems = accounts
    .map((account) => {
      const accountId = account[0];
      return Object.entries(account[1].profile).map((kv) => ({
        accountId,
        communityTag: kv[0],
        blockHeight: kv[1],
      }));
    })
    .flat();

  allItems.sort((a, b) => b.blockHeight - a.blockHeight);
  return allItems;
};

const renderTag = (tag, tagBadge) => (
  <a href={makeLink(accountId, tag)}>{tagBadge}</a>
);

const renderItem = (a) => {
  return (
    <a
      href={`#/mob.near/widget/ProfilePage?accountId=${a.accountId}`}
      className="text-decoration-none"
      key={JSON.stringify(a)}
    >
      <Widget
        src="mob.near/widget/ProfileImage"
        props={{
          tooltip: true,
          accountId: a.accountId,
          communityTag: a.communityTag,
        }}
      />
    </a>
  );
};

if (JSON.stringify(data) !== JSON.stringify(state.data || {})) {
  State.update({
    data,
    allItems: processData(data),
  });
}

return (
  <div className="d-flex flex-wrap gap-1 my-3">
    {state.allItems
      .slice(0, props.limit ? parseInt(props.limit) : 999)
      .map(renderItem)}
  </div>
);
