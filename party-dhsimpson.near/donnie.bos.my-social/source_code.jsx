const account_id = context.accountId ?? props.accountId;

const profileData = props.profile ?? Social.getr(`idknwhoru.near/profile`);
const fast = !props.profile;

if (profileData === null) {
  return "Loading";
}
const componentData = Social.getr(`${account_id}/widget`);
const postData = Social.getr(`${account_id}/post`);


return (
  <div>
    {JSON.stringify(profileData)}
    <br />
    <br />
    {JSON.stringify(Object.keys(componentData))}
    <br />
    <br />
    {JSON.stringify(postData)}
  </div>
);
