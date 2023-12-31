const { title, knowledge } = JSON.parse(
  Social.get("gagdiez.near/knowledge", props.knowledge)
);
const evaluator = props.evaluator;

return <Widget src={evaluator} props={{ knowledge }} />;
