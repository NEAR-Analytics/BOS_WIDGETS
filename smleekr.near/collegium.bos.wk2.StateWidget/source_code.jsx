State.init({
  msg: false,
});

const toggle = (_) => {
  State.update({
    msg: !state.msg,
  });
};

return (
  <div>
    <p>turn {state.msg === true ? "on" : "off"}</p>
    <button onClick={toggle}>switch</button>
  </div>
);
