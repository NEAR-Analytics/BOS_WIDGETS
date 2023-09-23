const accountId = props.accountId ?? context.accountId;
if (!accountId) {
  return "No account ID";
}

// if it exists, render the accountId's custom profile component
if (Social.getr(`${accountId}/widget/ProfilePage`)) {
  return (
    <Widget
      src={`${accountId}/widget/ProfilePage`}
      props={{
        accountId,
      }}
    />
  );
}
State.init({
  selectedTab: props.tab || "overview",
});

if (props.tab && props.tab !== state.selectedTab) {
  State.update({
    selectedTab: props.tab,
  });
}

const profile = props.profile ?? Social.getr(`${accountId}/profile`);
const accountUrl = `#/near/widget/ProfilePage?accountId=${accountId}`;

const Wrapper = styled.div`
  padding-bottom: 48px;
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
  position: relative;
  height: 240px;
  border-radius: 20px 20px 0 0;
  overflow: hidden;
  margin: 0 -12px;

  background: none;

  img {
    object-fit: cover;
    width: 100%;
    height: 100%;
  }

  .line-animation {
    position: absolute;
    width: 100%;
    height: 100%;
    top: 0;
    left: 0;
    background: 
      linear-gradient(90deg, rgba(255, 255, 255, 0), rgba(255, 255, 255, 0.4) 40%, rgba(0, 0, 0, 0.2) 40%, rgba(0, 0, 0, 0.2) 60%, rgba(255, 255, 255, 0) 60%), 
      linear-gradient(to right, rgb(255, 217, 0), rgb(255, 217, 0), rgb(255, 217, 0) 10%, rgb(230, 54, 97), rgb(157, 0, 253), rgb(230, 54, 97), rgb(255, 217, 0) 90%, rgb(255, 217, 0), rgb(255, 217, 0));
    background-color: rgba(255, 255, 255, 0.5);
    background-size: 200% 100%, 200% 100%;
    background-position: 100% 0, 100% 0;

    animation: moveLines 3s linear infinite;
  }

  @keyframes moveLines {
    0% {
      background-position: 200% 0, 200% 0;
    }
    100% {
      background-position: -200% 0, -200% 0;
    }
  }
    &::before {
    content: 'THE FREE UI THAT HAS EVERYTHING YOU NEED';
    position: absolute;
    font-family: 'Lucida Console', Lucida;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: rgba(0, 0, 0, 0.5);
    color: #fc873a;
    font-size: 44px;
    font-weight: 600;
    z-index: 1;
  }
`;

const SidebarWrapper = styled.div`
  position: relative;
  z-index: 5;
  margin-top: -55px;
  color: red;
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
  color: linear-gradient(to right, rgb(255, 217, 0), rgb(255, 217, 0), rgb(255, 217, 0) 10%, rgb(230, 54, 97), rgb(157, 0, 253), rgb(230, 54, 97), rgb(255, 217, 0) 90%, rgb(255, 217, 0), rgb(255, 217, 0));
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
    color: orange;
  }

  &::after {
    content: "";
    display: ${(p) => (p.selected ? "block" : "none")};
    position: absolute;
    bottom: 0;
    left: 0;
    right: 0;
    height: 3px;
    background: 
      linear-gradient(90deg, rgba(255, 255, 255, 0), rgba(255, 255, 255, 0.4) 40%, rgba(0, 0, 0, 0.2) 40%, rgba(0, 0, 0, 0.2) 60%, rgba(255, 255, 255, 0) 60%), 
      linear-gradient(to right, rgb(255, 217, 0), rgb(255, 217, 0), rgb(255, 217, 0) 10%, rgb(230, 54, 97), rgb(157, 0, 253), rgb(230, 54, 97), rgb(255, 217, 0) 90%, rgb(255, 217, 0), rgb(255, 217, 0));
    background-color: rgba(255, 255, 255, 0.5);
    background-size: 200% 100%, 200% 100%;
    background-position: 100% 0, 100% 0;

    animation: moveLines 3s linear infinite;
  }

  @keyframes moveLines {
    0% {
      background-position: 200% 0, 200% 0;
    }
    100% {
      background-position: -200% 0, -200% 0;
    }
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
      <div className="line-animation"></div>
      {profile.backgroundImage && (
        <Widget
          src="mob.near/widget/Image"
          props={{
            image: profile.backgroundImage,
            alt: "profile background image",
            fallbackUrl:
              "https://ipfs.near.social/ipfs/bafkreibiyqabm3kl24gcb2oegb7pmwdi6wwrpui62iwb44l7uomnn3lhbi",
          }}
        />
      )}
    </BackgroundImage>

    <Main>
      <SidebarWrapper>
        <Widget
          src="near/widget/ProfilePage.Sidebar"
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

          <TabsButton
            href={`${accountUrl}&tab=explorer`}
            selected={state.selectedTab === "explorer"}
          >
            Explorer
          </TabsButton>
        </Tabs>

        {state.selectedTab === "overview" && (
          <>
            {profile.description && (
              <>
                <Title as="h2" size="19px" margin>
                  About US
                </Title>

                <Bio>
                  <Widget
                    src="near/widget/SocialMarkdown"
                    props={{ text: profile.description }}
                  />
                </Bio>
              </>
            )}

            <Widget
              src="near/widget/v1.Feed"
              props={{ accounts: [accountId] }}
            />
          </>
        )}

        {state.selectedTab === "nfts" && (
          <Widget src="near/widget/NFTCollection" props={{ accountId }} />
        )}

        {state.selectedTab === "apps" && (
          <Widget src="near/widget/ComponentCollection" props={{ accountId }} />
        )}

        {state.selectedTab === "followers" && (
          <Widget src="near/widget/FollowersList" props={{ accountId }} />
        )}

        {state.selectedTab === "following" && (
          <Widget src="near/widget/FollowingList" props={{ accountId }} />
        )}

        {state.selectedTab === "explorer" && (
          <Widget
            src="near/widget/Explorer.Account"
            props={{
              accountId,
              network: context.networkId,
              language: "en",
              baseUrl: props.baseUrl,
            }}
          />
        )}
      </Content>
    </Main>
  </Wrapper>
);
