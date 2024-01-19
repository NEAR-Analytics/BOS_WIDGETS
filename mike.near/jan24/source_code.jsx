let accountId = props.accountId || "mike";
let profile = socialGetr(`${accountId}/profile`);

<div>
  <img src={profile.image.url} />
  <span>{profile.name}</span> <span>(@{accountId})</span>
</div>;
