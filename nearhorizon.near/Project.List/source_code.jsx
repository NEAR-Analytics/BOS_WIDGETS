const ownerId = "nearhorizon.near";
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

console.log({
  search,
  items: state.items,
  itemsFiltered: state.items.filter((accountId) => accountId.includes(search)),
});

return (
  <Widget
    src={`${ownerId}/widget/List`}
    props={{
      items: state.items.filter((accountId) => accountId.includes(search)),
      createItem: (accountId) => (
        <Widget src={`${ownerId}/widget/Project.Card`} props={{ accountId }} />
      ),
    }}
  />
);
