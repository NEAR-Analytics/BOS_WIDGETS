const builderNameId = `builderName-${index}`;
const builderRoleId = `builderRole-${index}`;

return (
  <div className="row">
    <div className="col-md-6 mb-3">
      <label htmlFor={builderNameId}>Name:</label>
      <input
        id={builderNameId}
        type="text"
        className="form-control"
        placeholder="Builder name"
        onChange={(e) => handleNameChange(e, index)}
      />
    </div>
    <div className="col-md-6 mb-3">
      <label htmlFor={builderRoleId}>Role:</label>
      <input
        id={builderRoleId}
        type="text"
        className="form-control"
        placeholder="Builder role"
        onChange={(e) => handleRoleChange(e, index)}
      />
    </div>
  </div>
);
