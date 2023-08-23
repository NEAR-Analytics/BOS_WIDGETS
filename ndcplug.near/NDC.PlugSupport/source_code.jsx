const accountId = props.accountId ?? "*";

const data = Social.keys(`${accountId}/post/vote`, "final", {
  return_type: "History",
});

if (!data) {
  return "Loading";
}

const processData = (data) => {
  const accounts = Object.entries(data);

  console.log("data", data);
  const allItems = accounts
    .map((account) => {
      const accountId = account[0];
      const blockHeights = account[1].post.vote;
      return blockHeights.map((blockHeight) => ({
        accountId,
        blockHeight,
      }));
    })
    .flat();

  allItems.sort((a, b) => b.blockHeight - a.blockHeight);
  console.log("allItems", allItems);
  return allItems;
};

if (JSON.stringify(data) !== JSON.stringify(state.data || {})) {
  State.update({
    data,
    allItems: processData(data),
  });
}

return (
  <div>
    <CommitButton
      data={{ post: { vote: "I am voting 🔌Plug" } }}
      onCommit={() => {
        State.update({
          // TODO: Feed needs reload?
        });
      }}
    >
      pledge to vote for 🔌 plug
    </CommitButton>

    <br />
    <div>
      {state.allItems
        ? state.allItems.map(({ accountId }) => (
            <div>I am voting 🔌Plug
              <Widget
                src="miraclx.near/widget/Attribution"
                props={{
                  dep: true,
                  authors: [accountId],
                }}
              />
            </div>
          ))
        : "Loading..."}
    </div>
  </div>
);