const accountId = context.accountId;

const [monster, setMonster] = useState(() => {
  const initialData = Social.getr(`${accountId}/game/monster`) ?? {
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
  setMonster((prevMonster) => ({
    ...prevMonster,
    metadata: { ...prevMonster.metadata, name: newName },
  }));
};

const handleImageChange = (newImage) => {
  setMonster((prevMonster) => ({
    ...prevMonster,
    metadata: { ...prevMonster.metadata, image: newImage },
  }));
};

const handleDescriptionChange = (e) => {
  const newDescription = e.target.value;
  setMonster((prevMonster) => ({
    ...prevMonster,
    metadata: { ...prevMonster.metadata, description: newDescription },
  }));
};

const handleMoralsChange = (e) => {
  const newMorals = e.target.value;
  setMonster((prevMonster) => ({
    ...prevMonster,
    metadata: { ...prevMonster.metadata, morals: newMorals },
  }));
};

const handleEthicsChange = (e) => {
  const newEthics = e.target.value;
  setMonster((prevMonster) => ({
    ...prevMonster,
    metadata: { ...prevMonster.metadata, ethics: newEthics },
  }));
};

const handleTypeChange = (e) => {
  const newType = e.target.value;
  setMonster((prevMonster) => ({
    ...prevMonster,
    metadata: { ...prevMonster.metadata, type: newType },
  }));
};

const handleSizeChange = (e) => {
  const newSize = e.target.value;
  setMonster((prevMonster) => ({
    ...prevMonster,
    metadata: { ...prevMonster.metadata, size: newSize },
  }));
};

const handleChallengeChange = (e) => {
  const newChallenge = e.target.value;
  setMonster((prevMonster) => ({
    ...prevMonster,
    metadata: { ...prevMonster.metadata, challenge: newChallenge },
  }));
};

const handleArmorClassChange = (e) => {
  const newArmorClass = e.target.value;
  setMonster((prevMonster) => ({
    ...prevMonster,
    metadata: { ...prevMonster.metadata, armorClass: newArmorClass },
  }));
};

const handleHitPointsChange = (e) => {
  const newHitPoints = e.target.value;
  setMonster((prevMonster) => ({
    ...prevMonster,
    metadata: { ...prevMonster.metadata, hitPoints: newHitPoints },
  }));
};

const handleSave = () => {
  Social.set({
    game: { monster },
    index: {
      createMonster: JSON.stringify({ key: "create", value: "monster" }),
    },
  });
};

return (
  <div>
    <div className="m-2">
      <h4>Create A Monster</h4>
      <p>
        You will have a chance to preview your data before saving your creation
      </p>
      <div className="mb-3 p-1">
        <label for="name">Name:</label>
        <input
          id="name"
          type="text"
          placeholder="What is the monster's name?"
          value={monster.metadata.name}
          onChange={handleNameChange}
        />
      </div>
      <h5 className="mb-2">Monster Image</h5>
      <div className="p-1">
        <Widget
          src="mob.near/widget/ImageEditorTabs"
          props={{
            image: monster.metadata.image,
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
          placeholder="What is the monster's description?"
          value={monster.metadata.description}
          onChange={handleDescriptionChange}
        />
      </div>
      <div className="mb-3 p-1">
        <h5 className="mb-2 d-block">Alignment</h5>
        <div className="row align-items-center">
          <div className="col">
            <label for="ethics">Ethics:</label>
            <select
              name="ethics"
              id="ethics"
              className="form-select"
              value={monster.metadata.ethics}
              onChange={handleEthicsChange}
            >
              <option value="null">---</option>
              <option value="lawful">Lawful</option>
              <option value="neutral">Neutral</option>
              <option value="chaotic">Chaotic</option>
              <option value="any">Any</option>
              <option value="unaligned">Unaligned</option>
            </select>
            <label for="morals">Morals:</label>
            <select
              name="morals"
              id="morals"
              className="form-select"
              value={monster.metadata.morals}
              onChange={handleMoralsChange}
            >
              <option value="null">---</option>
              <option value="good">Good</option>
              <option value="neutral">Neutral</option>
              <option value="evil">Evil</option>
              <option value="any">Any</option>
              <option value="unaligned">Unaligned</option>
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
              value={monster.metadata.type}
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
          value={monster.metadata.size}
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
          placeholder="What is the monster's challenge level?"
          value={monster.metadata.challenge}
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
          placeholder="What is the monster's armor class?"
          value={monster.metadata.armorClass}
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
        placeholder="What is the monster's HP?"
        value={monster.metadata.hitPoints}
        onChange={handleHitPointsChange}
      />
    </div>
    <div className="m-3">
      <h5 className="mb-2">Preview</h5>
      <p>If you are happy with your creation, be sure to click 'Save'</p>
      <Widget
        src="dawnkelly.near/widget/monster.inline"
        props={{
          accountId,
          monster,
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
