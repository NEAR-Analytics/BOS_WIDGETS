const username = props.username;
const action = props.action;
const componentName = props.componentName;
const timestamp = props.timestamp;
const desc = props.desc;

return (
  <div>
    <div>icon</div>
    <div>
      <span>{username}</span>
      <span>{action}</span>
      <span>{componentName}</span>
      <span>{timestamp}</span>
    </div>
    <div>{desc}</div>
  </div>
);
