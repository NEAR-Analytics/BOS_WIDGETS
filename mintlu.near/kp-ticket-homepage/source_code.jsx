State.init({
  selectedTab: props.tab || "my-ticket-drops",
});
const accountId = context.accountId;

const tabSelect = (newTab) => {
  return () => {
    State.update({
      selectedTab: newTab,
    });
  };
};

const Wrapper = styled.div`
  padding-bottom: 48px;
`;

const Tabs = styled.div`
  display: flex;
  height: 48px;
  border-bottom: 1px solid #eceef0;
  margin-bottom: 28px;
  overflow: auto;
  scroll-behavior: smooth;

  @media (max-width: 12000px) {
    background: #f8f9fa;
    border-top: 1px solid #eceef0;
    margin: 0 -12px 26px;

    > * {
      flex: 1;
    }
  }
`;

const TabsButton = styled.a`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  height: 100%;
  font-weight: 600;
  font-size: 12px;
  padding: 0 12px;
  position: relative;
  color: ${(p) => (p.selected ? "#11181C" : "#687076")};
  background: none;
  border: none;
  outline: none;
  text-align: center;
  text-decoration: none !important;

  &:hover {
    color: #11181c;
  }

  &::after {
    content: "";
    display: ${(p) => (p.selected ? "block" : "none")};
    position: absolute;
    bottom: 0;
    left: 0;
    right: 0;
    height: 3px;
    background: #ecc2ff;
  }
`;

if (accountId) {
  return (
    <div style={{ width: "100%" }}>
      <Tabs>
        <img src="https://docs.keypom.xyz/assets/images/moon-0419b9f2d04fe18957b0e0fc1942e89a.svg" />
        <TabsButton
          onClick={tabSelect("my-ticket-drops")}
          href={`#/mintlu.near/widget/kp-ticket-homepage?tab=my-ticket-drops`}
          selected={state.selectedTab === "my-ticket-drops"}
        >
          My Drops
        </TabsButton>

        <TabsButton
          onClick={tabSelect("create-ticket-drop")}
          href={`#/mintlu.near/widget/kp-ticket-homepage?tab=create-ticket-drop`}
          selected={state.selectedTab === "create-ticket-drop"}
        >
          Create Ticket Drop
        </TabsButton>

        <TabsButton
          onClick={tabSelect("about")}
          href={`#/mintlu.near/widget/kp-ticket-homepage?tab=about`}
          selected={state.selectedTab === "about"}
        >
          About
        </TabsButton>
        <Web3Connect />
      </Tabs>

      {state.selectedTab === "my-ticket-drops" && (
        <Widget src="mintlu.near/widget/drop-info" />
      )}

      {state.selectedTab === "create-ticket-drop" && (
        <Widget src="mintlu.near/widget/kp-ticket-creator" />
      )}

      {state.selectedTab === "about" && (
        <Widget src="mintlu.near/widget/kp-ticket-about" />
      )}
    </div>
  );
} else {
  return (
    <div style={{ width: "100%" }}>
      <Tabs>
        <img src="https://docs.keypom.xyz/assets/images/moon-0419b9f2d04fe18957b0e0fc1942e89a.svg" />
        <TabsButton
          onClick={tabSelect("my-ticket-drops")}
          href={`#/mintlu.near/widget/kp-ticket-homepage?tab=my-ticket-drops`}
          selected={state.selectedTab === "my-ticket-drops"}
        >
          My Drops
        </TabsButton>

        <TabsButton
          onClick={tabSelect("create-ticket-drop")}
          href={`#/mintlu.near/widget/kp-ticket-homepage?tab=create-ticket-drop`}
          selected={state.selectedTab === "create-ticket-drop"}
        >
          Create Ticket Drop
        </TabsButton>

        <TabsButton
          onClick={tabSelect("about")}
          href={`#/mintlu.near/widget/kp-ticket-homepage?tab=about`}
          selected={state.selectedTab === "about"}
        >
          About
        </TabsButton>
        <Web3Connect />
      </Tabs>
      <div style={{ textAlign: "center" }}>
        Sign in with NEAR Wallet or Create a one with{" "}
        <a href="https://shard.dog/go">ShardDog!</a>
      </div>
    </div>
  );
}
