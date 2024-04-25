const accountId = props.accountId || context.accountId || "root.near";
const { Feed } = VM.require("devs.near/widget/Feed") || {
  Feed: () => <></>,
};
const items = Social.index("notify", accountId, {
  limit: 100,
  order: "desc",
  subscribe: true,
});
if (!items || !items.length) {
  return <p>Failure</p>;
}
const filteredItems = items.filter((a) => a.value.type === "poke");
if (!filteredItems || !filteredItems.length) {
  return <p>No pokes</p>;
}
return (
  <Feed
    items={filteredItems}
    Item={(a) => {
      return (
        <Widget
          src="pokethe.near/widget/PokeItem"
          props={{
            poker: a.accountId,
            target: accountId,
            blockHeight: a.blockHeight,
          }}
        />
      );
    }}
    Layout={({ children }) => <div>{children}</div>}
  />
);
