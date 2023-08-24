const accountId = props.accountId ?? context.accountId;
const daoId = props.daoId ?? "liberty.sputnik-dao.near";
const role = props.role ?? "community";
const contractId = "mint.sharddog.near";

State.init({
  selectedTab: props.tab || "overview",
});

const tab = props.tab === "following" ? props.tab : "members";

const nftData = Near.view(contractId, "nft_supply_for_owner", {
  account_id: accountId,
});

const isNftHolder = false;

if (nftData > 0) {
  isNftHolder = true;
}
const accountUrl = `#/819c44a1bdd666dce2119a6e92f9d7643136e02fc577e6cd0542bb38f6172b4a/widget/queens.dao`;

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
const cssFont = fetch("https://fonts.cdnfonts.com/css/graffiti-font").body;

if (!cssFont) return "";

const H1 = styled.h1`

  font-family:'Graffiti font', sans-serif ;
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
    background: linear-gradient(89.97deg, #AE67FA 1.84%, #F49867 102.67%);;
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
  ${cssFont}
`;

const Text = styled.p`
 font-family: 'sans-serif';
 src: url('https://fonts.cdnfonts.com/css/graffiti-font')
                                                
  font-size: ${(p) => p.size ?? "18px"};
  line-height: ${(p) => p.lineHeight ?? "1.5"};
  font-weight: ${(p) => p.weight ?? "400"};
  color: ${(p) => p.color ?? ""};
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
    background: linear-gradient(89.97deg, #AE67FA 1.84%, #F49867 102.67%);;
  }
 
`;
const PopupWrapper = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  z-index: 1000;
  width: 100vw;
  height: 100vh;
  background: rgba(0, 0, 0, 0.7);
  display: flex;
  align-items: center;
  justify-content: center;
  backdrop-filter: blur(6px);
  padding: 16px;

  @media (max-width: 600px) {
    padding: 0;
    & > * {
      width: 100%;
      height: 100%;
      border-radius: 0;
    }
  }
`;
return (
  <Wrapper>
    <Container>
      <Flex>
        <H1>
          🌐 Liberty
          <span>
            DAO{" "}
            <svg viewBox="0 0 26 24" fill="none" aria-hidden="true">
              <path
                d="M24.3767 8.06326L1.51965 0.0649912C1.10402 -0.0830767 0.639031 0.026026 0.327308 0.340346C0.0181841 0.657263 -0.0831256 1.12225 0.0701378 1.53788L8.071 23.2519C8.23726 23.7013 8.66587 24 9.14385 24H9.14644C9.62702 24 10.0556 23.6961 10.2167 23.2441L13.734 13.495L24.3325 10.2349C24.8053 10.0895 25.13 9.65824 25.1378 9.16468C25.1482 8.67112 24.8391 8.22691 24.3715 8.06326H24.3767Z"
                fill="#323330"
              />
            </svg>
          </span>
          Queens
        </H1>
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
        <Widget src="nycdao.near/widget/dao.cta" props={{ accountId, daoId }} />
      </Flex>
    </Container>
    <Content>
      <Tabs>
        <TabsButton
          href={`${accountUrl}tab=discussion`}
          selected={state.selectedTab === "discussion"}
        >
          Discussion
        </TabsButton>

        <TabsButton
          href={`${accountUrl}tab=proposals`}
          selected={state.selectedTab === "proposals"}
        >
          Proposals
        </TabsButton>

        <TabsButton
          href={`${accountUrl}tab=members`}
          selected={state.selectedTab === "members"}
        >
          Members
        </TabsButton>

        <TabsButton
          href={`${accountUrl}tab=projects`}
          selected={state.selectedTab === "projects"}
        >
          Projects
        </TabsButton>

        <TabsButton
          href={`${accountUrl}tab=followers`}
          selected={state.selectedTab === "followers"}
        >
          Followers
        </TabsButton>

        <TabsButton
          href={`${accountUrl}tab=bounties`}
          selected={state.selectedTab === "bounties"}
        >
          Bounties
        </TabsButton>
        <TabsButton
          href={`${accountUrl}tab=events`}
          selected={state.selectedTab === "events"}
        >
          Events
        </TabsButton>
      </Tabs>

      {state.selectedTab === "discussion" && (
        <>
          <Widget src="efiz.near/widget/Chat" props={{ daoId }} />
        </>
      )}

      {state.selectedTab === "proposals" && (
        <Widget src="sking.near/widget/DAO.Proposals" props={{ daoId }} />
      )}

      {state.selectedTab === "proposal" && (
        <Widget
          src="sking.near/widget/DAO.Proposal"
          props={{ daoId, ...props }}
        />
      )}

      {state.selectedTab === "members" && (
        <Widget src="hack.near/widget/DAO.Members" props={{ daoId }} />
      )}

      {state.selectedTab === "projects" && (
        <Widget
          src="nearhorizon.near/widget/Project.ListPage"
          props={{ daoId }}
        />
      )}

      {state.selectedTab === "followers" && (
        <Widget src="near/widget/FollowersList" props={{ accountId: daoId }} />
      )}

      {state.selectedTab === "bounties" && (
        <Widget src="sking.near/widget/DAO.Bounties" props={{ daoId }} />
      )}

      {state.selectedTab === "events" && (
        <Widget src="evrything.near/widget/Calendar" props={{ daoId }} />
      )}

      {state.selectedTab === "bounty" && (
        <Widget
          src="sking.near/widget/DAO.Bounty"
          props={{ daoId, ...props }}
        />
      )}
    </Content>

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
