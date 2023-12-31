const [value, setValue] = useState(null);

return (
  <>
    <h1>{value + ""}</h1>
    <button className="btn btn-warning" onClick={() => setValue(0)}>
      reset
    </button>
    <Widget
      src="andyh.near/NestedProps.Child"
      props={{
        incrementByOne: (fn) => {
          console.log("incrementByOne(fn)");
          fn();
          setValue((v) => v + 1);
        },
        arr: ["oh", "hi", (n) => "there, " + n?.toString()],
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
