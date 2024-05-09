const [teamMembers, setTeamMembers] = useState([{ name: "", role: "" }]);

const handleBuilderNameChange = (index, e) => {
  const { value } = e.target;
  setTeamMembers((prevTeamMembers) => {
    const updatedTeamMembers = [...prevTeamMembers];
    updatedTeamMembers[index].name = value;
    return updatedTeamMembers;
  });
};

const handleBuilderRoleChange = (index, e) => {
  const { value } = e.target;
  setTeamMembers((prevTeamMembers) => {
    const updatedTeamMembers = [...prevTeamMembers];
    updatedTeamMembers[index].role = value;
    return updatedTeamMembers;
  });
};

const addBuilder = () => {
  setTeamMembers([...teamMembers, { name: "", role: "" }]);
};

const handleDeleteBuilder = (index) => {
  setTeamMembers((prevTeamMembers) => {
    const updatedTeamMembers = [...prevTeamMembers];
    updatedTeamMembers.splice(index, 1);
    return updatedTeamMembers;
  });
};

return (
  <div>
    <h3>Team Members and Roles</h3>
    {builders.map((builder, index) => (
      <div className="row align-items-center mb-3" key={index}>
        <div className="col-md-4">
          <label htmlFor={`builderName-${index}`}>Name:</label>
          <input
            id={`builderName-${index}`}
            type="text"
            className="form-control"
            placeholder="Builder name"
            value={builders[index].name}
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
            value={builders[index].role}
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
