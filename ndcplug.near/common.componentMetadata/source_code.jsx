let url =
  props.url ??
  "https://raw.githubusercontent.com/NEARBuilders/BuildDAO/main/BOSHunt/HUMAN.json"; // better to make this a prop
let title = props.title ?? "Human Components";
let description =
  props.decscription ??
  "Components that leverage NDC i-am-human SBT registry contract";

function loadComponents() {
  const res = fetch(url);
  return res.body && JSON.parse(res.body);
}

const componentList = loadComponents();
if (!componentList) {
  return "⧗ Loading Components...";
}
const componentNumber = componentList.components.length;

return (
  <div>
    <h1>{title}</h1>
    <p>{description}</p>{" "}
    {componentList.components.map((component) => (
      <Widget
        src="banyanq2.near/widget/ComponentMetadata"
        props={{ src: component }}
      />
    ))}{" "}
  </div>
);
