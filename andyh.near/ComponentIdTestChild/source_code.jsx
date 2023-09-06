console.log(`RENDERING ${props.id}`);
return (
  <div>
    Hello {props.id}
    <button onClick={() => props.update()}>increment {props.value}</button>
  </div>
);
