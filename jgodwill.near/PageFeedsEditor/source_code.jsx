const pageFeedPattern = props.pageFeedPattern ?? "*/profile/feed/*";
const placeholder = props.placeholder ?? "Feeds";
const initialPageFeedsObject = props.initialPageFeedsObject || {};

const pageFeedsObject = Social.keys(pageFeedPattern, "final");
const pageFeedsArr = Social.keys("*/profile/*", "final");

if (pageFeedsObject === null || pageFeedsArr === null) {
  return "Loading";
}


console.log("initial Tags", pageFeedsObject);


// State.init({
//   account: accountId,
// });
const accounts = Object.entries(pageFeedsArr);

const allWidgets = [];

for (let i = 0; i < accounts.length; ++i) {
  const accountId = accounts[i][0];
  allWidgets.push(accountId);
}

// const pageFeedsCount = {};

// const processPageFeedObject = (obj) => {
//   Object.entries(obj).forEach((kv) => {
//     if (typeof kv[1] === "object") {
//       processPageFeedObject(kv[1]);
//     } else {
//       pageFeedsCount[pageFeed] = (pageFeedsCount[pageFeed] || 0) + 1;
//     }
//   });
// };

// const getpageFeeds = () => {
//   processPageFeedObject(pageFeedsObject);
//   const pageFeeds = Object.entries(pageFeedsCount);
//   pageFeeds.sort((a, b) => b[1] - a[1]);
//   return pageFeeds.map((t) => ({
//     name: t[0],
//     count: t[1],
//   }));
// };

// console.log(Object.keys(initialPageFeedsObject));
if (!state.allPageFeeds) {
  initState({
    allPageFeeds: allWidgets,
    pageFeeds: Object.keys(initialPageFeedsObject).map((pageFeed) => pageFeed),
    originalPageFeeds: Object.fromEntries(
      Object.keys(initialPageFeedsObject).map((pageFeed) => [pageFeed, null])
    ),
    id: `pageFeeds-selector-${Date.now()}`,
  });
  console.log("we'renot here", allPageFeeds);
}

const setPageFeeds = (pageFeeds) => {
  pageFeeds = pageFeeds.map((o) => {
    o = o;
    return o;
  });

  const newPageFeedsObject = Object.fromEntries(
    pageFeeds.map((pageFeed) => [pageFeed, ""])
  );
  const updatedPageFeedsObject = {
    ...state.originalPageFeeds,
    ...newPageFeedsObject,
  };

  State.update({ pageFeeds: pageFeeds });
  if (props.setPageFeedsObject) {
    props.setPageFeedsObject(updatedPageFeedsObject);
  }
};

return (
  <>
    <Typeahead
      id={state.id}
      multiple
      labelKey="name"
      onChange={setPageFeeds}
      options={state.allPageFeeds}
      placeholder={placeholder}
      selected={state.pageFeeds}
      positionFixed
      allowNew
    />
    {props.debug && (
      <div>
        Debugging pageFeeds:
        <pre>{JSON.stringify(state.pageFeeds)}</pre>
      </div>
    )}
  </>
);
