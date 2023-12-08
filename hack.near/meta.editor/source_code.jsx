const accountId = context.accountId;
const path = props.path || "mob.near/widget/Explorer";
const [creatorId, namespace, thingId] = path.split("/");

const tags = Social.getr(`*/graph/context/${path}/tags/**`, "final");

return (
  <div className="m-2">
    <div className="mb-2 card">
      <div className="card-body">
        <div className="text-truncate mb-3">
          <Widget
            src="hack.near/widget/thing.block"
            props={{ creatorId, namespace, thingId }}
          />
        </div>
        <Widget
          src="hack.near/widget/tags"
          props={{
            path,
          }}
        />
      </div>
    </div>
  </div>
);
