State.init({
  selectedTab: props.tab || "overview",
});

const accountId = props.accountId ?? context.accountId;
if (!accountId) {
  return "No account ID";
}

if (props.tab && props.tab !== state.selectedTab) {
  State.update({
    selectedTab: props.tab,
  });
}

const profile = props.profile ?? Social.getr(`${accountId}/profile`);
const accountUrl = `/#/adminalpha.near/widget/ProfilePage?accountId=${accountId}`;

const Wrapper = styled.div`
  background: radial-gradient( 64.26% 67.04% at 49.31% 0%, #002c35 0%, #101011 100% ); // todo
  padding-bottom: 48px;
`;

const Main = styled.div`
  display: grid;
  gap: 40px;
  grid-template-columns: 352px minmax(0, 1fr);
  align-items: start;

  @media (max-width: 1200px) {
    grid-template-columns: minmax(0, 1fr);
  }
`;

const BackgroundImage = styled.div`
  height: 240px;
  border-radius: 20px 20px 0 0;
  overflow: hidden;
  margin: 0 -12px;
  background: #163839;
  img {
    object-fit: cover;
    width: 100%;
    height: 100%;
  }

  @media (max-width: 1200px) {
    margin: calc(var(--body-top-padding) * -1) -12px 0;
    border-radius: 0;
  }

  @media (max-width: 900px) {
    height: 100px;
  }
`;

const SidebarWrapper = styled.div`
  position: relative;
  z-index: 5;
  margin-top: -55px;

  @media (max-width: 900px) {
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
  color: #ffffff;
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

  @media (max-width: 1200px) {
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
  font-weight: 500;
  font-size: 16px;
  padding: 0 12px;
  position: relative;
  color: ${(p) => (p.selected ? "#fff" : "rgba(255,255,255,0.5)")};
  background: none;
  border: none;
  outline: none;
  text-align: center;
  text-decoration: none !important;

  &:hover {
    color: #fff;
  }

  &::after {
    content: "";
    display: ${(p) => (p.selected ? "block" : "none")};
    position: absolute;
    bottom: 0;
    left: 0;
    right: 0;
    height: 4px;
    background: #00FFD1;
  }
`;

const Bio = styled.div`
  color: #ffffff;
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
            image: profile.backgroundImage,
            alt: "profile background image",
            fallbackUrl:
              "https://ipfs.near.social/ipfs/bafkreibmiy4ozblcgv3fm3gc6q62s55em33vconbavfd2ekkuliznaq3zm",
          }}
        />
      )}
    </BackgroundImage>

    <Main>
      <SidebarWrapper>
        <Widget
          src="ref-admin.near/widget/ProfilePage.Sidebar"
          props={{
            accountId,
            profile,
          }}
        />
      </SidebarWrapper>

      <Content>
        <Tabs>
          <TabsButton
            href={`${accountUrl}&tab=overview`}
            selected={state.selectedTab === "overview"}
          >
            Overview
          </TabsButton>

          <TabsButton
            href={`${accountUrl}&tab=apps`}
            selected={state.selectedTab === "apps"}
          >
            Components
          </TabsButton>

          <TabsButton
            href={`${accountUrl}&tab=nfts`}
            selected={state.selectedTab === "nfts"}
          >
            NFTs
          </TabsButton>

          <TabsButton
            href={`${accountUrl}&tab=following`}
            selected={state.selectedTab === "following"}
          >
            Following
          </TabsButton>

          <TabsButton
            href={`${accountUrl}&tab=followers`}
            selected={state.selectedTab === "followers"}
          >
            Followers
          </TabsButton>
        </Tabs>

        {state.selectedTab === "overview" && (
          <>
            {profile.description && (
              <>
                <Title as="h2" size="19px" margin>
                  About
                </Title>

                <Bio>
                  <Widget
                    src="ref-admin.near/widget/SocialMarkdown"
                    props={{ text: profile.description }}
                  />
                </Bio>
              </>
            )}

            <Widget
              src="ref-admin.near/widget/Posts.Feed"
              props={{ accounts: [accountId] }}
            />
          </>
        )}

        {state.selectedTab === "nfts" && (
          <Widget
            src="adminalpha.near/widget/NFTCollection"
            props={{ accountId }}
          />
        )}

        {state.selectedTab === "apps" && (
          <Widget
            src="adminalpha.near/widget/ComponentCollection"
            props={{ accountId }}
          />
        )}

        {state.selectedTab === "followers" && (
          <Widget
            src="adminalpha.near/widget/FollowersList"
            props={{ accountId }}
          />
        )}

        {state.selectedTab === "following" && (
          <Widget
            src="adminalpha.near/widget/FollowingList"
            props={{ accountId }}
          />
        )}
      </Content>
    </Main>
  </Wrapper>
);
