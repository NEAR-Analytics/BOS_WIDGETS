const path = props.path;
const blockHeight = props.blockHeight;

const thing = JSON.parse(Social.get(path, blockHeight) || "null");
const type = thing.type;
const typeObj = JSON.parse(Social.get(thing.type, blockHeight) || "null");

const accountId = context.accountId;

if (accountId === null) {
  return "please login to a near account";
}

const Button = styled.button`
  margin-left: 5px;
`;

State.init({
  components: [],
});

function handleApply() {
  const thing = {};
  const blocks = [];

  state.components?.forEach((entry) => {
    if (entry.type !== "embed") {
      const entryId = Math.random();
      thing[entryId] = JSON.stringify({
        data: entry.value,
        type: entry.type,
      });
      blocks.push(`${accountId}/thing/${entryId}`);
    } else {
      blocks.push(entry.value);
    }
  });
  if (onChange) {
    onChange(blocks);
  } else {
    console.log(blocks);
  }
}

function handleTypeClick(type) {
  State.update({ components: [...state.components, { type }] });
}

function handleDeleteClick(index) {
  const updatedComponents = [...state.components];
  updatedComponents.splice(index, 1);
  State.update({ components: updatedComponents });
}

function handleMoveUpClick(index) {
  if (index > 0) {
    const updatedComponents = [...state.components];
    const component = updatedComponents[index];
    updatedComponents.splice(index, 1);
    updatedComponents.splice(index - 1, 0, component);
    State.update({ components: updatedComponents });
  }
}

function handleMoveDownClick(index) {
  if (index < state.components.length - 1) {
    const updatedComponents = [...state.components];
    const component = updatedComponents[index];
    updatedComponents.splice(index, 1);
    updatedComponents.splice(index + 1, 0, component);
    State.update({ components: updatedComponents });
  }
}

function RenderComponent({ component, index }) {
  const isTop = index === 0;
  const isBottom = index === state.components.length - 1;
  let widgetSrc;
  if (component.type === "embed") {
    widgetSrc = "efiz.near/widget/Every.Thing.Embed";
  } else {
    // const type = JSON.parse(Social.get(component.type, "final") || "null");
    widgetSrc = "efiz.near/widget/creator";
  }

  const handleComponentChange = (value) => {
    const updatedComponents = [...state.components];
    updatedComponents[index] = {
      ...updatedComponents[index],
      value,
    };
    State.update({ components: updatedComponents });
  };

  return (
    <div>
      <p>{JSON.stringify(component)}</p>
      <Widget
        src={widgetSrc}
        props={{
          data: component.value,
          type: component.type,
          onChange: handleComponentChange,
        }}
      />
      <Button onClick={() => handleDeleteClick(index)}>Delete</Button>
      <Button onClick={() => handleMoveUpClick(index)} disabled={isTop}>
        &uarr;
      </Button>
      <Button onClick={() => handleMoveDownClick(index)} disabled={isBottom}>
        &darr;
      </Button>
    </div>
  );
}

return (
  <div>
    <Button onClick={() => handleTypeClick("efiz.near/type/community")}>
      Add Community
    </Button>
    <Button onClick={() => handleTypeClick("every.near/type/feed")}>
      Add Feed
    </Button>
    <Button onClick={() => handleTypeClick("embed")}>Embed Thing</Button>
    {state.components?.map((component, index) => (
      <RenderComponent key={index} component={component} index={index} />
    ))}
    <Button onClick={handleApply}>apply</Button>
  </div>
);
