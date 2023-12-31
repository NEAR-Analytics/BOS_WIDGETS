const ownerId = "contribut3.near";
const search = props.search ?? "";

State.init({
  items: [],
  itemsIsFetched: false,
});

asyncFetch(
  `https://api-staging-fur7.onrender.com/data/investors?sort=timedesc&q=${search}`
).then(({ body: items }) => State.update({ items, itemsIsFetched: true }));

if (!state.itemsIsFetched) {
  return <>Loading...</>;
}

return (
  <Widget
    src={`${ownerId}/widget/List`}
    props={{
      filter: (accountId) => state.items.includes(accountId),
      items: state.items,
      createItem: (accountId) => (
        <Widget src={`${ownerId}/widget/Investor.Card`} props={{ accountId }} />
      ),
    }}
  />
);
