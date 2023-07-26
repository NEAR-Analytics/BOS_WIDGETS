const typeName = "thing";
let keys = "*/thing/artist/*";
const metadataTemplate =
  props.metadataTemplate || "harmonic1.near/widget/artist.card";

State.init({
  data: {},
});

const data = Social.keys(keys, "final", {
  return_type: "BlockHeight",
  limit: 1,
});

State.update({
  data: data,
});

console.log(data);

if (data === null) {
  return <p>"Loading"</p>;
}

const processData = (data) => {
  const accounts = Object.entries(data);
  console.log("accounts ", accounts);
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

  console.log("All items -> ", allItems);

  allItems.sort((a, b) => b.blockHeight - a.blockHeight);
  return allItems;
};

const renderItem = (a) => {
  console.log(`${a.accountId}/thing/artist/`);
  return (
    <div
      className="m-1 mx-3"
      key={JSON.stringify(a)}
      style={{ minHeight: "10em" }}
    >
      <Widget
        src={metadataTemplate}
        props={{
          path: `${a.accountId}/thing/artist`,
        }}
      />
    </div>
  );
};

if (JSON.stringify(data) !== {}) {
  State.update({
    data,
    allItems: processData(data),
  });
}

return (
  <div className="px-2">
    <Widget
      src="efiz.near/widget/ItemFeed"
      props={{ items: state.allItems || [], renderItem }}
    />
  </div>
);
