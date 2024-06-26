const addressForComments = "mpipComment";
const addressForProposals = "mpip";
const authorId = "rodrigos.near";
const index = props.index;
if (!index) {
  return "props.index is not defined";
}

const renderItem =
  props.renderItem ??
  ((item, i) => (
    <div key={i}>
      #{item.blockHeight}: {JSON.stringify(item)}
    </div>
  ));
const cachedRenderItem = (item, i) => {
  const key = JSON.stringify(item);

  if (!(key in state.cachedItems)) {
    state.cachedItems[key] = renderItem(item, i);
    State.update();
  }
  return state.cachedItems[key];
};

index.options = index.options || {};
const initialRenderLimit =
  props.initialRenderLimit ?? index.options.limit ?? 10;
const addDisplayCount =
  props.nextLimit ?? initialRenderLimit ?? index.options.limit;

index.options.limit = Math.min(
  Math.max(initialRenderLimit + addDisplayCount, index.options.limit),
  100
);
const reverse = !!props.reverse;

const initialItems = Social.index(index.action, index.key, index.options);

if (initialItems === null) {
  return "";
}

const computeFetchFrom = (items, limit) => {
  if (!items || items.length < limit) {
    return false;
  }
  const blockHeight = items[items.length - 1].blockHeight;
  return index.options.order === "desc" ? blockHeight - 1 : blockHeight + 1;
};

const mergeItems = (newItems) => {
  const items = [
    ...new Set([...newItems, ...state.items].map((i) => JSON.stringify(i))),
  ].map((i) => JSON.parse(i));
  items.sort((a, b) => a.blockHeight - b.blockHeight);
  if (index.options.order === "desc") {
    items.reverse();
  }
  return items;
};

const jInitialItems = JSON.stringify(initialItems);
if (state.jInitialItems !== jInitialItems) {
  const jIndex = JSON.stringify(index);
  if (jIndex !== state.jIndex) {
    State.update({
      jIndex,
      jInitialItems,
      items: initialItems,
      fetchFrom: false,
      nextFetchFrom: computeFetchFrom(initialItems, index.options.limit),
      displayCount: initialRenderLimit,
      cachedItems: {},
    });
  } else {
    State.update({
      jInitialItems,
      items: mergeItems(initialItems),
    });
  }
}

if (state.fetchFrom) {
  const limit = addDisplayCount;
  const newItems = Social.index(
    index.action,
    index.key,
    Object.assign({}, index.options, {
      from: state.fetchFrom,
      subscribe: undefined,
      limit,
    })
  );
  if (newItems !== null) {
    State.update({
      items: mergeItems(newItems),
      fetchFrom: false,
      nextFetchFrom: computeFetchFrom(newItems, limit),
    });
  }
}

const makeMoreItems = () => {
  State.update({
    displayCount: state.displayCount + addDisplayCount,
  });
  if (
    state.items.length - state.displayCount < addDisplayCount &&
    !state.fetchFrom &&
    state.nextFetchFrom &&
    state.nextFetchFrom !== state.fetchFrom
  ) {
    State.update({
      fetchFrom: state.nextFetchFrom,
    });
  }
};

const fetchMore =
  state.fetchFrom && state.items.length < state.displayCount ? (
    <div className="loader" key={"loader"}>
      <span
        className="spinner-grow spinner-grow-sm me-1"
        role="status"
        aria-hidden="true"
      />
      Loading ...
    </div>
  ) : (
    state.displayCount < state.items.length && (
      <div key={"loader more"}>
        <a href="javascript:void" onClick={(e) => makeMoreItems()}>
          {props.loadMoreText ?? "Load more..."}
        </a>
      </div>
    )
  );

const items = state.items ? state.items.slice(0, state.displayCount) : [];
if (reverse) {
  items.reverse();
}

return (
  <>
    {reverse && fetchMore}
    {items.map(cachedRenderItem)}
    {!reverse && fetchMore}
  </>
);
