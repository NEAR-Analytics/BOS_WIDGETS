State.init({
  selectedTab: props.memberTab || "hackers",
});

if (props.memberTab && props.memberTab !== state.selectedTab) {
  State.update({
    selectedTab: props.memberTab,
  });
}

const accountUrl = `#/xvii.near/widget/NCR.Index?tab=people&memberTab=${state.selectedTab}`;
// const accountUrl = `#/xvii.near/widget/BOSHACKS.Members.Main?`;

const Wrapper = styled.div`
  padding-bottom: 8px;
`;

const Main = styled.div`
  display: grid;
  gap: 40px;
  grid-template-columns: 352px minmax(0, 1fr);
  align-items: start;

  @media (max-width: 1024px) {
    grid-template-columns: minmax(0, 1fr);
  }
`;

const BackgroundImage = styled.div`
  height: 240px;
  border-radius: 20px 20px 0 0;
  overflow: hidden;
  margin: 0 -12px;
  background: #eceef0;

  img {
    object-fit: cover;
    width: 100%;
    height: 100%;
  }

  @media (max-width: 1024px) {
    margin: calc(var(--body-top-padding) * -1) -12px 0;
    border-radius: 0;
  }

  @media (max-width: 1024px) {
    height: 100px;
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
  color: #11181c;
  margin: ${(p) => (p.margin ? "0 0 24px" : "0")};
  overflow-wrap: anywhere;
`;

const Tabs = styled.div`
  display: flex;
  height: 70px;
  justify-content: space-between;
  border-bottom: 1px solid #eceef0;
  margin-bottom: 72px;
  overflow: auto;
  scroll-behavior: smooth;

  @media (max-width: 1024px) {
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
  font-size: 30px;
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
    background: #59e692;
  }
`;

return (
  <Wrapper>
    <Widget src={`xvii.near/widget/BOSHACKS.Members.Header`} />

    <Content>
      <Tabs>
        <TabsButton
          href={`${accountUrl}&memberTab=hackers`}
          selected={state.selectedTab === "hackers"}
        >
          Students
        </TabsButton>

        <TabsButton
          href={`${accountUrl}&memberTab=alumni`}
          selected={state.selectedTab === "alumni"}
        >
          Alumni
        </TabsButton>

        <TabsButton
          href={`${accountUrl}&memberTab=mentors`}
          selected={state.selectedTab === "mentors"}
        >
          Mentors
        </TabsButton>
      </Tabs>

      {state.selectedTab === "hackers" && (
        <>
          <Widget src={`xvii.near/widget/BOSHacks.AddHackersToDAO`} />
        </>
      )}

      {state.selectedTab === "alumni" && (
        <>
          <Widget src={`xvii.near/widget/NCR.Alumni`} />
        </>
      )}

      {state.selectedTab === "mentors" && (
        <>
          <Widget src={`xvii.near/widget/BOSHACKS.Members.Mentors`} />
        </>
      )}
    </Content>
  </Wrapper>
);
