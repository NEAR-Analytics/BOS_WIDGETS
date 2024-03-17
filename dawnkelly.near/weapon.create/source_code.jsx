const accountId = context.accountId;

const [weapon, setWeapon] = useState(() => {
  const initialData = Social.getr(`${accountId}/game/weapon`) ?? {
    metadata: {
      name: "",
      description: "",
      morals: "",
      ethics: "",
      type: "",
      size: "",
      challenge: "",
      armorClass: "",
      hitPoints: "",
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

const handleMoralsChange = (e) => {
  const newMorals = e.target.value;
  setWeapon((prevWeapon) => ({
    ...prevWeapon,
    metadata: { ...prevWeapon.metadata, morals: newMorals },
  }));
};

const handleEthicsChange = (e) => {
  const newEthics = e.target.value;
  setWeapon((prevWeapon) => ({
    ...prevWeapon,
    metadata: { ...prevWeapon.metadata, ethics: newEthics },
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

        <div className="col-auto">
          <label htmlFor="type">Type:</label>

          <div className="col">
            <select
              name="type"
              id="type"
              className="form-select"
              value={weapon.metadata.type}
              onChange={handleTypeChange}
            >
              <option value="null">---</option>
              <option value="abberation">Abberation</option>
              <option value="beast">Beast</option>
              <option value="celestial">Celestial</option>
              <option value="dragon">Dragon</option>
              <option value="elemental">Elemental</option>
              <option value="fey">Fey</option>
              <option value="fiend">Fiend</option>
              <option value="giant">Giant</option>
              <option value="humanoid">Humanoid</option>
              <option value="monstrosity">Monstrosity</option>
              <option value="ooze">Ooze</option>
              <option value="plant">Plant</option>
              <option value="undead">Undead</option>
            </select>
          </div>
        </div>
      </div>

      <div className="mb-3 p-1">
        <label for="size">Size:</label>
        <select
          name="size"
          id="size"
          className="form-select"
          value={weapon.metadata.size}
          onChange={handleSizeChange}
        >
          <option value="null">---</option>
          <option value="tiny">Tiny</option>
          <option value="small">Small</option>
          <option value="medium">Medium</option>
          <option value="large">Large</option>
          <option value="huge">Huge</option>
          <option value="gargantuan">Gargantuan</option>
        </select>
      </div>
      <div className="mb-3 p-1">
        <label for="challenge">Challenge:</label>
        <input
          id="challenge"
          type="number"
          min="0"
          max="30"
          placeholder="What is the weapon's challenge level?"
          value={weapon.metadata.challenge}
          onChange={handleChallengeChange}
        />
      </div>
      <div className="mb-3 p-1">
        <label for="armorClass">Armor Class:</label>
        <input
          id="armorClass"
          type="number"
          min="0"
          max="25"
          placeholder="What is the weapon's armor class?"
          value={weapon.metadata.armorClass}
          onChange={handleArmorClassChange}
        />
      </div>
    </div>
    <div className="mb-3 p-1">
      <label for="hitPoints">HP:</label>
      <input
        name="hitPoints"
        id="hitPoints"
        type="number"
        min="0"
        placeholder="What is the weapon's HP?"
        value={weapon.metadata.hitPoints}
        onChange={handleHitPointsChange}
      />
    </div>
    <div className="m-3">
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
