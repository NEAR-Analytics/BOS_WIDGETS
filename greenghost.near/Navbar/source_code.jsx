State.init({
  view: "",
});

const Button = styled.button``;

return (
  <div>
    <Button onClick={() => State.update({ view: "thing will change" })}>
      Team
    </Button>

    <Button
      onClick={() =>
        State.update({
          view: "TBC",
        })
      }
    >
      Vision
    </Button>

    <Button
      onClick={() =>
        State.update({
          view: "Creative heads.",
        })
      }
    >
      {" "}
      About Us
    </Button>
    <h5>{state.view}</h5>
  </div>
);
