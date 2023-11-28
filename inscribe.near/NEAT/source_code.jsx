import(["constants", "MainStyle", "HeaderContainer", "Logo", "Tab"]);

State.init({
  tab: "Mint", // Mint / Indexer
});

const { tab } = state;
return (
  <Main>
    <HeaderContainer>
      <Logo
        src={`${ipfsPrefix}/bafkreic65adpnynb7dthyyfjkfxgteij3qq45dmtfcp3knlroyo4nyj4qq`}
        alt="Logo"
      />
      <TabContainer>
        <TabItem
          selected={tab === "Mint"}
          onClick={() => State.update({ tab: "Mint" })}
        >
          Mint
        </TabItem>
        <TabItem
          style={{ cursor: "not-allowed" }}
          // selected={tab === "Indexer"}
          // onClick={() => State.update({ tab: "Indexer" })}
        >
          Indexer
        </TabItem>
      </TabContainer>
      <Spacer />
    </HeaderContainer>
    <BodyContainer>
      {tab === "Mint" && <Widget src={`${config.ownerId}/widget/NEAT.Mint`} />}
      {/* {tab === "Indexer" && (
        <Widget src={`${config.ownerId}/widget/NEAT.Indexer`} />
      )} */}
    </BodyContainer>
  </Main>
);
