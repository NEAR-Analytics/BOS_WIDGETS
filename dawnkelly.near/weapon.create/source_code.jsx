const accountId = context.accountId;

const [ammunition, setAmmunition] = useState("");

const [weapon, setWeapon] = useState(() => {
  const initialData = Social.getr(`${accountId}/game/weapon`) ?? {
    metadata: {
      name: "",
      description: "",
      class: "",
      category: "",
      weight: "",
      cost: "",
      damage: "",
      ammunition: "",
      image: {},
    },
  };
  return initialData;
});

const handleNameChange = (e) => {
  const newName = e.target.value;
  setWeapon((prevWeapon) => ({
    ...prevWeapon,
    metadata: { ...prevWeapon.metadata, name: newName },
  }));
};

const handleImageChange = (newImage) => {
  setWeapon((prevWeapon) => ({
    ...prevWeapon,
    metadata: { ...prevWeapon.metadata, image: newImage },
  }));
};

const handleDescriptionChange = (e) => {
  const newDescription = e.target.value;
  setWeapon((prevWeapon) => ({
    ...prevWeapon,
    metadata: { ...prevWeapon.metadata, description: newDescription },
  }));
};

const handleAmmunitionChange = (event) => {
  const newValue = event.target.value;
  setAmmunition(newValue);
  setWeapon((prevWeapon) => ({
    ...prevWeapon,
    metadata: {
      ...prevWeapon.metadata,
      ammunition: newValue === "yes" ? "yes" : prevWeapon.metadata.ammunition,
    },
  }));
};

const handleTypeChange = (e) => {
  const newType = e.target.value;
  setWeapon((prevWeapon) => ({
    ...prevWeapon,
    metadata: { ...prevWeapon.metadata, type: newType },
  }));
};

const handleSizeChange = (e) => {
  const newSize = e.target.value;
  setWeapon((prevWeapon) => ({
    ...prevWeapon,
    metadata: { ...prevWeapon.metadata, size: newSize },
  }));
};

const handleChallengeChange = (e) => {
  const newChallenge = e.target.value;
  setWeapon((prevWeapon) => ({
    ...prevWeapon,
    metadata: { ...prevWeapon.metadata, challenge: newChallenge },
  }));
};

const handleArmorClassChange = (e) => {
  const newArmorClass = e.target.value;
  setWeapon((prevWeapon) => ({
    ...prevWeapon,
    metadata: { ...prevWeapon.metadata, armorClass: newArmorClass },
  }));
};

const handleHitPointsChange = (e) => {
  const newHitPoints = e.target.value;
  setWeapon((prevWeapon) => ({
    ...prevWeapon,
    metadata: { ...prevWeapon.metadata, hitPoints: newHitPoints },
  }));
};

const handleSave = () => {
  Social.set({
    game: { weapon },
  });
};

return (
  <div>
    <div className="m-2">
      <h4>Create A Weapon</h4>
      <p>
        You will have a chance to preview your data before saving your creation
      </p>
      <div className="mb-3 p-1">
        <label for="name">Name:</label>
        <input
          id="name"
          type="text"
          placeholder="What is the name of the weapon?"
          value={weapon.metadata.name}
          onChange={handleNameChange}
        />
      </div>
      <div className="col-auto">
        <label htmlFor="type">Type:</label>

        <div className="col">
          <input
            name="type"
            id="type"
            type="text"
            className="form-select"
            placeholder="What is the weapon type (club, rapier, etc)"
            value={weapon.metadata.type}
            onChange={handleTypeChange}
          ></input>
        </div>
      </div>
    </div>

    <h5 className="mb-2">Weapon Image</h5>
    <div className="p-1">
      <Widget
        src="mob.near/widget/ImageEditorTabs"
        props={{
          image: weapon.metadata.image,
          onChange: handleImageChange,
        }}
      />
    </div>
    <div className="mb-3 p-1">
      <label for="description">Description:</label>
      <input
        id="description"
        type="textarea"
        rows="4"
        cols="80"
        max-length="1200"
        placeholder="What is the weapon's description?"
        value={weapon.metadata.description}
        onChange={handleDescriptionChange}
      />
    </div>
    <div className="mb-3 p-1">
      <h5 className="mb-2 d-block">Class & Category</h5>
      <div className="row align-items-center">
        <div className="col">
          <label for="class">Class:</label>
          <select
            name="class"
            id="class"
            className="form-select"
            value={weapon.metadata.class}
            onChange={handleClassChange}
          >
            <option value="null">---</option>
            <option value="melee">Melee</option>
            <option value="range">Range</option>
          </select>
          <label for="category">Category:</label>
          <select
            name="category"
            id="category"
            className="form-select"
            value={weapon.metadata.category}
            onChange={handleCategoryChange}
          >
            <option value="null">---</option>
            <option value="simple">Simple</option>
            <option value="martial">Martial</option>
          </select>
        </div>
      </div>
    </div>
    <div className="mb-3 p-1">
      <span className="mb-2 d-block"></span>
      <div className="mb-3 p-1">
        <label for="weight">Weight:</label>
        <input
          id="weight"
          type="text"
          placeholder="What is the weapon's weight in pounds?"
          value={weapon.metadata.weight}
          onChange={handleWeightChange}
        />
      </div>

      <div className="mb-3 p-1">
        <label for="cost">Cost:</label>
        <input
          name="cost"
          id="cost"
          type="text"
          className="form-select"
          placeholder="Weapon cost (in gold pieces)"
          value={weapon.metadata.cost}
          onChange={handleCostChange}
        ></input>
      </div>

      <div className="mb-3 p-1">
        <label for="damage">Damage:</label>
        <input
          id="damage"
          type="number"
          placeholder="How much damage does the weapon deal?"
          value={weapon.metadata.damage}
          onChange={handleDamageChange}
        />
      </div>
    </div>
    <div className="mb-3 p-1">
      <h5>Weapon Properties:</h5>
      <p>Select 'yes' for properties you want to assign to this weapon.</p>

      <div className="row align-items-center">
        <div className="col">
          <span>Ammunition:</span>
        </div>
        <div className="col">
          <div className="btn-group" role="group">
            <input
              type="radio"
              name="ammunition"
              id="yesAmmunition"
              value="yes"
              className="btn-check"
              checked={ammunition === "yes"}
              onChange={handleAmmunitionChange}
            />
            <label htmlFor="yesAmmunition" className="btn btn-outline-primary">
              Yes
            </label>

            <input
              type="radio"
              name="ammunition"
              id="noAmmunition"
              value="no"
              className="btn-check"
              checked={ammunition === "no"}
              onChange={handleAmmunitionChange}
            />
            <label htmlFor="noAmmunition" className="btn btn-outline-primary">
              No
            </label>
          </div>
        </div>
      </div>
    </div>
    <div className="m-3">
      <hr />
      <h5 className="mb-2">Preview</h5>
      <p>If you are happy with your creation, be sure to click 'Save'</p>
      <Widget
        src="dawnkelly.near/widget/weapon.inline"
        props={{
          accountId,
          weapon,
        }}
      />
    </div>
    <hr />
    <div className="m-2">
      <div className="m-3">
        <button
          className="btn btn-outline-success"
          disabled={!context.accountId}
          onClick={handleSave}
        >
          Save
        </button>
      </div>
    </div>
  </div>
);
