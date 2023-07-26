const ownerId = "contribut3.near";
const accountId = props.accountId;
const cid = props.cid;
const isAdmin = props.isAdmin;

State.init({
  request: null,
  requestIsFetched: false,
});

if (!state.requestIsFetched) {
  Near.asyncView(
    ownerId,
    "get_request",
    { account_id: accountId, cid },
    "final",
    false
  ).then((request) => State.update({ request, requestIsFetched: true }));
  return <>Loading...</>;
}

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: flex-start;
  gap: 1em;
  width: 100%;
`;

const Header = styled.div`
  & > a {
    display: flex;
    flex-direction: row;
    align-items: flex-start;
    justify-content: flex-start;
    gap: 1em;
    text-decoration: none;

    &:hover,
    &:focus,
    &:active {
      text-decoration: none;
    }
  }
`;

return (
  <Container>
    <Header>
      <Link
        href={`/${ownerId}/widget/Index?tab=project&accountId=${accountId}`}
      >
        <Widget
          src={`${ownerId}/widget/Project.Icon`}
          props={{ accountId: props.accountId, size: "30px" }}
        />
        <Widget
          src={`${ownerId}/widget/NameAndAccount`}
          props={{
            accountId: props.accountId,
            name: state.profile.name,
            nameSize: ".95em",
            accountSize: ".75em",
          }}
        />
      </Link>
    </Header>
    <Widget
      src={`${ownerId}/widget/Inputs.Viewable.Title`}
      props={{
        value: state.request.title,
        id: "title",
        onSave: (title) =>
          Near.call(ownerId, "edit_request", {
            cid,
            request: { ...state.request, title },
          }),
        canEdit: props.isAdmin,
      }}
    />
    <Widget
      src={`${ownerId}/widget/Inputs.Viewable.Toggle`}
      props={{
        id: "open",
        activeText: "Receiving proposals",
        inactiveText: "Closed",
        value: state.request.open,
        onSave: (open) =>
          Near.call(ownerId, "edit_request", {
            cid,
            request: { ...state.request, open },
          }),
        canEdit: props.isAdmin,
      }}
    />
  </Container>
);
