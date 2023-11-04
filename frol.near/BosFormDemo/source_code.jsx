// This is just a small demo of implementing forms on BOS.
// See the browser inspector console output to see the console.log output.

State.init({
  username: "",
  password: "",
});

const submitForm = () => {
  console.log("form:", state.username, state.password);
};

return (
  <>
    <div>
      <input
        type="text"
        id="username"
        value={state.username}
        onChange={(e) => {
          State.update({ [e.target.id]: e.target.value });
        }}
      />
      <input
        type="password"
        id="password"
        value={state.password}
        onChange={(e) => {
          State.update({ [e.target.id]: e.target.value });
        }}
      />
      <input type="submit" value="Submit form" onClick={submitForm} />
    </div>
  </>
);
