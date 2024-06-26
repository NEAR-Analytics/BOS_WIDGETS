// const daoId = "marmaj-research.sputnik-dao.near";
// const accounts = ["shemar268abel.near", "hannah17.near"];
const accountId = props.accountId || "bac-inc.near";
// const follows = Social.getr(`${accountId}/graph/follow`, "final", "subscribe");

if (!accountId) {
  return "You aren't signed in.";
}

let followers = Social.keys(`*/graph/follow/${accountId}`, "final", {
  return_type: "BlockHeight",
  values_only: true,
});

if (followers === null) {
  return "Loading";
}

followers = Object.entries(followers || {});
followers.sort(
  (a, b) => b.graph.follow[accountId][1] - a.graph.follow[accountId][1]
);

const Wrapper = styled.div`
  margin: auto 20px;
  display: grid;
  gap: 24px;
`;

const Item = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 12px;
`;

const Text = styled.p`
  margin: 0;
  font-size: 14px;
  line-height: 20px;
  color: ${(p) => (p.bold ? "#11181C" : "#687076")};
  font-weight: ${(p) => (p.bold ? "600" : "400")};
  font-size: ${(p) => (p.small ? "12px" : "14px")};
`;

if (followers !== null && followers.length === 0) {
  return <Text>This account doesn&apos;t have any followers yet.</Text>;
}

return (
  <Wrapper>
    {followers.map(([accountId], i) => (
      <Item key={i}>
        <Widget
          src="mob.near/widget/MainPage.Feed"
          props={{ accounts: accountId }}
        />
      </Item>
    ))}
  </Wrapper>
);
// <Widget src="near/widget/FollowButton" props={{ accountId }} />
// <Widget src="mob.near/widget/MainPage.Feed" props={{ accounts }} />
