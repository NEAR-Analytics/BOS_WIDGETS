const HomeSections = ["hero", "explore", "connect", "participate", "support"];

return (
  <>
    {HomeSections.map((it) => (
      <Widget
        src={`itexpert120-contra.nera/widget/devhub.components.island.${it}`}
        props={{ ...props }}
      />
    ))}
  </>
);
