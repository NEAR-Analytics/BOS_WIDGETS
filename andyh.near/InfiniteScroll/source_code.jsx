const [items, setItems] = useState([]);

const randomize = new Array(10).fill().map(() => Math.random());

useEffect(() => {
  setItems(randomize());
}, []);

return (
  <InfiniteScroll
    hasMore={true}
    next={() => setItems((currentItems) => [...currentItems, randomize()])}
    loader={<h4>loading...</h4>}
  >
    {items.map((n) => (
      <span>{n}</span>
    ))}
  </InfiniteScroll>
);
