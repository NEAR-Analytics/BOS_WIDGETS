const accountId = props.accountId ?? context.accountId;
const daoId = props.daoId ?? "libertydao.near";
const role = props.role ?? "community";

const tab = props.tab === "following" ? props.tab : "interactive-map";

State.init({
  selectedTab: tab || "interactive-map",
});

const Wrapper = styled.div`
  --section-gap: 23px;
  padding-top: 42px;

  @media (max-width: 1155px) {
    .line-rounded-corners {
      display: none !important;
    }
  }

  @media (max-width: 998px) {
    padding-top: 0;
  }
`;

const H1 = styled.h1`
  font-family: "FK Grotesk", sans-serif;
  font-style: normal;
  font-weight: 500;
  font-size: 90px;
  line-height: 1;
  text-align: center;
  letter-spacing: -0.03em;
  color: #000;
  margin: 0;
  max-width: 700px;

  span {
    display: inline-block;
    background: #96d2b7;
    border-radius: 20px;
    position: relative;
    padding: 0.1em 0.2em 0;

    svg {
      position: absolute;
      bottom: -8px;
      right: -10px;
      width: 24px;
    }
  }

  @media (max-width: 900px) {
    font-size: 50px;

    span {
      border-radius: 12px;
      svg {
        position: absolute;
        bottom: -6px;
        right: -7px;
        width: 16px;
      }
    }
  }
`;

const Text = styled.p`
  font-family: "FK Grotesk", sans-serif;
  font-size: ${(p) => p.size ?? "18px"};
  line-height: ${(p) => p.lineHeight ?? "1.5"};
  font-weight: ${(p) => p.weight ?? "400"};
  color: ${(p) => p.color ?? "#000"};
  margin: 0;
  max-width: 670px;

  @media (max-width: 768px) {
    font-size: 16px;
  }
`;

const Flex = styled.div`
  display: flex;
  gap: 8px;
  align-items: center;
  flex-direction: column;
  flex-wrap: "nowrap";

  @media (max-width: 998px) {
    flex-direction: column;
    gap: var(--section-gap);
  }
`;

const Container = styled.div`
  display: flex;
  max-width: 1080px;
  margin: 0 auto;
  gap: var(--section-gap);
  flex-direction: column;
  align-items: center;
  justify-content: center;
  text-align: center;
  padding: var(--section-gap) 24px;

  @media (max-width: 768px) {
    padding: var(--section-gap) 12px;
  }
`;

const Content = styled.div`
  .post {
    padding-left: 0;
    padding-right: 0;
  }
`;

const Title = styled.h1`
  font-weight: 600;
  font-size: ${(p) => p.size || "25px"};
  line-height: 1.2em;
  color: linear-gradient(89.97deg, #AE67FA 1.84%, #F49867 102.67%);
  margin: ${(p) => (p.margin ? "0 0 24px" : "0")};
  overflow-wrap: anywhere;
`;

const Tabs = styled.div`
  display: flex;
  height: 48px;
  border-bottom: 1px solid #eceef0;
  margin-bottom: 72px;
  overflow: auto;
  scroll-behavior: smooth;

  @media (max-width: 1000px) {
    background: #f8f9fa;
    border-top: 1px solid #eceef0;
    margin: 0 -12px 48px;

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
    background: linear-gradient(89.97deg, #AE67FA 1.84%, #F49867 102.67%);;
  }
 
`;

return (
  <Wrapper>
    <Container>
      <Flex></Flex>
    </Container>
    <Content>
      <Tabs>
        <TabsButton
          onClick={() => State.update({ selectedTab: "interactive-map" })}
          selected={state.selectedTab === "interactive-map"}
        >
          What's your Borough?
        </TabsButton>

        <TabsButton
          onClick={() => State.update({ selectedTab: "projects" })}
          selected={state.selectedTab === "projects"}
        >
          Projects
        </TabsButton>

        <TabsButton
          onClick={() => State.update({ selectedTab: "groups" })}
          selected={state.selectedTab === "groups"}
        >
          Initiatives
        </TabsButton>

        <TabsButton
          onClick={() => State.update({ selectedTab: "events" })}
          selected={state.selectedTab === "events"}
        >
          Events
        </TabsButton>
      </Tabs>

      {state.selectedTab === "interactive-map" && (
        <Widget src="humans-of-near.near/widget/humans.nearverselabs.com" />
      )}

      {state.selectedTab === "projects" && <p>TODO: Projects</p>}

      {state.selectedTab === "groups" && (
        <Widget src="hack.near/widget/NDC.WG.Page" />
      )}

      {state.selectedTab === "events" && (
        <Widget src="evrything.near/widget/Calendar" props={{ daoId }} />
      )}
    </Content>
    <br />
    <Flex>
      <Text
        size="14px"
        weight="600"
        style={{
          textTransform: "uppercase",
          letterSpacing: "0.17em",
          textAlign: "center",
        }}
      >
        Made Possible by Collaboration
      </Text>
      <Container>
        <Flex>
          <div className="mt-3">
            <Text style={{ maxWidth: "350px" }}>
              New Yorkers building a better future with our local and global
              communities.
            </Text>
          </div>
          {context.accountId && (
            <div className="m-3" style={{ maxWidth: "75%" }}>
              <Widget
                src="near/widget/AccountProfileCard"
                props={{ accountId: daoId }}
              />
            </div>
          )}
        </Flex>
      </Container>
      <Widget src="hack.near/widget/dev.Badge" />
    </Flex>
  </Wrapper>
);
