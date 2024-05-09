const ownerId = "contribut3.near";
const search = props.search ?? "";

State.init({
  items: [],
  itemsIsFetched: false,
});

if (!state.itemsIsFetched) {
  Near.asyncView(ownerId, "get_vendors", {}, "final", false).then((items) =>
    State.update({ items, itemsIsFetched: true })
  );

  return <>Loading...</>;
}

const Item = styled.div`
  width: 100%;
`;

return (
  <Widget
    src={`${ownerId}/widget/List`}
    props={{
      filter: (accountId) => accountId.includes(search),
      items: state.items,
      createItem: (accountId) => (
        <Item key={accountId}>
          <Widget src={`${ownerId}/widget/Vendor.Card`} props={{ accountId }} />
        </Item>
      ),
    }}
  />
);
