const builderNameId = `builderName-${index}`;
const builderRoleId = `builderRole-${index}`;

return (
  <div className="row align-items-center">
    <div className="col-md-4 mb-3">
      <label htmlFor={builderNameId}>Name:</label>
      <input
        id={builderNameId}
        type="text"
        className="form-control"
        placeholder="Builder name"
        value={builders[index].name}
        onChange={(e) => handleNameChange(e, index)}
      />
    </div>
    <div className="col-md-4 mb-3">
      <label htmlFor={builderRoleId}>Role:</label>
      <input
        id={builderRoleId}
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
);
