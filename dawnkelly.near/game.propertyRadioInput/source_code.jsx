const weaponprop = props.weaponprop;

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
  <div>
    <div key={weaponprop.id}>
      <div className="row align-items-center">
        <div className="col">
          <span>{weaponprop.propertyName}:</span>
        </div>
        <div className="col">
          <div className="btn-group" role="group">
            <input
              type="radio"
              name={weaponprop.propertyName}
              id={`yes${weaponprop.propertyName}`}
              value="yes"
              className="btn-check"
              checked={value === "yes"}
              onChange={handleChange}
            />
            <label
              htmlFor={`yes${weaponprop.propertyName}`}
              className="btn btn-outline-primary"
            >
              Yes
            </label>

            <input
              type="radio"
              name={weaponprop.propertyName}
              id={`no${weaponprop.propertyName}`}
              value="no"
              className="btn-check"
              checked={value === "no"}
              onChange={handleChange}
            />
            <label
              htmlFor={`no${weaponprop.propertyName}`}
              className="btn btn-outline-primary"
            >
              No
            </label>
          </div>
        </div>
      </div>
    </div>
  </div>
);
