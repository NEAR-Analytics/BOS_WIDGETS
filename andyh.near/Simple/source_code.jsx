const Hello = () => <span>hello</span>;
const World = () => (
  <>
    <span>
      <Hello />
    </span>
    world
  </>
);

return (
  <div>
    <World />
  </div>
);
