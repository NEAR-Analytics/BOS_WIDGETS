/**
 * put cdao passport with all sharddog links to different passport
 * put a query for gallery
 * get series
 * navbar
 * add fira code font
 * marcellus navbar
 */
const accountId = props.accountId ?? "sharddog.near";
State.init({
  selectedTab: props.tab || "main",
});

if (!accountId) {
  return "No account ID";
}

if (props.tab && props.tab !== state.selectedTab) {
  State.update({
    selectedTab: props.tab,
  });
}

const profile = props.profile ?? Social.getr(`${accountId}/profile`);
const accountUrl = `#/cplanet.near/widget/Passport.Main?accountId=${accountId}`;

const Wrapper = styled.div`
  padding-bottom: 48px;
    background-color: #FDF3DD;

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

const SidebarWrapper = styled.div`
  position: relative;
  z-index: 5;
  margin-top: -55px;

  @media (max-width: 1024px) {
    margin-top: -40px;
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
  height: 48px;
  border-bottom: 1px solid #eceef0;
  margin-bottom: 72px;
  overflow: auto;
  scroll-behavior: smooth;
  align-content: center;
  justify-content: center;
  align-items: center;

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

  height: 100%;
  font-weight: 600;
  font-size: 12px;
  padding: 0 12px;
  position: relative;
  color: ${(p) => (p.selected ? "#DE4E48" : "#687076")};
  background: none;
  border: none;
  outline: none;
  text-align: center;
    align-items: center;
  justify-content: center;
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
    background: #de4e48;
  }
`;

const Bio = styled.div`
  color: #11181c;
  font-size: 14px;
  line-height: 20px;
  margin-bottom: 48px;

  > *:last-child {
    margin-bottom: 0 !important;
  }

  @media (max-width: 900px) {
    margin-bottom: 48px;
  }
`;

if (profile === null) {
  return "Loading";
}

return (
  <Wrapper>
    <BackgroundImage>
      {profile.backgroundImage && (
        <Widget
          src="mob.near/widget/Image"
          props={{
            image:
              "https://ipfs.near.social/ipfs/bafkreih6zqcg2z7odrflt2ydcjk6ramymsdbccz53zgcc5htsnkx6yn544",
            alt: "profile background image",
            fallbackUrl:
              "https://ipfs.near.social/ipfs/bafkreih6zqcg2z7odrflt2ydcjk6ramymsdbccz53zgcc5htsnkx6yn544",
          }}
        />
      )}
    </BackgroundImage>

    <Main>
      {false && (
        <SidebarWrapper>
          <Widget
            src="near/widget/ProfilePage.Sidebar"
            props={{
              accountId,
              profile,
            }}
          />
        </SidebarWrapper>
      )}

      <Content>
        <Tabs>
          <TabsButton
            href={`${accountUrl}&tab=main`}
            selected={state.selectedTab === "main"}
          >
            Main
          </TabsButton>
          <TabsButton
            href={`${accountUrl}&tab=leaderboard`}
            selected={state.selectedTab === "leaderboard"}
          >
            Leaderboard
          </TabsButton>

          <TabsButton
            href={`${accountUrl}&tab=history`}
            selected={state.selectedTab === "history"}
          >
            History
          </TabsButton>
        </Tabs>

        {state.selectedTab === "main" && (
          <Widget src="cpassport.near/widget/Passport.Home.Main" />
        )}

        {state.selectedTab === "history" && (
          <Widget src="cpassport.near/widget/Passport.History.Main" />
        )}

        {state.selectedTab === "leaderboard" && (
          <Widget src="cpassport.near/widget/Passport.Leaderboard.Main" />
        )}
      </Content>
    </Main>
  </Wrapper>
);
