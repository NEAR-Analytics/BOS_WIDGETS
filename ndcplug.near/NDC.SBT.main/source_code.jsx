State.init({
  selectedTab: props.tab || "og",
});

// const accountId = props.accountId ?? context.accountId;
const accountId = "neardigitalcollective.near";

if (props.tab && props.tab !== state.selectedTab) {
  State.update({
    selectedTab: props.tab,
  });
}

// const accountUrl = `#/ndcplug.near/widget/NDC.SBT.main=${accountId}`;
const accountUrl = `#/ndcplug.near/widget/NDC.SBT.main`;

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
            href={`${accountUrl}&tab=og`}
            selected={state.selectedTab === "og"}
          >
            OG
          </TabsButton>

          <TabsButton
            href={`${accountUrl}&tab=human`}
            selected={state.selectedTab === "human"}
          >
            I-Am-Human
          </TabsButton>
          <TabsButton
            href={`${accountUrl}&tab=regen`}
            selected={state.selectedTab === "regen"}
          >
            Proof of Regen
          </TabsButton>

          <TabsButton
            href={`${accountUrl}&tab=vibes`}
            selected={state.selectedTab === "vibes"}
          >
            Proof of Vibes
          </TabsButton>

          <TabsButton
            href={`${accountUrl}&tab=explorer`}
            selected={state.selectedTab === "explorer"}
          >
            Registry Contract
          </TabsButton>
        </Tabs>

        {state.selectedTab === "regen" && (
          <>
            <Widget
              src="ndcplug.near/widget/ndc-badge-holders"
              props={{
                title: "NDC Proof of Regen",
                issuer: "issuer.regens.near",
                showProgress: false,
                showDropdown: false,
              }}
            />
          </>
        )}
        {state.selectedTab === "vibes" && (
          <>
            <Widget
              src="ndcplug.near/widget/ndc-badge-holders"
              props={{
                title: "NDC Proof of Vibes",
                issuer: "issuer.proofofvibes.near",
                showProgress: false,
                showDropdown: false,
              }}
            />
          </>
        )}
        {state.selectedTab === "og" && (
          <>
            <Widget
              src="ndcplug.near/widget/ndc-badge-holders"
              props={{
                title: "NDC OG SBT (can vote)",
                issuer: "community.i-am-human.near",
                showProgress: false,
                showDropdown: false,
              }}
            />
          </>
        )}
        {state.selectedTab === "human" && (
          <>
            <Widget
              src="ndcplug.near/widget/ndc-badge-holders"
              props={{
                title: "NDC Verified Humans",
                issuer: "fractal.i-am-human.near",
                showProgress: false,
                showDropdown: false,
              }}
            />
          </>
        )}

        {state.selectedTab === "explorer" && (
          <Widget
            src="near/widget/Explorer.Account"
            props={{
              accountId: "registry.i-am-human.near",
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
