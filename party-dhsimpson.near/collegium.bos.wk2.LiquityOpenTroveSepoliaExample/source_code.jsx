State.init({
  message: "hello, Collegium",
});

const handleClick = (_) => {
  State.update({
    message: "You Clicked",
  });
};
Sta;

return (
  <>
    <button onClick={handleClick}>Click Me</button>
    <h1>{state.message}</h1>
    <Widget src="idknwhoru.near/widget/collegium-greeting" props={{}} />
    <Widget
      src="idknwhoru.near/widget/collegium.bos.wk3.PostEditor"
      props={{}}
    />
  </>
);
