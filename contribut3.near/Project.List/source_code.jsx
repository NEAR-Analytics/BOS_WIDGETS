const ownerId = "contribut3.near";
const search = props.search ?? "";

State.init({
  items: [],
  itemsIsFetched: false,
});

if (!state.itemsIsFetched) {
  Near.asyncView(ownerId, "get_projects", {}, "final", false).then((items) =>
    State.update({ items, itemsIsFetched: true })
  );

  return <>Loading...</>;
}

const Header = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  padding: .75em .95em;
  gap: .75em;
  width: 100%;
  background: #f9fafb;
  border-bottom: 1px solid #eaecf0;
`;

const Name = styled.div`
  width: 35%;
`;

const Other = styled.div`
  width: 13%;
`;

return (
  <div>
    <Header>
      <Name>Name</Name>
      <Other>Admins</Other>
      <Other>Accelerator</Other>
      <Other>Graduation</Other>
      <Other>Created</Other>
      <Other>Status</Other>
    </Header>
    <Widget
      src={`${ownerId}/widget/List`}
      props={{
        search,
        items: state.items,
        createItem: (accountId) => (
          <Widget src={`${ownerId}/widget/Project.Card`} props={{ accountId }} />
        ),
      }}
    />
  </div>
);
