const Hello = () => <span>hello</span>;
const World = () => (
  <span>
    <Hello />
  </span>
);

return (
  <div>
    <World />
  </div>
);
