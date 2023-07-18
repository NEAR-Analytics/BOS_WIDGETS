const typeName = props.typeName || "widget";
const metadataTemplate = props.metadataTemplate || "efiz.near/widget/docs.card";

State.init({
  accountId: props.accountId || null,
  tag: props.tag || null,
});

let keys = `${state.accountId ?? "*"}/${typeName}/*`;

if (state.tag) {
  const taggedWidgets = Social.keys(
    `${state.accountId ?? "*"}/${typeName}/*/metadata/tags/${state.tag}`,
    "final"
  );

  if (taggedWidgets === null) {
    return <p>Loading tags</p>;
  }

  keys = Object.entries(taggedWidgets)
    .map((kv) =>
      Object.keys(kv[1][typeName]).map((w) => `${kv[0]}/${typeName}/${w}`)
    )
    .flat();

  if (!keys.length) {
    return (
      <>
        <p>No types found by tag #{state.tag}</p>
        <button onClick={() => State.update({ tag: null })}>reset</button>
      </>
    );
  }
}

const data = Social.keys(keys, "final", {
  return_type: "BlockHeight",
  limit: 1,
});

if (data === null) {
  return <p>"Loading"</p>;
}

const processData = (data) => {
  const accounts = Object.entries(data);

  const allItems = accounts
    .map((account) => {
      const accountId = account[0];
      return Object.entries(account[1][typeName]).map((kv) => ({
        accountId,
        typeName: kv[0],
        blockHeight: kv[1],
      }));
    })
    .flat();

  allItems.sort((a, b) => b.blockHeight - a.blockHeight);
  return allItems;
};

const renderItem = (a) => {
  return (
    <div className="m-1" key={JSON.stringify(a)} style={{ minHeight: "10em" }}>
      <Widget
        src={metadataTemplate}
        props={{
          path: `${a.accountId}/${typeName}/${a.typeName}`,
        }}
      />
    </div>
  );
};

if (JSON.stringify(data) !== JSON.stringify(state.data || {})) {
  State.update({
    data,
    allItems: processData(data),
  });
}
return (
  <div className="px-2 mx-auto">
    <div className="mb-2 d-flex align-items-baseline gap-2">
      Filter:
      {state.accountId ? (
        <a className="btn btn-outline-primary">
          <Widget
            src="mob.near/widget/ProfileLine"
            props={{ accountId: state.accountId, link: false }}
          />
          <i
            className="bi bi-x-square"
            onClick={() => State.update({ accountId: null })}
          ></i>
        </a>
      ) : (
        <>
          <input
            className="form-control d-inline-block w-auto"
            placeholder={"accountId"}
            value={state.accountIdVal}
            onChange={(e) =>
              State.update({
                accountIdVal: e.target.value,
              })
            }
          />
          <button
            onClick={() => State.update({ accountId: state.accountIdVal })}
          >
            apply
          </button>
        </>
      )}
      {state.tag ? (
        <a className="btn btn-outline-primary">
          <span className="badge text-bg-secondary">#{state.tag}</span>
          <i className="bi bi-x-square"></i>
        </a>
      ) : (
        <>
          <input
            className="form-control d-inline-block w-auto"
            placeholder={"tag"}
            value={state.tag}
            onChange={(e) =>
              State.update({
                tagVal: e.target.value,
              })
            }
          />
          <button onClick={() => State.update({ tag: state.tagVal })}>
            apply
          </button>
        </>
      )}
    </div>
    <Widget
      src="efiz.near/widget/ItemFeed"
      props={{ items: state.allItems || [], renderItem }}
    />
  </div>
);
