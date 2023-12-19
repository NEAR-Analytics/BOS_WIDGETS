const Struct = VM.require("megha19.near/widget/core.lib.struct");
const { href } = VM.require("megha19.near/widget/core.lib.url");

if (!Struct) {
  return <p>Loading modules...</p>;
}

href || (href = () => {});

const { data, handle, permissions } = props;

if (!data) {
  return <div>Loading...</div>;
}

return (
  <Widget
    src={`megha19.near/widget/devhub.entity.addon.${data.metadata.type}`}
    props={{
      ...data,
      isSynced: true,
      permissions,
    }}
  />
);
