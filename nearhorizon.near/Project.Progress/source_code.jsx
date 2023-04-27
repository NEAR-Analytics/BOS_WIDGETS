const ownerId = "nearhorizon.near";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;
  padding: 0.5em 1em;
  gap: 0.5em;
  background: #d9f4ff;
  border-radius: 8px;
  width: 100%;
`;

const Row = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: flex-start;
  padding: 0px;
  gap: 0.5em;
  width: 100%;
`;

const Label = styled.span`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: flex-start;
  padding: 0px;
  gap: 0.5em;
  font-style: normal;
  font-weight: 600;
  font-size: 0.75em;
  line-height: 1em;
  color: #11181c;
  width: 35%;
`;

const Value = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  align-items: center;
  padding: 0px;
  gap: 0.5em;
  font-style: normal;
  font-weight: 700;
  font-size: 0.75em;
  line-height: 1.4em;
  color: #11181c;
  width: 65%;
`;

State.init({
  project: null,
  projectIsFetched: false,
  profile: null,
  profileIsFetched: false,
});

if (!state.projectIsFetched) {
  Near.asyncView(
    ownerId,
    "get_project",
    { account_id: props.accountId },
    "final",
    false
  ).then((project) => State.update({ project, projectIsFetched: true }));
}

if (!state.profileIsFetched) {
  Near.asyncView(
    "social.near",
    "get",
    { keys: [`${props.accountId}/profile`] },
    "final",
    false
  ).then((profile) =>
    State.update({
      profile: profile[props.accountId].profile,
      profileIsFetched: true,
    })
  );
}

if (!state.projectIsFetched || !state.profileIsFetched) {
  return <>Loading...</>;
}

return (
  <Container>
    <Row>
      <Label>Credits:</Label>
      <Value>
        0 NHZN{" "}
        <Widget
          src={`${ownerId}/widget/Tooltip`}
          props={{ content: "Test use case" }}
        />
      </Value>
    </Row>
    <Row>
      <Label>Profile:</Label>
      <Value>60%</Value>
    </Row>
  </Container>
);
