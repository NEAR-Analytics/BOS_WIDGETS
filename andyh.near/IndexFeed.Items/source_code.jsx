const { manual, reverse, fetchMore, items, hasMore } = props;
const makeMoreItems = useComponentCallback(props.makeMoreItems);
const renderItems = useComponentCallback(props.renderItems, items);
const renderedItems = renderItems();
console.log();

return props.manual ? (
  <>
    {reverse && fetchMore}
    {renderedItems}
    {!reverse && fetchMore}
  </>
) : (
  <InfiniteScroll
    pageStart={0}
    loadMore={makeMoreItems}
    hasMore={hasMore}
    loader={
      <div className="loader">
        <span
          className="spinner-grow spinner-grow-sm me-1"
          role="status"
          aria-hidden="true"
        />
        Loading ...
      </div>
    }
  >
    {props.headerElement}
    {renderedItems}
    {props.footerElement}
  </InfiniteScroll>
);
