const ownerId = "contribut3.near";
const accountId = props.accountId || context.accountId;
const isEntity = props.isEntity ?? false;
const additionalText = props.additionalText;

State.init({
  data: null,
});

Near.asyncView(
  ownerId,
  isEntity ? "get_entity" : "get_contributor",
  { account_id: accountId },
  "final",
  true
).then((data) => State.update({ data }));

const profile = Social.getr(`${accountId}/profile`);

const fullName = profile.name || state.data.name || accountId;

return (
  <div className="d-flex flex-row justify-content-start">
    <div className="m-2">
      <Widget src={`${ownerId}/widget/ProfileCircle`} props={{ accountId }} />
    </div>
    <div className="d-flex flex-column justify-content-between align-items-start w-100">
      <div className="w-100 d-flex flex-row justify-content-between align-items-start">
        <div>
          <b>{profile.name}</b>
          <span className="text-muted mx-1">@{accountId}</span>
          {additionalText ? <b>{additionalText}</b> : <></>}
        </div>
      </div>
    </div>
  </div>
);
