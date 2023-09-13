const ownerId = "contribut3.near";

return (
  <Widget
    src={`${ownerId}/widget/Project.People`}
    props={{
      accountId: context.accountId,
      isAdmin: true,
    }}
  />
);
