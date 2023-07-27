State.init({
  hello: 0,
});

const b = VM.require("sking.near/widget/module-test-hello");

b.hello();

setTimeout(() => {
  State.update({ hello: 1 + state.hello });
}, 1000);

return <div>Hello {state.hello}</div>;
