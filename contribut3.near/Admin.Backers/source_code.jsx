const ownerId = "contribut3.near";
const apiUrl = "https://api-staging-fur7.onrender.com";
const search = props.search ?? "";

State.init({
  items: [],
  itemsIsFetched: false,
});

asyncFetch(`${apiUrl}/data/vendors?sort=timedesc&&q=${search}`).then(
  ({ body: items }) => State.update({ items, itemsIsFetched: true }),
);

if (!state.itemsIsFetched) {
  return <>Loading...</>;
}

return <>List of unverified backers coming soon...</>;
