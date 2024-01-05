const HomeSections = ["hero", "explore", "connect", "participate", "support"];

return (
  <>
    {HomeSections.map((it) => (
      <Widget
        src={`megha19.near/widget/devhub.components.island.${it}`}
        props={{ ...props }}
      />
    ))}
  </>
);
