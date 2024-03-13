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

const handleDeleteBuilder = (index) => {
  setBuilders((prevBuilders) => {
    const updatedBuilders = [...prevBuilders];
    updatedBuilders.splice(index, 1);
    return updatedBuilders;
  });
};

return (
  <div>
    <h3>Team Members and Roles</h3>
    {builders.map((builder, index) => (
      <div key={index} className="row align-items-center mb-3">
        <div className="col-md-4">
          <label htmlFor={`builderName-${index}`}>Name:</label>
          <input
            id={`builderName-${index}`}
            type="text"
            className="form-control"
            placeholder="Builder name"
            value={builder.name}
            onChange={(e) => handleNameChange(e, index)}
          />
        </div>
        <div className="col-md-4">
          <label htmlFor={`builderRole-${index}`}>Role:</label>
          <input
            id={`builderRole-${index}`}
            type="text"
            className="form-control"
            placeholder="Builder role"
            value={builder.role}
            onChange={(e) => handleRoleChange(e, index)}
          />
        </div>
        <div className="col-md-2 d-flex align-self-center">
          <button
            className="btn btn-danger"
            onClick={() => handleDeleteBuilder(index)}
          >
            Delete
          </button>
        </div>
      </div>
    ))}
    <button onClick={addBuilder}>Add Builder</button>
  </div>
);
