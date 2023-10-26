const [value, setValue] = useState(null);

return (
  <>
    <Widget
      src="andyh.near/widget/NestedProps.Child"
      props={{
        incrementByOne: () => setValue((v) => v + 1),
      }}
    />
  </>
);
