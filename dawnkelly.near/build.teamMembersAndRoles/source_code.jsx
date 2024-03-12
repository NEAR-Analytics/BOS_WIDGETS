const [builders, setBuilders] = useState([{ name: "", role: "" }]);

const handleNameChange = (e, index) => {
  const { value } = e.target;
  const updatedBuilders = [...builders];
  updatedBuilders[index].name = value;
  setBuilders(updatedBuilders);
};

const handleRoleChange = (e, index) => {
  const { value } = e.target;
  const updatedBuilders = [...builders];
  updatedBuilders[index].role = value;
  setBuilders(updatedBuilders);
};

const addBuilder = () => {
  setBuilders([...builders, { name: "", role: "" }]);
};

return (
  <div>
    <h3>Team Members and Roles</h3>
    {builders.map((builder, index) => (
      <Widget
        src="dawnkelly.near/widget/build.builderInput"
        key={index}
        index={index}
        handleNameChange={handleNameChange}
        handleRoleChange={handleRoleChange}
      />
    ))}
    <button onClick={addBuilder}>Add Builder</button>
  </div>
);
