const renderItem = (a) => {
  return (
    <a
      href={`#/${a.accountId}/widget/${a.widgetName}`}
      className="text-decoration-none"
      key={JSON.stringify(a)}
    >
      <Widget
        src="mob.near/widget/WidgetImage"
        props={{
          tooltip: true,
          accountId: a.accountId,
          widgetName: a.widgetName,
        }}
      />
    </a>
  );
};

const renderUserImage = (userId) => {
  return (
    <a
      href={`https://near.org/near/widget/ProfilePage?accountId=${userId}&tab=overview`}
    >
      <Widget
        src="mob.near/widget/ProfileImage"
        props={{
          accountId: userId,
        }}
      />
    </a>
  );
};

const specificComponents = [
  "achildhoodhero.near/widget/nearweek.editorial.bos",
  "nearweekapp.near/widget/Heroes",
  "nearhorizon.near/widget/Index",
  "achildhoodhero.near/widget/swap.near",
  "wormhole3.near/widget/Wormhole3.Twitter",
  "achildhoodhero.near/widget/stader.stake.bos",
  "achildhoodhero.near/widget/lido.stake.bos",
].map((key) => {
  const parts = key.split("/");
  return {
    accountId: parts[0],
    widgetName: parts[2],
  };
});

const users = [
  "near",
  "nearweek.near",
  "pagodaplatform.near",
  "proximity_social.near",
  "calimero.near",
  "devgovgigs.near",
  "sharddog.near",
  "minorityprogrammers.near",
  "achildhoodhero.near",
  "root.near",
  "marieke.near",
];

if (JSON.stringify(specificComponents) !== JSON.stringify(state.data || {})) {
  State.update({
    data: specificComponents,
    allItems: specificComponents,
  });
}

return (
  <div className="d-flex flex-wrap gap-1 my-3">
    <h2
      style={{
        fontSize: "19px",
        fontWeight: "700",
        lineHeight: "22px",
        color: "#11181C",
        letterSpacing: "-0.02em",
        margin: "0",
        marginBottom: "10px",
      }}
    >
      Certified Apps & Users
    </h2>
    <div>{state.allItems.map(renderItem)}</div>
    <div className="d-flex flex-wrap gap-1 my-3">
      {users.map(renderUserImage)}
    </div>
  </div>
);
