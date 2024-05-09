const HomeSections = ["hero", "explore", "connect", "participate", "support"];

return (
  <>
    {HomeSections.map((it) => (
      <Widget
        src={`devgovgigs.petersalomonsen.near/widget/devhub.components.island.${it}`}
        props={{ ...props }}
      />
    ))}
  </>
);
