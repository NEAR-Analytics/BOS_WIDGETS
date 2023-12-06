const fc = () => {
  Near.call("hello.near-examples.near", "set_greeting", { greeting: "hi" });
};

return (
  <>
    {context.accountId}
    <br />
    <button onClick={fc}> Set Greeting </button>
  </>
);
