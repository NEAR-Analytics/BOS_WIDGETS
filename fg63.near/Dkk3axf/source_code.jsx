const contract = "hello.near-examples.near";

const setGreeting = () => {
  const res = Near.call(contract, "set_greeting", {
    greeting: Date.now().toString(),
  });
  console.log(res);
};

return (
  <div>
    <p>Hello World</p>
    <button onClick={() => setGreeting()}>Set</button>
  </div>
);
