const ctx = JSON.parse(props.ctx);

return <button onClick={() => console.log(ctx)}>{ctx.authorUsername}</button>;
