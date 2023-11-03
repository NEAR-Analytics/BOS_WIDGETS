const [value, setValue] = useState(null);

return (
  <>
    <h1>{value + ""}</h1>
    <Widget
      src="andyh.near/widget/NestedProps.Child"
      props={{
        incrementByOne: (fn) => {
          fn();
          setValue((v) => v + 1);
        },
        arr: ["oh", "hi", () => "there"],
        byTen: {
          increment: (fn) => {
            fn(value);
            setValue((v) => v + 10);
          },
        },
      }}
    />
  </>
);
