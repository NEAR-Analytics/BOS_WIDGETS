const ownerId = "contribut3.near";
const accountId = props.accountId;

return (
  <Widget
    src={`${ownerId}/widget/Application.Details`}
    props={{
      accountId,
      onSave: (profile) => Social.set({ profile }),
      ...props,
    }}
  />
);
