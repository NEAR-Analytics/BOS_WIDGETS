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

//will display cards all if empty
const featuredAccountIds = props.featuredAccountIds;

//the ones you don't want to show
const excludedAccountIds = [
  "afrobutterfly.near",
  "efiz.near",
  "nearvietnamhub.near",
  "mzmarshall.near",
  "bcf7aede-2b89-4af4-966a-c76ecf55f42f.harmonic-relayer.near",
  "qsaharmonic.near",
  "5041c4e4-dbbf-47a7-adec-607d03120333.harmonic-relayer.near",
  "0116c96f-b775-4439-9383-aa9d838d7567.harmonic-relayer.near",
]; //props.excludedAccountIds;
//adding elliot until his profile is completed.
//afro is excluded because incomplete profile

// const filteredItems = state.allItems
//   ? featuredAccountIds.length > 0
//     ? state.allItems.filter((item) =>
//         featuredAccountIds.includes(item.accountId)
//       )
//     : state.allItems
//   : [];

let filteredItems = [];

if (state.allItems) {
  if (featuredAccountIds.length > 0) {
    filteredItems = state.allItems.filter((item) =>
      featuredAccountIds.includes(item.accountId)
    );
  } else {
    filteredItems = state.allItems.filter(
      (item) => !excludedAccountIds.includes(item.accountId)
    );
  }
}

return (
  <div className="px-2">
    <Widget
      src="efiz.near/widget/ItemFeed"
      props={{ items: filteredItems || [], renderItem }}
    />
  </div>
);
