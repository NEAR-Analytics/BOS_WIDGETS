let accountId = props.accountId || "mike.near";
let profile = socialGetr(`${accountId}/profile`);

return (
  <div>
    <img src={profile.image.url} />
    <span>{profile.name}</span> <span>(@{accountId})</span>
  </div>
);
