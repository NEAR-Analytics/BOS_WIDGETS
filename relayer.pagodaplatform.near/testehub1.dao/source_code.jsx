const accountId = props.accountId ?? context.accountId;
const daoId = props.daoId ?? "1clsstr.near";
const role = props.role ?? "community";
const contractId = "mint.sharddog.near";

State.init({
  selectedTab: props.tab || "overview",
});

const nftData = Near.view(contractId, "nft_supply_for_owner", {
  account_id: accountId,
});

const isNftHolder = false;

if (nftData > 0) {
  isNftHolder = true;
}

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

return (
  <Wrapper>
    <Container>
      <Flex>
        <H1>
          🤝 Web3 Brasil
          <span>
            HUB{" "}
            <svg viewBox="0 0 26 24" fill="none" aria-hidden="true">
              <path
                d="M24.3767 8.06326L1.51965 0.0649912C1.10402 -0.0830767 0.639031 0.026026 0.327308 0.340346C0.0181841 0.657263 -0.0831256 1.12225 0.0701378 1.53788L8.071 23.2519C8.23726 23.7013 8.66587 24 9.14385 24H9.14644C9.62702 24 10.0556 23.6961 10.2167 23.2441L13.734 13.495L24.3325 10.2349C24.8053 10.0895 25.13 9.65824 25.1378 9.16468C25.1482 8.67112 24.8391 8.22691 24.3715 8.06326H24.3767Z"
                fill="#323330"
              />
            </svg>
          </span>
        </H1>
        <div className="mt-3">
          <Text style={{ maxWidth: "350px" }}>
            Conheça as comunidades brasileiras que estão construindo a Web3.
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
        <Widget src="nycdao.near/widget/dao.cta" props={{ accountId, daoId }} />
      </Flex>
    </Container>

    <Content>
      <Tabs>
        <TabsButton
          href="#/hack.near/widget/nyc.dao?tab=overview"
          selected={state.selectedTab === "overview"}
        >
          Overview
        </TabsButton>

        <TabsButton
          href="#/hack.near/widget/nyc.dao?tab=apps"
          selected={state.selectedTab === "apps"}
        >
          Components
        </TabsButton>

        <TabsButton
          href="#/hack.near/widget/nyc.dao?tab=nfts"
          selected={state.selectedTab === "nfts"}
        >
          NFTs
        </TabsButton>

        <TabsButton
          href="#/hack.near/widget/nyc.dao?tab=following"
          selected={state.selectedTab === "following"}
        >
          Following
        </TabsButton>

        <TabsButton
          href="#/hack.near/widget/nyc.dao?tab=followers"
          selected={state.selectedTab === "followers"}
        >
          Followers
        </TabsButton>

        <TabsButton
          href="#/hack.near/widget/nyc.dao?tab=explorer"
          selected={state.selectedTab === "explorer"}
        >
          Explorer
        </TabsButton>
      </Tabs>

      {state.selectedTab === "overview" && (
        <Widget
          src="near/widget/FollowersList"
          props={{ accountId: "1clsstr.near" }}
        />
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

    {isNftHolder && (
      <div className="m-2 mb-5">
        <h5 className="mb-3">Non-Fungible Things</h5>
        <Widget src="near/widget/NFTCollection" props={{ accountId }} />
      </div>
    )}
    <br />

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
      <Widget src="hack.near/widget/dev.Badge" />
    </Flex>
  </Wrapper>
);
