const ownerId = "contribut3.near";
const accountId = props.accountId;


return (
  <Widget
    src={`${ownerId}/widget/Vendor.Details`}
    props={{
      accountId,
      onSave: (profile) => {
        console.log(accountId)
        Near.call({
          contractName: "social.near",
          methodName: "edit_project",
          args: { data: { [accountId]: { profile } } },
        });
      },
      isAdmin: props.isAdmin,
    }}
  />
);
