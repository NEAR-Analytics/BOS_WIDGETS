const store =
  Storage.get("mykey") ||
  "write here and click outside to save text on storage";

return (
  <div>
    <input
      placeholder={store}
      onBlur={({ target }) => {
        const a = Storage.set("mykey", target.value);
        const b = Storage.get("mykey");
        console.log(a, b);
      }}
    />
  </div>
);
