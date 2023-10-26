const [value, setValue] = useState(null);

return (
  <>
    <Widget
      src="andyh.near/widget/NestedProps.Child"
      props={{
        spaghetti: 1,
        //   incrementByOne: () => setValue((v) => v + 1),
      }}
    />
  </>
);
