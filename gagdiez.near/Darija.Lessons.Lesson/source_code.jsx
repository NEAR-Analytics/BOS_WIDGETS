const indexed = Social.index("knowledge", "darija", { order: "desc" });

if (!indexed) return "Loading ...";

// find the index that matches the indexed.value.uuid == props.knowledg
let toQuery = indexed.find(
  (item) => String(item.value.uuid) === String(props.uuid)
);

const known = Social.get("gagdiez.near/knowledge", toQuery.blockHeight);

if (!known) return "Loading ...";

const { title, knowledge } = JSON.parse(known);
const evaluator = props.evaluator;

return <Widget src={evaluator} props={{ knowledge }} />;
