const accountId = "nycdao.near";

const daoId = "marmaj-research.sputnik-dao.near";
const groupId = ["hackers", "interns", "advisors", "council"];

const policy = Near.view(daoId, "get_policy");
const group = policy.roles
  .filter((role) => role.name === groupId[0])
  .map((role) => {
    const group = role.kind.Group;

    return group;
  });

const hackers = group[0];

const Wrapper = styled.div`
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

if (hackers !== null && hackers.length === 0) {
  return <Text>This account doesn&apos;t have any followers yet.</Text>;
}

return (
  <Wrapper>
    <h5>Hackers</h5>
    {hackers.map((accountId, i) => (
      <Item key={i}>
        <Widget
          src="adminalpha.near/widget/AccountProfile"
          props={{ accountId }}
        />
        <Widget
          src="adminalpha.near/widget/FollowButton"
          props={{ accountId }}
        />
      </Item>
    ))}
  </Wrapper>
);
