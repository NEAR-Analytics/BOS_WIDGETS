const renderItem = (a) => {
  return (
    <a
      href={`#/${a.accountId}/widget/${a.widgetName}`}
      className="text-decoration-none"
      key={JSON.stringify(a)}
    >
      <Widget
        src="mob.near/widget/WidgetImage"
        props={{
          tooltip: true,
          accountId: a.accountId,
          widgetName: a.widgetName,
        }}
      />
    </a>
  );
};

const specificComponents = [
  "achildhoodhero.near/widget/nearweek.editorial.bos",
  "achildhoodhero.near/widget/swap.near",
  "achildhoodhero.near/widget/trisolaris.swap.near",
  "wormhole3.near/widget/Wormhole3.Twitter",
  "achildhoodhero.near/widget/lido.stake.bos",
  "achildhoodhero.near/widget/stader.stake.bos",
  "mob.near/widget/YourNFTs", // Add your component here
].map((key) => {
  const parts = key.split("/");
  return {
    accountId: parts[0],
    widgetName: parts[2],
  };
});

if (JSON.stringify(specificComponents) !== JSON.stringify(state.data || {})) {
  State.update({
    data: specificComponents,
    allItems: specificComponents,
  });
}

return (
  <div className="d-flex flex-wrap gap-1 my-3">
    {state.allItems.map(renderItem)}
  </div>
);
