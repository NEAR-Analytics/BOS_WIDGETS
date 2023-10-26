const [value, setValue] = useState(null);

return (
  <>
    <h1>{value + ""}</h1>
    <Widget
      src="andyh.near/widget/NestedProps.Child"
      props={{
        incrementByOne: () => setValue((v) => v + 1),
      }}
    />
  </>
);
