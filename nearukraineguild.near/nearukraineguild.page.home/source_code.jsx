const HomeSections = ["hero", "explore", "connect", "participate", "support"];

return (
  <>
    {HomeSections.map((it) => (
      <Widget
        src={`nearukraineguild.near/widget/nearukraineguild.components.island.${it}`}
        props={{ ...props }}
      />
    ))}
  </>
);
