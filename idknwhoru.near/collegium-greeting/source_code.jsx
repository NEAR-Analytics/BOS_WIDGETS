State.init({
  message: "Hello, Collegium",
});

const handleClike = (_) => {
  State.update({
    message: "You Clicked.",
  });
};

return (
  <>
    <button onClick={handleClike}>CLICK ME</button>
    <h1>{state.message}</h1>
  </>
);
