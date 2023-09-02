const creatorId = props.creatorId ?? "james.near";
const groupId = props.groupId ?? "6fd36ddf4884flm20pbe91e7b208b88d16";

const group =
  props.group ?? Social.get(`${creatorId}/thing/${groupId}/**`, "final");

if (group === null) {
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
          creatorId,
          groupId,
        }}
      />
      <br />
      <div className="m-2">
        <h3 className="mb-3">Members</h3>
        <Widget
          src="hack.near/widget/group.members"
          props={{ creatorId, groupId }}
        />
      </div>
    </div>
  </Container>
);
