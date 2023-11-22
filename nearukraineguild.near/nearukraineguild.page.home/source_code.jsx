const HomeSections = ["hero", "explore", "connect", "participate", "support"];

return (
  <>
    {HomeSections.map((it) => (
      <Widget
        src={`devgovgigs.near/widget/nearukraineguild.components.island.${it}`}
        props={{ ...props }}
      />
    ))}
  </>
);
