const ownerId = "contribut3.near";
const accountId = props.accountId;

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
    { account_id: accountId },
    "final",
    false
  ).then((project) => State.update({ project, projectIsFetched: true }));
}

if (!state.profileIsFetched) {
  Near.asyncView(
    "social.near",
    "get",
    { keys: [`${accountId}/profile/*`] },
    "final",
    false
  ).then((data) =>
    State.update({
      profile: data[accountId].profile,
      profileIsFetched: true,
    })
  );
}

const Container = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  padding: 1em 0.95em;
  gap: 1em;
  border-bottom: 1px solid #eaecf0;
  width: 100%;
`;

const Name = styled.a`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: flex-start;
  width: 70%;
`;

const Other = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  width: 15%;
`;

const Badge = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  padding: 0.5em 0.95em;
  background: #f2f4f7;
  mix-blend-mode: multiply;
  border-radius: 16px;
  font-style: normal;
  font-weight: 500;
  font-size: 0.75em;
  line-height: 1.125em;
  text-align: center;
`;

const text = typeof state.project.application_status === "string" ? state.project.application_status : Object.keys(state.project.application_status)[0];

return (
  <Container>
    <Name
      href={`/${ownerId}/widget/Index?tab=project&accountId=${props.accountId}`}
    >
      <Widget
        src={`${ownerId}/widget/Project.Icon`}
        props={{ accountId: props.accountId, size: "2.5em" }}
      />
      <Widget
        src={`${ownerId}/widget/NameAndAccount`}
        props={{
          accountId: props.accountId,
          name: state.profile.name,
          nameSize: "1.125em",
        }}
      />
    </Name>
    <Other>
      <Badge>{state.project.application_status}</Badge>
    </Other>
    <Other>{new Date().toLocaleDateString()}</Other>
    <Other>
      <Widget
        src={`${ownerId}/widget/ActiveIndicator`}
        props={{ active: state.project.aplication_status !== "Accepted", activeText: "Accepted", inactiveText: state.project.application_status }}
      />
    </Other>
  </Container>
);
