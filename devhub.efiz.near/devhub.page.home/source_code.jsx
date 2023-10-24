const HomeSections = ["hero", "explore", "connect", "contribute", "support"];

return (
  <>
    {HomeSections.map((it) => (
      <Widget
        src={`devhub.efiz.near/widget/devhub.components.island.${it}`}
        props={{ ...props }}
      />
    ))}
  </>
);
