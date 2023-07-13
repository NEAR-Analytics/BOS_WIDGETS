const greeting = props.greeting;

State.init({ name: "Victor" }); // React state

return (
  <>
    <div class="container" />
    <h1 style={{ textAlign: "center" }}>Welcome</h1>

    <h3 style={{ textAlign: "center" }}>
      Submit proposals, Connect and earn rewards!
    </h3>
    <br />
    <br />
    <h3>
      {greeting} {state.name} 🥳
    </h3>
    <br />
    <br />

    <br></br>
    <h2 className="container">Submit your proposal</h2>

    <div>
      <label> Your Name: </label>
      <input
        type="text"
        onChange={(e) => State.update({ name: e.target.value })}
        id="name"
        placeholder="Enter your name"
      />

      <br />

      <label> Name of Game: </label>
      <input
        type="text"
        onChange={(e) => State.update({ name: e.target.value })}
        id="gameName"
        placeholder="Enter the name of game"
      />
      <br />

      <label> Issue: </label>
      <input type="text" placeholder="Describe the issue" />

      <br />

      <button type="button">Submit Proposal</button>
    </div>

    <br></br>

    <div class="col-10">
      <Widget
        src="near/widget/NestedDiscussions"
        props={{ identifier: "Hello" }}
      />
    </div>
  </>
);
