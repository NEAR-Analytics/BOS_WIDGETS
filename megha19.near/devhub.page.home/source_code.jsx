const HomeSections = ["hero", "explore", "connect", "participate", "support"];

return (
  <>
    {HomeSections.map((it) => (
      <Widget
        src={`megha2001.testnet/widget/devhub.components.island.${it}`}
        props={{ ...props }}
      />
    ))}
  </>
);
