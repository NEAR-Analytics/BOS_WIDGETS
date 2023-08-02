State.init({
  view: "type",
});

const Button = styled.button``;

return (
  <div>
    <Button onClick={() => State.update({ view: "thing" })}>thing</Button>
    <Button onClick={() => State.update({ view: "type" })}>type</Button>
    <Button onClick={() => State.update({ view: "widget" })}>widget</Button>
    <h5>{`every ${state.view}`}</h5>
  </div>
);
