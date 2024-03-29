const PropertyRadioInput = ({ propertyName, weapon, setWeapon }) => {
  const [value, setValue] = useState("");

  const handleChange = (event) => {
    const newValue = event.target.value;
    setValue(newValue);
    setWeapon((prevWeapon) => ({
      ...prevWeapon,
      metadata: {
        ...prevWeapon.metadata,
        [propertyName]:
          newValue === "yes" ? "yes" : prevWeapon.metadata[propertyName],
      },
    }));
  };

  return (
    <div className="row align-items-center">
      <div className="col">
        <span>{propertyName}:</span>
      </div>
      <div className="col">
        <div className="btn-group" role="group">
          <input
            type="radio"
            name={propertyName}
            id={`yes${propertyName}`}
            value="yes"
            className="btn-check"
            checked={value === "yes"}
            onChange={handleChange}
          />
          <label
            htmlFor={`yes${propertyName}`}
            className="btn btn-outline-primary"
          >
            Yes
          </label>

          <input
            type="radio"
            name={propertyName}
            id={`no${propertyName}`}
            value="no"
            className="btn-check"
            checked={value === "no"}
            onChange={handleChange}
          />
          <label
            htmlFor={`no${propertyName}`}
            className="btn btn-outline-primary"
          >
            No
          </label>
        </div>
      </div>
    </div>
  );
};
