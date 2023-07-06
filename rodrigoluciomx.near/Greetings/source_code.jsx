const greeting = props.greeting;

State.init({
  name: "Rodrigo",
});

return (
  <>
    <div>Hello World</div>
    <div class="container">Welcome {state.name}</div>
    <input
      type="text"
      onChange={(e) =>
        State.update({
          name: e.target.value,
        })
      }
    />
  </>
);
