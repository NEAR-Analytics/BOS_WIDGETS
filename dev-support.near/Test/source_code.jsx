const go = () => {
  const gas = 30000000000000;
  const yoctoNear = 2;
  const res = Near.call(
    "hello.near-examples.near",
    "set_greeting",
    { greeting: "hi" },
    gas,
    yoctoNear
  );
};

console.log(props);

return (
  <>
    {JSON.stringify(props)}
    <button onClick={go}> GO </button>
  </>
);
