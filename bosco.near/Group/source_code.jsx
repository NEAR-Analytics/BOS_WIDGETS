const accountId = props.accountId ?? context.accountId;
const groupId = props.groupId ?? "526fb256e74eelmf0nw3n5909bc189c13d";

const creatorId = props.creatorId ?? "devs.near";

if (!accountId) {
  return "No account ID";
}

return (
  <div className="py-1 px-1">
    <div className="mx-auto">
      <Widget
        src="hack.near/widget/group.card"
        props={{ accountId, profile, link: true }}
      />

      <div className="mt-3">
        <Widget
          src="hack.near/widget/group.tabs"
          props={{ groupId, creatorId, accountId, tab: props.tab }}
        />
      </div>
    </div>
  </div>
);
