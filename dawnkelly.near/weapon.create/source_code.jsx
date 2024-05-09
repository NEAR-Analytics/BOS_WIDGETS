const accountId = context.accountId;

const [ammunition, setAmmunition] = useState("");
const [finesse, setFinesse] = useState("");
const [heavy, setHeavy] = useState("");
const [light, setLight] = useState("");
const [loading, setLoading] = useState("");
const [reach, setReach] = useState("");
const [special, setSpecial] = useState("");
const [thrown, setThrown] = useState("");
const [twoHanded, setTwoHanded] = useState("");
const [versatile, setVersatile] = useState("");
const [silvered, setSilvered] = useState("");

// handlers for property selector buttons

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

const handleFinesseChange = (event) => {
  const newValue = event.target.value;
  setFinesse(newValue);
  setWeapon((prevWeapon) => ({
    ...prevWeapon,
    metadata: {
      ...prevWeapon.metadata,
      finesse: newValue === "yes" ? "yes" : prevWeapon.metadata.finesse,
    },
  }));
};

const handleHeavyChange = (event) => {
  const newValue = event.target.value;
  setHeavy(newValue);
  setWeapon((prevWeapon) => ({
    ...prevWeapon,
    metadata: {
      ...prevWeapon.metadata,
      heavy: newValue === "yes" ? "yes" : prevWeapon.metadata.heavy,
    },
  }));
};

const handleLightChange = (event) => {
  const newValue = event.target.value;
  setLight(newValue);
  setWeapon((prevWeapon) => ({
    ...prevWeapon,
    metadata: {
      ...prevWeapon.metadata,
      light: newValue === "yes" ? "yes" : prevWeapon.metadata.light,
    },
  }));
};

const handleLoadingChange = (event) => {
  const newValue = event.target.value;
  setLoading(newValue);
  setWeapon((prevWeapon) => ({
    ...prevWeapon,
    metadata: {
      ...prevWeapon.metadata,
      loading: newValue === "yes" ? "yes" : prevWeapon.metadata.loading,
    },
  }));
};

const handleReachChange = (event) => {
  const newValue = event.target.value;
  setReach(newValue);
  setWeapon((prevWeapon) => ({
    ...prevWeapon,
    metadata: {
      ...prevWeapon.metadata,
      reach: newValue === "yes" ? "yes" : prevWeapon.metadata.reach,
    },
  }));
};

const handleSpecialChange = (event) => {
  const newValue = event.target.value;
  setSpecial(newValue);
  setWeapon((prevWeapon) => ({
    ...prevWeapon,
    metadata: {
      ...prevWeapon.metadata,
      special: newValue === "yes" ? "yes" : prevWeapon.metadata.special,
    },
  }));
};

const handleThrownChange = (event) => {
  const newValue = event.target.value;
  setThrown(newValue);
  setWeapon((prevWeapon) => ({
    ...prevWeapon,
    metadata: {
      ...prevWeapon.metadata,
      thrown: newValue === "yes" ? "yes" : prevWeapon.metadata.thrown,
    },
  }));
};

const handleTwoHandedChange = (event) => {
  const newValue = event.target.value;
  setTwoHanded(newValue);
  setWeapon((prevWeapon) => ({
    ...prevWeapon,
    metadata: {
      ...prevWeapon.metadata,
      twoHanded: newValue === "yes" ? "yes" : prevWeapon.metadata.twoHanded,
    },
  }));
};

const handleSilveredChange = (event) => {
  const newValue = event.target.value;
  setSilvered(newValue);
  setWeapon((prevWeapon) => ({
    ...prevWeapon,
    metadata: {
      ...prevWeapon.metadata,
      silvered: newValue === "yes" ? "yes" : prevWeapon.metadata.silvered,
    },
  }));
};

const handleVersatileChange = (event) => {
  const newValue = event.target.value;
  setVersatile(newValue);
  setWeapon((prevWeapon) => ({
    ...prevWeapon,
    metadata: {
      ...prevWeapon.metadata,
      versatile: newValue === "yes" ? "yes" : prevWeapon.metadata.versatile,
    },
  }));
};

