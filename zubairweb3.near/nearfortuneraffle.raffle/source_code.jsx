const profile = Social.get("zubairweb3.near/profile/*");

const account_id = context.accountId;

const widget = Social.get(`${account_id}/widget/*`);

if (profile === null || widget === null) return "Loading....";

return (
  <div>
    <p>{JSON.stringify(profile)}</p>
    <p>{JSON.stringify(widget)}</p>
  </div>
);
