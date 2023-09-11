const groupId = props.groupId;

const group = props.group ?? Social.get(`*/${groupId}/**`, "final");

if (!group) {
  return "Loading...";
}

const Container = styled.div`
  background: #fbfbfb;
  padding: 23px;
`;

return (
  <Container>
    <div className="mx-auto">
      <Widget
        src="hack.near/widget/group.card"
        props={{
          groupId,
        }}
      />
      <br />
      <div className="m-2">
        <h3 className="mb-3">Members</h3>
        <Widget src="hack.near/widget/group.members" props={{ groupId }} />
      </div>
    </div>
  </Container>
);
