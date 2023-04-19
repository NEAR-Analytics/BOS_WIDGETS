const ownerId = "contribut3.near";
const onSave = props.onSave ?? (() => { });

State.init({
  following: [],
  followingIsFetched: false,
  value: [],
  accountsWithPermissions: [],
  accountsWithPermissionsIsFetched: false,
})

if (!state.followingIsFetched) {
  Near.asyncView(
    "social.near",
    "get",
    { keys: [`${context.accountId}/graph/follow/*`] },
    "final",
    false,
  ).then((data) => State.update({
    following: Object.keys(data[context.accountId].graph.follow).map((name) => ({ name })),
    followingIsFetched: true,
  }));
}

if (!state.accountsWithPermissionsIsFetched) {
  Near.asyncView(
    "social.near",
    "debug_get_permissions",
    { account_id: context.accountId },
    "final",
    false,
  ).then((data) => State.update({
    accountsWithPermissions: data.map(([info]) => info).filter((info) => "AccountId" in info).map(({ AccountId }) => AccountId),
    accountsWithPermissionsIsFetched: true,
  }));
}

console.log(state.accountsWithPermissions);

if (!state.followingIsFetched || !state.accountsWithPermissionsIsFetched) {
  return <>Loading...</>;
}

const Accounts = styled.ul`
  font-style: normal;
  font-weight: 600;
  font-size: 1.125em;
  line-height: 1em;
  color: #344054;
`;

const Existing = styled.div`
  h3 {
    font-style: normal;
    font-weight: 600;
    font-size: 1.5em;
    line-height: 1.5em;
    color: #344054;
  }
`;

return (
  <>
    <Widget
      src={`${ownerId}/widget/Inputs.MultiSelect`}
      props={{
        label: "Accounts to add permissions to",
        placeholder: "Add accounts",
        options: state.following,
        value: state.value,
        onChange: (value) => State.update({ value }),
      }}
    />
    <Existing>
      <h3>Existing permissions</h3>
      <Accounts>
        {state.accountsWithPermissions.map((accountId) => (<li key={accountId}>{accountId}</li>))}
      </Accounts>
    </Existing>
  </>);
