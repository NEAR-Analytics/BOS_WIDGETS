const accountId = props.accountId;
const tag = props.tag;
let keys = `${accountId ?? "*"}/widget/*`;

if (tag) {
  const taggedWidgets = Social.keys(
    `${accountId ?? "*"}/widget/*/metadata/tags/${tag}`,
    "final"
  );

  if (taggedWidgets === null) {
    return "Loading tags";
  }

  keys = Object.entries(taggedWidgets || {})
    .map((kv) => Object.keys(kv[1].widget).map((w) => `${kv[0]}/widget/${w}`))
    .flat();

  if (!keys.length) {
    return `No widgets found by tag #${tag}`;
  }
}

const data = Social.keys(keys, "final", {
  return_type: "BlockHeight",
});

if (data === null || data === undefined) {
  return "Loading widgets";
}

const processData = (data) => {
  const accounts = Object.entries(data) || [];

  const allItems = accounts
    .map((account) => {
      const accountId = account[0];
      return Object.entries(account[1].widget).map((kv) => ({
        accountId,
        widgetName: kv[0],
        blockHeight: kv[1],
      }));
    })
    .flat();

  allItems.sort((a, b) => b.blockHeight - a.blockHeight);
  return allItems;
};

const renderTag = (tag, tagBadge) => (
  <a href={makeLink(accountId, tag)}>{tagBadge}</a>
);

const renderItem = (a, i) => {
  return (
    <a
      href={`#/${a?.accountId}/widget/${a?.widgetName}`}
      className="text-decoration-none"
      key={JSON.stringify(a)}
    >
      <Widget
        id={i}
        src="andyh.near/widget/WidgetImage"
        props={{
          tooltip: true,
          accountId: a?.accountId,
          widgetName: a?.widgetName,
        }}
      />
    </a>
  );
};

if (JSON.stringify(data) !== JSON.stringify(state.data || {})) {
  State.update({
    data,
    allItems: processData(data),
  });
}

return (
  <div className="d-flex flex-wrap gap-1 my-3">
    {state.allItems
      .slice(0, props.limit ? parseInt(props.limit) : 5)
      .map(renderItem)}
  </div>
);
