const Hello = () => <span>hello</span>;
const World = () => (
  <span>
    <Hello /> world
  </span>
);

return (
  <div>
    <World />
  </div>
);
