const ownerId = "contribut3.near";
const accountId = props.accountId;

return (
  <Widget
    src={`${ownerId}/widget/SideWindow`}
    props={{
      title: (
        <>
          Request contribution{" "}
          <Widget
            src="contribut3.near/widget/Tooltip"
            props={{
              content:
                "Here you can invite contributors to join any of your project's existing contribution requests.",
            }}
          />
        </>
      ),
      description: (
        <Widget
          src={`${ownerId}/widget/SelectedLine`}
          props={{ accountId, label: "Vendor", isProject: false }}
        />
      ),
      trigger: <>Invite vendor</>,
      children: (
        <Widget
          src={`${ownerId}/widget/Vendor.InviteForm`}
          props={{ accountId }}
        />
      ),
      minWidth: "600px",
    }}
  />
);