const [weapon, setWeapon] = useState(() => {
  const initialData = Social.getr(`${accountId}/game/weapon`) ?? {
    metadata: {
      name: "",
      type: "",
      description: "",
      class: "",
      category: "",
      weight: "",
      cost: "",
      damage: "",

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

const handleWeightChange = (e) => {
  const newWeight = e.target.value;
  setWeapon((prevWeapon) => ({
    ...prevWeapon,
    metadata: { ...prevWeapon.metadata, weight: newWeight },
  }));
};

const handleCostChange = (e) => {
  const newCost = e.target.value;
  setWeapon((prevWeapon) => ({
    ...prevWeapon,
    metadata: { ...prevWeapon.metadata, cost: newCost },
  }));
};

const handleTypeChange = (e) => {
  const newType = e.target.value;
  setWeapon((prevWeapon) => ({
    ...prevWeapon,
    metadata: { ...prevWeapon.metadata, type: newType },
  }));
};

const handleDamageChange = (e) => {
  const newDamage = e.target.value;
  setWeapon((prevWeapon) => ({
    ...prevWeapon,
    metadata: { ...prevWeapon.metadata, damage: newDamage },
  }));
};

const handleClassChange = (e) => {
  const newClass = e.target.value;
  setWeapon((prevWeapon) => ({
    ...prevWeapon,
    metadata: { ...prevWeapon.metadata, class: newClass },
  }));
};

const handleCategoryChange = (e) => {
  const newCategory = e.target.value;
  setWeapon((prevWeapon) => ({
    ...prevWeapon,
    metadata: { ...prevWeapon.metadata, category: newCategory },
  }));
};

const handleSave = () => {
  Social.set({
    game: { weapon },
    index: {
      createWeapon: JSON.stringify({ key: "create", value: "weapon" }),
    },
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
        <label htmlFor="name">Name:</label>
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
      <label htmlFor="description">Description:</label>
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
          <label htmlFor="class">Class:</label>
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
          <label htmlFor="category">Category:</label>
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
        <label htmlFor="weight">Weight:</label>
        <input
          name="weight"
          id="weight"
          type="text"
          placeholder="What is the weapon's weight in pounds?"
          value={weapon.metadata.weight}
          onChange={handleWeightChange}
        />
      </div>

      <div className="mb-3 p-1">
        <label htmlFor="cost">Cost:</label>
        <input
          name="cost"
          id="cost"
          type="text"
          placeholder="Weapon cost (in gold pieces)"
          value={weapon.metadata.cost}
          onChange={handleCostChange}
        />
      </div>

      <div className="mb-3 p-1">
        <label htmlFor="damage">Damage:</label>
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

      <div className="row align-items-center">
        <div className="col">
          <span>Finesse:</span>
        </div>
        <div className="col">
          <div className="btn-group" role="group">
            <input
              type="radio"
              name="finesse"
              id="yesFinesse"
              value="yes"
              className="btn-check"
              checked={finesse === "yes"}
              onChange={handleFinesseChange}
            />
            <label htmlFor="yesFinesse" className="btn btn-outline-primary">
              Yes
            </label>

            <input
              type="radio"
              name="finesse"
              id="noFinesse"
              value="no"
              className="btn-check"
              checked={finesse === "no"}
              onChange={handleFinesseChange}
            />
            <label htmlFor="noFinesse" className="btn btn-outline-primary">
              No
            </label>
          </div>
        </div>
      </div>
      <div className="row align-items-center">
        <div className="col">
          <span>Heavy:</span>
        </div>
        <div className="col">
          <div className="btn-group" role="group">
            <input
              type="radio"
              name="heavy"
              id="yesHeavy"
              value="yes"
              className="btn-check"
              checked={heavy === "yes"}
              onChange={handleHeavyChange}
            />
            <label htmlFor="yesHeavy" className="btn btn-outline-primary">
              Yes
            </label>

            <input
              type="radio"
              name="heavy"
              id="noHeavy"
              value="no"
              className="btn-check"
              checked={heavy === "no"}
              onChange={handleHeavyChange}
            />
            <label htmlFor="noHeavy" className="btn btn-outline-primary">
              No
            </label>
          </div>
        </div>
      </div>
      <div className="row align-items-center">
        <div className="col">
          <span>Loading:</span>
        </div>
        <div className="col">
          <div className="btn-group" role="group">
            <input
              type="radio"
              name="loading"
              id="yesLoading"
              value="yes"
              className="btn-check"
              checked={loading === "yes"}
              onChange={handleLoadingChange}
            />
            <label htmlFor="yesLoading" className="btn btn-outline-primary">
              Yes
            </label>

            <input
              type="radio"
              name="loading"
              id="noLoading"
              value="no"
              className="btn-check"
              checked={loading === "no"}
              onChange={handleLoadingChange}
            />
            <label htmlFor="noLoading" className="btn btn-outline-primary">
              No
            </label>
          </div>
        </div>
      </div>
      <div className="row align-items-center">
        <div className="col">
          <span>Reach:</span>
        </div>
        <div className="col">
          <div className="btn-group" role="group">
            <input
              type="radio"
              name="reach"
              id="yesReach"
              value="yes"
              className="btn-check"
              checked={reach === "yes"}
              onChange={handleReachChange}
            />
            <label htmlFor="yesReach" className="btn btn-outline-primary">
              Yes
            </label>

            <input
              type="radio"
              name="reach"
              id="noReach"
              value="no"
              className="btn-check"
              checked={reach === "no"}
              onChange={handleReachChange}
            />
            <label htmlFor="noReach" className="btn btn-outline-primary">
              No
            </label>
          </div>
        </div>
      </div>
      <div className="row align-items-center">
        <div className="col">
          <span>Special:</span>
        </div>
        <div className="col">
          <div className="btn-group" role="group">
            <input
              type="radio"
              name="special"
              id="yesSpecial"
              value="yes"
              className="btn-check"
              checked={special === "yes"}
              onChange={handleSpecialChange}
            />
            <label htmlFor="yesSpecial" className="btn btn-outline-primary">
              Yes
            </label>

            <input
              type="radio"
              name="special"
              id="noSpecial"
              value="no"
              className="btn-check"
              checked={special === "no"}
              onChange={handleSpecialChange}
            />
            <label htmlFor="noSpecial" className="btn btn-outline-primary">
              No
            </label>
          </div>
        </div>
      </div>
      <div className="row align-items-center">
        <div className="col">
          <span>Thrown:</span>
        </div>
        <div className="col">
          <div className="btn-group" role="group">
            <input
              type="radio"
              name="thrown"
              id="yesThrown"
              value="yes"
              className="btn-check"
              checked={thrown === "yes"}
              onChange={handleThrownChange}
            />
            <label htmlFor="yesThrown" className="btn btn-outline-primary">
              Yes
            </label>

            <input
              type="radio"
              name="thrown"
              id="noThrown"
              value="no"
              className="btn-check"
              checked={thrown === "no"}
              onChange={handleThrownChange}
            />
            <label htmlFor="noThrown" className="btn btn-outline-primary">
              No
            </label>
          </div>
        </div>
      </div>
      <div className="row align-items-center">
        <div className="col">
          <span>Two-Handed:</span>
        </div>
        <div className="col">
          <div className="btn-group" role="group">
            <input
              type="radio"
              name="twoHanded"
              id="yesTwoHanded"
              value="yes"
              className="btn-check"
              checked={twoHanded === "yes"}
              onChange={handleTwoHandedChange}
            />
            <label htmlFor="yesTwoHanded" className="btn btn-outline-primary">
              Yes
            </label>

            <input
              type="radio"
              name="twoHanded"
              id="noTwoHanded"
              value="no"
              className="btn-check"
              checked={twoHanded === "no"}
              onChange={handleTwoHandedChange}
            />
            <label htmlFor="noTwoHanded" className="btn btn-outline-primary">
              No
            </label>
          </div>
        </div>
      </div>
      <div className="row align-items-center">
        <div className="col">
          <span>Versatile:</span>
        </div>
        <div className="col">
          <div className="btn-group" role="group">
            <input
              type="radio"
              name="versatile"
              id="yesVersatile"
              value="yes"
              className="btn-check"
              checked={versatile === "yes"}
              onChange={handleVersatileChange}
            />
            <label htmlFor="yesVersatile" className="btn btn-outline-primary">
              Yes
            </label>

            <input
              type="radio"
              name="versatile"
              id="noVersatile"
              value="no"
              className="btn-check"
              checked={versatile === "no"}
              onChange={handleVersatileChange}
            />
            <label htmlFor="noVersatile" className="btn btn-outline-primary">
              No
            </label>
          </div>
        </div>
      </div>
      <div className="row align-items-center">
        <div className="col">
          <span>Silvered:</span>
        </div>
        <div className="col">
          <div className="btn-group" role="group">
            <input
              type="radio"
              name="silvered"
              id="yesSilvered"
              value="yes"
              className="btn-check"
              checked={silvered === "yes"}
              onChange={handleSilveredChange}
            />
            <label htmlFor="yesSilvered" className="btn btn-outline-primary">
              Yes
            </label>

            <input
              type="radio"
              name="silvered"
              id="noSilvered"
              value="no"
              className="btn-check"
              checked={silvered === "no"}
              onChange={handleSilveredChange}
            />
            <label htmlFor="noSilvered" className="btn btn-outline-primary">
              No
            </label>
          </div>
        </div>
      </div>
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
