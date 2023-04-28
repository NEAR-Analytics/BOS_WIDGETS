const { nyname } = state;
console.log("000000000000-test2组件更新了");
return (
  <div>
    <button
      onClick={() => {
        State.update({
          nyname: "nature",
        });
      }}
    >
      {nyname} click me
    </button>
    Hello World
  </div>
);
