const hashtag = props.hashtag ?? "abc";

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
const accountUrl = `/#/create.near/widget/Page?accountId=${accountId}`;

const options = [
  {
    title: "Content",
  },
];

if (hashtag) {
  options.push({
    title: `#${hashtag}`,
  });
}

let accounts = undefined;

if (state.pageIndex === 0) {
  const graph = Social.keys(`${context.accountId}/graph/follow/*`, "final");
  if (graph !== null) {
    accounts = Object.keys(graph[context.accountId].graph.follow || {});
    accounts.push(context.accountId);
  } else {
    accounts = [];
  }
}

const Wrapper = styled.div`
  padding-bottom: 48px;
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
  return "Loading...";
}

return (
  <Wrapper>
    <Content>
      <Tabs>
        <TabsButton
          href={`${accountUrl}&tab=about`}
          selected={state.selectedTab === "about"}
        >
          About
        </TabsButton>

        <TabsButton
          href={`${accountUrl}&tab=content`}
          selected={state.selectedTab === "content"}
        >
          Content
        </TabsButton>

        <TabsButton
          href={`${accountUrl}&tab=apps`}
          selected={state.selectedTab === "apps"}
        >
          Widgets
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

      {state.selectedTab === "about" && (
        <Widget src="create.near/widget/Page.Header" />
      )}

      {state.selectedTab === "content" && (
        <Widget src="create.near/widget/ABC.Feed" />
      )}

      {state.selectedTab === "nfts" && (
        <Widget src="adminalpha.near/widget/NFTCollection?accountId=borderlesscommunity.near" />
      )}

      {state.selectedTab === "apps" && (
        <Widget src="adminalpha.near/widget/ComponentCollection?accountId=borderlesscommunity.near" />
      )}

      {state.selectedTab === "members" && (
        <Widget src="adminalpha.near/widget/FollowersList?accountId=borderlesscommunity.near" />
      )}

      {state.selectedTab === "contributors" && (
        <Widget src="adminalpha.near/widget/FollowingList?accountId=borderlesscommunity.near" />
      )}
    </Content>
  </Wrapper>
);
