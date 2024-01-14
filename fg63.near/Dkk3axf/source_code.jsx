const contract = "hello.near-examples.near";

State.init({
  greeting: "hi",
});

const setGreeting = () => {
  const value = Date.now().toString();
  const res = Near.call(contract, "set_greeting", {
    greeting: value,
  });
  State.update({ greeting: value });
};

return (
  <div>
    <p>{state.greeting}</p>
    <button onClick={() => setGreeting()}>Set</button>
  </div>
);
